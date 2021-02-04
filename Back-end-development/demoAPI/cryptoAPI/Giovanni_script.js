let users = [
  {
    userName: "Shiva",
    password: 1111,
    saved: [],
  },
  {
    userName: "Sam",
    password: 2222,
    saved: [],
  },
  {
    userName: "Max",
    password: 3333,
    saved: [],
  },
  {
    userName: "Richard",
    password: 4444,
    saved: [],
  },
  {
    userName: "Giovanni",
    password: 5555,
    saved: [],
  },
];
//points to the obj
let onlineNow;

class User {
  constructor(username, password, saved) {
    this.userName = username;
    this.password = password;
    this.saved = [];
  }
}

function loadPage() {
  if (localStorage.users) {
    users = JSON.parse(localStorage.getItem("users"));
    console.log(users);
  } else localStorage.setItem("users", JSON.stringify(users));

  if (localStorage.onlineNow) {
    onlineNow = JSON.parse(localStorage.getItem("onlineNow"));
    console.log(onlineNow.userName);
    $("#userName").html(onlineNow.userName);
  }
}
////STORE USER
function storeUser(name, password) {
  const newOne = new User(name, password);
  users.push(newOne);
  localStorage.setItem("users", JSON.stringify(users));
}
////CREATE NEW USER
function newUser(e) {
  e.preventDefault();
  const name = $(".createUsername").val();
  const password = $(".createPassword").val();
  console.log(name, password);
  if (name && password) {
    let check = checkUserName(name);
    if (check) {
      alert("UserName already taken!");
      return;
    } else {
      storeUser(name, password);
      clearFIelds();
      closeModal();
    }
  } else alert("Please insert a valid input");
}
//////LOGIN LOGIC
function login(e) {
  e.preventDefault();
  let username = $(".username").val();
  let password = $(".password").val();
  [currentUser] = users.filter(
    (el) =>
      el.password == password &&
      el.userName.toLowerCase() === username.toLowerCase()
  );
  if (currentUser) {
    console.log(`${currentUser.userName} just logged in`);
    onlineNow = currentUser;
    localStorage.setItem("onlineNow", JSON.stringify(onlineNow));
    clearFIelds();
    window.location.assign("redditResults.html");
  } else alert("User not found");
}
/////////////
function checkUserName(user) {
  const el = (el) => el.userName.toLowerCase() === user.toLowerCase();
  let check = users.some(el);
  return check;
}
/////clear input fields
function clearFIelds() {
  $(".username").val("");
  $(".password").val("");
  $(".createUsername").val("");
  $(".createPassword").val("");
}

function closeModal() {
  $("#exampleModal").modal("hide");
}

$(".loginBtn").on("click", login);
$(".registerBtn").on("click", newUser);
$(window).on("load", loadPage);

function saveChanges() {
  let username = $(".createUsername").val();
  let password = $(".createPassword").val();
  console.log(username, password);
  clearFIelds();
  closeModal();
}

////logout function
function logOut(e) {
  e.preventDefault();
  onlineNow = {};
  localStorage.removeItem("onlineNow");
  window.location.assign("login.html");
}

$("#logoutBtn").on("click", logOut);
// Scripts for redditResults.html
// Starts here,

// Fetch function that returns a promise which contains the reddit data we want.
const searchReddit = (searchTerm, searchLimit, sortBy) => {
  return fetch(
    `https://www.reddit.com/search.json?q=${searchTerm}&sort=${sortBy}&limit=${searchLimit}`
  )
    .then((response) => response.json())
    .then((data) => data.data.children.map((data) => data.data))
    .catch((err) => console.log(err));
};

// Helper function that is used to truncate the self text contained in reddit JSON data.
function truncateText(text, limit) {
  const shortened = text.indexOf(" ", limit);
  if (shortened == -1) return text;
  return text.substring(0, shortened);
}

// Assigning click event listener to cryto button 1, assumed to be bitcoin.
const crypto1 = "bitcoin";
const searchLimit = 25;

let crypto1Btn = document.getElementById("crypto1Btn");
crypto1Btn.addEventListener("click", (event) => {
  searchReddit(crypto1, searchLimit, "latest").then((results) => {
    let output = '<div class="card-columns">';
    // Loop through posts
    results.forEach((post) => {
      // Check for image
      const img = post.preview
        ? post.preview.images[0].source.url
        : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";

      output += `
            <div class="col-8 card border-dark mb-3" style="max-width: 30rem;">
                <img src="${img}" class="card-img-top" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext, 100)}</p>
                    <a href="${post.url}" class="btn btn-primary">Read more</a>
                </div>
            </div>
            `;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  event.preventDefault();
});

// Assigning click event listener to cryto button 2, assumed to be ethereum.
const crypto2 = "ethereum";

let crypto2Btn = document.getElementById("crypto2Btn");
crypto2Btn.addEventListener("click", (event) => {
  searchReddit(crypto2, searchLimit, "latest").then((results) => {
    let output = '<div class="card-columns">';
    // Loop through posts
    results.forEach((post) => {
      // Check for image
      const img = post.preview
        ? post.preview.images[0].source.url
        : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";

      output += `
            <div class="col-8 card border-dark mb-3" style="max-width: 30rem;">
                <img src="${img}" class="card-img-top" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext, 100)}</p>
                    <a href="${post.url}" class="btn btn-primary">Read more</a>
                </div>
            </div>
            `;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  event.preventDefault();
});

// Assigning click event listener to cryto button 1, assumed to be bitcoin.
const crypto3 = "tether";

let crypto3Btn = document.getElementById("crypto3Btn");
crypto3Btn.addEventListener("click", (event) => {
  searchReddit(crypto3, searchLimit, "latest").then((results) => {
    let output = '<div class="card-columns">';
    // Loop through posts
    results.forEach((post) => {
      // Check for image
      const img = post.preview
        ? post.preview.images[0].source.url
        : "https://cdn.comparitech.com/wp-content/uploads/2017/08/reddit-1.jpg";

      output += `
            <div class="col-8 card border-dark mb-3" style="max-width: 30rem;">
                <img src="${img}" class="card-img-top" alt="Card image cap">
                <div class="card-body">
                    <h5 class="card-title">${post.title}</h5>
                    <p class="card-text">${truncateText(post.selftext, 100)}</p>
                    <a href="${post.url}" class="btn btn-primary">Read more</a>
                </div>
            </div>
            `;
    });
    output += "</div>";
    document.getElementById("results").innerHTML = output;
  });

  event.preventDefault();
});

// Ends here.

//////script for Crypto currency

async function getDataCrypto() {
  var input = document.querySelector(".form-control").value;
  const url = `https://api.coingecko.com/api/v3/coins/markets?vs_currency=cad&ids=${input}`;
  const [result] = await fetch(url).then((res) => res.json());

  //   const currencies = await fetch(
  //     `https://api.coingecko.com/api/v3/simple/supported_vs_currencies`
  //   ).then((res) => res.json());
  //   console.log(currencies);

  const name = result.id;
  const maxVal = result.high_24h;
  const minVal = result.low_24h;
  const logo = result.image;

  storeInputs(name);
  /////////////append a new div after the previous one
  const node = document.createElement("div");
  document.querySelector(".displayCrypto").appendChild(node);
  // console.log(node);
  node.innerHTML = `<div class="cryptoItem"><div class="logo"><img src=${logo}></div>
                    <p class="name">${name.toUpperCase()}</p>
                    <p class="values">Max value last 24H: <span id="max">${maxVal}</span> CAD</p>
                    <p class="values">Min value last 24H: <span id="min">${minVal}</span> CAD</p></div>`;

  document.querySelector(".displayCrypto").style = `display: block;`;
  // console.log(result, name, maxVal, minVal);
}

function storeInputs(input) {
  ///////loop over the array of users and find the correct element
  for (let i = 0; i < users.length; i++) {
    if (users[i].userName === onlineNow.userName) {
      if (users[i].saved.includes(input)) return;
      users[i].saved.push(input);
      console.log(users[i]);
      localStorage.users = JSON.stringify(users);
    }
  }
  console.log(users);
  // localStorage.setItem("users", users);
  onlineNow = JSON.parse(localStorage.getItem("onlineNow"));
  onlineNow.saved.push(input);
  localStorage.setItem("onlineNow", JSON.stringify(onlineNow));
}
// alert("test");
document
  .querySelector(".search-domain")
  .addEventListener("click", getDataCrypto);
