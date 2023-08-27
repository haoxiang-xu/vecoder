import React, { useState, useEffect, useRef } from "react";

import "./contextItem.css";
import trash_icon from "./ICONs/trash.png";
import trash_icon_blur from "./ICONs/trash_blur.png";
import newFile_icon from "./ICONs/new_file.png";
import newFile_icon_blur from "./ICONs/new_file_blur.png";
import newFolder_icon from "./ICONs/new_folder.png";
import newFolder_icon_blur from "./ICONs/new_folder_blur.png";
import insertFile_icon from "./ICONs/insert_file.png";
import insertFile_icon_blur from "./ICONs/insert_file_blur.png";
import rename_icon from "./ICONs/rename.png";
import rename_icon_blur from "./ICONs/rename_blur.png";
import copy_icon from "./ICONs/copy.png";
import copy_icon_blur from "./ICONs/copy_blur.png";
import paste_icon from "./ICONs/paste.png";
import paste_icon_blur from "./ICONs/paste_blur.png";
import unpaste_icon from "./ICONs/unpaste.png";
import unpaste_icon_blur from "./ICONs/unpaste_blur.png";
import cut_icon from "./ICONs/cut.png";

const ContextItem = ({
  item_function,
  progressRightClickCommand,
  pasteFileName,
}) => {
  const [contextItemContainerId, setContextItemContainerId] = useState(
    "contextItem_component_container0802"
  );
  const [isImageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const ICONs = {
    newFile: newFile_icon,
    newFolder: newFolder_icon,
    insertFile: insertFile_icon,
    rename: rename_icon,
    copy: copy_icon,
    paste: paste_icon,
    unpaste: unpaste_icon,
    cut: cut_icon,
    delete: trash_icon,
  };
  const BACKGROUND_ICONs = {
    newFile: newFile_icon_blur,
    newFolder: newFolder_icon_blur,
    insertFile: insertFile_icon_blur,
    rename: rename_icon_blur,
    copy: copy_icon_blur,
    paste: paste_icon_blur,
    unpaste: unpaste_icon_blur,
    delete: trash_icon_blur,
  };
  const LABELs = {
    newFile: "New File...",
    newFolder: "New Folder...",
    insertFile: "Insert Files...",
    rename: "Rename...",
    copy: "Copy",
    paste: "Paste",
    unpaste: "Paste",
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
    unpaste: "#8C8C8C",
    cut: "#CCCCCC",
    delete: "#F1592A",
  };
  useEffect(() => {
    if (item_function === "unpaste") {
      setContextItemContainerId(
        "contextItem_component_container_unclickable0826"
      );
    }
  }, [item_function]);

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
        <div id={contextItemContainerId} onClick={handleItemOnClick}>
          {ICONs[item_function] !== undefined ? (
            <div
              id="contextItem_blur_loader0827"
              style={
                isImageLoaded
                  ? {}
                  : {
                      backgroundImage: `url(${BACKGROUND_ICONs[item_function]})`,
                    }
              }
            >
              <img
                src={ICONs[item_function]}
                id="contextItem_component_icon0802"
                loading="lazy"
                onLoad={handleImageLoad}
              />
            </div>
          ) : (
            <div></div>
          )}
          <span
            id="contextItem_component_label0802"
            style={{ color: COLORs[item_function] }}
          >
            {LABELs[item_function]}
          </span>
          {item_function === "paste" ? (
            <span id="contextItem_component_copyfile_label0827">{pasteFileName}</span>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContextItem;
