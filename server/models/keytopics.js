const mongoose = require('mongoose');
const newDate = new Date();
const defaultDate = new Date(newDate.getTime() - 7 * 60 * 60 * 1000);

// Keytopic Schema
const keytopicSchema = mongoose.Schema({
  folderid: {
    type: mongoose.ObjectId,
    ref: "folders",
    required: [true, "Folder Id is required"],
  },
  name: {
    type: String,
    lowercase: false,
    required: [true, "Name is required"],
  },
  progress: {
    type: Number,
    min: [0, "Progress must be greater than 0"],
    max: [100, "Progress must not be greater than 100"],
    default: 0,
  },
  summary: {
    type: String,
    lowercase: false,
    required: [true, "Summary is required"],

  },
  duedate: {
    type: Date,
    default: defaultDate,

  },
});

// Model
exports.keytopicmodel = mongoose.model('keytopics', keytopicSchema);