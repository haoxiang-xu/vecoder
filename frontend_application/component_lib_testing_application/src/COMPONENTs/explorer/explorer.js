import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

import DirItem from "./dirItem/dirItem.js";
import "./explorer.css";
import { ICON_MANAGER } from "../../ICONs/icon_manager";

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

const Explorer = ({
  files,
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
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

  /* ICON Loader -------------------------------- */
  const [isCloseIconLoaded, setIsCloseIconLoaded] = useState(false);
  /* ICON Loader -------------------------------- */

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
      <img
        src={SYSTEM_ICON_MANAGER.close.ICON512}
        className="dir_list_component_close_icon0125"
        loading="lazy"
        onLoad={(e) => {
          setIsCloseIconLoaded(false);
        }}
        draggable="false"
        alt="close"
      />
      <SearchBar />
      <DirItem
        file={files}
        root={true}
        explorerExpand={explorerExpand}
        setExplorerExpand={setExplorerExpand}
        setChildrenOnClicked={setChildrenOnClicked}
        onRightClickItem={onRightClickItem}
        setOnRightClickItem={setOnRightClickItem}
        rightClickCommand={rightClickCommand}
        setRightClickCommand={setRightClickCommand}
        onSingleClickFile={onSingleClickFile}
        setOnSingleClickFile={setOnSingleClickFile}
        onCopyFile={onCopyFile}
        setOnCopyFile={setOnCopyFile}
      />
    </div>
  );
};

export default Explorer;
