//Loading Bar
window.addEventListener("load", function() {
  document.querySelector("main").classList.remove("hidden");
  document.querySelector(".loading").classList.add("hidden");
});

//Service Worker
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

//Footer
const footer = document.createElement('footer');
const p = document.createElement('p');
const date = new Date();
const year = date.getFullYear();
p.innerText = 'Copyright © ' + year + ' Alex Baker';
footer.appendChild(p);
document.body.appendChild(footer);