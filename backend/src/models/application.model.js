const mongoose = require('mongoose');

const applicationSchema = new mongoose.Schema({
    userId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    cvId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Resume',
        required: true
    },
    companyName: {
        type: String,
        required: true
    },
    position: {
        type: String,
        required: true
    },
    status: {
        type: String,
        enum: ['Applied', 'Interview', 'Offer', 'Rejected'],
        default: 'Applied'
    },
    applicationDate: {
        type: Date,
        default: Date.now
    },
    notes: String
}, { timestamps: true });

module.exports = mongoose.model('Application', applicationSchema);
