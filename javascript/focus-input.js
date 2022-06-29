const inputs = document.querySelectorAll(".input");

function focusFunc() {
  let va = this.parentNode;
  va.classList.add("focus");
}

function blurFunc() {
  let va = this.parentNode;
  if (this.value == "") {
    va.classList.remove("focus");
  }
}

inputs.forEach((input) => {
  input.addEventListener("focus", focusFunc);
  input.addEventListener("blur", blurFunc);
});