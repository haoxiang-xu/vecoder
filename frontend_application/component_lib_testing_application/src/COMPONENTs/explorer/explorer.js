import React, { useState, useEffect, useRef, useLayoutEffect } from "react";

import DirItem from "./dirItem/dirItem.js";
import "./explorer.css";

const Explorer = ({
  files,
  startOnClick,
  setExplorerTop,
  onRightClickItem,
  setOnRightClickItem,
  setExplorerBottom,
  rightClickCommand,
  setRightClickCommand,
  refeshKey,
  copyFile,
}) => {
  const [explorerContainerId, setExplorerContainerId] = useState(
    "dir_list_component_container_hided0725"
  );
  const [explorerExpand, setExplorerExpand] = useState(false);
  const [childrenOnClicked, setChildrenOnClicked] = useState(null);
  const [onSingleClickFile, setOnSingleClickFile] = useState(null);

  const explorerContainerRef = useRef(null);

  useEffect(() => {
    const handleResize = () => {
      if (childrenOnClicked !== null) {
        setTimeout(() => {
          setChildrenOnClicked(false);
        }, 10);
        const explorerRect =
          explorerContainerRef.current.getBoundingClientRect();
        const explorerTop = explorerRect.top;
        const explorerBottom = explorerRect.bottom;
        setExplorerTop(explorerTop);
        setExplorerBottom(window.innerHeight - explorerBottom);

      }
    };
    handleResize();
    window.addEventListener("resize", handleResize);
    return () => {
      window.removeEventListener("resize", handleResize);
    };
  }, [childrenOnClicked]);

  useEffect(() => {
    if (startOnClick) {
      setExplorerContainerId("dir_list_component_container0725");
    } else {
      setExplorerContainerId("dir_list_component_container_hided0725");
    }
  }, [startOnClick]);

  return (
    <div>
      <div
        id={
          explorerExpand
            ? "dir_list_component_container_expanded0725"
            : explorerContainerId
        }
        ref={explorerContainerRef}
      >
        <DirItem
          file={files}
          root={true}
          key={refeshKey}
          explorerExpand={explorerExpand}
          setExplorerExpand={setExplorerExpand}
          setChildrenOnClicked={setChildrenOnClicked}
          onRightClickItem={onRightClickItem}
          setOnRightClickItem={setOnRightClickItem}
          rightClickCommand={rightClickCommand}
          setRightClickCommand={setRightClickCommand}
          copyFile={copyFile}
          onSingleClickFile={onSingleClickFile}
          setOnSingleClickFile={setOnSingleClickFile}
        />
      </div>
    </div>
  );
};

export default Explorer;
