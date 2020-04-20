const searchContainer = document.getElementById("index-search-container");
const mainLogo = document.getElementById("socialhunter-logo");
const searchForm = document.getElementById("search-form");
const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const resContainer = document.getElementById("index-result-container");
// const copyright = document.getElementById("copyright");

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    search();
  }
});
searchBtn.addEventListener("click", search);

function search() {
  let searchValue = searchField.value;
  if (searchValue) {
    mainLogo.classList.remove("logo-search-inactive");
    mainLogo.classList.add("logo-search-active");
    searchContainer.classList.remove("ind-search-cont-search-inactive");
    searchContainer.classList.add("ind-search-cont-search-active");
    setTimeout(function() {
      resContainer.classList.remove("ind-res-cont-search-inactive");
      resContainer.classList.add("ind-res-cont-search-active");
    }, 150);
    $.ajax({
      url: "/webfeed",
      method: "GET",
      data: {
        value: searchValue
      },
      beforeSend: function() {
        // copyright.style.display = "none";
        resContainer.innerHTML = `<div class="loader"><div class="loader1"></div><div class="loader2"></div></div>`;
        let resultCardStylesheet = document.getElementById("result-card-stylesheet");
        if(resultCardStylesheet == undefined || resultCardStylesheet == null) {
          addStylesheet("css/indexPage/resultCard.css", "result-card-stylesheet");
        }
      },
      success: function(data) {
        resContainer.innerHTML = "";
        data.forEach(currentElement => {
          resContainer.innerHTML += currentElement["htmlString"];
        });
      },
      error: function(err) {
        resContainer.innerHTML = "";
        snackbarController(err.responseText);
      }
    });
  } else {
    snackbarController("Enter something in the search field");
  }
}

function addStylesheet(src, id) {
  const stylesheet = document.createElement("link");
  stylesheet.href = src;
  stylesheet.rel = "stylesheet";
  stylesheet.type = "text/css";
  stylesheet.id = id;
  document.getElementsByTagName("head")[0].appendChild(stylesheet);
}