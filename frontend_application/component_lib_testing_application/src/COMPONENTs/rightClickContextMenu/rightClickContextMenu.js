import React, { useState, useEffect, useRef } from "react";
import ContextItem from "./contextItem/contextItem";
import "./rightClickContextMenu.css";

const CONTEXTMENU_WIDTH = 238;
const CONTEXTITEM_BORDER = 10;
const CONTEXTITEM_HEIGHT = 35;
const COMPONENT_ITEM_FUNCTION_CONFIG = {
  vecoder_editor: [
    "continue",
    "fix",
    "customizeAPI",
    "hr",
    "updateAST",
    "viewAST",
    "hr",
    "copy",
    "paste_or_unpaste",
  ],
  vecoder_explorer_root_folder: [
    "newFile",
    "newFolder",
    "insertFile",
    "hr",
    "paste_or_unpaste",
  ],
  vecoder_explorer_folder: [
    "newFile",
    "newFolder",
    "insertFile",
    "hr",
    "copy",
    "paste_or_unpaste",
    "hr",
    "rename",
    "delete",
  ],
  vecoder_explorer_file: ["copy", "hr", "rename", "delete"],
};

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
  const configContextMenuItems = (onRightClickItem) => {
    const pasteCondition = onRightClickItem?.condition.paste
      ? "paste"
      : "unpaste";
    console.log(onRightClickItem);
    if (onRightClickItem !== null) {
      if (onRightClickItem.source.split("/")[0] === "vecoder_editor") {
        contextItems = COMPONENT_ITEM_FUNCTION_CONFIG.vecoder_editor.map(
          (contextItemFunction, index) =>
            contextItemFunction === "paste_or_unpaste" ? (
              <ContextItem
                key={index}
                item_function={pasteCondition}
                onRightClickItem={onRightClickItem}
                progressRightClickCommand={progressRightClickCommand}
                onHoverContextItemIndex={onHoverContextItemIndex}
                setOnHoverContextItemIndex={setOnHoverContextItemIndex}
                parentContextMenuWidth={CONTEXTMENU_WIDTH}
              />
            ) : (
              <ContextItem
                key={index}
                item_function={contextItemFunction}
                onRightClickItem={onRightClickItem}
                progressRightClickCommand={progressRightClickCommand}
                onHoverContextItemIndex={onHoverContextItemIndex}
                setOnHoverContextItemIndex={setOnHoverContextItemIndex}
                parentContextMenuWidth={CONTEXTMENU_WIDTH}
              />
            )
        );
      } else if (onRightClickItem.source.split("/")[0] === "vecoder_explorer") {
        if (
          onRightClickItem.content.fileType &&
          onRightClickItem.content.fileType === "folder"
        ) {
          if (
            onRightClickItem.content.filePath &&
            onRightClickItem.content.filePath.split("/").length === 1
          ) {
            contextItems =
              COMPONENT_ITEM_FUNCTION_CONFIG.vecoder_explorer_root_folder.map(
                (contextItemFunction, index) =>
                  contextItemFunction === "paste_or_unpaste" ? (
                    <ContextItem
                      key={index}
                      item_function={pasteCondition}
                      onRightClickItem={onRightClickItem}
                      progressRightClickCommand={progressRightClickCommand}
                      onHoverContextItemIndex={onHoverContextItemIndex}
                      setOnHoverContextItemIndex={setOnHoverContextItemIndex}
                      parentContextMenuWidth={CONTEXTMENU_WIDTH}
                    />
                  ) : (
                    <ContextItem
                      key={index}
                      item_function={contextItemFunction}
                      onRightClickItem={onRightClickItem}
                      progressRightClickCommand={progressRightClickCommand}
                      onHoverContextItemIndex={onHoverContextItemIndex}
                      setOnHoverContextItemIndex={setOnHoverContextItemIndex}
                      parentContextMenuWidth={CONTEXTMENU_WIDTH}
                    />
                  )
              );
          } else {
            contextItems =
              COMPONENT_ITEM_FUNCTION_CONFIG.vecoder_explorer_folder.map(
                (contextItemFunction, index) =>
                  contextItemFunction === "paste_or_unpaste" ? (
                    <ContextItem
                      key={index}
                      item_function={pasteCondition}
                      onRightClickItem={onRightClickItem}
                      progressRightClickCommand={progressRightClickCommand}
                      onHoverContextItemIndex={onHoverContextItemIndex}
                      setOnHoverContextItemIndex={setOnHoverContextItemIndex}
                      parentContextMenuWidth={CONTEXTMENU_WIDTH}
                    />
                  ) : (
                    <ContextItem
                      key={index}
                      item_function={contextItemFunction}
                      onRightClickItem={onRightClickItem}
                      progressRightClickCommand={progressRightClickCommand}
                      onHoverContextItemIndex={onHoverContextItemIndex}
                      setOnHoverContextItemIndex={setOnHoverContextItemIndex}
                      parentContextMenuWidth={CONTEXTMENU_WIDTH}
                    />
                  )
              );
          }
        } else {
          contextItems =
            COMPONENT_ITEM_FUNCTION_CONFIG.vecoder_explorer_file.map(
              (contextItemFunction, index) =>
                contextItemFunction === "paste_or_unpaste" ? (
                  <ContextItem
                    key={index}
                    item_function={pasteCondition}
                    onRightClickItem={onRightClickItem}
                    progressRightClickCommand={progressRightClickCommand}
                    onHoverContextItemIndex={onHoverContextItemIndex}
                    setOnHoverContextItemIndex={setOnHoverContextItemIndex}
                    parentContextMenuWidth={CONTEXTMENU_WIDTH}
                  />
                ) : (
                  <ContextItem
                    key={index}
                    item_function={contextItemFunction}
                    onRightClickItem={onRightClickItem}
                    progressRightClickCommand={progressRightClickCommand}
                    onHoverContextItemIndex={onHoverContextItemIndex}
                    setOnHoverContextItemIndex={setOnHoverContextItemIndex}
                    parentContextMenuWidth={CONTEXTMENU_WIDTH}
                  />
                )
            );
        }
      } else {
      }
    }
    return contextItems;
  };

  /* Define Menu Items -------------------------------------------------------------------------------------- */
  const [onHoverContextItemIndex, setOnHoverContextItemIndex] = useState(null);
  contextItems = configContextMenuItems(onRightClickItem);
  /* Define Menu Items -------------------------------------------------------------------------------------- */

  /* CONTEXT MENU DIMENSIONs ================================================================================= */
  const CONTEXTMENU_HEIGHT =
    CONTEXTITEM_HEIGHT * contextItems.length + CONTEXTITEM_BORDER;
  /* CONTEXT MENU DIMENSIONs ================================================================================= */

  /* Menu Styling and Position -------------------------------------------------------------------------- */
  const menuRef = useRef(null);
  const [menuClassName, setMenuClassName] = useState(
    "rightClickContextMenu_component_container0802"
  );
  const [position, setPosition] = useState({
    top:
      window.innerHeight < y + CONTEXTMENU_HEIGHT ? y - CONTEXTMENU_HEIGHT : y,
    left: window.innerWidth < x + CONTEXTMENU_WIDTH ? x - CONTEXTMENU_WIDTH : x,
  });
  const setMenuPosition = () => {
    if (menuRef.current) {
      let newStyle = "rightClickContextMenu_component_container0802";

      if (window.innerHeight < y + CONTEXTMENU_HEIGHT) {
        newStyle = "rightClickContextMenu_component_container_leftbottom0930";
      }
      if (window.innerWidth < x + CONTEXTMENU_WIDTH) {
        newStyle = "rightClickContextMenu_component_container_rigttop0930";
      }
      if (
        window.innerHeight < y + CONTEXTMENU_HEIGHT &&
        window.innerWidth < x + CONTEXTMENU_WIDTH
      ) {
        newStyle = "rightClickContextMenu_component_container_rightbottom0930";
      }

      setPosition({
        top:
          window.innerHeight < y + CONTEXTMENU_HEIGHT
            ? y - CONTEXTMENU_HEIGHT
            : y,
        left:
          window.innerWidth < x + CONTEXTMENU_WIDTH ? x - CONTEXTMENU_WIDTH : x,
      });
      setMenuClassName(newStyle);
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
        <div className={menuClassName} ref={menuRef} style={position}>
          {contextItems}
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
const RightClickSubContextMenu = ({
  contextItemFunctions,
  subContextMenuWidth,
  x,
  y,
  onRightClickItem,
  progressRightClickCommand,
  parentContextMenuWidth,
}) => {
  const menuRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState(
    "subContextMenu_component_container1119"
  );
  const handleOnRightClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

  /* Menu Styling and Position -------------------------------------------------------------------------- */
  const [position, setPosition] = useState({ top: y, left: x });
  const setMenuPosition = () => {
    if (menuRef.current) {
      const CustomizeRequestFormWidth = 300;

      let newTop = y;
      let newLeft = x;

      if (y + CustomizeRequestFormWidth > window.innerHeight) {
        newTop -= CustomizeRequestFormWidth + CONTEXTITEM_BORDER - CONTEXTITEM_HEIGHT;
      }
      if (x + subContextMenuWidth > window.innerWidth) {
        newLeft = newLeft - (subContextMenuWidth + parentContextMenuWidth);
      }

      setPosition({
        top: newTop,
        left: newLeft,
        width: subContextMenuWidth + "px",
      });
    }
  };
  useEffect(() => {
    setMenuPosition();
  }, [x, y]);
  /* Menu Styling and Position -------------------------------------------------------------------------- */

  return (
    <div
      className={menuStyle}
      style={position}
      ref={menuRef}
      onContextMenu={handleOnRightClick}
    >
      {contextItemFunctions.map((contextItemFunction, index) => (
        <ContextItem
          key={index}
          item_function={contextItemFunction}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
          parentContextMenuWidth={parentContextMenuWidth}
        />
      ))}
    </div>
  );
};

export default RightClickContextMenu;

export const ContextMenu = RightClickContextMenu;
export const SubContextMenu = RightClickSubContextMenu;
