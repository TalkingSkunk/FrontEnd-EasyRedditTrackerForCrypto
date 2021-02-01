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
let currentUser;

class User {
  constructor(username, password, saved) {
    this.userName = username;
    this.password = password;
    this.saved = [];
  }
}

function showLogin() {
  $(".firstSelection").addClass("d-none");
  $(".login").removeClass("d-none");
}

function showRegister() {
  $(".firstSelection").addClass("d-none");
  $(".register").removeClass("d-none");
}

function loadPage() {
  if (localStorage.users) {
    users = JSON.parse(localStorage.users);
  } else localStorage.users = JSON.stringify(users);
}

function storeUser(name, password) {
  const newOne = new User(name, password);
  users.push(newOne);
  console.log(users);
  console.log(newOne);
  localStorage.users = JSON.stringify(users);
}

function newUser() {
  const name = $(".createUsername").val();
  const password = $(".createPassword").val();
  console.log(name, password);
  if (name && password) {
    let check = checkUserName(name);
    console.log(check);
    if (check) {
      console.log(`checkUser is true`);
      return;
    } else {
      console.log(`checkUser is false`);
      storeUser(name, password);
    }
  } else alert("insert a valid input");
}

function login() {
  let username = $(".username").val();
  let password = $(".password").val();
  [currentUser] = users.filter(
    (el) =>
      el.password == password &&
      el.userName.toLowerCase() === username.toLowerCase()
  );
  if (currentUser) console.log(`${currentUser.userName} just logged in`);
  else alert("user not found");
}

function checkUserName(user) {
  const el = (el) => el.userName.toLowerCase() === user.toLowerCase();
  let check = users.some(el);
  return check;
}

$(".loginBtn").on("click", login);
$(".registerBtn").on("click", newUser);
$(".registerBtnFirst").on("click", showRegister);
$(".loginBtnFirst").on("click", showLogin);
$(window).on("load", loadPage);
