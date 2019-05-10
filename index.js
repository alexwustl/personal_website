/*Loading Symbol*/
window.addEventListener("load", function() {
  document.querySelector("main").classList.remove("hidden");
  document.querySelector(".loading").classList.add("hidden");
});
/*Listen for email submission*/
let emailForm = document.getElementById("sendEmailForm");
if(emailForm) {
  emailForm.addEventListener("submit", function(e) {
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
}
