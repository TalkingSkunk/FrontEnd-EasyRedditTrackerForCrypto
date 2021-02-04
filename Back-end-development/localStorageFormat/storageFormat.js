// Just an example how local storage is formated

// Using Bitcoin as an example:
let localKey = 'bitcoin'

let localItem = {
    name: 'bitcoin',
    price: 30000,
    upTrending: true,
    icon: "http:......png",
    reddit1: {
        title: "bitcoin is trending today blah blah",
        selfText: "whatever whatever whatever...",
        url: "http:.....reddit.....",
    }
}

//Saving to local storage:
localStorage.setItem(localKey, JSON.stringify(localItem));

//Extracting from local storage:
let jsonResult = localStorage.getItem(localKey);
let objectResult = JSON.parse(jsonResult);