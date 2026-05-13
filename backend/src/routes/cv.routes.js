const express = require('express');
const router = express.Router();
const {
    createResume,
    getResumes,
    getResume,
    updateResume,
    deleteResume
} = require('../controllers/cv.controller');
const { protect } = require('../middlewares/authMiddleware');
const validateReq = require('../middlewares/validateReq');
const { resumeValidationSchema } = require('../validations/cv.validation');

router.use(protect); // All resume routes are protected

router.route('/')
    .post(validateReq(resumeValidationSchema), createResume)
    .get(getResumes);

router.route('/:id')
    .get(getResume)
    .patch(validateReq(resumeValidationSchema), updateResume)
    .delete(deleteResume);

module.exports = router;