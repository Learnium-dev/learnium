const mongoose = require('mongoose');
const newDate = new Date();
const defaultDate = new Date(newDate.getTime() - 7 * 60 * 60 * 1000);

// Quiz Schema
const historyQuizSchema = mongoose.Schema({
    folderid: {
      type: mongoose.ObjectId,
      ref: "folders",
    },
    keytopicid: {
      type: mongoose.ObjectId,
      ref: "keytopics",
    },
    duedate: { 
      // the date the quiz is finished
      type: Date,
      default: defaultDate,
    },
    progress: {
      type: Number,
      min: [0, "Progress must be greater than 0"],
      max: [100, "Progress must not be greater than 100"],
      default: 0,
    },
});

// Model
exports.historyquizmodel = mongoose.model('historyquizzes', historyQuizSchema);