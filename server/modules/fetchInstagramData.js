const request = require("request");

const fetchInstagramData = {
  fetchVideoUrl: shortcode => {
    const url = `https://www.instagram.com/p/${shortcode}/?__a=1`;
    return new Promise(async (resolve, reject) => {
      request(url, { json: true }, async (err, response, body) => {
        let videoUrl = body["graphql"]["shortcode_media"]["video_url"];
        resolve(videoUrl);
      });
    });
  },
  fetchFollowerCount: username => {
    const url = `https://www.instagram.com/${username}/?__a=1`;
    return new Promise(async (resolve, reject) => {
      request(url, { json: true }, async (err, response, body) => {
        //console.log(body["graphql"]);
        let followerCount = body["graphql"]["user"]["edge_followed_by"]["count"];
        resolve(followerCount);
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
        if (err || specialCharErr || response.statusCode != 200) {
          let finalData = [];
          resolve(finalData);
        } else {
          let finalData = [];
          const edges =
            body["graphql"]["hashtag"]["edge_hashtag_to_top_posts"]["edges"]; 

          edges.forEach(async function(edge) {
            let mediaTypeStatString, resultCardMediaString;
            let caption = "";
            try {
              caption =
                edge["node"]["edge_media_to_caption"]["edges"][0]["node"][
                  "text"
                ];
            } catch (e) {
              caption = "";
            }

            if(edge["node"]["is_video"] === true) {
              await fetchInstagramData.fetchVideoUrl(edge["node"]["shortcode"]).then(videoUrl => {
                resultCardMediaString = `<video class="result-card-media result-card-vid" src="${videoUrl}" controls></video>`
              });
              console.log(resultCardMediaString);           
              mediaTypeStatString = `<p class = "result-card-stat result-card-stat-4col result-card-stat-right"><img class = "result-card-stat-img" src = "images/sm/video.png" type = "image/png"/><br/><span class = "result-card-stat-name">Video</span></p>`;
            } else {
              resultCardMediaString = `<img class = "result-card-media result-card-img" src = "${edge["node"]["display_url"]}"/>`;
              mediaTypeStatString = `<p class = "result-card-stat result-card-stat-4col result-card-stat-right"><img class = "result-card-stat-img" src = "images/sm/photo.png" type = "image/png"/><br/><span class = "result-card-stat-name">Photo</span></p>`;
            }

            finalData.push({
              type: "post",
              website: "instagram",
              htmlString: `<div class="result-card result-card-instagram-post">
                <div class="result-card-main-content">
                  ${resultCardMediaString}
                  <br/>
                  <p class="result-card-text">${caption}</p>
                </div>
                <div class="result-card-stat-container">
                  <p class = "result-card-stat result-card-stat-4col"><img class = "result-card-stat-img" src = "images/sm/insta.png" type="image/png"/><br/><span class = "result-card-stat-name">Instagram</span></p>
                  <p class="result-card-stat result-card-stat-4col"><span class="result-card-stat-value">${
                    edge["node"]["edge_liked_by"]["count"]
                  }</span> <br /> <span class="result-card-stat-name">Likes</span></p>
                      <p class="result-card-stat result-card-stat-4col"><span class="result-card-stat-value">${
                        edge["node"]["edge_media_to_comment"]["count"]
                      }</span> <br /> <span class="result-card-stat-name">Comments</span></p>
                  ${mediaTypeStatString}
                </div>
                <a href = "https://instagram.com/p/${edge["node"]["shortcode"]}">
                  <div class="result-card-link">
                      <img src="/images/sm/link.png" type="image/png" class="result-card-link-img"/>
                  </div>
                </a>
              </div>
            `
            });
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
          users.forEach(async user => {
            let verifiedStatString, privPubStatString;
            if (user["user"]["is_verified"] === true) {
              verifiedStatString = `<p class = "result-card-stat result-card-stat-3col"><img class = "result-card-stat-img" src="images/sm/verified.png" type="image/png"/><br/><span class = "result-card-stat-name">Verified</span></p>`;
            } else {
              verifiedStatString = `<p class = "result-card-stat result-card-stat-3col"><img class = "result-card-stat-img" src="images/sm/unverified.png" type="image/png"/><br/><span class = "result-card-stat-name">Unverified</span></p>`;
            }
            if(user["user"]["is_private"] === true) {
              privPubStatString = `<p class = "result-card-stat result-card-stat-3col result-card-stat-right"><img class = "result-card-stat-img" src = "images/sm/private.png" type = "image/png"/><br/><span class = "result-card-stat-name">Private</span></p>`;
            } else {
              privPubStatString = `<p class = "result-card-stat result-card-stat-3col result-card-stat-right"><img class = "result-card-stat-img" src = "images/sm/public.png" type = "image/png"/><br/><span class = "result-card-stat-name">Public</span></p>`
            }
            let userData = {
              type: "user",
              website: "instagram",
              htmlString: `<div class = "result-card result-card-instagram-user"><img src = ${
                  user["user"]["profile_pic_url"]
                } class = "result-card-instagram-user-dp" /><p class = "result-card-instagram-user-name">${
                  user["user"]["full_name"]
                }</p><p class = "result-card-instagram-user-username">@${
                  user["user"]["username"]
                }</p>
                <div class="result-card-stat-container result-card-stat-container-user">
                  <p class = "result-card-stat result-card-stat-3col"><img class = "result-card-stat-img" src="images/sm/insta.png" type="image/png"/><br/><span class = "result-card-stat-name">Instagram</span></p>                
                  ${verifiedStatString}
                  ${privPubStatString}
                </div>
                <a href = "https://www.instagram.com/${user["user"]["username"]}">
                  <div class="result-card-link">
                      <img src="/images/sm/link.png" type="image/png" class="result-card-link-img"/>
                  </div>
                </a>
              </div>
             `
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
