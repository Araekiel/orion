const { ListStream, TweetStream } = require("scrape-twitter");

const fetchTwitterData = {
    fetchTweets: (value) => {
        return new Promise((resolve, reject) => {
            let finalData = [];
            let dataStream = new TweetStream(query=value, type="top", {count:20}); 
            dataStream.on('data', (dataChunk) => {
                finalData.push({
                    type: "tweet",
                    network: "twitter",
                    htmlString: `<div class="result-card result-card-twitter-tweet">
                    <div class="result-card-main-content">
                        <p class="result-card-twitter-tweet-username">@${dataChunk.screenName}</p>
                        ${dataChunk.images.length > 0 ? `<img class="result-card-media" src="${dataChunk.images[0]}"/>` : ""}
                        <p class="result-card-text">${dataChunk.text}</p>
                    </div>
                    <div class="result-card-stat-container">    
                        <p class="result-card-stat result-card-stat-4col"><img class = "result-card-stat-img" src = "/images/sm/twitter.png" type="image/png"/><br/><span class = "result-card-stat-name">Twitter</span></p>
                        <p class="result-card-stat result-card-stat-4col"><span class="result-card-stat-value">${dataChunk.favoriteCount}</span> <br /> <span class="result-card-stat-name">Favourites</span></p>
                        <p class="result-card-stat result-card-stat-4col"><span class="result-card-stat-value">${dataChunk.replyCount}</span> <br /> <span class="result-card-stat-name">Replies</span></p>
                        <p class="result-card-stat result-card-stat-4col result-card-stat-right"><span class="result-card-stat-value">${dataChunk.retweetCount}</span> <br /> <span class="result-card-stat-name">Retweets</span></p>
                    </div>
                    <a href="https://twitter.com/${dataChunk.screenName}/status/${dataChunk.id}">
                        <div class="result-card-link">
                            <img src="/images/sm/link.png" type="image/png" class="result-card-link-img"/>
                        </div>
                    </a>
                    </div>`
                });
            });
            resolve(finalData);
        });
    },
};

module.exports = {
    fetchTwitterData
};

