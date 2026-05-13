const asyncHandler = require('express-async-handler');
const pdfService = require('../services/pdf.service');
const ApiError = require('../utils/ApiError');

// @desc    Generate PDF from HTML content
// @route   POST /api/pdf/generate
// @access  Private
const generateResumePDF = asyncHandler(async (req, res, next) => {
    const { htmlContent } = req.body;

    if (!htmlContent) {
        return next(new ApiError('Please provide htmlContent', 400));
    }

    const pdfBuffer = await pdfService.generatePDF(htmlContent);

    res.set({
        'Content-Type': 'application/pdf',
        'Content-Disposition': 'attachment; filename="resume.pdf"',
        'Content-Length': pdfBuffer.length
    });

    res.status(200).send(pdfBuffer);
});

module.exports = {
    generateResumePDF
};
