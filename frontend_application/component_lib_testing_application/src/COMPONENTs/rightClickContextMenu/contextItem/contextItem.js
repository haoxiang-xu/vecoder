import React, { useState, useEffect, useRef } from "react";
import { ICON_MANAGER } from "../../../ICONs/icon_manager";
import SubContextMenu from "../subContextMenu/subContextMenu";

import "./contextItem.css";
import { on } from "events";

const ContextItem = ({
  item_function,
  onRightClickItem,
  progressRightClickCommand,
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

  /* Context Menu ----------------------------------------------------------------------- */
  const menuRef = useRef(null);
  const [contextItemContainerId, setContextItemContainerId] = useState(
    "contextItem_component_container0802"
  );
  const CONTEXT_MENU_FUNCTION_MANAGER = {
    newFile: {
      ICON: SYSTEM_ICON_MANAGER.newFile.ICON512,
      LABEL: "New File...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.newFile.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.newFile.ICON16,
      MORE_OPTIONS: null,
    },
    newFolder: {
      ICON: SYSTEM_ICON_MANAGER.newFolder.ICON512,
      LABEL: "New Folder...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.newFolder.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.newFolder.ICON16,
      MORE_OPTIONS: null,
    },
    insertFile: {
      ICON: SYSTEM_ICON_MANAGER.insertFile.ICON512,
      LABEL: "Insert Files...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.insertFile.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.insertFile.ICON16,
      MORE_OPTIONS: null,
    },
    rename: {
      ICON: SYSTEM_ICON_MANAGER.rename.ICON512,
      LABEL: "Rename...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.rename.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.rename.ICON16,
      MORE_OPTIONS: null,
    },
    copy: {
      ICON: SYSTEM_ICON_MANAGER.copy.ICON512,
      LABEL: "Copy",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.copy.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.copy.ICON16,
      MORE_OPTIONS: null,
    },
    paste: {
      ICON: SYSTEM_ICON_MANAGER.paste.ICON512,
      LABEL: "Paste",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.paste.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.paste.ICON16,
      MORE_OPTIONS: null,
    },
    unpaste: {
      ICON: SYSTEM_ICON_MANAGER.unpaste.ICON512,
      LABEL: "Paste",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.unpaste.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.unpaste.ICON16,
      MORE_OPTIONS: null,
    },
    delete: {
      ICON: SYSTEM_ICON_MANAGER.trash.ICON512,
      LABEL: "Delete",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.trash.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.trash.ICON16,
      MORE_OPTIONS: null,
    },
    duplicate: {
      ICON: SYSTEM_ICON_MANAGER.duplicate.ICON512,
      LABEL: "Duplicate",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.duplicate.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.duplicate.ICON16,
      MORE_OPTIONS: null,
    },
    continue: {
      ICON: SYSTEM_ICON_MANAGER.continue.ICON512,
      LABEL: "Continue...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.continue.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.continue.ICON16,
      MORE_OPTIONS: null,
    },
    fix: {
      ICON: SYSTEM_ICON_MANAGER.fix.ICON512,
      LABEL: "Fix...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.fix.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.fix.ICON16,
      MORE_OPTIONS: null,
    },
    updateAST: {
      ICON: SYSTEM_ICON_MANAGER.update.ICON512,
      LABEL: "update AST",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.update.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.update.ICON16,
      MORE_OPTIONS: null,
    },
    viewAST: {
      ICON: SYSTEM_ICON_MANAGER.code.ICON512,
      LABEL: "view AST",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.code.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.code.ICON16,
      MORE_OPTIONS: null,
    },
    customizeAPI: {
      ICON: SYSTEM_ICON_MANAGER.customize.ICON512,
      LABEL: "Customize API",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.customize.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.customize.ICON16,
      MORE_OPTIONS: ["sendRequest", "hr", "customizeRequest"],
    },
    sendRequest: {
      ICON: SYSTEM_ICON_MANAGER.send.ICON512,
      LABEL: "Send Customized Request...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.send.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.send.ICON16,
      MORE_OPTIONS: null,
    },
    customizeRequest: {
      ICON: SYSTEM_ICON_MANAGER.customize.ICON512,
      LABEL: "Customize Request",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.customize.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.customize.ICON16,
      MORE_OPTIONS: null,
    },
  };
  useEffect(() => {
    if (item_function === "unpaste") {
      setContextItemContainerId(
        "contextItem_component_container_unclickable0826"
      );
    }
  }, [item_function]);
  const handleItemOnClick = (e) => {
    if (CONTEXT_MENU_FUNCTION_MANAGER[item_function].MORE_OPTIONS === null) {
      progressRightClickCommand(item_function);
    } else {
      e.stopPropagation();
    }
  };
  //// On Customize Request
  const [requestURL, setRequestURL] = useState(
    onRightClickItem?.content?.customizedRequest || ""
  );
  const onCustomizeRequest = (e) => {
    e.stopPropagation();
    setRequestURL(requestURL);
    progressRightClickCommand("customizeRequest", requestURL);
  };
  //// Render Context Item
  const renderContextItem = (
    CONTEXT_MENU_FUNCTION_MANAGER,
    item_function,
    menuRef,
    contextItemContainerId,
    handleItemOnClick,
    handleItemOnHover,
    handleItemNotOnHover
  ) => {
    switch (item_function) {
      case "hr":
        return (
          <div>
            <hr id="contextItem_component_br0802" />
          </div>
        );
        break;
      case "customizeRequest":
        return (
          <div className="contextItem_component_container1119">
            <img
              src={SYSTEM_ICON_MANAGER.customize.ICON512}
              id="contextItem_component_icon0802"
            />
            <span
              id="contextItem_component_label0802"
              style={{
                color: CONTEXT_MENU_FUNCTION_MANAGER[item_function].LABEL_COLOR,
              }}
            >
              {CONTEXT_MENU_FUNCTION_MANAGER[item_function].LABEL}
            </span>
            <input
              type="text"
              value={requestURL}
              className="contextItem_component_url_request_input1119"
              placeholder="request URL"
              onChange={(e) => setRequestURL(e.target.value)}
            />
            <img
              src={SYSTEM_ICON_MANAGER.save.ICON512}
              className="contextItem_component_save_request_icon1119"
              onClick={(e) => {
                onCustomizeRequest(e);
              }}
            />
          </div>
        );
        break;
      default:
        return (
          <div
            ref={menuRef}
            id={contextItemContainerId}
            onClick={(e) => {
              handleItemOnClick(e);
            }}
            onMouseEnter={handleItemOnHover}
            onMouseLeave={handleItemNotOnHover}
          >
            {CONTEXT_MENU_FUNCTION_MANAGER[item_function].ICON !== undefined ? (
              /* Icon Loader ----------------------------------------------------------------- */
              <div
                id="contextItem_blur_loader0827"
                style={
                  isFunctionIconLoaded
                    ? {}
                    : {
                        backgroundImage: `url(${CONTEXT_MENU_FUNCTION_MANAGER[item_function].BACKGROUND_ICON})`,
                      }
                }
              >
                <img
                  src={CONTEXT_MENU_FUNCTION_MANAGER[item_function].ICON}
                  id="contextItem_component_icon0802"
                  loading="lazy"
                  onLoad={handleFunctionIconLoad}
                />
              </div>
            ) : (
              /* Icon Loader ----------------------------------------------------------------- */
              <div></div>
            )}
            {/* Icon ----------------------------------------------------------------- */}

            {/* Label ----------------------------------------------------------------- */}
            <span
              id="contextItem_component_label0802"
              style={{
                color: CONTEXT_MENU_FUNCTION_MANAGER[item_function].LABEL_COLOR,
              }}
            >
              {CONTEXT_MENU_FUNCTION_MANAGER[item_function].LABEL}
            </span>
            {/* Label ----------------------------------------------------------------- */}
            {/* Paste Preview ----------------------------------------------------------------- */}
            {item_function === "paste" ? (
              <span id="contextItem_component_copyfile_label0827">
                {onRightClickItem.condition.paste}
              </span>
            ) : (
              <div></div>
            )}
            {/* Paste Preview ----------------------------------------------------------------- */}

            {/* More Options ----------------------------------------------------------------- */}
            {CONTEXT_MENU_FUNCTION_MANAGER[item_function].MORE_OPTIONS !==
            null ? (
              <div
                id="contextItem_more_options_blur_loader1119"
                style={
                  isMoreOptionIconLoaded
                    ? {}
                    : {
                        backgroundImage: `url(${SYSTEM_ICON_MANAGER.arrow.ICON16})`,
                      }
                }
              >
                <img
                  src={SYSTEM_ICON_MANAGER.arrow.ICON512}
                  id="contextItem_component_more_options_icon1119"
                  loading="lazy"
                  onLoad={handleMoreOptionIconLoad}
                />
              </div>
            ) : (
              <div></div>
            )}
            {subContextMenu}
            {/* More Options ----------------------------------------------------------------- */}
          </div>
        );
        break;
    }
  };
  /* Context Menu ----------------------------------------------------------------------- */

  /* ICON Loader ----------------------------------------------------------------- */
  const [isFunctionIconLoaded, setIsFunctionIconLoaded] = useState(false);
  const handleFunctionIconLoad = () => {
    setIsFunctionIconLoaded(true);
  };
  const [isMoreOptionIconLoaded, setIsMoreOptionIconLoaded] = useState(false);
  const handleMoreOptionIconLoad = () => {
    setIsMoreOptionIconLoaded(true);
  };
  /* ICON Loader ----------------------------------------------------------------- */

  /* Sub Context Menu ----------------------------------------------------------------- */
  const [subContextMenu, setSubContextMenu] = useState(null);
  const [isMoreOptionOnHover, setIsMoreOptionOnHover] = useState(false);
  useEffect(() => {
    if (isMoreOptionOnHover) {
      if (CONTEXT_MENU_FUNCTION_MANAGER[item_function].MORE_OPTIONS !== null) {
        setSubContextMenu(
          <SubContextMenu
            contextItemFunctions={
              CONTEXT_MENU_FUNCTION_MANAGER[item_function].MORE_OPTIONS
            }
            x={menuRef.current.getBoundingClientRect().left + 192}
            y={menuRef.current.getBoundingClientRect().top - 9}
            onRightClickItem={onRightClickItem}
            progressRightClickCommand={progressRightClickCommand}
          />
        );
      }
    } else {
      setSubContextMenu(null);
    }
  }, [isMoreOptionOnHover]);
  const handleItemOnHover = () => {
    setIsMoreOptionOnHover(true);
  };
  const handleItemNotOnHover = () => {
    setIsMoreOptionOnHover(false);
  };
  /* Sub Context Menu ----------------------------------------------------------------- */
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      ></link>
      {renderContextItem(
        CONTEXT_MENU_FUNCTION_MANAGER,
        item_function,
        menuRef,
        contextItemContainerId,
        handleItemOnClick,
        handleItemOnHover,
        handleItemNotOnHover
      )}
    </div>
  );
};

export default ContextItem;
