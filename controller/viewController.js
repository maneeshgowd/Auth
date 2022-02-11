const catchAsync = require("../utils/catchAsync");
const User = require("../models/userModel");

exports.overview = (req, res) => {
  res.status(200).render("overview", {
    title: "Auth | Home",
  });
};

exports.login = catchAsync(async (req, res, next) => {
  res.status(200).render("login", {
    title: "Auth | Login",
  });
});

exports.signup = catchAsync(async (req, res, next) => {
  res.status(200).render("signup", {
    title: "Auth | Signup",
  });
});

exports.user = catchAsync(async (req, res, next) => {
  res.status(200).render("user", {
    title: "Auth | User",
  });
});

exports.admin = catchAsync(async (req, res, next) => {
  const users = await User.find();

  res.status(200).render("admin", {
    title: "Auth | Admin Panel",
    users,
  });
});
