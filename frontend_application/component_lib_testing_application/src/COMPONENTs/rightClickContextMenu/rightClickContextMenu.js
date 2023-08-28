import React, { useState, useEffect, useRef } from "react";

import "./rightClickContextMenu.css";

import ContextItem from "./contextItem/contextItem";

const RightClickContextMenu = ({
  x,
  y,
  onRightClickItem,
  setRightClickCommand,
  copyFile,
}) => {
  let contextItems = [];

  const progressRightClickCommand = (command) => {
    setRightClickCommand({
      command: command,
      target_file: onRightClickItem,
    });
  };

  if (onRightClickItem !== null) {
    if (onRightClickItem.filePath.split("/").length === 1) {
      contextItems = [
        <ContextItem
          key={"newFile"}
          item_function={"newFile"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"newFolder"}
          item_function={"newFolder"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"insertFile"}
          item_function={"insertFile"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"hr1"}
          item_function={"hr"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"paste"}
          item_function={"paste"}
          progressRightClickCommand={progressRightClickCommand}
          pasteFileName={copyFile.fileName}
        />,
        <ContextItem
          key={"duplicate"}
          item_function={"duplicate"}
          progressRightClickCommand={progressRightClickCommand}
        />,
      ];
    } else if (onRightClickItem.fileType === "folder" && copyFile === null) {
      contextItems = [
        <ContextItem
          key={"newFile"}
          item_function={"newFile"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"newFolder"}
          item_function={"newFolder"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"insertFile"}
          item_function={"insertFile"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"hr1"}
          item_function={"hr"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"copy"}
          item_function={"copy"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"paste"}
          item_function={"unpaste"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"duplicate"}
          item_function={"duplicate"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"hr2"}
          item_function={"hr"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"rename"}
          item_function={"rename"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"delete"}
          item_function={"delete"}
          progressRightClickCommand={progressRightClickCommand}
        />,
      ];
    } else if (onRightClickItem.fileType === "folder" && copyFile !== null) {
      contextItems = [
        <ContextItem
          key={"newFile"}
          item_function={"newFile"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"newFolder"}
          item_function={"newFolder"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"insertFile"}
          item_function={"insertFile"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"hr1"}
          item_function={"hr"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"copy"}
          item_function={"copy"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"paste"}
          item_function={"paste"}
          progressRightClickCommand={progressRightClickCommand}
          pasteFileName={copyFile.fileName}
        />,
        <ContextItem
          key={"duplicate"}
          item_function={"duplicate"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"hr2"}
          item_function={"hr"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"rename"}
          item_function={"rename"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"delete"}
          item_function={"delete"}
          progressRightClickCommand={progressRightClickCommand}
        />,
      ];
    } else if (onRightClickItem.fileType === "file") {
      contextItems = [
        <ContextItem
          key={"copy"}
          item_function={"copy"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"duplicate"}
          item_function={"duplicate"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"hr2"}
          item_function={"hr"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"rename"}
          item_function={"rename"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"delete"}
          item_function={"delete"}
          progressRightClickCommand={progressRightClickCommand}
        />,
      ];
    }
  }

  return (
    <div>
      {onRightClickItem !== null ? (
        <div
          id="rightClickContextMenu_component_container0802"
          style={{ top: y, left: x }}
        >
          {contextItems}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default RightClickContextMenu;
