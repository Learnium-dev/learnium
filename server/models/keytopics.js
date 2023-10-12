const mongoose = require('mongoose');

// Keytopic Schema
const keytopicSchema = mongoose.Schema({
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
  progress: {
    type: Number,
    min: [0, "Progress must be greater than 0"],
    max: [1, "Progress must not be greater than 1"],
  },
});

// Model
exports.keytopicmodel = mongoose.model('keytopics', keytopicSchema);