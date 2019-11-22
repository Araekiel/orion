const request = require("request");

const fetchTwitterData = {
    fetchTweets: query => {
        return new Promise((resolve, reject) => {
            let finalData = [];
            for(let i = 0; i < 10; i++) {
                finalData.push({
                    type: "tweet",
                    website: "twitter",
                    htmlString: `<div class="result-card">
                    <p>Tweet</p>
                    </div>`
                });
            }
            resolve(finalData);
        });
    }
};

module.exports = {
    fetchTwitterData
};