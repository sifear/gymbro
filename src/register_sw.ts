const registerSW = () => {
  console.log("about to register");
  console.log("worker is present", navigator.serviceWorker);
  console.log("csekk", "serviceWorker" in navigator);
  if ("serviceWorker" in navigator) {
    console.log('register');
    (navigator.serviceWorker as ServiceWorkerContainer)
      .register("./app/sw.js", {
        scope: "/",
      })
      .then(
        (registration) => {
          console.log("registered");
        },
        (error) => {
          console.log("did not work out: ", error);
        }
      );
  }
};

export default registerSW;
