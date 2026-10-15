const express = require('express');
const { addExpense , deleteExpense ,getAllExpense , askAI } = require('../controller/expense');
const authenticateUser = require('../middleware/authenticateUser.js');
const router = express.Router();

router.post("/addExpense" , authenticateUser ,addExpense);
router.delete("/deleteExpense/:id",authenticateUser ,deleteExpense);
router.get("/getAllExpense" ,getAllExpense);
router.post("/askAI",askAI);

module.exports = router