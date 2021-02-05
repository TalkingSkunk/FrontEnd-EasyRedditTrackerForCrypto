// Feature: Initializing a new data base.
// Starts here
var cryptoDB = {};
var cryptoList = ['bitcoin', 'ethereum', 'tether', 'polkadot', 'cardano', 'litecoin', 'chainlink'];
    
for (let i = 0; i < cryptoList.length; i++) {
    cryptoDB[cryptoList[i]] = {
        id: "",
        symbol: "",
        name: "",
        image: "",
        priceChange: "",
        percentChange: "",
        lastUpdated: ""
    }
}

const emptyReddits = (coin) => {
    for (let i = 0; i < 100; i++) {
        cryptoDB[coin][`reddit${i+1}`] = {
            title: "",
            url: ""
        }
    }
}

cryptoList.forEach(coin => emptyReddits(coin));
// Ends here

// Crpto API call
// Start here
async function getDataCrypto(crypto) {
    const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&ids=${crypto}`;
    const [result] = await fetch(url).then((res) => res.json());
    
    let cryptoObj = cryptoDB[crypto];
    cryptoObj.id = result.id;
    cryptoObj.symbol = result.symbol;
    cryptoObj.name = result.name;
    cryptoObj.image = result.image;
    cryptoObj.priceChange= result.price_change_24h.toFixed(2);
    cryptoObj.percentChange = result.price_change_percentage_24h.toFixed(2);
    cryptoObj.lastUpdated = result.last_updated;
};

cryptoList.forEach(coin => getDataCrypto(coin));
// End here

// Reddit API call
// Start here
const searchReddit = (crypto, searchLimit, sortBy) => {
    return fetch(`https://www.reddit.com/search.json?q=${crypto}&sort=${sortBy}&limit=${searchLimit}`)
    .then(response => response.json())
    .then(data => data.data.children.map(data => data.data))
    .catch(err => console.log(err));
};

const truncateText = (text, limit) => {
    const shortened = text.indexOf(" ", limit);
    if (shortened == -1) return text;
    return text.substring(0, shortened);
}

const getDataReddit = (crypto) => {
    searchReddit(crypto, 100, 'latest').then
    (results => {
        let cryptoObj = cryptoDB[crypto];
        for (let i = 0; i < results.length; i++) {
            let data = results[i];
            let redditObj = cryptoObj[`reddit${i+1}`];
            redditObj.title = data.title;
            redditObj.url = data.url;
        }
    });
};

cryptoList.forEach(coin => getDataReddit(coin));
// End here

// Create a reddit pool from data object.
// Start here
var redditPool = [];

const pushToPool = (crypto) => {
    let cryptoObj = cryptoDB[crypto];
    for (let i = 0; i < 100; i++) {
        let redditObj = cryptoObj[`reddit${i+1}`];
        let newObj = {};
        newObj.name = cryptoObj.name;
        newObj.icon = cryptoObj.image;
        newObj.date = cryptoObj.lastUpdated;
        newObj.priceChange = cryptoObj.priceChange;
        newObj.percentChange = cryptoObj.percentChange;
        newObj.title = redditObj.title;
        newObj.url = redditObj.url;
        redditPool.push(newObj);
    }
}


cryptoList.forEach(coin => pushToPool(coin));
// End here
