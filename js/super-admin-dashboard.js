// Variables
const body = document.querySelector("body");
const header = document.querySelector("header");
const main = document.querySelector("main");
const showMenuButton = document.querySelector(".fa-caret-down");
const navigationMenus = document.querySelector("nav aside");
const navigationMenusList = document.querySelectorAll("nav aside ul li");
const dashboardMenus = document.querySelectorAll(
  ".dashboard-menus-container div"
);

// Show  navigation menu button
showMenuButton.addEventListener("click", showMenus);

// Hide navigation menus on outside click
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

// Navigation menu list buttons
navigationMenusList.forEach((menu, index) => {
  if (index == 0) {
    menu.addEventListener("click", showEditAccountModal);
  } else if (index == 1) {
    menu.addEventListener("click", logOut);
  }
});

// Show navigation menu function
function showMenus() {
  navigationMenus.classList.toggle("show");
}

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
  showLoader("Saving changes...");
  addOpacityOnHeaderMainFooter();
}

// Logout function
function logOut() {
  navigationMenus.classList.remove("show");
  console.log("Logout");
}

// Dashboard menus buttons
dashboardMenus.forEach((menu, index) => {
  if (index == 0) {
    menu.addEventListener("click", showcreateUserModal);
  } else if (index == 1) {
    menu.addEventListener("click", userList);
  }
});

// ************Dashboard main menu functions************

// Show create user modal
function showcreateUserModal() {
  addOpacityOnHeaderMainFooter();
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

// Function for creating user
function createUser() {
  let sendCreateUserData = true;
  let createUserData = new FormData();
  let tableColumnTitles = [];
  const inputWithLabel = {};
  const selectWithLabel = {};
  let mergeTwoFields = {};

  let createUserDetailsTitles = document.querySelectorAll(
    ".create-user-input-fields label"
  );
  let createUserInputValues = document.querySelectorAll(
    ".create-user-input-fields input"
  );
  let createUserSelectValues = document.querySelectorAll(
    ".create-user-input-fields select"
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
            }
          });

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

          if (duplicateStatus == 0) {
            init();
          }
        }
      };

      xhr.send(getUserData);
    }

    function init() {
      showLoader("Creating User...");
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
        inputWithLabel[labelToArrayKey] = input.value;
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
      // Append the data of user to createUserData to send it to database
      tableColumnTitles.forEach(title => {
        createUserData.append(title, mergeTwoFields[title]);
      });
      // Append the sendCreateUserData to createUserData to process adding to database
      createUserData.append("sendCreateUserData", sendCreateUserData);
      // For debugging
      // console.log(tableColumnTitles);
      // console.log(inputWithLabel);
      // console.log(selectWithLabel);
      // console.log(mergeTwoFields);
      // Output create user data
      // for (var pair of createUserData.entries()) {
      //   console.log(pair[0] + ", " + pair[1]);
      // }
      let xhr = new XMLHttpRequest();
      xhr.open("POST", "../php/create-user.php", true);
      xhr.onload = function() {
        if (this.status == 200) {
        }
      };
      xhr.send(createUserData);
    }
  }
}

// Function that redirects to user list page
function userList() {
  window.location.replace("user-list.html");
}

// ************Utility functions for modal and submit data************

function notification(
  notificationType,
  notification,
  location = ".modal-container"
) {
  let errorClass = "";
  let container = document.querySelector(`${location}`);
  let submitButton = document.querySelector(
    ".create-user-submit-button button"
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
          submitButton.blur();
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
function showLoader(label) {
  let modalContainer = document.querySelector(".modal-container");
  let loaderContainer = document.createElement("section");

  // Function for calling spinning loader, removing spinning loader opacity and removing loader element
  async function init() {
    await addSpinningLoaderOpacity();
    await removeSpinningLoaderOpacity();
    await removeSpinningLoaderElement();
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
      <h1>${label}</h1>
  </div>
</div>
  `;

  body.insertBefore(loaderContainer, modalContainer);
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
function removeSpinningLoaderElement() {
  notification("success", "User creation is successful", "header");
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
