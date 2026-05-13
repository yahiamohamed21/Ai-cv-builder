const express = require('express');
const router = express.Router();
const { getProfile, updateProfile, getMe } = require('../controllers/user.controller');
const { protect } = require('../middlewares/authMiddleware');

router.route('/profile')
    .get(protect, getProfile)
    .patch(protect, updateProfile);

router.route('/me')
    .get(protect, getMe);

module.exports = router;