import React, { useState, useEffect, useRef } from "react";

import "./rightClickContextMenu.css";

import ContextItem from "./contextItem/contextItem";

const RightClickContextMenu = ({
  x,
  y,
  onRightClickItem,
  setOnRightClickItem,
  setRightClickCommand,
}) => {
  let contextItems = [];

  const progressRightClickCommand = (command) => {
    setRightClickCommand({
      command: command,
      content: onRightClickItem.content,
      target: onRightClickItem.target,
    });
  };
  const [refresh, setRefresh] = useState(true);
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
    if (onRightClickItem.source === "vecoder_editor") {
      let pasteItem = onRightClickItem.condition.paste ? (
        <ContextItem
          key={"paste"}
          item_function={"paste"}
          progressRightClickCommand={progressRightClickCommand}
        />
      ) : (
        <ContextItem
          key={"unpaste"}
          item_function={"unpaste"}
          progressRightClickCommand={progressRightClickCommand}
        />
      );
      contextItems = [
        <ContextItem
          key={"continue"}
          item_function={"continue"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"fix"}
          item_function={"fix"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"customizeAPI"}
          item_function={"customizeAPI"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"hr1"}
          item_function={"hr"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"updateAST"}
          item_function={"updateAST"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"viewAST"}
          item_function={"viewAST"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"hr2"}
          item_function={"hr"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        <ContextItem
          key={"copy"}
          item_function={"copy"}
          progressRightClickCommand={progressRightClickCommand}
        />,
        pasteItem,
      ];
    } else if (onRightClickItem.source.split("/")[0] === "vecoder_explorer") {
      let pasteItem = onRightClickItem.condition.paste ? (
        <ContextItem
          key={"paste"}
          item_function={"paste"}
          progressRightClickCommand={progressRightClickCommand}
          pasteFileName={onRightClickItem.condition.paste}
        />
      ) : (
        <ContextItem
          key={"unpaste"}
          item_function={"unpaste"}
          progressRightClickCommand={progressRightClickCommand}
        />
      );
      if (
        onRightClickItem.content.fileType &&
        onRightClickItem.content.fileType === "folder"
      ) {
        if (
          onRightClickItem.content.filePath &&
          onRightClickItem.content.filePath.split("/").length === 1
        ) {
          // If the condition is true, assign the first set of items
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
        } else {
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
              key={"rename"}
              item_function={"rename"}
              progressRightClickCommand={progressRightClickCommand}
            />,
            <ContextItem
              key={"delete"}
              item_function={"delete"}
              progressRightClickCommand={progressRightClickCommand}
            />,
            <ContextItem
              key={"hr2"}
              item_function={"hr"}
              progressRightClickCommand={progressRightClickCommand}
            />,
            <ContextItem
              key={"copy"}
              item_function={"copy"}
              progressRightClickCommand={progressRightClickCommand}
            />,
            pasteItem,
          ];
        }
      } else {
        contextItems = [
          <ContextItem
            key={"copy"}
            item_function={"copy"}
            progressRightClickCommand={progressRightClickCommand}
          />,
          <ContextItem
            key={"hr1"}
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
    } else {
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
