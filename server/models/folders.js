const mongoose = require('mongoose');

// Folders Schema
const folderSchema = mongoose.Schema({
  email: {
    type: String,
    lowercase: true,
    unique: [true, "Email already exists"],
    required: [true, "Email is required"],
  },
  firstname: {
    type: String,
    required: [true, "First Name is required"],
  },
  lastname: {
    type: String,
    required: [true, "Last Name is required"],
  },
  notification: {
    type: Boolean,
    default: false,
  },
});

// Model
exports.foldermodel = mongoose.model('folders', folderSchema);