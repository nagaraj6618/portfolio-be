const express = require('express');
const router = express.Router();
const { checkingMethod,registerMethod,loginMethod } = require("../controller/authController.js")
const { verifyAdmin } = require('../controller/authController.js')
router.get('/',checkingMethod);
router.post('/register',verifyAdmin,registerMethod);
router.post('/login',loginMethod);
module.exports = router;

// 