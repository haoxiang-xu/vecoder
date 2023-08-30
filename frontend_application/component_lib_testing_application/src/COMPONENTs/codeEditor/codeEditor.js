import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";

import "./codeEditor.css";

import road_map_icon from "./ICONs/road-map.png";
import line_numbers_icon from "./ICONs/number-sign.png";
import close_file_icon from "./ICONs/delete.png";
import close_icon from "./ICONs/close.png";
import minus_icon from "./ICONs/minus.png";
import more_icon from "./ICONs/more.png";

const CodeEditor = ({ fileName, code }) => {
  const [language, setLanguage] = useState("javascript");
  const [roadMapVisible, setRoadMapVisible] = useState(false);
  const [lineNumbersVisible, setLineNumbersVisible] = useState("off");
  const [verticalScrollbarVisible, setVerticalScrollbarVisible] =
    useState(false);
  const [horizontalScrollbarVisible, setHorizontalScrollbarVisible] =
    useState(false);

  const handleRoadMapIconClick = () => {
    setRoadMapVisible(!roadMapVisible);
  };
  const handleLineNumbersIconClick = () => {
    if (lineNumbersVisible === "on") {
      setLineNumbersVisible("off");
    } else {
      setLineNumbersVisible("on");
    }
  };
  const handleMouseMove = (e) => {
    const vertical_threshold = 128;
    const horizontal_threshold = 256;
    const { clientX, clientY, currentTarget } = e;
    const { left, top, width, height } = currentTarget.getBoundingClientRect();

    const nearRightEdge = left + width - clientX < vertical_threshold;
    const nearBottomEdge = top + height - clientY < horizontal_threshold;

    if (nearRightEdge) {
      setVerticalScrollbarVisible(true);
    } else {
      setVerticalScrollbarVisible(false);
    }
    if (nearBottomEdge) {
      setHorizontalScrollbarVisible(true);
    } else {
      setHorizontalScrollbarVisible(false);
    }
  };

  return (
    <div
      id="code_editor_container0829"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setVerticalScrollbarVisible(false);
        setHorizontalScrollbarVisible(false);
      }}
    >
      <div id="code_editor_files_container0829">
        <div id="code_editor_file_container0829" draggable={true}>
          <span id="code_editor_fileName_container0829">
            filesdhfygsauyName.js
          </span>
          <img src={close_file_icon} id="code_editor_close_icon0829" />
        </div>
      </div>
      <img
        src={road_map_icon}
        id="code_editor_road_map_icon0829"
        onClick={handleRoadMapIconClick}
      />
      <img
        src={line_numbers_icon}
        id="code_editor_line_numbers_icon0829"
        onClick={handleLineNumbersIconClick}
      />
      <img src={minus_icon} id="code_editor_minus_icon0830" />
      <img src={close_icon} id="code_editor_close_window_icon0830" />
      <img src={more_icon} id="code_editor_more_icon0830" />

      <MonacoEditor
        top="0px"
        left="0px"
        position="absolute"
        width="100%"
        height="100%"
        defaultLanguage="javascript"
        theme="vs-dark"
        value={code}
        automaticLayout={true}
        options={{
          minimap: {
            enabled: roadMapVisible,
          },
          fontSize: 14,
          fontFamily: "Consolas",
          lineNumbers: lineNumbersVisible,
          scrollbar: {
            vertical: "visible",
            horizontal: "visible",
            useShadows: false,
            verticalHasArrows: false,
            horizontalHasArrows: false,
            verticalScrollbarSize: verticalScrollbarVisible ? 6 : 0,
            horizontalScrollbarSize: horizontalScrollbarVisible ? 6 : 0,
          },
          readOnly: false,
          overflow: "hidden",
        }}
      />
    </div>
  );
};

export default CodeEditor;
