const express = require('express');
const router = express.Router();
const emiController = require('../controller/controller');

router.post('/calculate-emi', emiController.calculateEMI);
router.get('/emis', emiController.getAllEMIs);
router.get('/emi/:id', emiController.getEMIById);

module.exports = router;
