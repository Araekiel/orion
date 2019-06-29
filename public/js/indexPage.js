var btn = document.getElementById("search-btn");
var request = new XMLHttpRequest();
var field = document.getElementById("search-bar");
var logo = document.getElementById("socialhunter-logo");
var form = document.getElementById("search-form");
var cont = document.getElementById("index-search-container");

btn.addEventListener("click", function(event) {
  logo.classList.toggle("logo-search-active");
  logo.classList.toggle("logo-search-inactive");
  form.classList.toggle("form-search-active");
  form.classList.toggle("form-search-inactive");
  cont.classList.toggle("ind-search-cont-search-active");
  cont.classList.toggle("ind-search-cont-search-inactive");
  // cont.style.height = "100px";
  console.log(logo);
  console.log(form);
  console.log(cont);
});
