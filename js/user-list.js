// Variables
const body = document.querySelector("body");
const showMenuButton = document.querySelector(".fa-caret-down");
const logo = document.querySelector(".logo");
const header = document.querySelector("header");
const main = document.querySelector("main");
const navigationMenus = document.querySelector("nav aside");
const navigationMenusList = document.querySelectorAll("nav aside ul li");
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

// Navigation menu list menu
navigationMenusList.forEach((menu, index) => {
  if (index == 0) {
    menu.addEventListener("click", showEditAccountModal);
  } else if (index == 1) {
    menu.addEventListener("click", showcreateUserModal);
  } else if (index == 2) {
    menu.addEventListener("click", logOut);
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

// Edit account
function showEditAccountModal() {
  addOpacityOnHeaderMainFooter();
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
                 <label>Change</label>
                 <select onchange="changeSelect()">
                     <option value="username">Username</option>
                     <option value="password">Password</option>
                 </select>
                 <label>Old username</label>
                 <input type="text">
                 <label>New Username</label>
                 <input type="text">
                 <label>Password</label>
                 <div class="password-container">
                  <input type="password">
                  <span onclick="showPassword()"><i class="fas fa-eye"></i></span>
                </div>
             </div>
             <div class="edit-account-submit-button">
                 <button onclick="editAccount()">Submit</button>
             </div>
         </div>
     </div>
 </div>
</div>`;
  body.insertBefore(editAccountModal, header);
  editAccountModal.style.display = "flex";
  addModalOpacity();
}

// Function for changing change field in edit account
function changeSelect() {
  let editAccountModal = document.querySelector(".edit-account");
  let changeSelectContainer = document.querySelector(
    ".edit-account-input-fields select"
  );
  let editAccountInputFields = document.querySelector(
    ".edit-account-input-fields"
  );

  if (changeSelectContainer.value == "password") {
    editAccountModal.style.height = "28rem";
    editAccountInputFields.innerHTML = `
    <label>Change</label>
      <select onchange="changeSelect()">
        <option value="password">Password</option>
        <option value="username">Username</option>
      </select>
    <label>Username</label>
    <input type="text">
    <label>Old Password</label>
    <div class="password-container">
      <input type="password">
      <span onclick="showPassword()"><i class="fas fa-eye"></i></span>
    </div>
    <label>New Password</label>
    <div class="password-container">
      <input type="password">
      <span onclick="showPassword()"><i class="fas fa-eye"></i></span>
    </div>
    <label>Confirm Password</label>
    <div class="password-container">
      <input type="password">
      <span onclick="showPassword()"><i class="fas fa-eye"></i></span>
    </div>
    `;
  } else {
    editAccountModal.style.height = "25rem";
    editAccountInputFields.innerHTML = `
    <label>Change</label>
     <select onchange="changeSelect()">
      <option value="username">Username</option>
      <option value="password">Password</option>
     </select>
     <label>Old username</label>
     <input type="text">
     <label>New Username</label>
     <input type="text">
     <label>Password</label>
     <div class="password-container">
      <input type="password">
      <span onclick="showPassword()"><i class="fas fa-eye"></i></span>
    </div>
    `;
  }
}

// Show password
function showPassword() {
  let passwordInputFields = document.querySelectorAll(
    ".password-container input"
  );
  let viewPasswordButtons = document.querySelectorAll(
    ".password-container span"
  );

  viewPasswordButtons.forEach((button, index) => {
    //If event path is not equal to view password button return or stop the loop
    if (button != event.path[1]) {
      return;
    }
    if (button.innerHTML == '<i class="fas fa-eye"></i>') {
      button.innerHTML = '<i class="fas fa-eye-slash"></i>';
      passwordInputFields[index].setAttribute("type", "text");
    } else if (button.innerHTML == '<i class="fas fa-eye-slash"></i>') {
      button.innerHTML = '<i class="fas fa-eye"></i>';
      passwordInputFields[index].setAttribute("type", "password");
    }
  });
}

function editAccount() {
  showLoader("Saving changes...");
  addOpacityOnHeaderMainFooter();
}

// Show create user modal
function showcreateUserModal() {
  addOpacityOnHeaderMainFooter();
  navigationMenus.classList.remove("show");
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
                  <button onclick="createUser()">Submit</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  body.insertBefore(createUserModal, header);
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
  removeOpacityOnHeaderMainFooter();
  setTimeout(() => {
    let modal = document.querySelector(".modal-container");
    document.body.removeChild(modal);
  }, 200);
}

function userList() {
  window.location.replace("user-list.html");
}

// Function for adding opacity to header, main and footer
function addOpacityOnHeaderMainFooter() {
  header.style.opacity = 0.5;
  main.style.opacity = 0.5;
  footer.style.opacity = 0.5;
}

// Function for removing opacity to header, main and footer
function removeOpacityOnHeaderMainFooter() {
  header.style.opacity = 1;
  main.style.opacity = 1;
  footer.style.opacity = 1;
}

// Function for creating user
function createUser() {
  showLoader("Creating user...");
  addOpacityOnHeaderMainFooter();
}

// Function for showing loader
function showLoader(label) {
  let modalContainer = document.querySelector(".modal-container");
  let loaderContainer = document.createElement("section");
  loaderContainer.setAttribute("class", "spinning-loader-container");
  loaderContainer.innerHTML = `<div class="spinning-loader-content">
  <div class="lds-spinner">
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
      <div></div>
  </div>
  <div class="loader-title">
      <h1>${label}</h1>
  </div>
</div>
  `;

  body.insertBefore(loaderContainer, modalContainer);
  loaderContainer.style.display = "flex";
  closeModal();
  addSpinningLoaderOpacity();
}

//Add opacity for spinning loader
function addSpinningLoaderOpacity() {
  setTimeout(() => {
    let spinningLoader = document.querySelector(".spinning-loader-container");
    spinningLoader.style.opacity = "1";
  }, 100);
}

// Logout
function logOut() {
  navigationMenus.classList.remove("show");
  console.log("Logout");
}
