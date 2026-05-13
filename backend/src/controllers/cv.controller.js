const asyncHandler = require('express-async-handler');
const cvService = require('../services/cv.service');

// @desc    Create a new resume
// @route   POST /api/resumes
// @access  Private
const createResume = asyncHandler(async (req, res) => {
    const resume = await cvService.createResume(req.user._id, req.body);
    res.status(201).json({ status: 'success', data: { resume } });
});

// @desc    Get all user resumes
// @route   GET /api/resumes
// @access  Private
const getResumes = asyncHandler(async (req, res) => {
    const { resumes, totalResumes, page, limit } = await cvService.getUserResumes(req.user._id, req.query);
    const totalPages = Math.ceil(totalResumes / limit) || 1;

    res.status(200).json({ 
        status: 'success', 
        data: { 
            resumes,
            meta: {
                totalResumes,
                totalPages,
                currentPage: page,
                limit
            }
        } 
    });
});

// @desc    Get single resume
// @route   GET /api/resumes/:id
// @access  Private
const getResume = asyncHandler(async (req, res) => {
    const resume = await cvService.getResumeById(req.user._id, req.params.id);
    res.status(200).json({ status: 'success', data: { resume } });
});

// @desc    Update resume (Auto-save)
// @route   PATCH /api/resumes/:id
// @access  Private
const updateResume = asyncHandler(async (req, res) => {
    const resume = await cvService.updateResume(req.user._id, req.params.id, req.body);
    res.status(200).json({ status: 'success', data: { resume } });
});

// @desc    Delete resume
// @route   DELETE /api/resumes/:id
// @access  Private
const deleteResume = asyncHandler(async (req, res) => {
    await cvService.deleteResume(req.user._id, req.params.id);
    res.status(200).json({ status: 'success', message: 'Resume deleted successfully' });
});

module.exports = {
    createResume,
    getResumes,
    getResume,
    updateResume,
    deleteResume
};