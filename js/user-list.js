// Variables
const searchSection = document.querySelector(".table-search input");

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
