var btn = document.getElementById("search-btn");
var request = new XMLHttpRequest();
var field = document.getElementById("search-bar");
var logo = document.getElementById("socialhunter-logo");
var form = document.getElementById("search-form");

btn.addEventListener("click", function(event) {
  logo.classList.add("logo-search-active");
  form.classList.add("form-search-active");
});
