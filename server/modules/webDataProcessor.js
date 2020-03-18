const { fetchInstagramData } = require("./fetchInstagramData.js");
const { fetchTwitterData } = require("./fetchTwitterData.js");

const { shuffleArray } = require("../utils/shuffleArray.js");

const webDataProcessor = async (value) => {
    return new Promise(async (resolve, reject) => {
        const [posts, usersObj, tweets] = await Promise.all([
            fetchInstagramData.fetchPosts(value),
            fetchInstagramData.fetchUsers(value),
            fetchTwitterData.fetchTweets(value)
        ]);

        const processedData = {
            mainData: usersObj.verified.concat(shuffleArray(posts.concat(tweets))),
            unverifiedUsers: usersObj.unverified
        };
    
        //Following piece of code will change over time
        if(processedData.mainData.length < 1) {
            if(finalData.unverifiedUsers.length > 0) {
                processedData.mainData = processedData.unverifiedUsers;
            } else {
                reject();
            }
        }

        resolve(processedData);
    });   
}

module.exports = {
    webDataProcessor
};