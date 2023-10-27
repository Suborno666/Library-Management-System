const express = require('express');
const router = express.Router();
const adminControllers = require("../controllers/adminControllers")
const adminAuthorization = require("../controllers/authAdminControllers")
const { authenticateToken } = require('../middlewares/authMiddlewares'); 

//Get admin listing
router.get('/',adminControllers.findAll)

// Register admin
router.post('/',adminControllers.create)

// Update admin
router.put('/:id',authenticateToken('admin'),adminControllers.update)

//delete admin
router.delete('/:id',authenticateToken('admin'),adminControllers.delete)

//admin.login
router.post('/login',adminAuthorization.login)

//admin getUser
router.get('/me',adminAuthorization.getUser)

module.exports = router;