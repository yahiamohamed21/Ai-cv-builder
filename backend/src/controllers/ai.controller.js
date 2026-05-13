const asyncHandler = require('express-async-handler');
const aiService = require('../services/ai.service');
const ApiError = require('../utils/ApiError');

// @desc    Enhance resume section using AI
// @route   POST /api/ai/enhance
// @access  Private
const enhanceSection = asyncHandler(async (req, res, next) => {
    const { sectionContent, jobDescription } = req.body;

    if (!sectionContent) {
        return next(new ApiError('Please provide sectionContent to enhance', 400));
    }

    const enhancedText = await aiService.enhanceResumeSection(sectionContent, jobDescription);

    res.status(200).json({
        status: 'success',
        data: {
            enhancedText
        }
    });
});

module.exports = {
    enhanceSection
};
