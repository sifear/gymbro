self.addEventListener("fetch", (event) => {
   console.log(event);
   (event as FetchEvent).respondWith(
      (async () => {
         console.log("fetch event cucc van itt");
         const request = (event as FetchEvent).request;

         const responseFromCache = await caches.match(request);

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
