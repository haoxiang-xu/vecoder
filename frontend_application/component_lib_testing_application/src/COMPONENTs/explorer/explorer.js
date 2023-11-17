import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

import DirItem from "./dirItem/dirItem.js";
import "./explorer.css";

const Explorer = ({
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

export default Explorer;
