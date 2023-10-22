const mongoose = require('mongoose');

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