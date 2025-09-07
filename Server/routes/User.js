const express = require("express");
const router = express.Router();


const {
    login,
    signup,
    sendOTP,
    changePassword
} = require("../controllers/Auth");

const {resetPasswordToken, resetPassword } = require("../controllers/ResetPassword");

const {auth} =require("../middlewares/auth");

router.post("/login", login);
router.post("/signup", signup);

router.post("/changePassword",auth, changePassword);
router.post("/resetPasswordToken", resetPasswordToken);
router.post("/resetPassword", resetPassword);
router.post("/sendotp", sendOTP);

module.exports = router;