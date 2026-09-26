const express = require('express');
const { addExpense , deleteExpense ,getAllExpense } = require('../controller/expense');
const router = express.Router();

router.post("/addExpense",addExpense);
router.delete("/deleteExpense/:id",deleteExpense);
router.get("/getAllExpense",getAllExpense);

module.exports = router