const express = require("express");
const router = express.Router();

const Files = require("../models/fileModel");

router.post("/all", async (req, res) => {
  try {
    const documents = await Files.find(
      {},
      {
        file_name: 1,
        file_type: 1,
        file_size: 1,
        file_unique_path: 1,
        _id: 0,
      }
    );

    const sortedDocuments = await sortDocuments(documents);
    const reformattedFiles = await reformatFiles(sortedDocuments);
    const finalFileTree = await orderFiles(reformattedFiles);

    res.json(reformattedFiles);
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Internal server error" });
  }
});

//Format files from parallel structure into tree structure
reformatFiles = async (documents) => {
  return await reformatEnities(documents, 0);
};
reformatEnities = async (documents, level) => {
  var documentsByPath = {};
  let keyPath = [];

  let parent_files = [];

  for (let i = 0; i < documents.length; i++) {
    const path = documents[i].file_unique_path.split("/");
    if (path.length - 1 === level) {
      const current_file = {
        fileName: documents[i].file_name,
        fileType: "file",
        fileFormat: documents[i].file_type,
        filePath: documents[i].file_unique_path,
        files: [],
      };
      parent_files.push(current_file);
      continue;
    }
    if (!documentsByPath[path[level]]) {
      documentsByPath[path[level]] = [];
      keyPath.push(path[level]);
    }
    documentsByPath[path[level]].push(documents[i]);
  }

  for (let i = 0; i < keyPath.length; i++) {
    children_files = await reformatEnities(
      documentsByPath[keyPath[i]],
      level + 1
    );
    const path = documentsByPath[keyPath[i]][0].file_unique_path.split("/");
    const fullPath = path.slice(0, level + 1).join("/");

    current_file = {
      fileName: keyPath[i],
      fileType: "folder",
      filePath: fullPath,
      files: children_files,
    };
    parent_files.push(current_file);
  }

  return parent_files;
};

//Sort documents by file_unique_path
sortDocuments = async (documents) => {
  return documents.sort((a, b) => {
    const pathIndexA = a.file_unique_path.split("/").length;
    const pathIndexB = b.file_unique_path.split("/").length;

    if (pathIndexA < pathIndexB) {
      return 1;
    }
    if (pathIndexA > pathIndexB) {
      return -1;
    }

    if (pathIndexA === pathIndexB) {
      if (a.file_unique_path < b.file_unique_path) {
        return -1;
      }
      if (a.file_unique_path > b.file_unique_path) {
        return 1;
      }
    }
    return 0;
  });
};

//Reorder files by folder first then file
orderFiles = async (files) => {
  return await orderFilesByType(files);
};
orderFilesByType = async (files) => {
  let orderedFiles = [];
  for (let i = 0; i < files.length; i++) {
    if (files[i].fileType === "folder") {
      files[i].files = await orderFilesByType(files[i].files);
      orderedFiles.push(files[i]);
    }
  }
  for (let i = 0; i < files.length; i++) {
    if (files[i].fileType !== "folder") {
      orderedFiles.push(files[i]);
    }
  }
  return orderedFiles;
};

module.exports = router;
