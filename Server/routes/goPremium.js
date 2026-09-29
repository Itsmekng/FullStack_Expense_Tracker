const express = require('express');
const {goPremium ,paymentSuccess}= require('../controller/goPremium.js');
const authenticateUser = require('../middleware/AuthenticateUser.js');
const router = express.Router();

router.post("/goPremium", authenticateUser,goPremium);
router.post("/paymentSuccess",authenticateUser,paymentSuccess)

module.exports = router;