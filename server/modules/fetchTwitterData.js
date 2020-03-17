const request = require("request");
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
                        <p class="result-card-stat result-card-stat-4col"><span class="result-card-stat-value">${dataChunk.replyCount}</span> <br /> <span class="result-card-stat-name">Replies</span></p>
                        <p class="result-card-stat result-card-stat-4col result-card-stat-right"><span class="result-card-stat-value">${dataChunk.retweetCount}</span> <br /> <span class="result-card-stat-name">Retweets</span></p>
                        <p class="result-card-stat result-card-stat-4col result-card-stat-right"><span class="result-card-stat-value">${dataChunk.favoriteCount}</span> <br /> <span class="result-card-stat-name">Favourites</span></p>
                    </div>
                    <a href="https://twitter.com/${dataChunk.screenName}/status/${dataChunk.id}">
                        <div class="result-card-link">
                            <img src="/images/sm/link.png" type="image/png" class="result-card-link-img"/>
                        </div>
                    </a>
                    </div>`
                });
            });
            // fetchTwitterData.fetchUsers(value);
            resolve(finalData);
        });
    },
    // fetchUsers: (value) => {
    //     return new Promise((resolve, reject) => {
    //         let finalData = [];
    //         let dataStream = new ListStream(username=value, list="", {count: 10});
    //         dataStream.on('data', dataChunk => {
    //             console.log(dataChunk);
    //         }).on("end", () => {
    //             console.log("end");
    //         });
    //     });
    // }
};

module.exports = {
    fetchTwitterData
};

// let url = " https://api.twitter.com/2/search/adaptive.json?simple_quoted_tweets=true&q=india&count=100&query_source=typed_query&pc=1&spelling_corrections=1&ext=mediaStats%2ChighlightedLabel%2CcameraMoment";
            // let options = {
            //     url: url,
            //     headers: {
            //         'authorization': "Bearer AAAAAAAAAAAAAAAAAAAAANRILgAAAAAAnNwIzUejRCOuH5E6I8xnZz4puTs%3D1Zv7ttfk8LF81IUq16cHjhLTvJu4FA33AGWWjCpTnA",
            //         // 'x-guest-token': "1205724124275867650"
            //     },
            //     json: true
            // };
            // request(options, (err, response, body) => {
            //     console.log(body);
            //     resolve([]);
            // });


             // let finalData = [];
            // finalData.push({
            //     type: "tweet",
            //     website: "twitter",
            //     htmlString: `<div class="result-card result-card-twitter-tweet">
            //     <div class="result-card-main-content">
            //         <p class="result-card-twitter-tweet-username">@KSSBro</p>
            //         <p class="result-card-text">Lorem ipsum dolor sit amet, consectetur adipiscing elit. Morbi quis nulla quis mi elementum rhoncus sed nec sapien. Donec a leo ornare, accumsan ante quis, commodo nulla. Proin scelerisque lacus in lacinia facilisis. Nulla facilisi. Vivamus nisi turpis, pretium venenatis mattis a, pharetra ut magna. Duis pulvinar massa lobortis, placerat nisl bibendum, ullamcorper nunc. Curabitur vehicula placerat vulputate. Maecenas ut lorem vel eros interdum sollicitudin.</p>
            //     </div>
            //     <div class="result-card-stat-container">    
            //         <p class="result-card-stat result-card-stat-3col"><img class = "result-card-stat-img" src = "/images/sm/twitter.png" type="image/png"/><br/><span class = "result-card-stat-name">Twitter</span></p>
            //         <p class="result-card-stat result-card-stat-3col"><span class="result-card-stat-value">1000</span> <br /> <span class="result-card-stat-name">Likes</span></p>
            //         <p class="result-card-stat result-card-stat-3col result-card-stat-right"><span class="result-card-stat-value">1000</span> <br /> <span class="result-card-stat-name">Retweets</span></p>
            //     </div>
            //     <a href = "#">
            //         <div class="result-card-link">
            //             <img src="/images/sm/link.png" type="image/png" class="result-card-link-img"/>
            //         </div>
            //     </a>
            //     </div>`
            // });