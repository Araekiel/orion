const request = new XMLHttpRequest();

const searchContainer = document.getElementById("index-search-container");
const mainLogo = document.getElementById("socialhunter-logo");
const searchForm = document.getElementById("search-form");
const searchField = document.getElementById("search-field");
const searchBtn = document.getElementById("search-btn");
const resContainer = document.getElementById("index-result-container");

document.addEventListener("keyup", function(event) {
  if (event.keyCode === 13) {
    console.log("enter");
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
        hashtag: searchValue
      },
      beforeSend: function() {
        resContainer.innerHTML = `<div class="loader"></div>`;
      },
      success: function(data) {
        resContainer.innerHTML = "";
        const edges =
          data["graphql"]["hashtag"]["edge_hashtag_to_media"]["edges"];
        edges.forEach(function(edge) {
          if (edge["node"]["edge_liked_by"]["count"] > 10) {
            let caption = "";
            try {
              caption =
                edge["node"]["edge_media_to_caption"]["edges"][0]["node"][
                  "text"
                ];
            } catch (e) {
              caption = "";
            }
            resContainer.innerHTML += `<div class="result-card">                          
              <img class="result-card-image" src="${
                edge["node"]["display_url"]
              }" />
              <br />
              <div class="stat-container">
              <div class = "stat stat-logo"><img class = "stat-logo-img" src="images/sm/insta.png" type="image/png"/></div>
              <p class="stat"><span class="stat-value">${
                edge["node"]["edge_liked_by"]["count"]
              }</span> <br /> <span class="stat-name">LIKES</span></p>
                  <p class="stat stat-right"><span class="stat-value">${
                    edge["node"]["edge_media_to_comment"]["count"]
                  }</span> <br /> <span class="stat-name">COMMENTS</span></p>

              </div>
              <p class="result-card-caption">${caption}</p>
            </div>`;
          }
        });
      }
    });
  } else {
    snackbarController("Enter something in the search field");
  }
}
