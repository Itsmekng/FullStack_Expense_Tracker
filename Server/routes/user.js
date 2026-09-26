const express = require('express');
const { createAccount , loginAccount } = require('../controller/user');
const router = express.Router();

router.post("/createAccount", createAccount);
router.post("/loginAccount", loginAccount);

module.exports = router;