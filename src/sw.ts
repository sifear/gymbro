self.addEventListener("fetch", (event) => {
   (event as FetchEvent).respondWith(
      (async () => {
         const request = (event as FetchEvent).request;

         const responseFromCache = await caches.match(request);

         if (request.url.includes("check_update")) {
            console.log("fetch event for check update");
         }

         if (request.url.includes("check_update") && responseFromCache) {
            console.log("update check is cached");
            const cachedVersion = await responseFromCache.json();
            const cache = await caches.open("v1");
            await cache.delete(request);

            try {
               let res = await fetch(request);

               await cache.put(request, res.clone());

               let _res = await res.json();
               console.log("getting to get actual version");
               console.log(_res, cachedVersion);
               console.log(_res.version !== cachedVersion.version);
               if (_res.version !== cachedVersion.version) {
                  console.log("not equal");
                  console.log(_res.version, cachedVersion);
                  caches.delete("v1");
                  return new Response(JSON.stringify({ reload: true }));
               } else {
                  return new Response(JSON.stringify({ reload: false }));
               }
            } catch (e) {
               return new Response(JSON.stringify({ reload: false }));
            }
         }

         if (responseFromCache) {
            return responseFromCache;
         }

         try {
            const responseFromNetwork = await fetch(request);
            const cache = await caches.open("v1");
            await cache.put(request, responseFromNetwork.clone());
            return responseFromNetwork;
         } catch (error) {
            const fallbackResponse = await caches.match("/fallback.html");
            if (fallbackResponse) {
               return fallbackResponse;
            }

            return new Response("Network error happened", {
               status: 408,
               headers: {
                  "Content-Type": "text/plain",
               },
            });
         }
      })()
   );
});

addEventListener("install", (event) => {
   console.log("delete cache while installing");
   console.log(event);
   caches.delete("v1");
});

addEventListener("activate", (event) => {
   event.waitUntil(clients.claim());
});
