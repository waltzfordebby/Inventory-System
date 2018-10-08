// Variables
const showMenuButton = document.querySelector(".fa-caret-down");
const body = document.querySelector("body");
const menus = document.querySelector("nav aside");
const logo = document.querySelector(".logo");
const header = document.querySelector("header");
const main = document.querySelector("main");
const navigationMenus = document.querySelector("nav aside");
const navigationMenusList = document.querySelectorAll("nav aside ul li");
const dahshBoardMenus = document.querySelectorAll(".dashboard-menu");

// Navigation menu list menu
navigationMenusList.forEach((menu, index) => {
  if (index == 0) {
    menu.addEventListener("click", showEditAccountModal);
  } else if (index == 1) {
    menu.addEventListener("click", logout);
  }
});

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
  showLoader("Saving changes...", "", "Account successfully updated");
  addOpacityOnHeaderMainFooter();
}

// Logout
function logout() {
  navigationMenus.classList.remove("show");
  showLoader("Logging out...", "", "header");
}

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

// Hide navigation menu on pressing escape
document.addEventListener("keyup", event => {
  if (event.keyCode == 27) {
    try {
      menus.classList.remove("show");
    } catch {}
  }
});

// Dashboard menu buttons
dahshBoardMenus.forEach((menu, index) => {
  if (index == 0) {
    menu.addEventListener("click", showAddItemModal);
  } else if (index == 1) {
    menu.addEventListener("click", listOfItems);
  }
});

// Add item
function showAddItemModal() {
  addOpacityOnHeaderMainFooter();
  let addItemModal = document.createElement("section");
  addItemModal.setAttribute("class", "modal-container");
  addItemModal.innerHTML = `
  <div class="modal add-item">
  <div class="modal-content">
      <div class="close-button">
          <button onclick="closeModal()"><i class="fas fa-times-circle fa-2x"></i></button>
      </div>

      <div class="add-item-container">
          <div class="add-item-content">
              <div class="add-item-title">
                  <h1><i class="fas fa-box-open"></i> Add item</h1>
              </div>

              <div class="add-item-input-fields-container">
                  <div class="add-item-input-fields">
                      <label>Code</label>
                      <select>
                          <option value="AFFE">AFFE </option>
                          <option value="DRRM">DRRM</option>
                          <option value="CONSHE">CONSHE</option>
                          <option value="COME">COME</option>
                          <option value="FF">FF</option>
                          <option value="HOSE">HOSE</option>
                          <option value="ITS">ITS</option>
                          <option value="LB">LB</option>
                          <option value="MV">MV</option>
                          <option value="MSE">MSE</option>
                          <option value="MACHINE">MACHINE</option>
                          <option value="OEQ">OEQ</option>
                          <option value="TSE">TSE</option>
                          <option value="WC">WC</option>
                      </select>
                      <label>Date Of Purchase</label>
                      <input type="date">
                      <label>Article</label>
                      <textarea></textarea>
                      <label>Description</label>
                      <textarea></textarea>
                      <label>Property Number</label>
                      <input type="text">
                      <label>Unit of Measure</label>
                      <select>
                          <option value="pc">pc</option>
                          <option value="set">set</option>
                          <option value="pcs">pcs</option>
                          <option value="unit">unit</option>
                      </select>
                      <label>Remarks</label>
                      <select>
                      <option value="Serviceable">Serviceable </option>
                      <option value="Unserviceable/Missing">Unserviceable/Missing</option>
                      <option value="Unserviceable">Unserviceable</option>
                  </select>
                  </div>
              </div>

              <div class="add-item-submit-button">
                  <button onclick="addItem()">Submit</button>
              </div>
          </div>
      </div>
  </div>
</div>`;

  {
    // Office labels
    /* <label>Office</label>
<select>
  <option value="ESMU">ESMU</option>
    <option value="MAO">MAO</option>
    <option value="MO">MO</option>
    <option value="PIHC">PIHC</option>
    <option value="MDRRM">MDRRM</option>
    <option value="MDRRMO">MDRRMO</option>
    <option value="ADMIN">ADMIN</option>
    <option value="MHO">MHO</option>
    <option value="MASSO">MASSO</option>
    <option value="MBO">MBO</option>
    <option value="MCR">MCR</option>
    <option value="MTO">MTO</option>
    <option value="PIO">PIO</option>
    <option value="MSWDO">MSWDO</option>
    <option value="SB">SB</option>
    <option value="SB SEC">SB SEC</option>
    <option value="TOURISM">TOURISM</option>
    <option value="COA">COA</option> 
    <option value="DILG">DILG</option>
    <option value="GAD">GAD</option>
    <option value="KALAHI">KALAHI</option>
    <option value="LIBRARY">LIBRARY</option>
    <option value="MPDC">MPDC</option>
    <option value="MEO">MEO</option>
    <option value="MTC">MTC</option>
    <option value="PORT">PORT</option>
    <option value="VICE MAYOR">VICE MAYOR</option>
    <option value="OSCA">OSCA</option>
    <option value="NCDC">NCDC</option>
    <option value="COMELEC">COMELEC</option>
    <option value="BAC">BAC</option>
    <option value="BPLC">BPLC</option>
    <option value="PESO">PESO</option>
    <option value="MARKET">MARKET</option>
    <option value="NCDC">NCDC</option>
    <option value="SKHALL">SKHALL</option>
</select> */
  }
  body.insertBefore(addItemModal, header);
  addItemModal.style.display = "flex";
  addModalOpacity();
}

// Function for adding item
function addItem() {
  const addItemDatas = new FormData();
  const addItem = true;
  let numberOfErrors = 0;
  const itemDatas = [];
  let purchaseDateStatus;

  const itemDatasSelect = document.querySelectorAll(
    ".add-item-input-fields select"
  );
  const itemDatasInput = document.querySelectorAll(
    ".add-item-input-fields input"
  );
  const itemDatasTextArea = document.querySelectorAll(
    ".add-item-input-fields textarea"
  );

  // Function for validating purchase date
  function validatePurchaseDate(purchaseDate) {
    let date = new Date();
    let year = date.getFullYear();
    let purchaseDateKey = ["Year", "Month", "Day"];
    let purchaseDateArray = purchaseDate.split("-");
    let purchaseDateMap = {};
    purchaseDateArray.forEach((value, index) => {
      purchaseDateMap[purchaseDateKey[index]] = value;
    });

    if (purchaseDateMap.Year <= 1800) {
      purchaseDateStatus = false;
    } else {
      purchaseDateStatus = true;
    }
    return purchaseDateStatus;
  }

  itemDatasSelect.forEach((select, index) => {
    const label = select.previousElementSibling.innerHTML;
    itemDatas[label] = select.value;
  });

  itemDatasInput.forEach((input, index) => {
    const label = input.previousElementSibling.innerHTML;
    if (input.value == "") {
      notification("error", `${label} is empty`);
      numberOfErrors++;
    } else {
      itemDatas[label] = input.value;
    }

    if (index == 0) {
      if (validatePurchaseDate(input.value) == false) {
        notification("error", `Invalid date of purchase`);
      }
    }
  });

  itemDatasTextArea.forEach((textArea, index) => {
    const label = textArea.previousElementSibling.innerHTML;
    if (textArea.value == "") {
      notification("error", `${label} is empty`);
      numberOfErrors++;
    } else {
      itemDatas[label] =
        textArea.value.substring(0, 1).toUpperCase() +
        textArea.value.substring(1);
    }
  });

  addItemDatas.append("addItem", addItem);

  for (itemData in itemDatas) {
    addItemDatas.append(
      `${itemData.toLowerCase().replace(/\s/g, "")}`,
      itemDatas[itemData]
    );
  }

  // Send the item to database
  if (numberOfErrors == 0 && purchaseDateStatus == true) {
    showLoader("Adding item to database", "", "Item successfully added");

    let xhr = new XMLHttpRequest();
    xhr.open("POST", "../php/add-item.php");
    xhr.onload = function() {
      if (this.status == 200) {
      }
    };

    xhr.send(addItemDatas);
  }
}

// Redirect to item list page
function listOfItems() {
  window.location.replace("item-list.html");
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
  startProcessTitle = "",
  processName = "",
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
