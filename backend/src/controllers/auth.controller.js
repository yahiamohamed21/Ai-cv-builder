const asyncHandler = require('express-async-handler');
const { registerUser, loginUser, logoutUser, refreshAccessToken, changePasswordService } = require('../services/auth.service');
const ApiError = require('../utils/ApiError');

// @desc    Register new user
// @route   POST /api/auth/register
// @access  Public
const register = asyncHandler(async (req, res, next) => {
    const { fullName, email, password } = req.body;

    if (!fullName || !email || !password) {
        return next(new ApiError('Please provide fullName, email and password', 400));
    }

    const { user, accessToken, refreshToken } = await registerUser({ fullName, email, password });

    res.cookie('refreshToken', refreshToken, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
        maxAge: 7 * 24 * 60 * 60 * 1000 // 7 days
    });

    res.status(201).json({
        status: 'success',
        data: {
            user,
            accessToken
        }
    });
});

// @desc    Login user
// @route   POST /api/auth/login
// @access  Public
const login = asyncHandler(async (req, res, next) => {
    const { email, password } = req.body;

    if (!email || !password) {
        return next(new ApiError('Please provide email and password', 400));
    }

    const { user, accessToken, refreshToken } = await loginUser(email, password);

    res.cookie('refreshToken', refreshToken, { 
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
        maxAge: 7 * 24 * 60 * 60 * 1000 
    });

    res.status(200).json({
        status: 'success',
        data: {
            user,
            accessToken
        }
    });
});

// @desc    Logout user
// @route   POST /api/auth/logout
// @access  Public
const logout = asyncHandler(async (req, res, next) => {
    const tokenFromCookie = req.cookies?.refreshToken;
    
    if (tokenFromCookie) {
        // Clear it from the database
        await logoutUser(tokenFromCookie);
    }

    res.clearCookie('refreshToken', {
        httpOnly: true, 
        secure: process.env.NODE_ENV === 'production', 
        sameSite: 'strict', 
    });

    res.status(200).json({ 
        status: 'success',
        message: 'Logout successful' 
    });
});

// @desc    Refresh access token
// @route   POST /api/auth/refresh
// @access  Public
const refresh = asyncHandler(async (req, res, next) => {
    const tokenFromCookie = req.cookies?.refreshToken;

    if (!tokenFromCookie) {
        return next(new ApiError('No refresh token found in cookies', 401));
    }

    const newAccessToken = await refreshAccessToken(tokenFromCookie);

    res.status(200).json({
        status: 'success',
        data: {
            accessToken: newAccessToken
        }
    });
});

const changePassword = asyncHandler(async (req, res, next) => {
    const { oldPassword, newPassword } = req.body;

    if (!oldPassword || !newPassword) {
        return next(new ApiError('Please provide old and new passwords', 400));
    }

    const { user, accessToken, refreshToken } = await changePasswordService(req.user._id, oldPassword, newPassword);

    res.cookie('refreshToken', refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000
    });

    res.status(200).json({
        status: 'success',
        data: {
            user,
            accessToken
        }
    });
});

module.exports = {
    register,
    login,
    logout,
    refresh,
    changePassword
};
