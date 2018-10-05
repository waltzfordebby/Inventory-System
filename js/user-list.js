// Variables
const body = document.querySelector("body");
const showMenuButton = document.querySelector(".fa-caret-down");
const logo = document.querySelector(".logo");
const header = document.querySelector("header");
const main = document.querySelector("main");
const navigationMenus = document.querySelector("nav aside");
const navigationMenusList = document.querySelectorAll("nav aside ul li");
const searchSection = document.querySelector(".table-search input");
const tableNotificationContainer = document.querySelector(
  ".table-notification"
);
const table = document.querySelector("tbody");

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

//Hide navigation   menu on click outside
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

// Hide navigation menu on pressing escape
document.addEventListener("keyup", event => {
  if (event.keyCode == 27) {
    try {
      navigationMenus.classList.remove("show");
    } catch {}
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

// ************Navigation menu functions************

// Show edit account modal
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

// Function for changing username or password in edit account
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

// Show password function for edit account
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

// Function for editing the account/change user data to database
function editAccount() {
  showLoader("Saving changes...", "Account successfully updated");
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
                      <option value="Super Admin">Super Admin</option>
                      <option value="Admin">Admin</option>
                      <option value="User">User</option>
                  </select>
                  <label>First Name</label>
                  <input type="text">
                  <label>Middle Name</label>
                  <input type="text">
                  <label>Last Name</label>
                  <input type="text">
                  <label>Sex</label>
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

function createUser() {
  sendDataToDatabase("createUser");
}

// Logout
function logOut() {
  navigationMenus.classList.remove("show");
  showLoader("Logging out...", "", "header");
}

// ************Search table functionalities************

// Toggle search icon on focus and focusout
searchSection.addEventListener("focus", removeSearchIcon);
searchSection.addEventListener("focusout", addSearchIcon);
searchSection.addEventListener("keyup", searchUser);

// Function for removing search icon on search bar when clicked
function removeSearchIcon() {
  searchSection.style.background = "none";
}

// Function for adding search icon on search bar when not focused or search bar has no content
function addSearchIcon() {
  if (searchSection.value == "") {
    searchSection.style.background =
      "url(../images/icons8-search-filled-30.png) no-repeat center";
  } else if (searchSection.value != "") {
    searchSection.style.background = "none";
  }
}

function searchUser() {
  let getUserData = new FormData();
  let getUser = true;
  let emptyTable = `<h1><i class="far fa-meh fa-3x"></i> User list is empty</h1>`;
  let searchNotification = `<h1><i class="far fa-frown-open fa-3x"></i> User doesn't exist.</h1>`;
  let tableHeader = `<tr>
    <th>Type of User</th>
    <th>Name</th>
    <th>Edit</th>
    <th>Delete</th>
    `;
  let tableData = "";
  let tableContent = "";
  let search = searchSection.value.toLowerCase().replace(/\s/g, "");

  getUserData.append("getUser", getUser);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "../php/user-list.php");
  xhr.onload = function() {
    if (this.status == 200) {
      let userList = JSON.parse(this.responseText);

      userList.forEach((user, index) => {
        let userId = user.user_id;
        let typeOfUser = user.type_of_user;
        let firstName = user.first_name;
        let middleName = user.middle_name;
        let lastName = user.last_name;
        let fullNameSearchWithFullMiddleName = `${firstName}${middleName}${lastName}`;
        let fullNameSearchWithOutFullMiddleName = `${firstName}${middleName.substring(
          0,
          1
        )}.${lastName}`;
        let birthday = user.birthday;
        let sex = user.sex;
        let timeOfCreation = user.date_of_creation;
        let dateOfCreation = user.date_of_creation;

        if (
          typeOfUser
            .toLowerCase()
            .replace(/\s/g, "")
            .substring(0, search.length) == search ||
          firstName.toLowerCase().substring(0, search.length) == search ||
          firstName.toLowerCase().indexOf(search) > -1 ||
          middleName.toLowerCase().substring(0, search.length) == search ||
          lastName.toLowerCase().substring(0, search.length) == search ||
          fullNameSearchWithFullMiddleName
            .toLowerCase()
            .replace(/\s/g, "")
            .substring(0, search.length) == search ||
          fullNameSearchWithOutFullMiddleName
            .toLowerCase()
            .replace(/\s/g, "")
            .substring(0, search.length) == search ||
          sex.toLowerCase().substring(0, search.length) == search
        ) {
          let fullName = `${firstName} ${middleName
            .substring(0, 1)
            .toUpperCase()}. ${lastName}`;
          tableData += `<tr>
              <td>${typeOfUser}</td>
              <td title="Click to view user info" onclick="viewUserInfo()">${fullName}</td>
              <td><i onclick="showUpdateUser('${userId}','${typeOfUser}','${firstName}','${middleName}','${lastName}','${sex}','${birthday}')" class="fas fa-user-edit"></i></td>
              <td><i onclick="showDeleteUserModal('${userId}','${typeOfUser}','${firstName}')" class="fas fa-trash"></i></td>
              </tr>`;
        }
      });

      if (tableData != "") {
        tableContent = `${tableHeader}${tableData}`;
        table.innerHTML = `${tableContent}`;
        tableNotificationContainer.innerHTML = ``;
      } else {
        tableNotificationContainer.innerHTML = `${searchNotification}`;
        tableContent = `${tableHeader}`;
        table.innerHTML = `${tableContent}`;
      }
    }
  };
  xhr.send(getUserData);
}

// ************Users table functionalities************

// Insert the users to a table
insertDataToTable();

// Function for inserting users to table
function insertDataToTable() {
  let notification = `<h1><i class="far fa-meh fa-3x"></i> User list is empty</h1>`;
  let getUser = true;
  let getUserData = new FormData();
  let tableHeader = `<tr>
  <th>Type of User</th>
  <th>Name</th>
  <th>Edit</th>
  <th>Delete</th>
  `;
  let tableData = "";
  let tableContent = "";

  getUserData.append("getUser", getUser);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "../php/user-list.php");
  xhr.onload = function() {
    if (this.status == 200) {
      let userList = JSON.parse(this.responseText);
      if (userList != "") {
        userList.forEach((user, index) => {
          let userId = user.user_id;
          let typeOfUser = user.type_of_user;
          let firstName = user.first_name;
          let middleName = user.middle_name;
          let lastName = user.last_name;
          let fullName = `${user.first_name} ${user.middle_name
            .substring(0, 1)
            .toUpperCase()}. ${user.last_name}`;
          let sex = user.sex;
          let birthday = user.birthday;
          let timeOfCreation = user.time_of_creation;
          let dateOfCreation = user.date_of_creation;
          let updated = user.updated;
          let userName = user.username;
          let password = user.password;
          let rawPassword = user.raw_password;

          tableData += `<tr>
        <td>${typeOfUser}</td>
        <td title="Click to view user info" onclick="viewUserInfo('${userId}','${typeOfUser}','${firstName}','${middleName}','${lastName}','${sex}','${birthday}','${timeOfCreation}','${dateOfCreation}','${updated}','${userName}','${password}','${rawPassword}')">${fullName}</td>
        <td><i onclick="showUpdateUser('${userId}','${typeOfUser}','${firstName}','${middleName}','${lastName}','${sex}','${birthday}')" class="fas fa-user-edit"></i></td>
        <td><i onclick="showDeleteUserModal('${userId}','${typeOfUser}','${firstName}')" class="fas fa-trash"></i></td>
        </tr>`;
        });
        tableContent = `${tableHeader}${tableData}`;
        table.innerHTML = `${tableContent}`;
        tableNotificationContainer.innerHTML = ``;
      } else {
        tableContent = `${tableHeader}`;
        table.innerHTML = `${tableContent}`;
        tableNotificationContainer.innerHTML = `${notification}`;
      }
    }
  };

  xhr.send(getUserData);
}

// Function that shows the edit user modal
function showUpdateUser(
  userId,
  typeOfUser,
  firstName,
  middleName,
  lastName,
  sex,
  birthday
) {
  let typeOfUserOptions = "";
  let sexOptions = "";

  if (sex == "male") {
    sexOptions = `<option value="male" selected="selected">Male</option>
    <option value="female">Female</option>`;
  } else if (sex == "female") {
    sexOptions = `<option value="male">Male</option>
    <option value="female" selected="selected">Female</option>`;
  }

  if (typeOfUser == "Super Admin") {
    typeOfUserOptions = `<option value="Super Admin" selected="selected">Super Admin</option>
    <option value="Admin" >Admin</option>
    <option value="User">User</option>`;
  } else if (typeOfUser == "Admin") {
    typeOfUserOptions = `<option value="Super Admin">Super Admin</option>
    <option value="Admin" selected="selected">Admin</option>
    <option value="User">User</option>`;
  } else if (typeOfUser == "User") {
    typeOfUserOptions = `<option value="Super Admin">Super Admin</option>
    <option value="Admin">Admin</option>
    <option value="User" selected="selected">User</option>`;
  }

  addOpacityOnHeaderMainFooter();
  let editUserModal = document.createElement("section");
  editUserModal.setAttribute("class", "modal-container");
  editUserModal.innerHTML = `
  <div class="modal edit-user">
            <div class="modal-content">
                <div class="close-button">
                    <button onclick="closeModal()"><i class="fas fa-times-circle fa-2x"></i></button>
                </div>

                <div class="edit-user-container">
                    <div class="edit-user-content">
                        <div class="edit-user-title">
                            <h1><i class="fas fa-user-edit"></i> Edit User</h1>
                        </div>

                        <div class="edit-user-input-fields">
                            <label>Type Of User</label>
                            <select>
                                ${typeOfUserOptions}
                            </select>
                            <label>First Name</label>
                            <input type="text" value="${firstName}">
                            <label>Middle Name</label>
                            <input type="text" value="${middleName}">
                            <label>Last Name</label>
                            <input type="text" value="${lastName}">
                            <label>Sex</label>
                            <select>
                                ${sexOptions}
                            </select>
                            <label>Birthday</label>
                            <input type="date" value="${birthday}">
                        </div>

                        <div class="edit-user-submit-button">
                            <button onclick="updateUser(${userId})">Update</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>`;
  body.insertBefore(editUserModal, header);
  editUserModal.style.display = "flex";
  addModalOpacity();
}

// Function for editing user
function updateUser(userId) {
  sendDataToDatabase("updateUser", userId);
}

function showDeleteUserModal(userId, typeOfUser, firstName) {
  addOpacityOnHeaderMainFooter();
  let deleteUserModal = document.createElement("section");
  deleteUserModal.setAttribute("class", "modal-container");
  deleteUserModal.innerHTML = `<div class="modal delete-user">
  <div class="modal-content">
          <div class="delete-user-container">
              <div class="delete-user-title">
                  <h1>Delete ${typeOfUser} ${firstName}?</h1>
              </div>
              <div class="delete-decide-buttons-container">
                  <div class="delete-decide-buttons">
                      <button onclick="deleteUser(${userId})">Yes</button>
                      <button onclick="closeModal()">No</button>
                  </div>
              </div>
          </div>
  </div>
</div>`;
  body.insertBefore(deleteUserModal, header);
  deleteUserModal.style.display = "flex";
  addModalOpacity();
}

// Function for deleting user
function deleteUser(userId) {
  closeModal();

  let userIdToDelete = new FormData();
  let deleteUserStatus = true;

  userIdToDelete.append("deleteUser", deleteUserStatus);
  userIdToDelete.append("userId", userId);

  let xhr = new XMLHttpRequest();
  xhr.open("POST", "../php/delete-user.php");
  xhr.onload = function() {
    if (this.status == 200) {
      showLoader(
        "delete-user",
        "Deleting User...",
        "User successfully deleted"
      );
    }
  };

  xhr.send(userIdToDelete);
}

// ************Utility functions for modal and submitting data************

// Function for notification
function notification(
  notificationType,
  notification,
  location = ".modal-container"
) {
  let errorClass = "";
  let container = document.querySelector(`${location}`);
  let createSubmitButton = document.querySelector(
    ".create-user-submit-button button"
  );

  let editSubmitButton = document.querySelector(
    ".edit-user-submit-button button"
  );

  // Set the of fontawesome icon
  if (notificationType == "error") {
    errorClass = "fa-exclamation-circle";
  } else if (notificationType == "success") {
    errorClass = "fa-check-circle";
  }

  // Function for adding opacity, removing opacity and removing notification modal
  async function init() {
    await addOpacity();
    await removeOpacity();
    await removeNotification();
  }

  // Add opacity function
  function addOpacity() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let notificationContainer = document.querySelector(
          ".notification-container"
        );
        notificationContainer.style.opacity = "1";
        const error = false;
        if (!error) {
          resolve();
        } else {
          reject("Error: Something went wrong on add opacity function");
        }
      }, 20);
    });
  }

  // Remove opacity function
  function removeOpacity() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let notificationContainer = document.querySelector(
          ".notification-container"
        );
        notificationContainer.style.opacity = "0";
        try {
          createSubmitButton.blur();
        } catch {}
        try {
          editSubmitButton.blur();
        } catch {}
        const error = false;
        if (!error) {
          resolve();
        } else {
          reject("Error: Something went wrong on remove opacity function");
        }
      }, 1000);
    });
  }

  // Remove notification
  function removeNotification() {
    return new Promise((resolve, reject) => {
      setTimeout(() => {
        let notificationContainer = document.querySelector(
          ".notification-container"
        );
        body.removeChild(notificationContainer);
        const error = false;
        if (!error) {
          resolve();
        } else {
          reject("Error: Something went wrong on removing notification");
        }
      }, 500);
    });
  }

  let notificationContainer = document.createElement("section");
  notificationContainer.setAttribute("class", "notification-container");
  notificationContainer.innerHTML = `
         <!-- Notification -->
        <div class="notification-content ${notificationType}">
            <span>
                <i class="fas ${errorClass}"></i> ${notification}</span>
        </div>`;
  body.insertBefore(notificationContainer, container);
  notificationContainer.style.display = "flex";
  init();
}

// Hide modal on outside click
document.addEventListener("click", event => {
  if (event.target.closest(".modal")) {
    return;
  } else if (event.target.closest(".modal-container")) {
    closeModal();
  }
});

// Hide modal on pressing escape
document.addEventListener("keyup", event => {
  if (event.keyCode == 27) {
    try {
      let modal = document.querySelector(".modal-container");
      if (modal) {
        closeModal();
      }
    } catch {}
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
  try {
    let modal = document.querySelector(".modal-container");
    modal.style.opacity = "0";
    removeModalElement();
  } catch {}
}

//Remove modal element
function removeModalElement() {
  removeOpacityOnHeaderMainFooter();
  setTimeout(() => {
    let modal = document.querySelector(".modal-container");
    try {
      document.body.removeChild(modal);
    } catch {}
  }, 200);
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

// Function for showing loader
function showLoader(
  processName = "",
  startProcessTitle = "",
  endProcessTitle = "",
  outputAbove = ".modal-container"
) {
  let container = document.querySelector(outputAbove);
  let loaderContainer = document.createElement("section");

  // Function for calling spinning loader, removing spinning loader opacity and removing loader element
  async function init() {
    await addSpinningLoaderOpacity();
    await removeSpinningLoaderOpacity();
    await removeSpinningLoaderElement(processName, endProcessTitle);
  }

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
      <h1>${startProcessTitle}</h1>
  </div>
</div>
  `;

  body.insertBefore(loaderContainer, container);
  loaderContainer.style.display = "flex";
  closeModal();
  addOpacityOnHeaderMainFooter();
  init();
}

//Add opacity for spinning loader
function addSpinningLoaderOpacity() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let spinningLoader = document.querySelector(".spinning-loader-container");
      spinningLoader.style.opacity = "1";
      const error = false;
      if (!error) {
        resolve();
      } else {
        reject("Error: Something went wrong on add spinning loader opacity");
      }
    }, 100);
  });
}

// Remove opacity for spinning loader
function removeSpinningLoaderOpacity() {
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let spinningLoader = document.querySelector(".spinning-loader-container");
      spinningLoader.style.opacity = "0";
      const error = false;
      if (!error) {
        resolve();
      } else {
        reject("Error: Something went wrong on add spinning loader opacity");
      }
    }, 2000);
  });
}

// Remove loader
function removeSpinningLoaderElement(
  processName = "",
  notificationContent = ""
) {
  if (notificationContent != "") {
    notification("success", notificationContent, "header");
  }

  if (processName == "create-user") {
    insertDataToTable();
  } else if (processName == "delete-user") {
    insertDataToTable();
    if (searchSection.value != "") {
      searchSection.value = "";
      addSearchIcon();
    }
  }
  removeOpacityOnHeaderMainFooter();
  return new Promise((resolve, reject) => {
    setTimeout(() => {
      let spinningLoader = document.querySelector(".spinning-loader-container");
      document.body.removeChild(spinningLoader);
      const error = false;
      if (!error) {
        resolve();
      } else {
        reject("Error: Something went wrong on remove spinning loader opacity");
      }
    }, 2000);
  });
}

// Function for sending data to database
function sendDataToDatabase(typeOfProcess, userId = "") {
  let sendDatas = true;
  let Datas = new FormData();
  let url = "";
  let process = "";

  if (typeOfProcess == "createUser") {
    url = "../php/create-user.php";
    process = ".create-user";
  } else if (typeOfProcess == "updateUser") {
    url = "../php/update-user.php";
    process = ".edit-user";
  }

  let tableColumnTitles = [];
  const inputWithLabel = {};
  const selectWithLabel = {};
  let mergeTwoFields = {};

  let createUserDetailsTitles = document.querySelectorAll(
    `${process}-input-fields label`
  );
  let createUserInputValues = document.querySelectorAll(
    `${process}-input-fields input`
  );
  let createUserSelectValues = document.querySelectorAll(
    `${process}-input-fields select`
  );

  // Function for validating create user infos
  function validateCreateUserInfos() {
    let numberOfNotEmpty = 0;
    let validName = 0;
    let status = false;
    let birthdayStatus = true;

    // Function for validating birthday
    function validateBirthday(birthday) {
      let date = new Date();
      let year = date.getFullYear();
      let birthdayKey = ["Year", "Month", "Day"];
      let birthdayArray = birthday.split("-");
      let birthdayMap = {};

      birthdayArray.forEach((value, index) => {
        birthdayMap[birthdayKey[index]] = value;
      });

      if (birthdayMap.Year <= 1800) {
        birthdayStatus = false;
      } else {
        birthdayStatus = true;
      }
      return birthdayStatus;
    }

    createUserInputValues.forEach((input, index) => {
      let label = input.previousElementSibling.innerHTML;
      let regex = /\d/;
      if (input.value == "") {
        notification("error", `${label} is empty`);
      } else {
        numberOfNotEmpty++;
      }

      if (index <= 2) {
        if (regex.test(input.value)) {
          notification("error", `${label} is not valid`);
        } else {
          validName++;
        }
      }

      if (index == createUserInputValues.length - 1) {
        if (validateBirthday(input.value) == false) {
          notification("error", `Invalid birthday`);
        }
      }
    });

    if (
      numberOfNotEmpty == createUserInputValues.length &&
      birthdayStatus == true &&
      validName == 3
    ) {
      status = true;
    }

    return status;
  }

  // If validation returns true add users info to database
  if (validateCreateUserInfos() == true) {
    validateDuplicate();

    function validateDuplicate() {
      let getUserData = new FormData();
      let getUser = true;
      let inputUserFullName = "";
      let birthdayInput;
      let sexInput;
      let typeOfUserInput;
      let getUserFullName = "";
      getUserData.append("getUser", getUser);
      var duplicateStatus = 0;
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "../php/user-list.php");
      xhr.onload = function() {
        if (this.status == 200) {
          let userList = JSON.parse(this.responseText);

          createUserInputValues.forEach((input, index) => {
            if (index < 3) {
              inputUserFullName += input.value;
            } else if (index == 3) {
              birthdayInput = input.value;
            }
          });

          createUserSelectValues.forEach((select, index) => {
            if (index == 0) {
              typeOfUserInput = select.value;
            } else if (index == 1) {
              sexInput = select.value;
            }
          });

          if (typeOfProcess == "updateUser") {
            userList.forEach((user, index) => {
              let getBirthday = user.birthday;
              let getTypeOfUser = user.type_of_user;
              let getSex = user.sex;
              getUserFullName = `${user.first_name}${user.middle_name}${
                user.last_name
              }`;
              if (
                getUserFullName.replace(/\s/g, "").toLowerCase() ==
                  inputUserFullName.replace(/\s/g, "").toLowerCase() &&
                getBirthday == birthdayInput &&
                getTypeOfUser == typeOfUserInput &&
                getSex == sexInput
              ) {
                setTimeout(() => {
                  notification("error", `Account is up to date`);
                }, 1);
                duplicateStatus++;
              }
            });
          } else {
            userList.forEach((user, index) => {
              getUserFullName = `${user.first_name}${user.middle_name}${
                user.last_name
              }`;
              if (
                getUserFullName.replace(/\s/g, "").toLowerCase() ==
                inputUserFullName.replace(/\s/g, "").toLowerCase()
              ) {
                setTimeout(() => {
                  notification("error", `Account already exist`);
                }, 1);
                duplicateStatus++;
              }
            });
          }
          if (duplicateStatus == 0) {
            init();
          }
        }
      };

      xhr.send(getUserData);
    }

    function init() {
      if (typeOfProcess == "createUser") {
        showLoader(
          "create-user",
          "Creating User...",
          "User creation is successful"
        );
      } else if (typeOfProcess == "updateUser") {
        showLoader(
          "create-user",
          "Updating User...",
          "User update is successful"
        );
      }

      // Create the formdata variable name
      createUserDetailsTitles.forEach((title, index) => {
        tableColumnTitles[index] = title.innerHTML
          .split(" ")
          .map(
            (word, index) =>
              index > 0
                ? word.substr(0, 1).toUpperCase() + word.substring(1)
                : word.substr(0, 1).toLowerCase() + word.substring(1)
          )
          .join("");
      });
      // Create the input field value
      createUserInputValues.forEach((input, index) => {
        let label = input.previousElementSibling.innerHTML;
        let labelToArrayKey = label
          .split(" ")
          .map(
            (word, index) =>
              index > 0
                ? word.substr(0, 1).toUpperCase() + word.substring(1)
                : word.substr(0, 1).toLowerCase() + word.substring(1)
          )
          .join("");
        inputWithLabel[labelToArrayKey] =
          index < 3
            ? input.value.indexOf(" ") == -1
              ? input.value.substring(0, 1).toUpperCase() +
                input.value.substring(1, input.value.length)
              : input.value
                  .split(" ")
                  .map(
                    word =>
                      `${word.substring(0, 1).toUpperCase()}${word.substring(
                        1
                      )}`
                  )
                  .join(" ")
            : input.value;
      });
      // Create the select field value
      createUserSelectValues.forEach((select, index) => {
        let label = select.previousElementSibling.innerHTML;
        let labelToArrayKey = label
          .split(" ")
          .map(
            (word, index) =>
              index > 0
                ? word.substr(0, 1).toUpperCase() + word.substring(1)
                : word.substr(0, 1).toLowerCase() + word.substring(1)
          )
          .join("");
        selectWithLabel[labelToArrayKey] = select.value;
      });
      // Merge input with label and select with label
      mergeTwoFields = { ...inputWithLabel, ...selectWithLabel };
      // Append the data of user to Datas to send it to database
      tableColumnTitles.forEach(title => {
        Datas.append(title, mergeTwoFields[title]);
      });
      // Append the sendDatas to Datas to process adding to database
      Datas.append("sendDatas", sendDatas);
      Datas.append("userId", userId);
      // For debugging
      // console.log(tableColumnTitles);
      // console.log(inputWithLabel);
      // console.log(selectWithLabel);
      // console.log(mergeTwoFields);
      // Output create user data
      // for (var pair of Datas.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }
      let xhr = new XMLHttpRequest();
      xhr.open("POST", url, true);
      xhr.onload = function() {
        if (this.status == 200) {
        }
      };
      xhr.send(Datas);
    }
  }
}

// View user information
function viewUserInfo(
  userId,
  typeOfUser,
  firstName,
  middleName,
  lastName,
  sex,
  birthday,
  timeOfCreation,
  dateOfCreation,
  updated,
  username,
  password,
  rawPassword
) {
  let userBirthday;
  let months = [
    "January",
    "February",
    "March",
    "April",
    "May",
    "June",
    "July",
    "August",
    "September",
    "October",
    "November",
    "December"
  ];

  let rawBirthday = birthday.split("-");
  userBirthday = `${months[rawBirthday[1] - 1]} ${rawBirthday[2]}, ${
    rawBirthday[0]
  }`;

  addOpacityOnHeaderMainFooter();
  let userInformationModal = document.createElement("section");
  userInformationModal.setAttribute("class", "modal-container");
  userInformationModal.innerHTML = `
  <div class="modal view-user">
  <div class="modal-content">
      <div class="close-button">
          <button onclick="closeModal()"><i class="fas fa-times-circle fa-2x"></i></button>
      </div>
      <div class="view-user-container">
          <div class="view-user-content">
              <div class="view-user-title">
                  <h1><i class="fas fa-user"></i> User Information</h1>
              </div>

              <div class="info-container">
                  <ul>
                      <li><span>Name:</span> ${firstName} ${middleName} ${lastName} </li>
                      <li><span>User Id:</span> ${userId}</li>
                      <li><span>Type of User:</span> ${typeOfUser} </li>
                      <li><span>Sex:</span> ${sex
                        .substring(0, 1)
                        .toUpperCase() + sex.substring(1)} </li>
                      <li><span>Birthday:</span>${userBirthday} </li>
                      <li><span>Time of creation:</span> ${timeOfCreation} </li>
                      <li><span>Date of creation:</span> ${dateOfCreation} </li>
                      <li><span>Username:</span>${username} </li>
                      <li><span>Password:</span><span id="passwordContainer" onclick="showPassword('${rawPassword}')">View password</span></li>
                  </ul>
              </div>

          </div>
      </div>
  </div>
</div>`;
  body.insertBefore(userInformationModal, header);
  userInformationModal.style.display = "flex";
  addModalOpacity();
}

function showPassword(rawPassword) {
  let passwordContainer = document.querySelector("#passwordContainer");
  passwordContainer.style.fontWeight = "normal";
  passwordContainer.innerHTML = rawPassword;
}
