const mongoose = require('mongoose');

// Quiz Schema
const quizSchema = mongoose.Schema({
    keytopicid: {
      type: mongoose.ObjectId,
      ref: "keytopics",
      required: [true, "Keytopic Id is required"],
    },
    materialid: {
      type: mongoose.ObjectId,
      ref: "materials",
      required: [true, "Material Id is required"],
    },
    name: {
      type: String,
      lowercase: true,
      required: [true, "Name is required"],
    },
    duedate: {
      type: Date,
      default: Date.now,
    },
    progress: {
      type: Number,
      min: [0, "Progress must be greater than 0"],
      max: [1, "Progress must not be greater than 1"],
    },
});

// Model
exports.quizmodel = mongoose.model('quizzes', quizSchema);