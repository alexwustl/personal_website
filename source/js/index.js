window.addEventListener("load", function() {
  document.querySelector("main").classList.remove("hidden");
  document.querySelector(".loading").classList.add("hidden");
});
if ("serviceWorker" in navigator) {
  window.addEventListener("load", function() {
    navigator.serviceWorker.register("./serviceworker.js").then(
      function() {
        // Registration was successful
      },
      function() {
        // registration failed :(
      }
    );
  });
}
