const express = require('express');
const {goPremium ,paymentSuccess, checkPlan, getAllExpenses}= require('../controller/goPremium.js');
const authenticateUser = require('../middleware/AuthenticateUser.js');
const router = express.Router();

router.post("/goPremium", authenticateUser,goPremium);
router.post("/paymentSuccess",authenticateUser,paymentSuccess);
router.get("/checkPlan",authenticateUser,checkPlan);
router.get("/getAllExpenses",authenticateUser,getAllExpenses);

module.exports = router;