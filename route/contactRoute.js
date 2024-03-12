const express = require('express');
const {getAllContactInfo,postContactInfo , getOneContactInfo} = require('../controller/contactController.js')
const router = express.Router();

router.get('/',getAllContactInfo);
router.post('/',postContactInfo);

router.get('/:id',getOneContactInfo)
module.exports = router;
