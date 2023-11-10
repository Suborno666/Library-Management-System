
const express = require('express');
const router = express.Router();
const adminControllers = require('../controllers/adminControllers');
const authController = require('../controllers/authAdminControllers');
const { authenticateToken } = require('../middlewares/authMiddlewares'); 

/* GET admins listing. */
router.get('/', adminControllers.findAll);

// Register admin
router.post('/', adminControllers.create);

// Update admin (using authenticateToken middleware)
router.put('/:id', authenticateToken(['admin']), adminControllers.update);

router.delete('/:id', authenticateToken(['admin']), adminControllers.delete);

// Authenticate admin
router.post('/login', authController.login);

// Get admin profile
router.get('/me/:id', adminControllers.getAdmin);

module.exports = router;
