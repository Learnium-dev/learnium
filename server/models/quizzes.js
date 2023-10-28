const mongoose = require('mongoose');
const newDate = new Date();
const defaultDate = new Date(newDate.getTime() - 7 * 60 * 60 * 1000);

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
      default: defaultDate,
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