const express = require('express');
const router = express.Router();
const bookcontroller = require("../controllers/bookControllers")


router.get('/',bookcontroller.findAll)
router.post('/',bookcontroller.create)

module.exports = router