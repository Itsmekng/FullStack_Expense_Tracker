const express = require('express');
const { forgetPassword } = require('../controller/sendEmail');
const router = express.Router();

router.post("/password/forgotpassword", forgetPassword);

module.exports = router;