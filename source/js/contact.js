/*Loading Symbol*/
window.addEventListener("load", function() {
  document.querySelector("main").classList.remove("hidden");
  document.querySelector(".loading").classList.add("hidden");
});
/*Listen for email submission*/
document
  .getElementById("sendEmailForm")
  .addEventListener("submit", function(e) {
    e.preventDefault();
    emailjs
      .sendForm(
        "default_service",
        "send_email",
        "#sendEmailForm",
        "user_lbyBgbv5MgWLroKROcIT7"
      )
      .then(function() {
        let resultText = document.getElementById("sendResult");
        resultText.innerText = "Message Sent Successfully!";
        resultText.style.color = "#00d623";
        let formChildren = document.getElementById("sendEmailForm").children;
        for (let child of formChildren) {
          if (child.type === "submit") {
            continue;
          }
          child.value = "";
        }
      })
      .catch(function() {
        let resultText = document.getElementById("sendResult");
        resultText.innerText = "Message Failed to Send!";
        resultText.style.color = "##db000a";
      });
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
