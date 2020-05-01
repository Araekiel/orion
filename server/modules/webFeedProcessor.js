const { fetchInstagramData } = require("./fetchInstagramData.js");
const { fetchTwitterData } = require("./fetchTwitterData.js");

const { shuffleArray } = require("../utils/shuffleArray.js");

const webFeedProcessor = async (value) => {
    return new Promise(async (resolve, reject) => {
        const [instagramUsersObj, instagramPosts, twitterTweets] = await Promise.all([
            processData.processInstagramUsers(value),
            processData.processInstagramPosts(value),
            processData.processTwitterTweets(value)
        ]);

        const userCollection = instagramUsersObj.verified.length > 0 ? instagramUsersObj.verified : instagramUsersObj.unverified.slice(0, 5);
        const postCollection = shuffleArray(instagramPosts.concat(twitterTweets));
        const processedData = {
            mainData: userCollection.concat(postCollection)
        };

        if(processedData.mainData.length > 0) {
            resolve(processedData);
        } else {
            reject("An error was encountered while looking for what you entered");
        }
    });   
}

const processData = {
    processInstagramUsers: (value) => {
        return new Promise(async (resolve, reject) => {
            fetchInstagramData.fetchUsers(value).then(fetchedData => {
                let verifiedUsers = [], unverifiedUsers = [];
                fetchedData.forEach(currentChunk => {
                    let verifiedStatString, privPubStatString;

                    if(currentChunk.data.isVerified === true) {
                        verifiedStatString = `<p class = "result-card-stat result-card-stat-3col"><img class = "result-card-stat-img" src="images/sm/verified.webp" type="image/webp"/><br/><span class = "result-card-stat-name">Verified</span></p>`;
                    } else {
                        verifiedStatString = `<p class = "result-card-stat result-card-stat-3col"><img class = "result-card-stat-img" src="images/sm/unverified.webp" type="image/webp"/><br/><span class = "result-card-stat-name">Unverified</span></p>`;
                    }

                    if(currentChunk.data.isPrivate === true) {
                        privPubStatString = `<p class = "result-card-stat result-card-stat-3col result-card-stat-right"><img class = "result-card-stat-img" src = "images/sm/private.webp" type = "image/webp"/><br/><span class = "result-card-stat-name">Private</span></p>`;
                    } else {
                        privPubStatString = `<p class = "result-card-stat result-card-stat-3col result-card-stat-right"><img class = "result-card-stat-img" src = "images/sm/public.webp" type = "image/webp"/><br/><span class = "result-card-stat-name">Public</span></p>`
                    }

                    let userData = {
                        type: currentChunk.type,
                        network: currentChunk.network,
                        htmlString: `<div class = "result-card result-card-instagram-user"><img src = ${
                            currentChunk.data.profilePic.url
                          } class = "result-card-instagram-user-dp" /><p class = "result-card-instagram-user-name">${
                            currentChunk.data.fullName
                          }</p><p class = "result-card-instagram-user-username">@${
                            currentChunk.data.username
                          }</p>
                          <div class="result-card-stat-container result-card-stat-container-user">
                            <p class = "result-card-stat result-card-stat-3col"><img class = "result-card-stat-img" src="images/sm/insta.webp" type="image/webp"/><br/><span class = "result-card-stat-name">Instagram</span></p>                
                            ${verifiedStatString}
                            ${privPubStatString}
                          </div>
                          <a href = "https://www.instagram.com/${currentChunk.data.username}">
                            <div class="result-card-link">
                                <img src="/images/sm/link.webp" type="image/webp" class="result-card-link-img"/>
                            </div>
                          </a>
                        </div>
                       `
                    }

                    if(currentChunk.data.isVerified === true) {
                        verifiedUsers.push(userData);
                    } else {
                        unverifiedUsers.push(userData);
                    }
                });

                resolve({
                    verified: verifiedUsers,
                    unverified: unverifiedUsers
                });
            }); 
        });
    },
    processInstagramPosts: (value) => {
        return new Promise((resolve, reject) => {
            fetchInstagramData.fetchPosts(value).then(fetchedData => {
                let processedData = [];
                for(let currentChunk of fetchedData) {
                    let resultCardMediaString, mediaTypeStatString;
                    if(currentChunk.data.media.isVideo === true) {
                        resultCardMediaString = `<video class="result-card-media result-card-media-vid" src="${currentChunk.data.media.src}" controls></video>`          
                        mediaTypeStatString = `<p class = "result-card-stat result-card-stat-4col result-card-stat-right"><img class = "result-card-stat-img" src = "images/sm/video.webp" type = "image/webp"/><br/><span class = "result-card-stat-name">Video</span></p>`;
                    } else {
                        resultCardMediaString = `<img class = "result-card-media result-card-media-img" src = "${currentChunk.data.media.src}"/>`;
                        mediaTypeStatString = `<p class = "result-card-stat result-card-stat-4col result-card-stat-right"><img class = "result-card-stat-img" src = "images/sm/photo.webp" type = "image/webp"/><br/><span class = "result-card-stat-name">Photo</span></p>`;
                    }
                    
                    processedData.push({
                        type: currentChunk.type,
                        network: currentChunk.network,
                        htmlString: `<div class="result-card result-card-instagram-post">
                            <div class="result-card-main-content">
                                ${resultCardMediaString}
                                <br/>
                                <p class="result-card-text">${currentChunk.data.caption}</p>
                            </div>
                            <div class="result-card-stat-container">
                                <p class = "result-card-stat result-card-stat-4col"><img class = "result-card-stat-img" src = "images/sm/insta.webp" type="image/webp"/><br/><span class = "result-card-stat-name">Instagram</span></p>
                                <p class="result-card-stat result-card-stat-4col"><span class="result-card-stat-value">${
                                currentChunk.data.likeCount
                                }</span> <br /> <span class="result-card-stat-name">Likes</span></p>
                                    <p class="result-card-stat result-card-stat-4col"><span class="result-card-stat-value">${
                                    currentChunk.data.commentCount
                                    }</span> <br /> <span class="result-card-stat-name">Comments</span></p>
                                ${mediaTypeStatString}
                            </div>
                            <a href = "https://instagram.com/p/${currentChunk.data.shortcode}">
                                <div class="result-card-link">
                                    <img src="/images/sm/link.webp" type="image/webp" class="result-card-link-img"/>
                                </div>
                            </a>
                            </div>
                        `
                    });
                }
                resolve(processedData);
            });
        });
    },
    processTwitterTweets: (value) => {
        return new Promise(async (resolve, reject) => {
            let processedData = [];
            fetchTwitterData.fetchTweets(value).then(data => {
                data.forEach(currentChunk => {
                     processedData.push({
                        type: currentChunk.type,
                        network: currentChunk.network,
                        htmlString: `<div class="result-card result-card-twitter-tweet">
                        <div class="result-card-main-content">
                            <p class="result-card-twitter-tweet-username">@${currentChunk.data.username}</p>
                            ${currentChunk.data.media.src.length > 0 ? `<img class="result-card-media" src="${currentChunk.data.media.src}"/>` : ""}
                            <p class="result-card-text">${currentChunk.data.text}</p>
                        </div>
                        <div class="result-card-stat-container">    
                            <p class="result-card-stat result-card-stat-4col"><img class = "result-card-stat-img" src = "/images/sm/twitter.webp" type="image/webp"/><br/><span class = "result-card-stat-name">Twitter</span></p>
                            <p class="result-card-stat result-card-stat-4col"><span class="result-card-stat-value">${currentChunk.data.favoriteCount}</span> <br /> <span class="result-card-stat-name">Favorites</span></p>
                            <p class="result-card-stat result-card-stat-4col"><span class="result-card-stat-value">${currentChunk.data.replyCount}</span> <br /> <span class="result-card-stat-name">Replies</span></p>
                            <p class="result-card-stat result-card-stat-4col result-card-stat-right"><span class="result-card-stat-value">${currentChunk.data.retweetCount}</span> <br /> <span class="result-card-stat-name">Retweets</span></p>
                        </div>
                        <a href="https://twitter.com/${currentChunk.data.screenName}/status/${currentChunk.data.id}">
                            <div class="result-card-link">
                                <img src="/images/sm/link.webp" type="image/webp" class="result-card-link-img"/>
                            </div>
                        </a>
                        </div>`
                    }) 
                });
                resolve(processedData);
            });
        });
    }
}

module.exports = {
    webFeedProcessor
};


