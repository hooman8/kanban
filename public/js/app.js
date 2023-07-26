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

fetch("http://localhost:3000/download")
  .then((response) => response.json())
  .then((data) => console.log(data))
  .catch((e) =>
    console.log(`There was a problem with your fetch operation: ${e.message}`)
  );

// fetch("http://localhost:3000/download-uncompressed")
//   .then((response) => response.json())
//   .then((data) => console.log(data))
//   .catch((e) =>
//     console.log(`There was a problem with your fetch operation: ${e.message}`)
//   );
