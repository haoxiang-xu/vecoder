import React, { useState, useRef, useEffect } from "react";
import Editor from "../../COMPONENTs/monacoEditor/monacoEditor";
import "./development_editor.css";
import { ICON_MANAGER } from "../../ICONs/icon_manager";

/* ICONs ----------------------------------------------------------------- */
import close_icon_16X16 from "./ICONs/16X16/close.png";
import close_icon_512X512 from "./ICONs/512X512/close.png";
/* ICONs ----------------------------------------------------------------- */

const VecoderEditor = () => {
  /* Load ICON manager -------------------------------- */
  let FILE_TYPE_STYLING_MANAGER = {
    default: {
      ICON: null,
      LABEL_COLOR: "#C8C8C8",
    },
  };
  try {
    FILE_TYPE_STYLING_MANAGER = ICON_MANAGER().FILE_TYPE_STYLING_MANAGER;
  } catch (e) {
    console.log(e);
  }
  /* Load ICON manager -------------------------------- */

  /* Editor parameters ------------------------------------------------- */
  //// Editor container ref
  const editorContainerRef = useRef(null);
  //// Editor content
  const [content, setContent] = useState(`
  import React, { useState, useEffect, useRef } from "react";
  import MonacoEditor from "@monaco-editor/react";
        
  import "./codeEditor.css";
        
  import road_map_icon from "./ICONs/road-map.png";
  import line_numbers_icon from "./ICONs/number-sign.png";
  import close_file_icon from "./ICONs/delete.png";
  import close_icon from "./ICONs/close.png";
  import minus_icon from "./ICONs/minus.png";
  import more_icon from "./ICONs/more.png";
        
  const CodeEditor = ({ files }) => {
      const [refresh, setRefresh] = useState(false);
      const [fileList, setFileList] = useState(files);
      const [roadMapVisible, setRoadMapVisible] = useState(false);
      const [lineNumbersVisible, setLineNumbersVisible] = useState("off");
      const [verticalScrollbarVisible, setVerticalScrollbarVisible] = useState(false);
      const [horizontalScrollbarVisible, setHorizontalScrollbarVisible] = useState(false);
      const filesContainerRef = useRef(null);
      const [filesContainerWidth, setFilesContainerWidth] = useState(0);
      const [fileAverageContainerWidth, setFileAverageContainerWidth] = useState(0);
            
      const [onSelectedIndex, setOnSelectedIndex] = useState(0);
            
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
        const vertical_threshold = 112;
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
      const handleFileCloseIconClick = (index) => () => {
        const newFileList = [...fileList];
        newFileList.splice(index, 1);
        setFileList(newFileList);
      };
            
      useEffect(() => {
        function handleResize() {
          if (filesContainerRef.current) {
            setFilesContainerWidth(
              filesContainerRef.current.getBoundingClientRect().width
            );
          }
        }
            
        window.addEventListener("resize", handleResize);
        handleResize();
        return () => window.removeEventListener("resize", handleResize);
      }, []);
        
      useEffect(() => {
        setFileAverageContainerWidth(
          Math.max(filesContainerWidth / (fileList.length + 2) - 4.5, 21) + "pt"
        );
      }, [filesContainerWidth]);
  
      useEffect(() => {
        setFileAverageContainerWidth(
          Math.max(filesContainerWidth / (fileList.length + 2) - 4.5, 21) + "pt"
        );
        setRefresh(!refresh);
      }, [fileList]);
      useEffect(() => {
        setFileList(files);
      }, [files]);
        
      return (
        <div
          id="code_editor_container0829"
          onMouseMove={handleMouseMove}
          onMouseLeave={() => {
            setVerticalScrollbarVisible(false);
            setHorizontalScrollbarVisible(false);
          }}
        >
        <div id="code_editor_files_container0829" ref={filesContainerRef}>
          {fileList.map((file, index) => (
            <div
              key={index}
              id={index === onSelectedIndex? "code_editor_file_container_on_selected0830" : "code_editor_file_container0829"}
              draggable={true}
              style={{ width: fileAverageContainerWidth }}
              onClick={() => {
                setOnSelectedIndex(index);
              }}
            >
              <div id="code_editor_fileName_container0829">{file.fileName}</div>
                <img
                  src={close_file_icon}
                  id="code_editor_close_icon0829"
                  alt="close"
                  onClick={handleFileCloseIconClick(index)}
                />
              </div>
            ))}
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
            value={fileList[onSelectedIndex]? fileList[onSelectedIndex].content : ""}
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
                verticalScrollbarSize: 4,
                horizontalScrollbarSize: 4,
              },
              readOnly: false,
              overflow: "hidden",
            }}
          />
        </div>
      );
  };
      
  export default CodeEditor;
        
  `);
  const [diffContent, setDiffContent] = useState(
    'import React, { useState } from "react";'
  );
  const [onSelected, setOnSelected] = useState(0);
  /* Editor parameters ------------------------------------------------- */

  const files = [
    { file_name: "monacoEditor.js" },
    { file_name: "monacoEditor.html" },
    { file_name: "monacoStyleEditor.css" },
    { file_name: "index.py" },
    { file_name: "monacoEditor.html" },
    { file_name: "monacoStyleEditor.css" },
    { file_name: "index.js" },
  ];

  /* File Selection Bar parameters ------------------------------------------------- */
  const [onSelectedIndex, setOnSelectedIndex] = useState(null);
  /* File Selection Bar parameters ------------------------------------------------- */
  return (
    <div className="code_editor_container1113" ref={editorContainerRef}>
      <Editor
        editor_content={content}
        editor_setContent={setContent}
        editor_language={"javascript"}
        setOnSelected={setOnSelected}

        //editor_diffContent={diffContent}
        //editor_setDiffContent={setDiffContent}
      ></Editor>

      {/*Editor Top Bar Container -------------------------------------------------------------- */}
      {/*Editor Top Right Section*/}
      <div className="code_editor_top_right_section1113">
        <img
          src={close_icon_512X512}
          className="code_editor_close_icon1113"
          alt="close"
        />
      </div>
      {/*Editor File Selection Bar*/}
      <div className="file_selection_bar_container1114">
        {files.map((file, index) => (
          <div
            key={index}
            className={`file_selection_bar_item1114 ${
              onSelectedIndex === index
                ? "file_selection_bar_item_selected1114"
                : ""
            }`}
            onClick={() => {
              setOnSelectedIndex(index);
            }}
          >
            <img
              src={
                FILE_TYPE_STYLING_MANAGER[file.file_name.split(".").pop()]?.ICON
              }
              className="file_selection_bar_item_filetype_icon1114"
              alt="close"
            />
            <span className="file_selection_bar_file_text1114">
              {file.file_name}
            </span>
          </div>
        ))}
      </div>
      {/*Editor Top Bar Container -------------------------------------------------------------- */}
    </div>
  );
};

export default VecoderEditor;
