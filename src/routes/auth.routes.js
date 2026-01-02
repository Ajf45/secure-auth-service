const express = require("express");
const router = express.Router();
const ctrl = require("../controllers/auth.controller");
const limiter = require("../middleware/rateLimit.middleware");


router.post("/signup", limiter, ctrl.signup);
router.post("/login", limiter, ctrl.login);
router.post("/verify-otp", limiter, ctrl.verifyOTP);
module.exports = router;