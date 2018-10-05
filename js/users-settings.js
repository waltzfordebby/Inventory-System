// Variables
const showMenuButton = document.querySelector(".fa-caret-down");
const body = document.querySelector("body");
const menus = document.querySelector("nav aside");
const logo = document.querySelector(".logo");
const header = document.querySelector("header");
const main = document.querySelector("main");
const dahshBoardMenus = document.querySelectorAll(".dashboard-menu");

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
    menu.addEventListener("click", addItem);
  } else if (index == 1) {
    menu.addEventListener("click", listOfItems);
  }
});

// Add item
function addItem() {
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
                          <option value="Super Admin">Super Admin</option>
                          <option value="Admin">Admin</option>
                          <option value="User">User</option>
                      </select>
                      <label>Office</label>
                      <select>
                          <option value="male">Male</option>
                          <option value="female">Female</option>
                      </select>
                      <label>Date Of Purchase</label>
                      <input type="date">
                      <label>Article</label>
                      <input type="text">
                      <label>Description</label>
                      <input type="text">
                      <label>Property Number</label>
                      <input type="text">
                  </div>

                  <div class="add-item-input-fields">
                      <label>Unit Measure</label>
                      <input type="text">
                      <label>Unit Value</label>
                      <input type="text">
                      <label>Quantity per Property Card</label>
                      <input type="text">
                      <label>Quantity per Physical Count</label>
                      <input type="text">
                      <label>Quantity</label>
                      <input type="text">
                      <label>Value</label>
                      <input type="text">
                      <label>Remarks</label>
                      <input type="text">
                  </div>
              </div>

              <div class="add-item-submit-button">
                  <button onclick="addItem()">Submit</button>
              </div>
          </div>
      </div>
  </div>
</div>`;
  body.insertBefore(addItemModal, header);
  addItemModal.style.display = "flex";
  addModalOpacity();
}

function listOfItems() {
  console.log("List of items.");
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
