const express = require('express');
const router = express.Router();
const { generateResumePDF } = require('../controllers/pdf.controller');
const { protect } = require('../middlewares/authMiddleware');

router.use(protect); // Secure PDF routes

router.post('/generate', generateResumePDF);

module.exports = router;
