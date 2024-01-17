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

  const progressRightClickCommand = (command, content) => {
    content = content ? content : onRightClickItem.content;

    setRightClickCommand({
      command: command,
      content: content,
      target: onRightClickItem.target,
    });
  };

  /* Define Menu Items -------------------------------------------------------------------------------------- */
  const [onHoverContextItemIndex, setOnHoverContextItemIndex] = useState(null);
  if (onRightClickItem !== null) {
    if (onRightClickItem.source === "vecoder_editor") {
      let pasteItem = onRightClickItem.condition.paste ? (
        <ContextItem
          key={"paste"}
          item_function={"paste"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
        />
      ) : (
        <ContextItem
          key={"unpaste"}
          item_function={"unpaste"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
        />
      );
      contextItems = [
        <ContextItem
          key={"continue"}
          item_function={"continue"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
        />,
        <ContextItem
          key={"fix"}
          item_function={"fix"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
        />,
        <ContextItem
          key={"customizeAPI"}
          item_function={"customizeAPI"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
        />,
        <ContextItem
          key={"hr1"}
          item_function={"hr"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
        />,
        <ContextItem
          key={"updateAST"}
          item_function={"updateAST"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
        />,
        <ContextItem
          key={"viewAST"}
          item_function={"viewAST"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
        />,
        <ContextItem
          key={"hr2"}
          item_function={"hr"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
        />,
        <ContextItem
          key={"copy"}
          item_function={"copy"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
        />,
        pasteItem,
      ];
    } else if (onRightClickItem.source.split("/")[0] === "vecoder_explorer") {
      let pasteItem = onRightClickItem.condition.paste ? (
        <ContextItem
          key={"paste"}
          item_function={"paste"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
        />
      ) : (
        <ContextItem
          key={"unpaste"}
          item_function={"unpaste"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
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
          contextItems = [
            <ContextItem
              key={"newFile"}
              item_function={"newFile"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
            <ContextItem
              key={"newFolder"}
              item_function={"newFolder"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
            <ContextItem
              key={"insertFile"}
              item_function={"insertFile"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
            <ContextItem
              key={"hr1"}
              item_function={"hr"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
            <ContextItem
              key={"unpaste"}
              item_function={"unpaste"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
          ];
        } else {
          contextItems = [
            <ContextItem
              key={"newFile"}
              item_function={"newFile"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
            <ContextItem
              key={"newFolder"}
              item_function={"newFolder"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
            <ContextItem
              key={"insertFile"}
              item_function={"insertFile"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
            <ContextItem
              key={"hr1"}
              item_function={"hr"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
            <ContextItem
              key={"copy"}
              item_function={"copy"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
            pasteItem,
            <ContextItem
              key={"hr2"}
              item_function={"hr"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
            <ContextItem
              key={"rename"}
              item_function={"rename"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
            <ContextItem
              key={"delete"}
              item_function={"delete"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            />,
          ];
        }
      } else {
        contextItems = [
          <ContextItem
            key={"copy"}
            item_function={"copy"}
            onRightClickItem={onRightClickItem}
            progressRightClickCommand={progressRightClickCommand}
            onHoverContextItemIndex={onHoverContextItemIndex}
            setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          />,
          <ContextItem
            key={"hr1"}
            item_function={"hr"}
            onRightClickItem={onRightClickItem}
            progressRightClickCommand={progressRightClickCommand}
            onHoverContextItemIndex={onHoverContextItemIndex}
            setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          />,
          <ContextItem
            key={"rename"}
            item_function={"rename"}
            onRightClickItem={onRightClickItem}
            progressRightClickCommand={progressRightClickCommand}
            onHoverContextItemIndex={onHoverContextItemIndex}
            setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          />,
          <ContextItem
            key={"delete"}
            item_function={"delete"}
            onRightClickItem={onRightClickItem}
            progressRightClickCommand={progressRightClickCommand}
            onHoverContextItemIndex={onHoverContextItemIndex}
            setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          />,
        ];
      }
    } else {
    }
  }
  /* Define Menu Items -------------------------------------------------------------------------------------- */

  /* CONSTANST -------------------------------------------------------------------------------------- */
  const CONTEXTMENU_WIDTH = 218;
  const CONTEXTITEM_HEIGHT = 34 * contextItems.length;
  /* CONSTANST -------------------------------------------------------------------------------------- */

  /* Menu Styling and Position -------------------------------------------------------------------------- */
  const menuRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState(
    "rightClickContextMenu_component_container0802"
  );

  const [position, setPosition] = useState({
    top:
      window.innerHeight < y + CONTEXTITEM_HEIGHT ? y - CONTEXTITEM_HEIGHT : y,
    left: window.innerWidth < x + CONTEXTMENU_WIDTH ? x - CONTEXTMENU_WIDTH : x,
  });
  const setMenuPosition = () => {
    if (menuRef.current) {
      let newStyle = "rightClickContextMenu_component_container0802";

      if (window.innerHeight < y + CONTEXTITEM_HEIGHT) {
        newStyle = "rightClickContextMenu_component_container_leftbottom0930";
      }
      if (window.innerWidth < x + CONTEXTMENU_WIDTH) {
        newStyle = "rightClickContextMenu_component_container_rigttop0930";
      }
      if (
        window.innerHeight < y + CONTEXTITEM_HEIGHT &&
        window.innerWidth < x + CONTEXTMENU_WIDTH
      ) {
        newStyle = "rightClickContextMenu_component_container_rightbottom0930";
      }

      setPosition({
        top:
          window.innerHeight < y + CONTEXTITEM_HEIGHT
            ? y - CONTEXTITEM_HEIGHT
            : y,
        left:
          window.innerWidth < x + CONTEXTMENU_WIDTH ? x - CONTEXTMENU_WIDTH : x,
      });
      setMenuStyle(newStyle);
    }
  };
  useEffect(() => {
    setOnHoverContextItemIndex(null);
    setMenuPosition();
  }, [x, y]);
  /* Menu Styling and Position -------------------------------------------------------------------------- */

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
