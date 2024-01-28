import React, { useState, useEffect, useRef } from "react";
import { ICON_MANAGER } from "../../../ICONs/icon_manager";
import { SubContextMenu } from "../rightClickContextMenu";
import Form from "../customizeRequestForm/customizeRequestForm";
import "./contextItem.css";

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

/* Context Menu Item List ============================================================================================================= */
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
    SUB_MENU_WIDTH: 320,
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
/* Context Menu Item List ============================================================================================================= */

const CustomizedRequestFormContextItem = ({
  progressCustomizeRequest,
  onRightClickItem,
}) => {
  return (
    <Form
      progressCustomizeRequest={progressCustomizeRequest}
      onRightClickItem={onRightClickItem}
    ></Form>
  );
};
const DefaultContextItem = ({
  item_function,
  onRightClickItem,
  progressRightClickCommand,
  //Context Menu onHover
  onHoverContextItemIndex,
  setOnHoverContextItemIndex,
  parentContextMenuWidth,
}) => {
  const menuRef = useRef(null);
  const [contextItemContainerClassName, setContextItemContainerClassName] = useState(
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
  const handleItemOnHover = () => {
    setOnHoverContextItemIndex(item_function);
  };
  /* Sub Context Menu ----------------------------------------------------------------- */
  const [subContextMenu, setSubContextMenu] = useState(null);
  useEffect(() => {
    if (onHoverContextItemIndex === item_function) {
      if (CONTEXT_MENU_FUNCTION_MANAGER[item_function].MORE_OPTIONS !== null) {
        setSubContextMenu(
          <SubContextMenu
            contextItemFunctions={
              CONTEXT_MENU_FUNCTION_MANAGER[item_function].MORE_OPTIONS
            }
            subContextMenuWidth={
              CONTEXT_MENU_FUNCTION_MANAGER[item_function].SUB_MENU_WIDTH
            }
            x={
              menuRef.current.getBoundingClientRect().left +
              parentContextMenuWidth -
              12
            }
            y={menuRef.current.getBoundingClientRect().top}
            onRightClickItem={onRightClickItem}
            progressRightClickCommand={progressRightClickCommand}
            parentContextMenuWidth={menuRef.current.offsetWidth}
          />
        );
      }
    } else {
      setSubContextMenu(null);
    }
  }, [onHoverContextItemIndex]);
  /* Sub Context Menu ----------------------------------------------------------------- */

  /* ICON Loader ===================================================================== */
  const [isFunctionIconLoaded, setIsFunctionIconLoaded] = useState(false);
  const handleFunctionIconLoad = () => {
    setIsFunctionIconLoaded(true);
  };
  const [isMoreOptionIconLoaded, setIsMoreOptionIconLoaded] = useState(false);
  const handleMoreOptionIconLoad = () => {
    setIsMoreOptionIconLoaded(true);
  };
  /* ICON Loader ===================================================================== */
  return (
    <div
      ref={menuRef}
      className={contextItemContainerClassName}
      onClick={(e) => {
        handleItemOnClick(e);
      }}
      onMouseEnter={handleItemOnHover}
    >
      {/* Icon ----------------------------------------------------------------- */}
      {CONTEXT_MENU_FUNCTION_MANAGER[item_function].ICON !== undefined ? (
        /* Icon Loader ----------------------------------------------------------------- */
        <div
          className="contextItem_blur_loader0827"
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
            className="contextItem_component_icon0802"
            loading="lazy"
            onLoad={handleFunctionIconLoad}
          />
        </div>
      ) : null}
      {/* Icon ----------------------------------------------------------------- */}

      {/* Label ================================================================= */}
      <span
        className="contextItem_component_label0802"
        style={{
          color: CONTEXT_MENU_FUNCTION_MANAGER[item_function].LABEL_COLOR,
        }}
      >
        {CONTEXT_MENU_FUNCTION_MANAGER[item_function].LABEL}
      </span>
      {/* Label ================================================================= */}

      {/* Paste Preview ----------------------------------------------------------------- */}
      {item_function === "paste" ? (
        <span className="contextItem_component_copyfile_label0827">
          {onRightClickItem.condition.paste}
        </span>
      ) : null}
      {/* Paste Preview ----------------------------------------------------------------- */}

      {/* More Options ==================================================================== */}
      {CONTEXT_MENU_FUNCTION_MANAGER[item_function].MORE_OPTIONS !== null ? (
        <div
          className="contextItem_more_options_blur_loader1119"
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
            className="contextItem_component_more_options_icon1119"
            loading="lazy"
            onLoad={handleMoreOptionIconLoad}
          />
        </div>
      ) : null}
      {onHoverContextItemIndex === item_function ? subContextMenu : null}
      {/* More Options ==================================================================== */}
    </div>
  );
};
const ContextItem = ({
  item_function,
  onRightClickItem,
  progressRightClickCommand,
  onHoverContextItemIndex,
  setOnHoverContextItemIndex,
  parentContextMenuWidth,
}) => {
  const renderContextItem = (
    item_function,
    onRightClickItem,
    progressRightClickCommand,
    onHoverContextItemIndex,
    setOnHoverContextItemIndex
  ) => {
    switch (item_function) {
      case "hr":
        return (
          <div>
            <hr className="contextItem_component_br0802" />
          </div>
        );
      case "customizeRequest":
        return (
          <CustomizedRequestFormContextItem
            progressCustomizeRequest={progressRightClickCommand}
            onRightClickItem={onRightClickItem}
          ></CustomizedRequestFormContextItem>
        );
      default:
        return (
          <DefaultContextItem
            item_function={item_function}
            onRightClickItem={onRightClickItem}
            progressRightClickCommand={progressRightClickCommand}
            onHoverContextItemIndex={onHoverContextItemIndex}
            setOnHoverContextItemIndex={setOnHoverContextItemIndex}
            parentContextMenuWidth={parentContextMenuWidth}
          ></DefaultContextItem>
        );
    }
  };
  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      ></link>
      {renderContextItem(
        item_function,
        onRightClickItem,
        progressRightClickCommand,
        onHoverContextItemIndex,
        setOnHoverContextItemIndex
      )}
    </div>
  );
};

export default ContextItem;
