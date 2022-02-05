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

/////////////////////////////////////////////////////////////////////////////////////////////////////////
// BACKEND CODE

const userLogin = async function (data) {
  try {
    const request = await fetch(`http://127.0.0.1:3000/api/v1/users/login`, {
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
    const request = await fetch(`http://127.0.0.1:3000/api/v1/users/logout`, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
      mode: "cors",
    });

    const response = await request.json();
    if (response.status === "success") {
      errorDisplay("Logged out!", "success");
      window.setTimeout(() => location.assign("/"), 1000);
    }
  } catch (err) {
    errorDisplay(`${err.message}`, "error");
  }
};

const userSignup = async function (data, endPoint) {
  try {
    const request = await fetch(`http://127.0.0.1:3000/api/v1/users/${endPoint}`, {
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
    const request = await fetch(`http://127.0.0.1:3000/api/v1/users/forgotPassword`, {
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
    const request = await fetch(`http://127.0.0.1:3000/api/v1/users/resetPassword/${token}`, {
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

const viewSendForgetEmail = async function (token, e) {
  e.preventDefault();
  const email = this.querySelector("#email-forget").value.trim();

  const response = await forgetPassword({ email });
  if (response.status === "success") {
    this.classList.add("hidden-helper");
    token.classList.remove("hidden-helper");
  } else return;
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

  this.querySelector(".form__btn").textContent = "Please wait...";

  const userData = {
    name: validatedData[1],
    email: validatedData[0],
    password: validatedData[4],
    passwordConfirm: validatedData[4],
    gender: validatedData[2],
    dob: validatedData[3],
  };

  const otp = await userSignup(userData, "validate");

  if (otp.status !== "success") return errorDisplay(otp.message, "error");

  sessionStorage.setItem("OTP", otp.OTP);
  sessionStorage.setItem("data", JSON.stringify(userData));

  this.classList.add("hidden-helper");

  this.nextElementSibling.classList.remove("hidden-helper");
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
