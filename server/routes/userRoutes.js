
const express = require('express');
const router = express.Router();
const userController = require('../controllers/userControllers');
const authController = require('../controllers/authUserControllers');
const { authenticateToken } = require('../middlewares/authMiddlewares'); 

/* GET users listing. */
router.get('/', userController.findAll);

// Register user
router.post('/', userController.create);

// Update user (using authenticateToken middleware)
router.put('/:id', authenticateToken(['user','admin']), userController.update);

router.delete('/:id', authenticateToken(['user','admin']), userController.delete);

// Authenticate user
router.post('/login', authController.login);

// Get user profile
router.get('/me/:id', userController.getUser);

module.exports = router;
