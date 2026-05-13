const User = require('../models/user.model');
const ApiError = require('../utils/ApiError');

const getUserProfile = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError('User not found', 404);
    }
    return user;
};

const updateUserProfile = async (userId, updateData) => {
    // Prevent updating password through this route
    if (updateData.password) {
        delete updateData.password;
    }

    const user = await User.findByIdAndUpdate(
        userId,
        { $set: updateData },
        { new: true, runValidators: true }
    ).select('-password');

    if (!user) {
        throw new ApiError('User not found', 404);
    }

    return user;
};

const getMe = async (userId) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError('User not found', 404);
    }
    return user;
};

module.exports = {
    getUserProfile,
    updateUserProfile,
    getMe
};