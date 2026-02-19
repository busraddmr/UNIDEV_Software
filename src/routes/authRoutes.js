const express = require('express');
const router = express.Router();
const authController = require('../controllers/authController');

router.post('/register', authController.register);
router.post('/login', authController.login);

module.exports = router;
const checkAuth = require('../middlewares/auth');
router.put('/profile', checkAuth, authController.updateProfile);