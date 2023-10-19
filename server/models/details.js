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
    progress: {
        type: Number,
        min: [0, "Progress must be greater than 0"],
        max: [1, "Progress must not be greater than 1"],
    },
    isdone: {
        type: Boolean,
        default: false,
    },
    answer: {
        type: [String],
    },
    question: {
        type: [String],
    },
    correctanswer: {
        type: [String],
    },
});

// Model
exports.detailmodel = mongoose.model('details', detailSchema);