const mongoose = require("mongoose");

const filesSchema = new mongoose.Schema({
  file_name: {
    type: String,
    required: [true, "[FILE NAME REQUIRED]"],
  },
  file_type: {
    type: String,
    required: [true, "[FILE TYPE REQUIRED]"],
  },
  file_size: {
    type: Number,
    required: [false, "[FILE SIZE REQUIRED]"],
  },
  file_unique_path: {
    type: String,
    required: [true, "[FILE UNIQUE PATH REQUIRED]"],
    unique: true,
  },
  file_content: {
    type: String,
    required: [false, "[FILE CONTENT REQUIRED]"],
  },
});
const Files = mongoose.model("Files", filesSchema);

module.exports = Files;
