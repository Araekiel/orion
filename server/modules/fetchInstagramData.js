const request = require("request");

const fetchInstagramData = {
  fetchPosts: tag => {
    let editedTag = tag.replace(/\s/g, "");
    const specialChars = "!@#$%&*^()_-=+?/>.<,~`[]{}|";
    let specialCharErr = false;
    for (let char of editedTag) {
      if (specialChars.indexOf(char) > -1 || specialCharErr === true) {
        specialCharErr = true;
      }
    }
    const url = `https://www.instagram.com/explore/tags/${editedTag}/?__a=1`;
    return new Promise((resolve, reject) => {
      request(url, { json: true }, async (err, response, body) => {
        if (err || specialCharErr) {
          let finalData = [];
          resolve(finalData);
        } else {
          let finalData = [];
          const edges =
            body["graphql"]["hashtag"]["edge_hashtag_to_media"]["edges"];
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
              finalData.push({
                type: "post",
                website: "instagram",
                string: `<div class="result-card">
              <img class="result-card-post-image" src="${
                edge["node"]["display_url"]
              }" />
              <br />
              <div class="stat-container">
              <p class = "stat instagram-stat"><img class = "stat-img" src="images/sm/insta.png" type="image/png"/><br/><span class = "stat-name">Instagram</span></p>
              <p class="stat instagram-stat"><span class="stat-value">${
                edge["node"]["edge_liked_by"]["count"]
              }</span> <br /> <span class="stat-name">Likes</span></p>
                  <p class="stat instagram-stat stat-right"><span class="stat-value">${
                    edge["node"]["edge_media_to_comment"]["count"]
                  }</span> <br /> <span class="stat-name">Comments</span></p>
              </div>
              <p class="result-card-caption">${caption}</p>
              <a href = "https://www.instagram.com/p/${
                edge["node"]["shortcode"]
              }"><input type = "button" class = "view-post-btn" value = "VIEW POST"></input></a>
            </div>`
              });
            }
          });
          resolve(finalData);
        }
      });
    });
  },
  fetchUsers: query => {
    const url = `https://www.instagram.com/web/search/topsearch/?query=${query}`;
    return new Promise((resolve, reject) => {
      request(url, { json: true }, async (err, response, body) => {
        if (err) {
          let verifiedUsers = [];
          let unverifiedUsers = [];
          let finalData = {
            verified: verifiedUsers,
            unverified: unverifiedUsers
          };
          resolve(finalData);
        } else {
          let verifiedUsers = [];
          let unverifiedUsers = [];
          const users = body["users"];
          users.forEach(user => {
            let verifiedStatString;
            if (user["user"]["is_verified"] === true) {
              verifiedStatString = `<p class = "stat instagram-stat stat-right"><img class = "stat-img" src="images/sm/verified.png" type="image/png"/><br/><span class = "stat-name">Verified</span></p>`;
            } else {
              verifiedStatString = `<p class = "stat instagram-stat stat-right"><img class = "stat-img" src="images/sm/unverified.png" type="image/png"/><br/><span class = "stat-name">Unverified</span></p>`;
            }
            let followerCount;
            if (user["user"]["follower_count"] >= 100000) {
              followerCount = user["user"]["byline"]
                .substr(0, user["user"]["byline"].indexOf(" ") + 1)
                .trim();
            } else {
              followerCount = user["user"]["follower_count"];
            }
            let userData = {
              type: "user",
              website: "instagram",
              string: `<div class = "result-card"><img src = ${
                user["user"]["profile_pic_url"]
              } class = "result-card-user-image" /><p class = "result-card-user-fullname">${
                user["user"]["full_name"]
              }</p><p class = "result-card-user-username">@${
                user["user"]["username"]
              }</p>
              <div class="stat-container user-stat-container">
                <p class = "stat instagram-stat"><img class = "stat-img" src="images/sm/insta.png" type="image/png"/><br/><span class = "stat-name">Instagram</span></p>
                    <p class="stat instagram-stat"><span class="stat-value">${followerCount}</span> <br /> <span class="stat-name">Followers</span></p>
                    ${verifiedStatString}
              </div>
              <a href = "https://www.instagram.com/${
                user["user"]["username"]
              }"><input type = "button" class = "view-profile-btn" value = "VIEW PROFILE"></input></a>
            </div>`
            }
            if(user["user"]["is_verified"] === true) {
              verifiedUsers.push(userData);
            } else {
              unverifiedUsers.push(userData);
            }
          });
          const finalData = {
            verified: verifiedUsers,
            unverified: unverifiedUsers
          };
          resolve(finalData);
        }
      });
    });
  }
};

module.exports = {
  fetchInstagramData
};
