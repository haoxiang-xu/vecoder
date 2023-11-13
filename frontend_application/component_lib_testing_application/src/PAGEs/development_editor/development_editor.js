import React, { useState } from "react";
import Editor from "../../COMPONENTs/monacoEditor/monacoEditor";

const DevelopmentEditor = () => {
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
  const [onSelected, setOnSelected] = useState(null);

  return (
    <Editor
      editor_content={content}
      editor_setContent={setContent}
      editor_language={"javascript"}
      editor_height={"900px"}
      editor_width={"700px"}
      setOnSelected={setOnSelected}

      //editor_diffContent={diffContent}
      //editor_setDiffContent={setDiffContent}
    ></Editor>
  );
};

export default DevelopmentEditor;
