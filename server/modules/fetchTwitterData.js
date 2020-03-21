const { ListStream, TweetStream } = require("scrape-twitter");

const fetchTwitterData = {
    fetchTweets: (value) => {
        return new Promise((resolve, reject) => {
            let fetchedData = [];
            let dataStream = new TweetStream(query=value, type="top", {count:20}); 
            dataStream.on('data', (dataChunk) => {
                fetchedData.push({
                    type: "tweet",
                    network: "twitter",
                    data: {
                        id: dataChunk.id,
                        username: dataChunk.screenName,
                        media: {
                            src: dataChunk.images.length > 0 ? dataChunk.images[0] : ""
                        },
                        text: dataChunk.text,
                        favoriteCount: dataChunk.favoriteCount,
                        replyCount: dataChunk.replyCount,
                        retweetCount: dataChunk.retweetCount
                    }
                });
            });
            dataStream.on("end", () => {
                resolve(fetchedData);
            });
            dataStream.on("error", err => {
                reject(err);
            });
        });
    },
};

module.exports = {
    fetchTwitterData
};

