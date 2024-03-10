import React, { useState, useEffect, useRef, useContext } from "react";
import { ICON_MANAGER } from "../../ICONs/icon_manager";
import { vecoderEditorContexts } from "../../CONTEXTs/vecoderEditorContexts";
import DirItem from "./dirItem/dirItem.js";
import "./explorer.css";

/* Load ICON manager --------------------------------------------------------------------------------- */
let FILE_TYPE_ICON_MANAGER = {
  default: {
    ICON: null,
    LABEL_COLOR: "#C8C8C8",
  },
};
try {
  FILE_TYPE_ICON_MANAGER = ICON_MANAGER().FILE_TYPE_ICON_MANAGER;
} catch (e) {
  console.log(e);
}
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
/* Load ICON manager --------------------------------------------------------------------------------- */

const SearchBar = ({}) => {
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
  return (
    <div
      className={"dir_list_component_search_bar_container0125"}
      draggable={false}
    >
      <input className={"dir_list_component_search_bar_input0125"} />
      <img
        src={SYSTEM_ICON_MANAGER.search.ICON512}
        className={"dir_list_component_search_bar_icon0125"}
        draggable={false}
        alt="search"
      />
    </div>
  );
};
const CloseIcon = ({}) => {
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
  return (
    <img
      src={SYSTEM_ICON_MANAGER.close.ICON512}
      className={"dir_list_component_close_icon0125"}
      loading="lazy"
      draggable="false"
      alt="close"
    />
  );
};
const MinMaxIcon = ({
  mode,
  //Maximize and Minimize Container
  onMaximizeOnClick,
  onMinimizeOnClick,
}) => {
  const [MaxIconOnHover, setMaxIconOnHover] = useState(false);
  const [MinIconOnHover, setMinIconOnHover] = useState(false);
  const [MaximizeIconStyling, setMaximizeIconStyling] = useState(null);
  const [MinimizeIconStyling, setMinimizeIconStyling] = useState(null);
  const onMaximizeOnHover = () => {
    setMaxIconOnHover(true);
    setMinIconOnHover(false);
    setMaximizeIconStyling({
      opacity: 1,
      zIndex: 1,
      padding: "9px 4px 9px 4px",
      left: 50,
    });
    setMinimizeIconStyling({
      opacity: 0.16,
      zIndex: 0,
      padding: "9px 0px 9px 0px",
    });
  };
  const onMinimizeOnHover = () => {
    setMaxIconOnHover(false);
    setMinIconOnHover(true);
    setMaximizeIconStyling({
      opacity: 0.16,
      zIndex: 0,
      padding: "9px 0px 9px 0px",
      left: 58,
    });
    setMinimizeIconStyling({
      opacity: 1,
      zIndex: 1,
      padding: "9px 4px 9px 4px",
    });
  };
  const onMaximizeOut = () => {
    setMaxIconOnHover(false);
  };
  const onMinimizeOut = () => {
    setMinIconOnHover(false);
  };
  useEffect(() => {
    if (!MaxIconOnHover && !MinIconOnHover) {
      setMaximizeIconStyling(null);
      setMinimizeIconStyling(null);
    }
  }, [MaxIconOnHover, MinIconOnHover]);

  return mode === "HORIZONTAL" ? (
    <div>
      <img
        src={SYSTEM_ICON_MANAGER.rightArrow.ICON512}
        className="code_editor_maximize_icon0129"
        draggable="false"
        onClick={onMaximizeOnClick}
        onMouseOver={onMaximizeOnHover}
        onMouseOut={onMaximizeOut}
        alt="maximize"
        style={MaximizeIconStyling}
      />
      <img
        src={SYSTEM_ICON_MANAGER.leftArrow.ICON512}
        className="code_editor_minimize_icon0129"
        draggable="false"
        onClick={onMinimizeOnClick}
        onMouseOver={onMinimizeOnHover}
        onMouseOut={onMinimizeOut}
        alt="minimize"
        style={MinimizeIconStyling}
      />
    </div>
  ) : (
    <div>
      <img
        src={SYSTEM_ICON_MANAGER.rightArrow.ICON512}
        className="code_editor_maximize_icon_vertical0129"
        draggable="false"
        onClick={(e) => {
          onMaximizeOnClick();
          setMaxIconOnHover(false);
          setMinIconOnHover(false);
        }}
        alt="maximize"
      />
    </div>
  );
};
const DirList = ({
  files,
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
}) => {
  const {
    exploreOptionsAndContentData,
  } = useContext(vecoderEditorContexts);
  const [explorerExpand, setExplorerExpand] = useState(false);
  const [childrenOnClicked, setChildrenOnClicked] = useState(null);
  const [onSingleClickFile, setOnSingleClickFile] = useState(null);
  const [onCopyFile, setOnCopyFile] = useState(null);

  const explorerContainerRef = useRef(null);
  //SCROLLABLE
  const [scrollable, setScrollable] = useState(false);
  useEffect(() => {
    if (explorerContainerRef.current) {
      if (explorerContainerRef.current.offsetWidth > 16) {
        setScrollable(true);
      } else {
        setScrollable(false);
      }
    }
  }, [explorerContainerRef.current?.offsetWidth]);

  return (
    <div
      id={"dir_list_component_container0725"}
      style={{
        overflowY: scrollable ? "scroll" : "hidden",
      }}
      ref={explorerContainerRef}
    >
      <DirItem
        file={files}
        filePath={exploreOptionsAndContentData.filePath}
        root={true}
        explorerExpand={explorerExpand}
        setExplorerExpand={setExplorerExpand}
        setChildrenOnClicked={setChildrenOnClicked}
        onSingleClickFile={onSingleClickFile}
        setOnSingleClickFile={setOnSingleClickFile}
        onCopyFile={onCopyFile}
        setOnCopyFile={setOnCopyFile}
      />
    </div>
  );
};
const Explorer = ({
  explorer_width,
  files,
  setFiles,
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
  //Maximize and Minimize Container
  onMaximizeOnClick,
  onMinimizeOnClick,
}) => {
  const explorerRef = useRef(null);

  /* HORIZONTAL OR VERTICAL MODE ====================================================== */
  const [mode, setMode] = useState("HORIZONTAL"); //["HORIZONTAL", "VERTICAL"]
  useEffect(() => {
    explorer_width <= 50 ? setMode("VERTICAL") : setMode("HORIZONTAL");
  }, [explorer_width]);
  /* HORIZONTAL OR VERTICAL MODE ====================================================== */
  return (
    <div className="explorer_component_container0126" ref={explorerRef}>
      {mode === "VERTICAL" ? null : (
        <div>
          <DirList
            files={files}
            onRightClickItem={onRightClickItem}
            setOnRightClickItem={setOnRightClickItem}
            rightClickCommand={rightClickCommand}
            setRightClickCommand={setRightClickCommand}
          />
          <SearchBar />
        </div>
      )}
      <MinMaxIcon
        mode={mode}
        onMaximizeOnClick={onMaximizeOnClick}
        onMinimizeOnClick={onMinimizeOnClick}
      />
      <CloseIcon />
    </div>
  );
};

export default Explorer;
