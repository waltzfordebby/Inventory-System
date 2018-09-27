// Variables
const date = new Date();
const year = date.getFullYear();
const footer = document.querySelector("footer");

footer.innerHTML = `&copy ${year} Inventory System Beta`;
