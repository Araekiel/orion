var request = new XMLHttpRequest();

var searchContainer = document.getElementById("index-search-container");
var mainLogo = document.getElementById("socialhunter-logo");
var searchForm = document.getElementById("search-form");
var searchField = document.getElementById("search-field");
var searchBtn = document.getElementById("search-btn");
var resContainer = document.getElementById("index-result-container");

searchBtn.addEventListener("click", function(event) {
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
          resContainer.innerHTML += `
          <div class="result-card">
                <img class="result-card-image" src="${
                  edge["node"]["display_url"]
                }" />
                <br />
                <p>
                    Caption: ${
                      edge["node"]["edge_media_to_caption"]["edges"][0]["node"][
                        "text"
                      ]
                    }
                    <br />
                    <br />
                    Likes: ${edge["node"]["edge_liked_by"]["count"]}
                    <br />
                    <br />
                    Comments: ${edge["node"]["edge_media_to_comment"]["count"]}
                </p>
            </div>
            `;
        });
      }
    });
  } else {
    alert("Enter something in the search field");
  }
});
