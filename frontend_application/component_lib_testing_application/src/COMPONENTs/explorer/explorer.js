import React, { useState, useEffect, useRef } from "react";
import { ICON_MANAGER } from "../../ICONs/icon_manager";
import DirItem from "./dirItem/dirItem.js";
import "./explorer.css";

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
const DirList = ({
  files,
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
}) => {
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
const Explorer = ({
  files,
  setFiles,
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
}) => {
  const explorerRef = useRef(null);
  return (
    <div className="explorer_component_container0126" ref={explorerRef}>
      {explorerRef.current?.offsetWidth <= 50 ? (
        <div>
          <CloseIcon />
        </div>
      ) : (
        <div>
          <DirList
            files={files}
            onRightClickItem={onRightClickItem}
            setOnRightClickItem={setOnRightClickItem}
            rightClickCommand={rightClickCommand}
            setRightClickCommand={setRightClickCommand}
          />
          <SearchBar />
          <CloseIcon />
        </div>
      )}
    </div>
  );
};
const searchFiles = (files_structure, search_keyword) => {
  return;
};
const editFiles = (files_structure, edited_file_path, new_file) => {
  return;
};
const editFilePaths = (files_structure, append_file_path) => {
  return;
}
const deleteFiles = (files_structure, deleted_file_path) => {
  return;
};


export default Explorer;
