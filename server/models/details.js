const mongoose = require('mongoose');

// Detail Schema
const detailSchema = mongoose.Schema({
    flashcardid: {
        type: mongoose.ObjectId,
        ref: "flashcards",
    },
    quizid: {
        type: mongoose.ObjectId,
        ref: "quizzes",
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
    isdone: {
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
exports.detailmodel = mongoose.model('details', detailSchema);