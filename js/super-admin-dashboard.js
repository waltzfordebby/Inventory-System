// Variables
const body = document.querySelector("body");
const showMenuButton = document.querySelector(".fa-caret-down");
const navigationMenus = document.querySelector("nav aside");
const navigationMenusList = document.querySelectorAll("nav aside ul li");
const main = document.querySelector("main");
const dashboardMenus = document.querySelectorAll(
  ".dashboard-menus-container div"
);

// Show menu button
showMenuButton.addEventListener("click", showMenus);

//Show menu function
function showMenus() {
  navigationMenus.classList.toggle("show");
}

//Hide menu on outside click
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

// Navigation menu list menu
navigationMenusList.forEach((menu, index) => {
  if (index == 0) {
    menu.addEventListener("click", editAccount);
  } else if (index == 1) {
    menu.addEventListener("click", logOut);
  }
});

// Edit account
function editAccount() {
  navigationMenus.classList.remove("show");
  let editAccountModal = document.createElement("section");
  editAccountModal.setAttribute("class", "modal-container");
  editAccountModal.innerHTML = `
 <div class="modal edit-account">
 <div class="modal-content">
     <div class="close-button">
         <button onclick="closeModal()"><i class="fas fa-times-circle fa-2x"></i></button>
     </div>
     <div class="edit-account-container">
         <div class="edit-account-content">
             <div class="edit-account-title">
                 <h1><i class="fas fa-user-cog"></i> Edit Account</h1>
             </div>
             <div class="edit-account-input-fields">
                 <label for="">Change</label>
                 <select name="" id="">
                     <option value="username">Username</option>
                     <option value="password">Password</option>
                 </select>
                 <label for="">Old username</label>
                 <input type="text">
                 <label for="">New Username</label>
                 <input type="text">
                 <label for="">Password</label>
                 <input type="password">
             </div>
             <div class="edit-account-submit-button">
                 <button>Submit</button>
             </div>
         </div>
     </div>
 </div>
</div>`;
  body.insertBefore(editAccountModal, main);
  editAccountModal.style.display = "flex";
  addModalOpacity();
}

function logOut() {
  navigationMenus.classList.remove("show");
  console.log("Logout");
}

// Dashboard menus
dashboardMenus.forEach((menu, index) => {
  if (index == 0) {
    menu.addEventListener("click", createUser);
  } else if (index == 1) {
    menu.addEventListener("click", userList);
  }
});

// Show create user modal
function createUser() {
  let createUserModal = document.createElement("section");
  createUserModal.setAttribute("class", "modal-container");
  createUserModal.innerHTML = `<div class="modal create-user">
  <div class="modal-content">

      <div class="close-button">
          <button onclick="closeModal()"><i class="fas fa-times-circle fa-2x"></i></button>
      </div>

      <div class="create-user-container">
          <div class="create-user-content">
              <div class="create-user-title">
                  <h1><i class="fas fa-user-plus"></i> Create User</h1>
              </div>

              <div class="create-user-input-fields">
                  <label>Type Of User</label>
                  <select>
                      <option value="super_admin">Super Admin</option>
                      <option value="admin">Admin</option>
                      <option value="user">User</option>
                  </select>
                  <label>First Name</label>
                  <input type="text">
                  <label>Middle Name</label>
                  <input type="text">
                  <label>Last Name</label>
                  <input type="text">
                  <label>Gender</label>
                  <select>
                      <option value="male">Male</option>
                      <option value="female">Female</option>
                  </select>
                  <label>Birthday</label>
                  <input type="date">
              </div>

              <div class="create-user-submit-button">
                  <button>Submit</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  body.insertBefore(createUserModal, main);
  createUserModal.style.display = "flex";
  addModalOpacity();
}

// Hide modal on outside click
document.addEventListener("click", event => {
  if (event.target.closest(".modal")) {
    return;
  } else if (event.target.closest(".modal-container")) {
    closeModal();
  }
});

//Add modal opacity
function addModalOpacity() {
  setTimeout(() => {
    let modal = document.querySelector(".modal-container");
    modal.style.opacity = "1";
  }, 100);
}

//Close button
function closeModal() {
  let modal = document.querySelector(".modal-container");
  modal.style.opacity = "0";
  removeModalElement();
}

//Remove modal element
function removeModalElement() {
  setTimeout(() => {
    let modal = document.querySelector(".modal-container");
    document.body.removeChild(modal);
  }, 200);
}

function userList() {
  window.location.replace("user-list.html");
}
