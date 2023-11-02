const mongoose = require('mongoose');
const newDate = new Date();
const defaultDate = new Date(newDate.getTime() - 7 * 60 * 60 * 1000);

// Flashcard Schema
const flashcardSchema = mongoose.Schema({
    keytopicid: {
        type: mongoose.ObjectId,
        ref: "keytopics",
        required: [true, "Keytopic Id is required"],
    },
    folderid: {
        type: mongoose.ObjectId,
        ref: "folders",
        required: [true, "Folder Id is required"],
    },
    duedate: {
        type: Date,

        default: defaultDate,

    },
    progress: {
        type: Number,
        min: [0, "Progress must be greater than 0"],
        max: [100, "Progress must not be greater than 100"],
        default: 0,
    },
    practicemode: {
        type: Boolean,
        default: false,
    },
},
{ 
    toJSON: { virtuals: true },
    toObject: { virtuals: true }
});

// To populate details together with flashcards
flashcardSchema.virtual('details', {
    ref: 'details',
    localField: '_id',
    foreignField: 'flashcardid',
    justOne: false
});

// Model
exports.flashcardmodel = mongoose.model('flashcards', flashcardSchema);