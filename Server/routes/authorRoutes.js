const express = require('express');
const router = express.Router();
const authorControllers = require('../controllers/authorControllers')

router.get('/',authorControllers.findAll)

router.post('/',authorControllers.create)

module.exports = router