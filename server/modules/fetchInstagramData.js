const request = require("request");

const fetchInstagramData = {
  headers: {
    "User-Agent": "Mozilla/5.0 (Macintosh; Intel Mac OS X 10.12; rv:55.0) Gecko/20100101 Firefox/55.0",
  },
  fetchVideoUrl: shortcode => {
    const url = `https://www.instagram.com/p/${shortcode}/?__a=1`;
    return new Promise(async (resolve, reject) => {
      request(url, { json: true, headers: this.headers}, async (err, response, body) => {
        if(err) {
          reject(err);  
        } else {
          let videoUrl = body["graphql"]["shortcode_media"]["video_url"];
          resolve(videoUrl);
        }      
      });
    });
  },
  fetchFollowerCount: username => {
    const url = `https://www.instagram.com/${username}/?__a=1`;
    return new Promise(async (resolve, reject) => {
      request(url, { json: true, headers: this.headers}, async (err, response, body) => {
        let followerCount = body["graphql"]["user"]["edge_followed_by"]["count"];
        resolve(followerCount);
      }); 
    });
  },
  fetchUsers: query => {
    const url = `https://www.instagram.com/web/search/topsearch/?query=${query}`;
    return new Promise((resolve, reject) => {
      request(url, { json: true, headers: this.headers }, async (err, response, body) => {
        if (err) {
          resolve([]);
        } else {
          let fetchedData = [];
          const users = body["users"];
          users.forEach(async user => {
            let userData = {
              type: "user",
              network: "instagram",
              data: {
                profilePic: {
                  url: user["user"]["profile_pic_url"],
                },
                fullName: user["user"]["full_name"],
                username: user["user"]["username"],
                isVerified: user["user"]["is_verified"],
                isPrivate: user["user"]["is_private"]
              }
            }
            fetchedData.push(userData);
          });
          resolve(fetchedData);
        }
      });
    });
  },
  fetchPosts: tag => {
    let editedTag = tag.replace(/\s/g, "");
    const specialChars = "!@#$%&*^()_-=+?/>.<,~`[]{}|";
    let specialCharErr = false;
    for (let char of editedTag) {
      if (specialChars.indexOf(char) > -1) {
        specialCharErr = true;
        break;
      }
    }
    if(specialCharErr) {
      return new Promise((resolve, reject) => {
        resolve([]);
      });
    } else {
      const url = `https://www.instagram.com/explore/tags/${editedTag}/?__a=1`;
      return new Promise(async (resolve, reject) => {
        request(url, { json: true, headers: this.headers }, async (err, response, body) => {
          if (err || response.statusCode != 200) {
            resolve([]);
          } else {
            let fetchedData = [];
            const edges =
              body["graphql"]["hashtag"]["edge_hashtag_to_top_posts"]["edges"]; 
            /* 
            Using for-of loop instead of forEach because await doesn't work as expected inside
            forEach. An async call is made to fetchInstagramData.fetchVideoUrl() if a post 
            contains a video.
            */
            for(let edge of edges) {
              let edgeData = {
                type: "post",
                network: "instagram",
                data: {
                  caption: "",
                  likeCount: edge["node"]["edge_liked_by"]["count"],
                  commentCount: edge["node"]["edge_media_to_comment"]["count"],
                  shortcode: edge["node"]["shortcode"],
                  media: {
                    isVideo: edge["node"]["is_video"],
                    src: ""
                  }
                }
              };

              try {
                edgeData.data.caption =
                  edge["node"]["edge_media_to_caption"]["edges"][0]["node"][
                    "text"
                  ];
              } catch (e) {
                edgeData.data.caption = "";
              }

              if(edge["node"]["is_video"] === true) {
                await fetchInstagramData.fetchVideoUrl(edge["node"]["shortcode"]).then(videoUrl => {
                  edgeData.data.media.src = videoUrl;
                });          
              } else {
                edgeData.data.media.src = edge["node"]["display_url"];
              }      
              fetchedData.push(edgeData);
            }    
            resolve(fetchedData);
          }
        });
      });
    }
  },
};

module.exports = {
  fetchInstagramData
};



