const Resume = require('../models/resume.model');
const ApiError = require('../utils/ApiError');

const createResume = async (userId, resumeData) => {
    const resume = await Resume.create({ ...resumeData, userId });
    return resume;
};

const getUserResumes = async (userId, query) => {
    // Pagination
    const page = Math.max(1, parseInt(query.page) || 1);
    const limit = Math.min(Math.max(parseInt(query.limit) || 10, 1), 50);
    const skip = (page - 1) * limit;

    // Search Filter
    const filter = { userId };
    if (query.search) {
        // Search by title (case-insensitive)
        filter.title = { $regex: query.search, $options: 'i' };
    }

    const resumes = await Resume.find(filter).skip(skip).limit(limit).sort({ updatedAt: -1 });
    const totalResumes = await Resume.countDocuments(filter);
    return { resumes, totalResumes, page, limit };
};

const getResumeById = async (userId, resumeId) => {
    const resume = await Resume.findOne({ _id: resumeId, userId });
    if (!resume) {
        throw new ApiError('Resume not found', 404);
    }
    return resume;
};

const updateResume = async (userId, resumeId, updateData) => {
    const resume = await Resume.findOneAndUpdate(
        { _id: resumeId, userId },
        { $set: updateData },
        { new: true, runValidators: true }
    );

    if (!resume) {
        throw new ApiError('Resume not found', 404);
    }
    return resume;
};

const deleteResume = async (userId, resumeId) => {
    const resume = await Resume.findOneAndDelete({ _id: resumeId, userId });
    if (!resume) {
        throw new ApiError('Resume not found', 404);
    }
    return resume;
};

module.exports = {
    createResume,
    getUserResumes,
    getResumeById,
    updateResume,
    deleteResume
};