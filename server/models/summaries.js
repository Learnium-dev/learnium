const mongoose = require('mongoose');

// Summary  Schema
const summarySchema = mongoose.Schema({  
    keytopicid: {
      type: mongoose.ObjectId,
      ref: "keytopics",
      required: [true, "Ketyopic Id is required"],
    },
    materialid: {
      type: mongoose.ObjectId,
      ref: "materials",
      required: [true, "Material Id is required"],
    },
    summary: {
      type: String,
      lowercase: true,
      required: [true, "Summary is required"],
    },
    duedate: {
      type: Date,
    },
    progress: {
      type: Number,
      min: [0, "Progress must be greater than 0"],
      max: [1, "Progress must not be greater than 1"],
    },
});

// Model
exports.summarymodel = mongoose.model('summaries', summarySchema);