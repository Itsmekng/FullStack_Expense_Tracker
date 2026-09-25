const express = require('express');
const { addUser } = require('../controller/user');
const router = express.Router();

router.post("/addUser", addUser);

module.exports = router;