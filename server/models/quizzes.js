const mongoose = require('mongoose');

// Quiz Schema
const quizSchema = mongoose.Schema({
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
      default: Date.now,
    },
    progress: {
      type: Number,
      min: [0, "Progress must be greater than 0"],
      max: [1, "Progress must not be greater than 1"],
      default: 0,
    },
});

// Model
exports.quizmodel = mongoose.model('quizzes', quizSchema);