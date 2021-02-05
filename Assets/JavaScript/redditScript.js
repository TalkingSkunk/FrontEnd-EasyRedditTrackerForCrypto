// This fucntion calls on reddit API and writes data into local storage
const searchReddit = async (searchTerm, searchLimit, sortBy) => {
    await fetch(`https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`)
    .then(response => response.json())
    .then(data => data.data.children.map(data => data.data))
    .then(results => {
        let cryptoObj = cryptoDB[searchTerm];
        for (let i = 0; i < 100; i++) {
            let redditObj = cryptoObj[i];
            let redditNum = `reddit${i}`
            cryptoObj[redditNum].name = searchTerm;
            cryptoObj[redditNum].title = results[i].title;
            cryptoObj[redditNum].url = results[i].url
        }
    })
    .catch(err => console.log(err));
};


//Test: 
const cryptoDB = {
    bitcoin: {
        currentPrice: 35000,
        percentageChange: 2,
        reddit1:{
            name: "BTC",
            title: "bitcoin is gone up like crazy today!",
            url: "https://bitcoinweeee.com"
        }
    }
}

