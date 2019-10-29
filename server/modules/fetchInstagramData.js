const request = require("request");

const fetchInstagramData = {
  fetchVideoUrl: shortcode => {
    const url = `https://www.instagram.com/p/${shortcode}/?__a=1`;
    return new Promise(async (resolve, reject) => {
      request(url, { json: true}, async (err, response, body) => {
        let videoUrl = await body["graphql"]["shortcode_media"]["video_url"];
        resolve(videoUrl);
      });
    });
  },
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
            let videoCounter = 0;

          edges.forEach(async function(edge) {
            let postContentString;
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
              if(edge["node"]["is_video"] == true) {
                let videoUrl = await fetchInstagramData.fetchVideoUrl(edge["node"]["shortcode"]);
                console.log(videoUrl);
                postContentString = `<video class = "result card-post-content" controls><source src = "${videoUrl}"></video><p>video</p>`;
                videoCounter++;
              } else {
                postContentString = `<img class = "result-card-post-content" src = "${edge["node"]["display_url"]}"/>`
              }
                
              // } else {
                // postContentString = `<img class = "result-card-post-content" src = "${edge["node"]["display_url"]}"/>`
              // }
              finalData.push({
                type: "post",
                website: "instagram",
                string: `<div class="result-card">
              ${postContentString}
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
          console.log(videoCounter)
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
              verifiedStatString = `<p class = "stat instagram-stat"><img class = "stat-img" src="images/sm/verified.png" type="image/png"/><br/><span class = "stat-name">Verified</span></p>`;
            } else {
              verifiedStatString = `<p class = "stat instagram-stat"><img class = "stat-img" src="images/sm/unverified.png" type="image/png"/><br/><span class = "stat-name">Unverified</span></p>`;
            }
            let privPubStatString;
            if(user["user"]["is_private"] === true) {
              privPubStatString = `<p class = "stat instagram-stat stat-right"><img class = "stat-img" src = "images/sm/private.png" type = "image/png"/><br/><span class = "stat-name">Private</span></p>`;
            } else {
              privPubStatString = `<p class = "stat instagram-stat stat-right"><img class = "stat-img" src = "images/sm/public.png" type = "image/png"/><br/><span class = "stat-name">Public</span></p>`
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
                    ${verifiedStatString}
                    ${privPubStatString}
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
