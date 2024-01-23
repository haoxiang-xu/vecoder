import React, { useState, useEffect, useRef } from "react";
import VecoderEditor from "../../COMPONENTs/vecoder_editor/vecoder_editor";
import RightClickContextMenu from "../../COMPONENTs/rightClickContextMenu/rightClickContextMenu";
import Explorer from "../../COMPONENTs/explorer/explorer";

import "./development_editor.css";

const ElectronEditor = () => {
  const raw_files = [
    {
      fileName: "main.js",
      fileLanguage: "javascript", 
      fileContent: `import React;`
    }
  ];

  const files_structure = {
    fileName: "project",
    fileType: "folder",
    filePath: "project",
    fileExpend: false,
    files: [] 
  }

  const [files, setFiles] = useState(files_structure);

  useEffect(() => {
    if (window.electronAPI) {
      window.electronAPI.receive("directory-data", (data) => {
        if (data.error) {
          console.log("Error: ", data.error);
        } else {
          setFiles(data.dirs);
          console.log("directory-data: ", data.dirs);
        }
      });
    } else {
      console.error('electronAPI is not available');
    }
  }, []);

  //Right Click Menu
  const [isRightClicked, setIsRightClicked] = useState(false);
  const [rightClickX, setRightClickX] = useState(-1);
  const [rightClickY, setRightClickY] = useState(-1);
  const [onRightClickItem, setOnRightClickItem] = useState(null);
  const [rightClickCommand, setRightClickCommand] = useState(null);
  const handleRightClick = (event) => {
    event.preventDefault();
    setIsRightClicked(true);

    const boundingRect = event.currentTarget.getBoundingClientRect();

    const rightClickX = event.clientX - boundingRect.left;
    const rightClickY = event.clientY - boundingRect.top;

    setRightClickX(rightClickX);
    setRightClickY(rightClickY);
  };
  const handleLeftClick = (event) => {
    setIsRightClicked(false);
    setOnRightClickItem(null);
  };
  return (
    <div onContextMenu={handleRightClick} onClick={handleLeftClick}>
      <div className="vector_editor_container1116">
        <VecoderEditor
          imported_files={raw_files}
          onRightClickItem={onRightClickItem}
          setOnRightClickItem={setOnRightClickItem}
          rightClickCommand={rightClickCommand}
          setRightClickCommand={setRightClickCommand}
        />
      </div>
      <div className="explorer_container1116">
        <Explorer
          files={files}
          onRightClickItem={onRightClickItem}
          setOnRightClickItem={setOnRightClickItem}
          rightClickCommand={rightClickCommand}
          setRightClickCommand={setRightClickCommand}
        />
      </div>
      {isRightClicked ? (
        <RightClickContextMenu
          x={rightClickX}
          y={rightClickY}
          onRightClickItem={onRightClickItem}
          setRightClickCommand={setRightClickCommand}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default ElectronEditor;
