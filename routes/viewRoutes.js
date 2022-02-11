const router = require("express").Router();
const viewController = require("../controller/viewController");
const authController = require("../controller/auth-controller");

router.route("/signup").get(viewController.signup);
router.route("/").get(viewController.login);
router.route("/login").get(viewController.login);

router.route("/overview").get(authController.isLoggedIn, viewController.overview);

router.route("/my-account").get(authController.protect, viewController.user);
router
  .route("/admin")
  .get(authController.protect, authController.restrict("admin"), viewController.admin);

module.exports = router;
