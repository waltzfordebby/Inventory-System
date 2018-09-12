// Variables
const showMenuButton = document.querySelector(".fa-caret-down");
const logo = document.querySelector(".logo");
const navigationMenus = document.querySelector("nav aside");
const searchSection = document.querySelector(".table-search input");

// Logo button
logo.addEventListener("click", gotoDashboard);

// Function to redirect to dashboard
function gotoDashboard() {
  window.location.replace("super-admin.html");
}

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

// Toggle search icon on focus and focusout
searchSection.addEventListener("focus", removeSearchIcon);
searchSection.addEventListener("focusout", addSearchIcon);

function removeSearchIcon() {
  searchSection.style.background = "none";
}

function addSearchIcon() {
  if (searchSection.value == "") {
    searchSection.style.background =
      "url(../images/icons8-search-filled-30.png) no-repeat center";
  } else if (searchSection.value != "") {
    searchSection.style.background = "none";
  }
}
