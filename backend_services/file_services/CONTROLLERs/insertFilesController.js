const express = require("express");
const router = express.Router();

const Files = require("../models/fileModel");

router.post("/", async (req, res) => {
  try {
    const file_name = req.body.file_name;
    const file_type = req.body.file_type;
    const file_size = req.body.file_size;
    const file_unique_path = req.body.file_unique_path;
    const file_content = req.body.file_content;

    const newFile = new Files({
      file_name: file_name,
      file_type: file_type,
      file_size: file_size,
      file_unique_path: file_unique_path,
      file_content: file_content,
    });
    const savedFile = await newFile.save();
    res.json(savedFile);
  } catch (err) {
    console.error(err);
    res.status(500).send("[SERVER ERROR]");
  }
});

// router.post("/untitledFile", async (req, res) => {
//   try {
//     let file_name = 'untitled_file';

//     const file_type = req.body.file_type;
//     const file_size = req.body.file_size;
//     const file_unique_path = req.body.file_unique_path;
//     const file_content = req.body.file_content;

router.post("/test", async (req, res) => {
  res.json(req.body);
});

module.exports = router;
