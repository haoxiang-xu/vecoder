import React, { useState, useEffect, useRef } from "react";
import ContextItem from "./contextItem/contextItem";
import "./rightClickContextMenu.css";

const CONTEXTMENU_WIDTH = 238;

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
    if (onRightClickItem.source.split("/")[0] === "vecoder_editor") {
      let pasteItem = onRightClickItem.condition.paste ? (
        <ContextItem
          key={"paste"}
          item_function={"paste"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          parentContextMenuWidth={CONTEXTMENU_WIDTH}
        />
      ) : (
        <ContextItem
          key={"unpaste"}
          item_function={"unpaste"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          parentContextMenuWidth={CONTEXTMENU_WIDTH}
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
          parentContextMenuWidth={CONTEXTMENU_WIDTH}
        />,
        <ContextItem
          key={"fix"}
          item_function={"fix"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          parentContextMenuWidth={CONTEXTMENU_WIDTH}
        />,
        <ContextItem
          key={"customizeAPI"}
          item_function={"customizeAPI"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          parentContextMenuWidth={CONTEXTMENU_WIDTH}
        />,
        <ContextItem
          key={"hr1"}
          item_function={"hr"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          parentContextMenuWidth={CONTEXTMENU_WIDTH}
        />,
        <ContextItem
          key={"updateAST"}
          item_function={"updateAST"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          parentContextMenuWidth={CONTEXTMENU_WIDTH}
        />,
        <ContextItem
          key={"viewAST"}
          item_function={"viewAST"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          parentContextMenuWidth={CONTEXTMENU_WIDTH}
        />,
        <ContextItem
          key={"hr2"}
          item_function={"hr"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          parentContextMenuWidth={CONTEXTMENU_WIDTH}
        />,
        <ContextItem
          key={"copy"}
          item_function={"copy"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          parentContextMenuWidth={CONTEXTMENU_WIDTH}
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
          parentContextMenuWidth={CONTEXTMENU_WIDTH}
        />
      ) : (
        <ContextItem
          key={"unpaste"}
          item_function={"unpaste"}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          onHoverContextItemIndex={onHoverContextItemIndex}
          setOnHoverContextItemIndex={setOnHoverContextItemIndex}
          parentContextMenuWidth={CONTEXTMENU_WIDTH}
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
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
            />,
            <ContextItem
              key={"newFolder"}
              item_function={"newFolder"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
            />,
            <ContextItem
              key={"insertFile"}
              item_function={"insertFile"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
            />,
            <ContextItem
              key={"hr1"}
              item_function={"hr"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
            />,
            <ContextItem
              key={"unpaste"}
              item_function={"unpaste"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
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
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
            />,
            <ContextItem
              key={"newFolder"}
              item_function={"newFolder"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
            />,
            <ContextItem
              key={"insertFile"}
              item_function={"insertFile"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
            />,
            <ContextItem
              key={"hr1"}
              item_function={"hr"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
            />,
            <ContextItem
              key={"copy"}
              item_function={"copy"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
            />,
            pasteItem,
            <ContextItem
              key={"hr2"}
              item_function={"hr"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
            />,
            <ContextItem
              key={"rename"}
              item_function={"rename"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
            />,
            <ContextItem
              key={"delete"}
              item_function={"delete"}
              onRightClickItem={onRightClickItem}
              progressRightClickCommand={progressRightClickCommand}
              onHoverContextItemIndex={onHoverContextItemIndex}
              setOnHoverContextItemIndex={setOnHoverContextItemIndex}
              parentContextMenuWidth={CONTEXTMENU_WIDTH}
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
            parentContextMenuWidth={CONTEXTMENU_WIDTH}
          />,
          <ContextItem
            key={"hr1"}
            item_function={"hr"}
            onRightClickItem={onRightClickItem}
            progressRightClickCommand={progressRightClickCommand}
            onHoverContextItemIndex={onHoverContextItemIndex}
            setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            parentContextMenuWidth={CONTEXTMENU_WIDTH}
          />,
          <ContextItem
            key={"rename"}
            item_function={"rename"}
            onRightClickItem={onRightClickItem}
            progressRightClickCommand={progressRightClickCommand}
            onHoverContextItemIndex={onHoverContextItemIndex}
            setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            parentContextMenuWidth={CONTEXTMENU_WIDTH}
          />,
          <ContextItem
            key={"delete"}
            item_function={"delete"}
            onRightClickItem={onRightClickItem}
            progressRightClickCommand={progressRightClickCommand}
            onHoverContextItemIndex={onHoverContextItemIndex}
            setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            parentContextMenuWidth={CONTEXTMENU_WIDTH}
          />,
        ];
      }
    } else {
    }
  }
  /* Define Menu Items -------------------------------------------------------------------------------------- */

  /* CONTEXT MENU DIMENSIONs ================================================================================= */
  const CONTEXTITEM_HEIGHT = 35 * contextItems.length + 10;
  /* CONTEXT MENU DIMENSIONs ================================================================================= */

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
