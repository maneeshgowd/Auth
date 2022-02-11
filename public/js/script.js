/* eslint-disable */

"use strict";

import "core-js/stable";
import "regenerator-runtime";

const loginPassword = document.getElementById("password");
const loginIcon = document.getElementById("login-pass-icon");
const forgetPassIcon = document.querySelectorAll("#forget-pass-icon");
const loginEmail = document.getElementById("email");
const loginIn = document.getElementById("form--login");
const createPassword = document.getElementById("new-password");
const createRepeatPassword = document.getElementById("repeat-password");
const createName = document.getElementById("name");
const createEmail = document.getElementById("create-email");
const createIcon = document.querySelectorAll("#create-pass-icon");
const signUp = document.getElementById("form--create");
const validateOtp = document.getElementById("form--otp");
const gender = document.getElementById("gender");
const dob = document.getElementById("dob");
/////
const logoutuser = document.querySelector("#logout-user");

const forgetEmail = document.getElementById("forget--email");
const token = document.getElementById("token");
const forgetPass = document.getElementById("forget-pass");
const gitResult = document.getElementById("gitResult");
const searchGitUser = document.getElementById("search-git-user");
const searchInput = document.getElementById("searchInput");
const deleteUser = document.querySelector(".user-base");

const userPersonelInfo = document.getElementById("user-personel-info");
const userPassword = document.getElementById("user-password");
const userCloseAcc = document.getElementById("close-account");
const personelInfo = document.getElementById("personel-info");
const passwordInfo = document.getElementById("password-info");
const closeInfo = document.getElementById("close-info");
const userInformation = document.getElementById("user-information");

const closePassword = document.getElementById("close-password");
const closeAccount = document.getElementById("close-account");
const closeAccountUser = document.getElementById("close-user-account");
const submitData = document.getElementById("submit-user-data");
const imageUpload = document.getElementById("image-upload");
const avatar = document.getElementById("avatar");
const country = document.getElementById("select");
const submitPassword = document.getElementById("submit-password");

const currentPassword = document.getElementById("currentPassword");
const newPassword = document.getElementById("newPassword");
const repeatPassword = document.getElementById("repeatPassword");

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// BACKEND CODE

const userLogin = async function (data) {
  try {
    const request = await fetch(`/api/v1/users/login`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },

      mode: "cors",
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (response.status !== "success") return errorDisplay(`${response.message}`, "error");

    errorDisplay(`${response.message}`, "success");

    window.setTimeout(() => location.assign("/"), 1000);
  } catch (err) {
    errorDisplay(`${err.message}`, "error");
  }
};

const logoutUser = async function () {
  try {
    const request = await fetch(`/api/v1/users/logout`, {
      method: "GET",
      mode: "cors",
    });

    const response = await request.json();
    if (response.status === "success") {
      errorDisplay("Logged out!", "success");
      window.setTimeout(() => location.assign("/login"), 1000);
    }
  } catch (err) {
    errorDisplay(`${err.message}`, "error");
  }
};

const deleteUserDB = async function (id) {
  try {
    const deleteRequest = await fetch(`/api/v1/users/deleteUser/${id}`, {
      method: "DELETE",
    });
    const response = await deleteRequest.json();

    if (response.status !== "success") throw new Error(response.message);

    errorDisplay("Deleted user!", "success");
  } catch (err) {
    errorDisplay(err.message, "error");
  }
};

const deleteUserUser = async function (data) {
  try {
    const request = await fetch(`/api/v1/users/deleteMe`, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (response.status !== "success") throw new Error(response.message);

    errorDisplay("Deleted user!", "success");

    location.assign("/login");
  } catch (err) {
    errorDisplay(`${err.message}`, "error");
  }
};

const userSignup = async function (data, endPoint) {
  try {
    const request = await fetch(`/api/v1/users/${endPoint}`, {
      method: `POST`,
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (response.status !== "success") throw new Error(response.message);

    if (endPoint === "signup") window.setTimeout(() => location.assign("/"), 1000);

    return response;
  } catch (err) {
    throw err;
  }
};

const forgetPassword = async function (email) {
  try {
    const request = await fetch(`/api/v1/users/forgotPassword`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(email),
    });

    const response = await request.json();

    if (response.status !== "success") throw new Error(response.message);

    errorDisplay("Token sent to your email address!", "success");

    return response;
  } catch (err) {
    errorDisplay(`${err.message}`, "error");
  }
};

const resetForgetPassword = async function (data, token) {
  try {
    const request = await fetch(`/api/v1/users/resetPassword/${token}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (response.status !== "success") throw new Error(response.message);

    errorDisplay("Password updated successfully!", "success");
    window.setTimeout(() => location.assign("/login"), 1000);
  } catch (err) {
    errorDisplay(`${err.message}`, "error");
  }
};

const userDataUpdate = async function (data) {
  try {
    const request = await fetch(`/api/v1/users/updateMe`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      mode: "cors",
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (response.status !== "success") throw new Error(response.message);

    errorDisplay("Data updated successfully!", "success");
    window.setTimeout(() => location.assign("/my-account"), 1000);
  } catch (err) {
    errorDisplay(`${err.message}`, "error");
  }
};

const userImageUpdate = async function (data) {
  try {
    const request = await fetch(`/api/v1/users/updateMe`, {
      method: "PATCH",
      mode: "cors",
      body: data,
    });

    const response = await request.json();
    if (response.status !== "success") throw new Error(response.message);

    errorDisplay("Image updated successfully!", "success");
    window.setTimeout(() => location.assign("/my-account"), 1000);
  } catch (err) {
    errorDisplay(`${err.message}`, "error");
  }
};

const userPasswordUpdate = async function (data) {
  try {
    const request = await fetch(`/api/v1/users/updateMyPassword`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },

      mode: "cors",
      body: JSON.stringify(data),
    });

    const response = await request.json();

    if (response.status !== "success") throw new Error(response.message);

    errorDisplay("Password updated successfully!", "success");
    logoutUser();
  } catch (err) {
    errorDisplay(`${err.message}`, "error");
  }
};

///////////////////////////////////////////////////////////////////////////////////////////////
// FRONT-END CODE

function userAuthenticator(email, password, repeatPassword, name, gender, dob) {
  const userData = [];

  const validate =
    /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;

  validate.test(email) ? userData.push(email) : userData.push(0);

  if (name || gender || dob) {
    name.length < 5 ? userData.push(0) : userData.push(name);
    userData.push(gender);
    userData.push(dob);
  }

  if (repeatPassword) {
    password.length >= 8 && password === repeatPassword
      ? userData.push(password)
      : userData.push(0);
  } else {
    password.length >= 8 ? userData.push(password) : userData.push(0);
  }
  return userData;
}

function viewLogoutHandler() {
  logoutUser();
}

function validateOTP(e) {
  e.preventDefault();

  const OTP = sessionStorage.getItem("OTP");
  const data = JSON.parse(sessionStorage.getItem("data"));
  const otpValue = this.querySelector("#otp").value.trim();

  if (otpValue !== OTP) return errorDisplay("Invalid OTP!", "error");

  errorDisplay("Successfully signed.", "success");
  // send data to backend
  userSignup(data, "signup");
}

const viewForgetPass = function (email) {
  this.parentElement.classList.add("hidden-helper");
  email.classList.remove("hidden-helper");
};

const viewUserSettingsToggleHandler = async function (e, buttons, sections) {
  const [passwordInfo, personelInfo, closeInfo] = sections;
  if (!e.target.classList.contains("user-settings-btn")) return;

  buttons.forEach((ele) => ele.parentElement.classList.remove("info--btn"));
  e.target.parentElement.classList.add("info--btn");

  sections.forEach((ele) => ele.classList.add("hidden-helper"));

  if (e.target.id === "user-personel-info") personelInfo.classList.remove("hidden-helper");
  if (e.target.id === "user-password") passwordInfo.classList.remove("hidden-helper");
  if (e.target.id === "close-account") closeInfo.classList.remove("hidden-helper");
};

const viewSendForgetEmail = async function (token, e) {
  e.preventDefault();
  const email = this.querySelector("#email-forget").value.trim();

  const response = await forgetPassword({ email });
  if (!response) return location.reload();
  this.classList.add("hidden-helper");
  token.classList.remove("hidden-helper");
};

const viewChangeForgetPass = function (e) {
  e.preventDefault();
  const token = this.querySelector("#forget-token").value.trim();
  const password = this.querySelector("#newPassword").value.trim();
  const passwordConfirm = this.querySelector("#confirmNewPassword").value.trim();

  if (password !== passwordConfirm) return errorDisplay("passwords dosen't match", "error");

  resetForgetPassword({ password, passwordConfirm }, token);
};

const viewAuthCreate = async function (inputArr) {
  const [name, email, password, repeatPassword, gender, dob] = inputArr;

  const validatedData = userAuthenticator(
    email.value.trim(),
    password.value.trim(),
    repeatPassword.value.trim(),
    name.value.trim(),
    gender.value,
    dob.value.trim()
  );

  if (validatedData.includes(0)) return errorDisplay("Passwords dosen't match");

  errorDisplay("Please wait!..", "success", 10000);

  const userData = {
    name: validatedData[1],
    email: validatedData[0],
    password: validatedData[4],
    passwordConfirm: validatedData[4],
    gender: validatedData[2],
    dob: validatedData[3],
  };

  try {
    const otp = await userSignup(userData, "validate");

    if (otp.status !== "success") return errorDisplay(otp.message, "error");

    sessionStorage.setItem("OTP", otp.OTP);
    sessionStorage.setItem("data", JSON.stringify(userData));

    this.classList.add("hidden-helper");

    this.nextElementSibling.classList.remove("hidden-helper");
  } catch (err) {
    errorDisplay(err.message, "error");
  }
};

const viewAuthLogin = function (inputArr) {
  const [email, password] = inputArr;

  const validatedData = userAuthenticator(email.value.trim(), password.value.trim());
  if (validatedData.includes(0)) return;

  this.querySelector(".form__btn").textContent = "Please wait...";

  const userData = {
    email: validatedData[0],
    password: validatedData[1],
  };

  userLogin(userData);
};

const viewPasswordVisibleHandler = function (loginPassword) {
  if (loginPassword.type === "password") {
    loginPassword.type = "text";
    this.src = "/icons/eye.svg";
  } else {
    loginPassword.type = "password";
    this.src = "/icons/eye-off.svg";
  }
};

const arrayToObj = (data) => {
  const obj = {};
  for (let d of data) obj[d.name] = d.value.trim();
  return obj;
};

const validateuserData = (data) => data.filter((d) => d.value.trim().length !== 0);

const viewCloseUserAccountHandler = function () {
  const newData = this.value.trim();
  if (newData.length === 0) return;
  const data = { password: newData };
  deleteUserUser(data);
};

const viewUploadUserImage = function () {
  const form = new FormData();
  const photo = this.files[0];
  if (!photo) return;
  form.append("photo", photo, photo.name);
  userImageUpdate(form);
};

const viewUpdateUserDataHandler = function (e) {
  e.preventDefault();
  const newData = validateuserData(this);

  if (newData[0].value === "India" && newData.length === 1) return;

  const data = arrayToObj(newData);

  userDataUpdate(data);
};

const viewUpdateUserPasswordHandler = function (e) {
  e.preventDefault();

  const newData = validateuserData(this);
  if (newData.length < 3) return;

  const data = arrayToObj(newData);

  userPasswordUpdate(data);
};

function errorDisplay(errMsg, classlist = "error") {
  const message = `<h1 class="error-msg ${classlist}">${errMsg}</h1>`;
  const body = document.querySelector("body");

  if (body.querySelector(".error-msg")) body.removeChild(body.querySelector(".error-msg"));

  body.insertAdjacentHTML("afterbegin", message);

  window.setTimeout(() => body.removeChild(body.querySelector(".error-msg")), 5000);
}

signUp?.addEventListener("submit", (e) => {
  e.preventDefault();
  const data = [createName, createEmail, createPassword, createRepeatPassword, gender, dob];
  viewAuthCreate.call(signUp, data);
});

loginIn?.addEventListener("submit", (e) => {
  e.preventDefault();
  viewAuthLogin.call(loginIn, [loginEmail, loginPassword]);
});

validateOtp?.addEventListener("submit", validateOTP);

logoutuser?.addEventListener("click", viewLogoutHandler);

forgetPass?.addEventListener("click", viewForgetPass.bind(forgetPass, forgetEmail));
forgetEmail?.addEventListener("submit", viewSendForgetEmail.bind(forgetEmail, token));

token?.addEventListener("submit", viewChangeForgetPass);
loginIcon?.addEventListener("click", viewPasswordVisibleHandler.bind(loginIcon, loginPassword));
createIcon[0]?.addEventListener(
  "click",
  viewPasswordVisibleHandler.bind(createIcon[0], createPassword)
);
createIcon[1]?.addEventListener(
  "click",
  viewPasswordVisibleHandler.bind(createIcon[1], createRepeatPassword)
);

forgetPassIcon[0]?.addEventListener(
  "click",
  viewPasswordVisibleHandler.bind(forgetPassIcon[0], createRepeatPassword)
);

forgetPassIcon[1]?.addEventListener(
  "click",
  viewPasswordVisibleHandler.bind(forgetPassIcon[1], createRepeatPassword)
);

userInformation?.addEventListener("click", (e) => {
  viewUserSettingsToggleHandler.call(
    this,
    e,
    [userPersonelInfo, userPassword, userCloseAcc],
    [passwordInfo, personelInfo, closeInfo]
  );
});

searchGitUser?.addEventListener("click", async function () {
  const username = searchInput?.value.trim().split(" ").join("");

  try {
    const request = await fetch(`/api/v1/users/gitData`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ user: username }),
    });
    const response = await request.json();
    htmlAdder(response);

    if (response.status === "fail") throw new Error(response.message);
  } catch (err) {
    errorDisplay(err.message, "error");
  }
});

deleteUser?.addEventListener("click", function (e) {
  if (e.target.id !== "deleteUser") return;
  const { id } = e.target.parentElement.dataset;
  deleteUserDB(id);
  e.target.parentElement.remove();
});

imageUpload?.addEventListener("click", viewUploadUserImage.bind(avatar));
submitData?.addEventListener(
  "submit",
  viewUpdateUserDataHandler.bind([createName, createEmail, country, gender, dob])
);

submitPassword?.addEventListener(
  "submit",
  viewUpdateUserPasswordHandler.bind([currentPassword, newPassword, repeatPassword])
);

closeAccountUser?.addEventListener("submit", function (e) {
  e.preventDefault();
  viewCloseUserAccountHandler.call(closePassword);
});

function htmlAdder(data) {
  const html = `
  <img class="git-user-img" src="/${data.avatar_url}" alt="${data.name}" />
  <div class="git-content"> 
      <h1 class="user-name"> ${data.name}</h1> 
      <h2 class="user-subname"> ${data.login}</h2> 
      <p class="user-bio">${data.bio}</p>
      <div class="user-follower"> 
          <div class="user-follo"> 
              <h2 class="user-fol"> Repo</h2> 
              <h2 class="user-foll"> ${data.public_repos}</h2>
          </div>
          <div class="user-follo"> 
              <h2 class="user-fol"> Followers</h2> 
              <h2 class="user-foll"> ${data.followers}</h2>
              </div>
          <div class="user-follo"> 
              <h2 class="user-fol"> Following</h2>
              <h2 class="user-foll"> ${data.following}</h2>
            </div>
      </div>
      <div class="user-infoo"> 
          <div class="infoo">
              <img class="icon--mini" src="/icons/location.svg"  alt="location" />
              <h2 class="infoo-title"> ${data.location}</h2> 
              </div>
          <div class="infoo">
              <img class="icon--mini" src="/icons/link.svg"  alt="location" />
              <h2 class="infoo-title"> ${new Date(data.created_at)
                .toString()
                .split(" ")
                .slice(0, 4)}</h2> 
              </div>
          <div class="infoo">
              <img class="icon--mini" src="/icons/twitter.svg"  alt="location" />
              <h2 class="infoo-title"> ${data.twitter_username}</h2> 
              </div>
          <div class="infoo">
              <img class="icon--mini" src="/icons/github.svg"  alt="location" />
              <h2 class="infoo-title"> ${data.html_url}</h2>
          </div>
      </div>
      </div>`;

  if (gitResult.innerHTML) gitResult.innerHTML = "";

  gitResult.insertAdjacentHTML("beforeend", html);

  const img = document.querySelector(".git-user-img");
  img.src = "/img/users/default.jpg";
}
