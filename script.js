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
  constructor(username, password) {
    this.userName = username;
    this.password = password;
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

function newUser() {
  const name = $(".createUsername").val();
  console.log(users);
  const password = $(".createPassword").val();
  if (name && password) {
    if (checkUserName(name)) return;
    else {
      ///////////////still storing values dio cane
      const newOne = new User(name, password);
      users.push(newOne);
      localStorage.users = JSON.stringify(users);
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
  console.log(`${currentUser.userName} just logged in`);
}

function checkUserName(user) {
  let check = users.some(
    (el) => el.userName.toLowerCase() === user.toLowerCase()
  );
  console.log(check);
}

$(".login").on("click", login);
$(".registerBtn").on("click", newUser);
$(".registerBtnFirst").on("click", showRegister);
$(".loginBtnFirst").on("click", showLogin);
$(window).on("load", loadPage);
