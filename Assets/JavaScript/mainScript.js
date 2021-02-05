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
            name: "",
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

