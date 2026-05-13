const asyncHandler = require('express-async-handler');
const { getUserProfile, updateUserProfile, getMe: getMeService } = require('../services/user.service');

// @desc    Get user profile
// @route   GET /api/users/profile
// @access  Private
const getProfile = asyncHandler(async (req, res) => {
    const user = await getUserProfile(req.user._id);

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

// @desc    Update user profile
// @route   PATCH /api/users/profile
// @access  Private
const updateProfile = asyncHandler(async (req, res) => {
    const user = await updateUserProfile(req.user._id, req.body);

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

// @desc    Get user profile
// @route   GET /api/users/me
// @access  Private
const getMe = asyncHandler(async (req, res) => {
    const user = await getMeService(req.user._id);

    res.status(200).json({
        status: 'success',
        data: {
            user
        }
    });
});

module.exports = {
    getProfile,
    updateProfile,
    getMe
};