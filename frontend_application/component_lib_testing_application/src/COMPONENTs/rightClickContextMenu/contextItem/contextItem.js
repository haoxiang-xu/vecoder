import React, { useState, useEffect, useRef } from "react";
import { ICON_MANAGER } from "../../../ICONs/icon_manager";
import SubContextMenu from "../subContextMenu/subContextMenu";
import Form from "../customizeRequestForm/customizeRequestForm";

import "./contextItem.css";

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
  const CONTEXT_MENU_FUNCTION_MANAGER = {
    newFile: {
      ICON: SYSTEM_ICON_MANAGER.newFile.ICON512,
      LABEL: "New File...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.newFile.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.newFile.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    newFolder: {
      ICON: SYSTEM_ICON_MANAGER.newFolder.ICON512,
      LABEL: "New Folder...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.newFolder.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.newFolder.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    insertFile: {
      ICON: SYSTEM_ICON_MANAGER.insertFile.ICON512,
      LABEL: "Insert Files...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.insertFile.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.insertFile.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    rename: {
      ICON: SYSTEM_ICON_MANAGER.rename.ICON512,
      LABEL: "Rename...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.rename.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.rename.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    copy: {
      ICON: SYSTEM_ICON_MANAGER.copy.ICON512,
      LABEL: "Copy",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.copy.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.copy.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    paste: {
      ICON: SYSTEM_ICON_MANAGER.paste.ICON512,
      LABEL: "Paste",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.paste.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.paste.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    unpaste: {
      ICON: SYSTEM_ICON_MANAGER.unpaste.ICON512,
      LABEL: "Paste",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.unpaste.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.unpaste.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: false,
    },
    delete: {
      ICON: SYSTEM_ICON_MANAGER.trash.ICON512,
      LABEL: "Delete",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.trash.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.trash.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    duplicate: {
      ICON: SYSTEM_ICON_MANAGER.duplicate.ICON512,
      LABEL: "Duplicate",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.duplicate.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.duplicate.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    continue: {
      ICON: SYSTEM_ICON_MANAGER.continue.ICON512,
      LABEL: "Continue...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.continue.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.continue.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    fix: {
      ICON: SYSTEM_ICON_MANAGER.fix.ICON512,
      LABEL: "Fix...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.fix.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.fix.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    updateAST: {
      ICON: SYSTEM_ICON_MANAGER.update.ICON512,
      LABEL: "update AST",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.update.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.update.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    viewAST: {
      ICON: SYSTEM_ICON_MANAGER.code.ICON512,
      LABEL: "view AST",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.code.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.code.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    customizeAPI: {
      ICON: SYSTEM_ICON_MANAGER.customize.ICON512,
      LABEL: "Customize API",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.customize.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.customize.ICON16,
      MORE_OPTIONS: ["customizeRequest"],
      CLICKABLE: true,
    },
    sendRequest: {
      ICON: SYSTEM_ICON_MANAGER.send.ICON512,
      LABEL: "Send Customized Request...",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.send.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.send.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
    customizeRequest: {
      ICON: SYSTEM_ICON_MANAGER.customize.ICON512,
      LABEL: "Customize Request",
      LABEL_COLOR: SYSTEM_ICON_MANAGER.customize.LABEL_COLOR,
      BACKGROUND_ICON: SYSTEM_ICON_MANAGER.customize.ICON16,
      MORE_OPTIONS: null,
      CLICKABLE: true,
    },
  };
  const [contextItemContainerId, setContextItemContainerId] = useState(
    CONTEXT_MENU_FUNCTION_MANAGER[item_function]?.CLICKABLE
      ? "contextItem_component_container0802"
      : "contextItem_component_container_unclickable0826"
  );
  const handleItemOnClick = (e) => {
    if (CONTEXT_MENU_FUNCTION_MANAGER[item_function].MORE_OPTIONS === null) {
      progressRightClickCommand(item_function);
    } else {
      e.stopPropagation();
    }
  };
  //// Customized Request Context Item
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
            <Form
              progressCustomizeRequest={progressRightClickCommand}
              onRightClickItem={onRightClickItem}
            ></Form>
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
