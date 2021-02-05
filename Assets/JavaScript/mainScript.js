// Feature: Initializing a new data base.
// Starts here
var cryptoDB = {};
var cryptoList = ['bitcoin', 'ethereum', 'tether'];
    
for (let i = 0; i < cryptoList.length; i++) {
    cryptoDB[cryptoList[i]] = {
        name: "",
        currentPrice: 0,
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