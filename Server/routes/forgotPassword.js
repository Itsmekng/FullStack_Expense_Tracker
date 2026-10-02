const express = require('express');
const router = express.Router();
const { resetpassword , newpassword } = require('../controller/forgetPassword.js');

router.get('/resetpassword/:id', resetpassword);
router.post("/newpassword",newpassword);

module.exports = router;