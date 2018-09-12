// Variables
const showMenuButton = document.querySelector(".fa-caret-down");
const menus = document.querySelector("nav aside");

// Show menu button
showMenuButton.addEventListener("click", showMenus);

//Show menu function
function showMenus() {
  menus.classList.toggle("show");
}

//Hide menu on click outside
document.addEventListener("click", event => {
  if (
    event.target.closest("nav aside") ||
    event.target.closest(".fa-caret-down")
  ) {
    return;
  } else if (!event.target.closest("nav aside")) {
    menus.classList.remove("show");
  }
});
