const express = require('express');
const router = express.Router();
const { enhanceSection } = require('../controllers/ai.controller');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect); // Secure AI routes

router.post('/enhance', enhanceSection);

module.exports = router;
