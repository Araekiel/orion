// const { TweetStream, getUserProfile } = require("scrape-twitter");

const fetchTwitterData = {
    fetchTweets: (value) => {
        return new Promise((resolve, reject) => {
            resolve([]);
        });
    },
    fetchUsers: (value) => {
        return new Promise((resolve, reject) => {
            // let fetchedData = [];
            // let dataStream = new ListStream(username=value, list="top", {count: 5});
            // dataStream.on("data", (dataChunk) => {
            //     fetchedData.push(dataChunk);
            // });
            // dataStream.on("end", () => {
            //     resolve(fetchedData);
            // });
            // dataStream.on("err", (err) => {
            //     reject(err);
            // })
            getUserProfile(value).then(data => {
                resolve(data);
            }).catch(err => {
                reject(err);
            });
        });
    }   
};

module.exports = {
    fetchTwitterData
};

