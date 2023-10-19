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
  explorerTop,
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
    <div>
      <div
        id={
          explorerExpand
            ? explorerTop === 0 ? "dir_list_component_container_expanded_max1018" : "dir_list_component_container_expanded0725"
            : explorerContainerId
        }
        style={{
          overflowY: scrollable ? "scroll" : "hidden",
        }}
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
