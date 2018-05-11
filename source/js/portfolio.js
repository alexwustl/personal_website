/*Loading Symbol*/
window.addEventListener("load", function() {
  document.querySelector("main").classList.remove("hidden");
  document.querySelector(".loading").classList.add("hidden");
});
/*Drop down menu behavior*/
let dropDownItems = document.getElementsByClassName("drop");
for (let item of dropDownItems) {
  let toDrop = item.getElementsByClassName("toDrop");
  item.addEventListener("mouseenter", function() {
    toDrop[0].classList.remove("short");
    toDrop[0].parentElement.classList.add("arrowUp");
  });
  item.addEventListener("mouseleave", function() {
    if (!(event.relatedTarget || event.toElement)) {
      return;
    }
    toDrop[0].parentElement.classList.remove("arrowUp");
    toDrop[0].classList.add("short");
  });
}
/*Slide show behavior*/
let slideShows = document.getElementsByClassName("slideShow");
for (let slideShow of slideShows) {
  let back = slideShow.children[0];
  let forward = slideShow.children[slideShow.children.length - 1];
  let pictures = Array.prototype.slice.call(
    slideShow.children,
    1,
    slideShow.children.length - 1
  );
  let currentPicture = 0;
  back.addEventListener("click", e => {
    pictures[currentPicture].classList.add("hidden");
    currentPicture -= 1;
    if (currentPicture == -1) currentPicture = pictures.length - 1;
    pictures[currentPicture].classList.remove("hidden");
  });
  forward.addEventListener("click", e => {
    pictures[currentPicture].classList.add("hidden");
    currentPicture += 1;
    if (currentPicture == pictures.length) currentPicture = 0;
    pictures[currentPicture].classList.remove("hidden");
  });
}
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
