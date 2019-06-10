const body = document.getElementsByTagName("body")[0];
const searchField = document.getElementById("search-field");
const searchButton = document.getElementById("search-button");
const postContainer = document.getElementById("post-container");

searchButton.addEventListener("click", function() {
  let tag = searchField.value;
  postContainer.innerHTML = "";
  fetchData(tag);
});

function fetchData(tag) {
  let counter = 0;
  fetch(`https://www.instagram.com/explore/tags/${tag}/?__a=1`)
    .then(data => {
      return data.json();
    })
    .then(async data => {
      console.log(data);
      let username;
      let userDPUrl;
      const edges =
        data["graphql"]["hashtag"]["edge_hashtag_to_media"]["edges"];
      let count = edges.length > 50 ? 50 : edges.length;
      for (let i = 0; i < edges.length; i++) {
        currentEdge = edges[i];
        console.log(currentEdge);
        const userID = currentEdge["node"]["owner"]["id"];
        console.log(currentEdge["node"]["edge_media_to_caption"]["edges"]);
        let caption = "";
        try {
          caption =
            currentEdge["node"]["edge_media_to_caption"]["edges"][0]["node"][
              "text"
            ];
        } catch (e) {
          console.log(counter);
          console.log(e);
        }
        const imageURL = currentEdge["node"]["display_url"];
        const likes = currentEdge["node"]["edge_media_preview_like"]["count"];
        // await fetch(`https://i.instagram.com/api/v1/users/${userID}/info`)
        //   .then(async data => {
        //     return await data.json();
        //   })
        //   .then(async data => {
        //     username = await data["user"]["username"];
        //     userDPUrl = await data["user"]["profile_pic_url"];
        //   });
        postContainer.innerHTML += `<img src = "${imageURL}" height = "500px" width = "500px"/><br/><img src = "${userDPUrl}" height = "50px" width = "50px" style = "border-radius: 25px" /><p style = "font-weight: bold;">${username}</p><p>${caption}</p><p>Likes: ${likes}</p><p style = "font-weight: bold;">${userID}</p><br/><hr/>`;
        counter++;
      }
      console.log(counter);
      postContainer.innerHTML +=
        '<input class="get-more-button" type="button" value="Get More Results" /><hr/><br/>';
      getMoreBtnClick();
    });
}

function getMoreBtnClick() {
  const btn = Array.from(
    document.getElementsByClassName("get-more-button")
  ).slice(-1)[0];
  console.log(btn);
  btn.addEventListener("click", function() {
    let tag = searchField.value;
    fetchData(tag);
  });
}
