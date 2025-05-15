
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const authController = require('../controllers/authUserControllers');
const { authenticateToken } = require('../middlewares/authMiddlewares'); 

/* GET users listing. */

const userControllerInstance = new userController()

router.get('/', userControllerInstance.findAll);

// Register user
router.post('/', userControllerInstance.create);

// Update user (using authenticateToken middleware)
router.put('/:id', authenticateToken(['user','admin']), userControllerInstance.update);

router.delete('/:id', authenticateToken(['user','admin']), userControllerInstance.delete);

// Authenticate user
router.post('/login', authController.login);

// Get user profile
router.get('/me/:id', userControllerInstance.getUser);

module.exports = router;
