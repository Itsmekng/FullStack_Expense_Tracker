const express = require('express');
const { addExpense , deleteExpense ,getAllExpense } = require('../controller/expense');
const authenticateUser = require('../middleware/AuthenticateUser');
const router = express.Router();

router.post("/addExpense" , authenticateUser ,addExpense);
router.delete("/deleteExpense/:id",authenticateUser ,deleteExpense);
router.get("/getAllExpense",authenticateUser ,getAllExpense);

module.exports = router