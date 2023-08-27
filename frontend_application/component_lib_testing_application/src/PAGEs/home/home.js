import React, { useState, useEffect, useRef } from "react";

import Monitor from "../../COMPONENTs/monitor/monitor";
import RightClickContextMenu from "../../COMPONENTs/rightClickContextMenu/rightClickContextMenu";

import "./home.css";

const Home = () => {
  const [isRightClicked, setIsRightClicked] = useState(false);
  const [rightClickX, setRightClickX] = useState(-1);
  const [rightClickY, setRightClickY] = useState(-1);
  const [onRightClickItem, setOnRightClickItem] = useState(null);
  const [rightClickCommand, setRightClickCommand] = useState(null);
  const [copyFile, setCopyFile] = useState(null);

  const handleRightClick = (event) => {
    event.preventDefault();
    setIsRightClicked(true);

    const boundingRect = event.currentTarget.getBoundingClientRect();

    const rightClickX = event.clientX - boundingRect.left;
    const rightClickY = event.clientY - boundingRect.top;

    setRightClickX(rightClickX);
    setRightClickY(rightClickY);
  };
  const handleOnClick = (event) => {
    setIsRightClicked(false);
    setOnRightClickItem(null);
  };
  //COPY and CUT command
  useEffect(() => {
    if (rightClickCommand !== null) {
      if (rightClickCommand.command === "copy") {
        setCopyFile(rightClickCommand.target_file);
      }
    }
  }, [rightClickCommand]);

  return (
    <div
      id="app_page_container0803"
      onContextMenu={handleRightClick}
      onClick={handleOnClick}
    >
      <Monitor
        onRightClickItem={onRightClickItem}
        setOnRightClickItem={setOnRightClickItem}
        rightClickCommand={rightClickCommand}
        setRightClickCommand={setRightClickCommand}
        copyFile={copyFile}
      />
      {isRightClicked ? (
        <RightClickContextMenu
          x={rightClickX}
          y={rightClickY}
          onRightClickItem={onRightClickItem}
          setOnRightClickItem={setOnRightClickItem}
          setRightClickCommand={setRightClickCommand}
          copyFile={copyFile}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;
