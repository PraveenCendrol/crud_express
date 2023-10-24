const express = require("express");
const loginController = require("../controller/login");

const router = express.Router();

router.route("/userimage").post(loginController.getUserdetails);

router.route("/updatePassword").put(loginController.updatePassword);
router
  .route("/")
  .post(loginController.loginUser)
  .put(loginController.createUser);

module.exports = router;
