const mongoose = require('mongoose');

// Detail Schema
const historyDetailSchema = mongoose.Schema({
    historyquizid: {
        type: mongoose.ObjectId,
        ref: "historyquizzes",
    },
    folderid: {
        type: mongoose.ObjectId,
        ref: "folders",
    },
    progress: {
        type: Number,
        min: [0, "Progress must be greater than 0"],
        max: [100, "Progress must not be greater than 100"],
        default: 0,
    },
    index: {
        type: Number,
        default: 0,
    },
    correct: {
        type: Boolean,
        default: false,
    },
    answer: {
        type: [String],
    },
    question: {
        type: String,
        lowercase: false,
        required: [true, "Name is required"],
    },
    correctanswer: {
        type: [String],
    },
    type:{
        type: String,
        lowercase: false,
    },
    options:{
        type: [String],
        lowercase: false,
        required: [true, "Questions options is required"],
    }
});

// Model
exports.historydetailmodel = mongoose.model('historydetails', historyDetailSchema);