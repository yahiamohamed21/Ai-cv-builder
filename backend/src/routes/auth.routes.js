const express = require('express');
const router = express.Router();
const rateLimit = require('express-rate-limit');
const { register, login, logout, refresh, changePassword } = require('../controllers/auth.controller');
const { protect } = require('../middlewares/authMiddleware');
const validateReq = require('../middlewares/validateReq');
const { registerSchema, loginSchema, changePasswordSchema } = require('../validations/auth.validation');

// Rate limiting for auth routes to prevent brute-force attacks
const authLimiter = rateLimit({
    windowMs: 15 * 60 * 1000, // 15 minutes
    max: 20, // Limit each IP to 20 requests per windowMs
    message: 'Too many requests from this IP, please try again after 15 minutes'
});

router.post('/register', authLimiter, validateReq(registerSchema), register);
router.post('/login', authLimiter, validateReq(loginSchema), login);
router.post('/logout', logout);
router.post('/refresh', refresh);
router.post('/change-password', protect, validateReq(changePasswordSchema), changePassword);

module.exports = router;
