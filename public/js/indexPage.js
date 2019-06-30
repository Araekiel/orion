var btn = document.getElementById("search-btn");
var request = new XMLHttpRequest();
var logo = document.getElementById("socialhunter-logo");
var form = document.getElementById("search-form");
var searchContainer = document.getElementById("index-search-container");
var resContainer = document.getElementById("index-result-container");

btn.addEventListener("click", function(event) {
  logo.classList.remove("logo-search-inactive");
  logo.classList.add("logo-search-active");
  searchContainer.classList.remove("ind-search-cont-search-inactive");
  searchContainer.classList.add("ind-search-cont-search-active");
  setTimeout(function() {
    resContainer.classList.remove("ind-res-cont-search-inactive");
    resContainer.classList.add("ind-res-cont-search-active");
  }, 150);
  // form.classList.toggle("form-search-active");
  // form.classList.toggle("form-search-inactive");
});
