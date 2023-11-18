import React, { useState, useEffect, useRef } from "react";
import { ICON_MANAGER } from "../../../ICONs/icon_manager";

import "./contextItem.css";

const ContextItem = ({
  item_function,
  progressRightClickCommand,
  pasteFileName,
}) => {
  /* Load ICON manager -------------------------------- */
  let SYSTEM_ICON_MANAGER = {
    default: {
      ICON: null,
      LABEL_COLOR: "#C8C8C8",
    },
  };
  try {
    SYSTEM_ICON_MANAGER = ICON_MANAGER().SYSTEM_ICON_MANAGER;
  } catch (e) {
    console.log(e);
  }
  /* Load ICON manager -------------------------------- */
  const [contextItemContainerId, setContextItemContainerId] = useState(
    "contextItem_component_container0802"
  );
  const [isImageLoaded, setImageLoaded] = useState(false);
  const handleImageLoad = () => {
    setImageLoaded(true);
  };

  const CONTEXT_MENU_STYLING_MANAGER = {
    newFile: {
      ICON: SYSTEM_ICON_MANAGER.newFile.ICON512,
      LABEL: "New File...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.newFile.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.newFile.ICON16,
    },
    newFolder: {
      ICON: SYSTEM_ICON_MANAGER.newFolder.ICON512,
      LABEL: "New Folder...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.newFolder.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.newFolder.ICON16,
    },
    insertFile: {
      ICON: SYSTEM_ICON_MANAGER.insertFile.ICON512,
      LABEL: "Insert Files...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.insertFile.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.insertFile.ICON16,
    },
    rename: {
      ICON: SYSTEM_ICON_MANAGER.rename.ICON512,
      LABEL: "Rename...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.rename.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.rename.ICON16,
    },
    copy: {
      ICON: SYSTEM_ICON_MANAGER.copy.ICON512,
      LABEL: "Copy",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.copy.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.copy.ICON16,
    },
    paste: {
      ICON: SYSTEM_ICON_MANAGER.paste.ICON512,
      LABEL: "Paste",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.paste.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.paste.ICON16,
    },
    unpaste: {
      ICON: SYSTEM_ICON_MANAGER.unpaste.ICON512,
      LABEL: "Paste",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.unpaste.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.unpaste.ICON16,
    },
    delete: {
      ICON: SYSTEM_ICON_MANAGER.trash.ICON512,
      LABEL: "Delete",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.trash.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.trash.ICON16,
    },
    duplicate: {
      ICON: SYSTEM_ICON_MANAGER.duplicate.ICON512,
      LABEL: "Duplicate",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.duplicate.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.duplicate.ICON16,
    },
    continue: {
      ICON: SYSTEM_ICON_MANAGER.continue.ICON512,
      LABEL: "Continue...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.continue.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.continue.ICON16,
    },
    fix: {
      ICON: SYSTEM_ICON_MANAGER.fix.ICON512,
      LABEL: "Fix...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.fix.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.fix.ICON16,
    },
    updateAST: {
      ICON: SYSTEM_ICON_MANAGER.update.ICON512,
      LABEL: "update AST",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.update.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.update.ICON16,
    },
    viewAST: {
      ICON: SYSTEM_ICON_MANAGER.code.ICON512,
      LABEL: "view AST",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.code.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.code.ICON16,
    },
    customizeAPI: {
      ICON: SYSTEM_ICON_MANAGER.customize.ICON512,
      LABEL: "Customize API",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.customize.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.customize.ICON16,
    },
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
          {CONTEXT_MENU_STYLING_MANAGER[item_function].ICON !== undefined ? (
            /* Icon Loader ----------------------------------------------------------------- */
            <div
              id="contextItem_blur_loader0827"
              style={
                isImageLoaded
                  ? {}
                  : {
                      backgroundImage: `url(${CONTEXT_MENU_STYLING_MANAGER[item_function].BACKGROUND_ICON})`,
                    }
              }
            >
              <img
                src={CONTEXT_MENU_STYLING_MANAGER[item_function].ICON}
                id="contextItem_component_icon0802"
                loading="lazy"
                onLoad={handleImageLoad}
              />
            </div>
            /* Icon Loader ----------------------------------------------------------------- */
          ) : (
            <div></div>
          )}
          {/* Label ----------------------------------------------------------------- */}
          <span
            id="contextItem_component_label0802"
            style={{
              color: CONTEXT_MENU_STYLING_MANAGER[item_function].LABEL_COLOR,
            }}
          >
            {CONTEXT_MENU_STYLING_MANAGER[item_function].LABEL}
          </span>
          {/* Label ----------------------------------------------------------------- */}
          {item_function === "paste" ? (
            <span id="contextItem_component_copyfile_label0827">
              {pasteFileName}
            </span>
          ) : (
            <div></div>
          )}
        </div>
      )}
    </div>
  );
};

export default ContextItem;
