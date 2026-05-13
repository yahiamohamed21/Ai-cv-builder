const mongoose = require('mongoose');

const resumeSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    title: {
        type: String,
        default: 'Untitled Resume'
    },
    templateId: {
        type: String,
        default: 'default-template'
    },
    personalInfo: {
        fullName: String,
        jobTitle: String,
        email: String,
        phone: String,
        location: String,
        linkedin: String,
        portfolio: String
    },
    summary: String,
    experience: [{
        company: String,
        position: String,
        startDate: String,
        endDate: String,
        current: Boolean,
        description: String
    }],
    education: [{
        institution: String,
        degree: String,
        fieldOfStudy: String,
        startDate: String,
        endDate: String,
        current: Boolean
    }],
    skills: [String],
    projects: [{
        title: String,
        link: String,
        description: String
    }]
}, { timestamps: true });

module.exports = mongoose.model('Resume', resumeSchema);