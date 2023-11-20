const registerSW = () => {
  if ("serviceWorker" in navigator) {
    console.log("worker is present");
    (navigator.serviceWorker as ServiceWorkerContainer)
      .register("./js/sw.js", {
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
