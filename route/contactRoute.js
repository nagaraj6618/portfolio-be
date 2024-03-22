const express = require('express');
const {getAllContactInfo,postContactInfo , getOneContactInfo,deleteOneInfo} = require('../controller/contactController.js')
const router = express.Router();

router.get('/',getAllContactInfo);
router.post('/',postContactInfo);

router.get('/:id',getOneContactInfo)
router.delete('/:id',deleteOneInfo)
module.exports = router;
