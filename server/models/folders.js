const mongoose = require('mongoose');

// Folders Schema
const folderSchema = mongoose.Schema({
  name: {
    type: String,
    lowercase: true,
    required: [true, "Folder name is required"],
  },
  userid: {
    type: mongoose.ObjectId,
    ref: "users",
    required: [true, "User Id is required"],
  },
});

// Model
exports.foldermodel = mongoose.model('folders', folderSchema);