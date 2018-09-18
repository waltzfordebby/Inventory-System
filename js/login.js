// Elements
const body = document.querySelector("body");
const logo = document.querySelector(".login-logo img");
const main = document.querySelector("main");
const loginInputValues = document.querySelectorAll(".login-input-field input");
const viewPasswordBtn = document.querySelector(".login-input-container span");
const loginBtn = document.querySelector(".login-submit-button button");

// User class
class User {
  constructor(username, password) {
    this.username = username;
    this.password = password;
  }

  // Notification
  notification(notificationType, notification) {
    let notificationContent = "";
    let typeOfNotification = "";

    if (notificationType == "Error") {
      typeOfNotification = "error";
      if (notification.length > 8) {
        notificationContent = `${notification} are empty`;
      } else {
        notificationContent = `${notification} is empty`;
      }
    } else if (notificationType == "Success") {
      typeOfNotification = "success";
      if (notification.length > 8) {
        notificationContent = `${notification} are empty`;
      } else {
        notificationContent = `${notification} is empty`;
      }
    }

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
          loginBtn.blur();
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
        <div class="notification-content ${typeOfNotification}">
            <span>
                <i class="fas fa-exclamation-circle"></i> ${notificationContent}</span>
        </div>`;
    body.insertBefore(notificationContainer, main);
    notificationContainer.style.display = "flex";
    init();
  }

  //   Validate if the username and password are empty
  validateIfEmpty() {
    if (this.username === "" && this.password === "") {
      return `username and password`;
    } else if (this.username === "") {
      return `username`;
    } else if (this.password === "") {
      return `password`;
    } else {
      return false;
    }
  }

  //   Validate user
  validateUser() {
    return `Hello !`;
  }
}

// Login, view password and logo button
loginBtn.addEventListener("click", userLogin);
viewPasswordBtn.addEventListener("click", viewPassword);
logo.addEventListener("click", goToIndex);

// User login function
function userLogin(e) {
  //   Prevent form submit
  e.preventDefault();

  //   User details container
  let userDetails = [];

  //   Set the value of userDetails
  loginInputValues.forEach(function(element) {
    userDetails.push(element.value);
  });

  // Create a user object
  const userLogin = new User(...userDetails);

  if (userLogin.validateIfEmpty() === "username and password") {
    userLogin.notification("Error", "Username and password");
  } else if (userLogin.validateIfEmpty() === "username") {
    userLogin.notification("Error", "Username");
  } else if (userLogin.validateIfEmpty() === "password") {
    userLogin.notification("Error", "Password");
  } else if (userLogin.validateIfEmpty() == false) {
    console.log("Ready");
  }
}

// View password function
function viewPassword() {
  const passwordInputSection = loginInputValues[1];
  if (passwordInputSection.type == "password") {
    passwordInputSection.type = "text";
    viewPasswordBtn.innerHTML = "<i class='fas fa-eye-slash'></i>";
  } else if (passwordInputSection.type == "text") {
    passwordInputSection.type = "password";
    viewPasswordBtn.innerHTML = "<i class='fas fa-eye'></i>";
  }
}

// Redirect to index.html function
function goToIndex() {
  window.location.replace("index.html");
}
