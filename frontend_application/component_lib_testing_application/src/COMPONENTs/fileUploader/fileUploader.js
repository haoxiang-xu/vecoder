import React, { useState } from "react";
import axios from "axios";

const FolderUpload = () => {
  const [selectedFiles, setSelectedFiles] = useState([]);

  const handleFolderChange = (event) => {
    const files = Array.from(event.target.files);
    setSelectedFiles(files);
  };

  const sendFiles = async () => {
    for (const file of selectedFiles) {
      const reader = new FileReader();

      reader.onload = async (e) => {
        const content = e.target.result;

        const fileData = {
          file_name: file.name,
          file_type: file.type,
          file_size: file.size,
          file_unique_path: file.webkitRelativePath,
          file_content: content,
        };

        try {
          const response = await axios.post(
            "http://localhost:8000/insertFiles/",
            fileData
          );
          console.log("[UPLOAD SUCCESSFULLY]");
        } catch (err) {
          console.error("[ERROR]: " + err);
        }
      };

      reader.readAsText(file);
    }
  };

  return (
    <div>
      <label>
        Upload a folder:
        <input
          type="file"
          directory=""
          webkitdirectory=""
          onChange={handleFolderChange}
        />
      </label>
      <button onClick={sendFiles}>Send Files</button>
    </div>
  );
};

export default FolderUpload;
