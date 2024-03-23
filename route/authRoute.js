const express = require('express');
const router = express.Router();
const {checkingMethod,registerMethod,loginMethod} = require("../controller/authController.js")

router.get('/',checkingMethod);
router.post('/register',registerMethod);
router.post('/login',loginMethod);
module.exports = router;

// 