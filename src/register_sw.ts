const registerSW = async () => {
   console.log("about to register");
   if ("serviceWorker" in navigator) {
      console.log("registering, worker is present: ", navigator.serviceWorker);
      const registration = await (navigator.serviceWorker as ServiceWorkerContainer).register(
         "./app/sw.js",
         {
            scope: "/",
         }
      );

      console.log(registration)

      if (registration.installing) {
         console.log("Service worker installing");
      } else if (registration.waiting) {
         console.log("Service worker installed");
      } else if (registration.active) {
         console.log("Service worker active");
      }
   }
};

export default registerSW;
