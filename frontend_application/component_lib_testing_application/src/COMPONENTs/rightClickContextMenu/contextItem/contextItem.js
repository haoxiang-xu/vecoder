import React, { useState, useEffect, useRef } from "react";

import "./contextItem.css";
import trash_icon from "./ICONs/trash.png";
import newFile_icon from "./ICONs/new_file.png";
import newFolder_icon from "./ICONs/new_folder.png";
import insertFile_icon from "./ICONs/insert_file.png";
import rename_icon from "./ICONs/rename.png";
import copy_icon from "./ICONs/copy.png";
import paste_icon from "./ICONs/paste.png";
import cut_icon from "./ICONs/cut.png";

const ContextItem = ({ item_function, progressRightClickCommand }) => {
  const ICONs = {
    newFile: newFile_icon,
    newFolder: newFolder_icon,
    insertFile: insertFile_icon,
    rename: rename_icon,
    copy: copy_icon,
    paste: paste_icon,
    cut: cut_icon,
    delete: trash_icon,
  };
  const LABELs = {
    newFile: "New File...",
    newFolder: "New Folder...",
    insertFile: "Insert Files...",
    rename: "Rename...",
    copy: "Copy",
    paste: "Paste",
    cut: "Cut",
    delete: "Delete",
  };
  const COLORs = {
    newFile: "#CCCCCC",
    newFolder: "#CCCCCC",
    insertFile: "#CCCCCC",
    rename: "#CCCCCC",
    copy: "#CCCCCC",
    paste: "#CCCCCC",
    cut: "#CCCCCC",
    delete: "#F1592A",
  };

  const handleItemOnClick = () => {
    progressRightClickCommand(item_function);
  };

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      ></link>
      {item_function === "hr" ? (
        <div>
          <hr id="contextItem_component_br0802" />
        </div>
      ) : (
        <div
          id="contextItem_component_container0802"
          onClick={handleItemOnClick}
        >
          {ICONs[item_function] !== undefined ? (
            <img
              src={ICONs[item_function]}
              id="contextItem_component_icon0802"
            />
          ) : (
            <div></div>
          )}
          <span id="contextItem_component_label0802"
            style={{ color: COLORs[item_function] }}
          >
            {LABELs[item_function]}
          </span>
        </div>
      )}
    </div>
  );
};

export default ContextItem;
