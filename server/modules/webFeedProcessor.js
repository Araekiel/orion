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

        const processedData = {
            mainData: instagramUsersObj.verified.concat(shuffleArray(instagramPosts.concat(twitterTweets))),
            unverifiedUsers: instagramUsersObj.unverified
        };
    
        //Following piece of code will change over time
        if(processedData.mainData.length < 1) {
            if(processedData.unverifiedUsers.length > 0) {
                processedData.mainData = processedData.unverifiedUsers;
            } else {
                reject();
            }
        }

        resolve(processedData);
    });   
}

const processData = {
    processInstagramUsers: (value) => {
        return new Promise(async (resolve, reject) => {
            let data = await fetchInstagramData.fetchUsers(value);
            resolve(data);
        });
    },
    processInstagramPosts: (value) => {
        return new Promise(async (resolve, reject) => {
            let data = await fetchInstagramData.fetchPosts(value);
            resolve(data);
        })
    },
    processTwitterTweets: (value) => {
        return new Promise(async (resolve, reject) => {
            let data = await fetchTwitterData.fetchTweets(value);
            resolve(data);
        });
    }
}

module.exports = {
    webFeedProcessor
};