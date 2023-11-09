const mongoose = require('mongoose');
const newDate = new Date();
const defaultDate = new Date(newDate.getTime() - 7 * 60 * 60 * 1000);

// Folders Schema
const folderSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: false,
    required: [true, "Folder name is required"],
  },
  userid: {
    type: mongoose.ObjectId,
    ref: "users",
    required: [true, "User Id is required"],
    type: String,
  },
  content: {
    type: String,
    lowercase: false,
    required: [true, "Content is required"],
  },
  url: {
    type: String,
    lowercase: true,
    required: [true, "Url is required"],
  },
  exam: {
    type: Boolean,
    default: false,
  },
  examdate: {
    type: Date,

    default: defaultDate,

  },
  content: {
    type: String,
    lowercase: false,
    required: [true, "Content is required"],
  },
  url: {
    type: String,
    lowercase: true,
    required: [true, "Url is required"],
  },
  exam: {
    type: Boolean,
    default: false,
  },
  examdate: {
    type: Date,
    default: Date.now,
  },
});

// Model
exports.foldermodel = mongoose.model('folders', folderSchema);