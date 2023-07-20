// const dropdown = document.querySelector(".card-header-icon");
// dropdown.addEventListener("click", function (event) {
//   event.preventDefault();
//   const card = event.target.closest(".card");
//   console.log(card);
// });

// document.getElementById("cardToggle").addEventListener("click", function (e) {
//   e.preventDefault();
//   console.log(e.target);
//   const content = document.getElementById("cardContent");
//   content.classList.toggle("open");
// });

document.addEventListener("DOMContentLoaded", function () {
  var toggle = document.getElementById("cardToggle");
  var content = document.getElementById("cardContent");
  toggle.addEventListener("click", function (e) {
    e.preventDefault();
    if (content.style.maxHeight) {
      content.style.maxHeight = null;
    } else {
      content.style.maxHeight = content.scrollHeight + "px";
    }
  });
});
