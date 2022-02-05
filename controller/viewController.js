const catchAsync = require("../utils/catchAsync");

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

// exports.user = catchAsync(async (req, res, next) => {
//   res.status(200).render("user", {
//     title: "GreenBuy | User",
//   });
// });
