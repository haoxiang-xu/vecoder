import React, { useState, useEffect, useRef } from "react";
import ContextItem from "../contextItem/contextItem";

import "./subContextMenu.css";

const SubContextMenu = ({
  contextItemFunctions,
  x,
  y,
  onRightClickItem,
  progressRightClickCommand,
}) => {
  const menuRef = useRef(null);
  const [menuStyle, setMenuStyle] = useState(
    "subContextMenu_component_container1119"
  );
  const [position, setPosition] = useState({ top: y, left: x, width: "256pt" });
  const handleOnRightClick = (e) => {
    e.stopPropagation();
    e.preventDefault();
  }

  return (
    <div className={menuStyle} style={position} ref={menuRef} onContextMenu={handleOnRightClick}>
      {contextItemFunctions.map((contextItemFunction, index) => (
        <ContextItem
          key={index}
          item_function={contextItemFunction}
          onRightClickItem={onRightClickItem}
          progressRightClickCommand={progressRightClickCommand}
        />
      ))}
    </div>
  );
};

export default SubContextMenu;
