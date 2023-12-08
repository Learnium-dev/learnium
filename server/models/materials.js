const mongoose = require('mongoose');

// Material Schema
const materialSchema = mongoose.Schema({
    folderid: {
      type: mongoose.ObjectId,
      ref: "folders",
      required: [true, "Folder Id is required"],
    },
    name: {
      type: String,
      // lowercase: true, **title no need to be lowercase, why it is here?
      required: [true, "Name is required"],
    },
    content: {
      type: String,
      // lowercase: true,
      // required: [true, "Content is required"],
    },
    url: {
      type: String,
      lowercase: true,
      // required: [true, "Url is required"],
    },
    exam: {
      type: Boolean,
    },
    examdate: {
      type: Date,
      default: false,
    },
  });

// Model
exports.materialmodel = mongoose.model('materials', materialSchema);