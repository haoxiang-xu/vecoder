import React, { useState, useEffect, useRef } from "react";
import ContextItem from "../contextItem/contextItem";

import "./subContextMenu.css";

const SubContextMenu = ({
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
  const [position, setPosition] = useState({ top: y, left: x });
  const setMenuPosition = () => {
    if (menuRef.current) {
      const menuHeight = menuRef.current.offsetHeight;

      let newTop = y;
      let newLeft = x;

      if (y + menuHeight > window.innerHeight) {
        newTop -= menuHeight - 56;
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
  const handleOnRightClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  };

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

export default SubContextMenu;
