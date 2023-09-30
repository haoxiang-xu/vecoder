import React, { useState, useEffect, useRef } from "react";

import "./rightClickContextMenu.css";

import ContextItem from "./contextItem/contextItem";

const RightClickContextMenu = ({
  x,
  y,
  onRightClickItem,
  setOnRightClickItem,
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

  const [refresh, setRefresh] = useState(true); //this is to refresh the component when window size changes
  const menuRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState(
    "rightClickContextMenu_component_container0802"
  );
  const [position, setPosition] = useState({ top: y, left: x });

  useEffect(() => {
    const setMenuPosition = (transitionTime) => {
      if (menuRef.current) {
        const menuWidth = menuRef.current.offsetWidth;
        const menuHeight = menuRef.current.offsetHeight;

        let newTop = y;
        let newLeft = x;

        setMenuStyle("rightClickContextMenu_component_container0802");

        if (y + menuHeight > window.innerHeight) {
          newTop = newTop - menuHeight;
          setMenuStyle(
            "rightClickContextMenu_component_container_leftbottom0930"
          );
        }

        if (x + menuWidth > window.innerWidth) {
          newLeft = newLeft - menuWidth;
          setMenuStyle("rightClickContextMenu_component_container_rigttop0930");
        }

        if (
          y + menuHeight > window.innerHeight &&
          x + menuWidth > window.innerWidth
        ) {
          setMenuStyle(
            "rightClickContextMenu_component_container_rightbottom0930"
          );
        }

        setPosition({
          top: newTop,
          left: newLeft,
          transition: "all " + transitionTime + "s ease",
        });
      }
    };

    setMenuPosition(0.0);
    setTimeout(() => {
      setMenuPosition(0.08);
    }, 80);
  }, [x, y]);

  if (onRightClickItem !== null) {
    if (
      onRightClickItem.filePath.split("/").length === 1 &&
      copyFile === null
    ) {
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
          key={"unpaste"}
          item_function={"unpaste"}
          progressRightClickCommand={progressRightClickCommand}
        />,
      ];
    } else if (
      onRightClickItem.filePath.split("/").length === 1 &&
      copyFile !== null
    ) {
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
        <div id={menuStyle} ref={menuRef} style={position}>
          {contextItems}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default RightClickContextMenu;
