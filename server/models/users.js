const mongoose = require('mongoose');

// Users Schema
const userSchema = mongoose.Schema({
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
  passwordhash:{
    type: String,
    required: [true, "Password is required"],
  }
});

// Model
exports.usermodel = mongoose.model('users', userSchema);