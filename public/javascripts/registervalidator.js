const passwd = document.getElementById("password");
const passwd2 = document.getElementById("password-confirm");
const submit = document.querySelector("#submit");
const errContainer = document.querySelector(".error-container");

submit.addEventListener("click", function (evt) {
  if (passwd.value !== passwd2.value) {
    evt.preventDefault();

    if (errContainer.children.length > 3) {
      return;
    }

    const err = document.createElement("span");
    err.classList.add("error-message");
    err.style.display = "block";
    err.innerText = "Passwords do not match!";
    errContainer.appendChild(err);

    setTimeout(function () {
      err.remove();
    }, 3000);
  }
});
