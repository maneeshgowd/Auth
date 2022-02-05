const router = require("express").Router();
const viewController = require("../controller/viewController");
const authController = require("../controller/auth-controller");

router.route("/login").get(viewController.login);
router.route("/signup").get(viewController.signup);

router.route("/").get(authController.isLoggedIn, viewController.overview);

// router.route("/my-account").get(authController.protect, viewController.user);

module.exports = router;
