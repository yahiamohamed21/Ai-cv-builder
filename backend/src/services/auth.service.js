const User = require('../models/user.model');
const jwt = require('jsonwebtoken');
const ApiError = require('../utils/ApiError');

const generateAccessToken = (user) => {
    return jwt.sign({ id: user._id , fullName: user.fullName, email: user.email, role: user.role}, process.env.JWT_SECRET, { expiresIn: '15m' });
};

const generateRefreshToken = (user) => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET_REFRESH, { expiresIn: '7d' });
};

// Register User
const registerUser = async (userData) => {
    // Check if user already exists
    const userExists = await User.findOne({ email: userData.email });
    if (userExists) {
        throw new ApiError('Email already in use', 400);
    }

    const user = await User.create(userData);
    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();
    
    // Convert to object and remove password and refreshToken before returning
    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken };
};

// Login User
const loginUser = async (email, password) => {
    const user = await User.findOne({ email });
    if (!user || !(await user.matchPassword(password))) {
        throw new ApiError('Incorrect email or password', 401);
    }

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);

    user.refreshToken = refreshToken;
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken };
};

// Logout User
const logoutUser = async (refreshToken) => {
    const user = await User.findOne({ refreshToken });
    if (user) {
        user.refreshToken = null;
        await user.save();
    }
};

// Refresh Access Token
const refreshAccessToken = async (refreshToken) => {
    if (!refreshToken) {
        throw new ApiError('Not authorized, no refresh token', 401);
    }

    try {
        const decoded = jwt.verify(refreshToken, process.env.JWT_SECRET_REFRESH);
        const user = await User.findById(decoded.id);

        if (!user || user.refreshToken !== refreshToken) {
            throw new ApiError('Not authorized, token failed or expired', 401);
        }

        const newAccessToken = generateAccessToken(user);
        return newAccessToken;
    } catch (error) {
        throw new ApiError('Not authorized, token failed or expired', 401);
    }
};

const changePasswordService = async (userId, oldPassword, newPassword) => {
    const user = await User.findById(userId);
    if (!user) {
        throw new ApiError('User not found', 404);
    }

    if (!(await user.matchPassword(oldPassword))) {
        throw new ApiError('Incorrect old password', 401);
    }

    user.password = newPassword;
    await user.save();

    const accessToken = generateAccessToken(user);
    const refreshToken = generateRefreshToken(user);
    user.refreshToken = refreshToken;
    await user.save();

    const userObj = user.toObject();
    delete userObj.password;
    delete userObj.refreshToken;

    return { user: userObj, accessToken, refreshToken };
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    refreshAccessToken,
    changePasswordService
};