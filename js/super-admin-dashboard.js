// Variables
const showMenuButton = document.querySelector(".fa-caret-down");
const navigationMenus = document.querySelector("nav aside");
const dashboardMenus = document.querySelectorAll(
  ".dashboard-menus-container div"
);

// Show menu button
showMenuButton.addEventListener("click", showMenus);

//Show menu function
function showMenus() {
  navigationMenus.classList.toggle("show");
}

//Hide menu on click outside
document.addEventListener("click", event => {
  if (
    event.target.closest("nav aside") ||
    event.target.closest(".fa-caret-down")
  ) {
    return;
  } else if (!event.target.closest("nav aside")) {
    navigationMenus.classList.remove("show");
  }
});

// Dashboard menus
dashboardMenus.forEach((menu, index) => {
  if (index == 0) {
    menu.addEventListener("click", createUser);
  } else if (index == 1) {
    menu.addEventListener("click", userList);
  }
});

function createUser() {
  console.log("Create user");
}

function userList() {
  window.location.replace("user-list.html");
}
