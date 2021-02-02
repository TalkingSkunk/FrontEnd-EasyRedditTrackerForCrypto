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

function loadPage() {
  if (localStorage.users) {
    users = JSON.parse(localStorage.users);
  } else localStorage.users = JSON.stringify(users);
}

function storeUser(name, password) {
  const newOne = new User(name, password);
  users.push(newOne);
  localStorage.users = JSON.stringify(users);
}

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
  } else alert("insert a valid input");
}

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
    clearFIelds();
  } else alert("user not found");
}

function checkUserName(user) {
  const el = (el) => el.userName.toLowerCase() === user.toLowerCase();
  let check = users.some(el);
  return check;
}

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
