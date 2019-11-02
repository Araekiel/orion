const request = new XMLHttpRequest();

const searchContainer = document.getElementById("index-search-container");
const mainLogo = document.getElementById("socialhunter-logo");
const searchForm = document.getElementById("search-form");
const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const resContainer = document.getElementById("index-result-container");

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
      url: "/feed",
      method: "GET",
      data: {
        value: searchValue
      },
      beforeSend: function() {
        resContainer.innerHTML = `<div class="loader"></div>`;
      },
      success: function(data) {
        resContainer.innerHTML = "";
        data.mainData.forEach(currentElement => {
          resContainer.innerHTML += currentElement["htmlString"];
        });
      },
      error: function() {
        resContainer.innerHTML = "";
        snackbarController("An error was encountered while looking for what you entered");
      }
    });
  } else {
    snackbarController("Enter something in the search field");
  }
}
