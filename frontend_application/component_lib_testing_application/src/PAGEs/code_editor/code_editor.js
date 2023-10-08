import React, { useState } from "react";
import CodeEditor from "../../COMPONENTs/codeEditor/codeEditor";
import axios from "axios";

const CodeEditorPage = () => {
  let raw_files = [
    {
      fileName: "code_editor.js",
      fileContent: `
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
      
`,
    },
    {
      fileName: "code_editor.css",
      fileContent: `#code_editor_container0829 {
        /*POSITION*/
        width: 500pt;
        height: 90%;
        position: absolute;
        left: 50%;
        top: 50%;
        transform: translate(-50%, -50%);
      
        /*STYLE*/
        border-radius: 12pt;
        padding: 32pt 18pt 8pt 1pt;
        box-shadow: 0px 4px 16px 8px rgba(0, 0, 0, 0.2);
        box-sizing: border-box;
        background-color: #1e1e1e;
        user-select: none;
      }
      #code_editor_files_container0829 {
        display: flex;
        white-space: nowrap;
      
        /*POSITION*/
        position: absolute;
        top: 3pt;
        left: 34pt;
        right: 96pt;
        padding: 0pt;
      
        /*SIZE*/
        height: 25pt;
      
        /*STYLE*/
      
        box-sizing: border-box;
      
        overflow-x: auto;
        overflow-y: hidden;
      }
      #code_editor_files_container0829::-webkit-scrollbar {
        height: 2pt;
      }
      #code_editor_files_container0829::-webkit-scrollbar-track {
        background: transparent;
        border-radius: 4pt;
      }
      #code_editor_files_container0829::-webkit-scrollbar-thumb {
        background: #2f3133;
        border-radius: 4pt;
      }
      #code_editor_files_container0829::-webkit-scrollbar-thumb:hover {
        background: #494d53;
        box-shadow: 0px 2px 16px 2px rgba(0, 0, 0, 0.16);
        border-radius: 4pt;
      }
      #code_editor_file_container0829 {
        transition: all 0.2s ease;
        flex: 0 0 auto;
        white-space: nowrap;
        display: inline-block;
      
        /*POSITION*/
        position: relative;
        margin: 3pt 0pt 0pt 3pt;
      
        /*SIZE*/
        width: 128pt;
        height: 19pt;
      
        /*STYLE*/
        border-radius: 4pt;
        border: #2a2d2e 1pt solid;
        background-color: #1e1e1e;
        box-sizing: border-box;
        overflow: hidden;
      }
      #code_editor_file_container_on_selected0830 {
        transition: all 0.2s ease;
        
        flex: 0 0 auto;
        white-space: nowrap;
        display: inline-block;
      
        /*POSITION*/
        position: relative;
        margin: 3pt 0pt 0pt 3pt;
      
        /*SIZE*/
        width: 128pt;
        height: 19pt;
      
        /*STYLE*/
        border-radius: 4pt;
        border: #2a2d2e 1pt solid;
        background-color: #323232;
        box-shadow: inset 0 0 0 1pt #4d4d4d;
        box-sizing: border-box;
        overflow: hidden;
      }
      #code_editor_file_container0829:hover {
        background-color: #2a2d2e;
      }
      #code_editor_fileName_container0829 {
        /*POSITION*/
        position: absolute;
        transform: translate(0%, -50%);
      
        /*SIZE*/
        top: 50%;
        left: 15pt;
        right: 18pt;
      
        /*STYLE*/
        font-size: 10pt;
        color: #cccccc;
        box-sizing: border-box;
        overflow: hidden;
      }
      #code_editor_close_icon0829 {
        transition: all 0.2s ease;
      
        /*POSITION*/
        position: absolute;
        transform: translate(0%, -50%);
        top: 50%;
        right: 3pt;
        padding: 3pt;
      
        /*SIZE*/
        height: 13pt;
        width: 13pt;
      
        /*STYLE*/
        border-radius: 2pt;
        box-sizing: border-box;
      }
      #code_editor_close_icon0829:hover {
        transition: all 0.2s ease;
      
        /*POSITION*/
        position: absolute;
        transform: translate(0%, -50%);
        top: 50%;
        right: 3pt;
        padding: 3pt;
      
        /*SIZE*/
        height: 13pt;
        width: 13pt;
      
        /*STYLE*/
        border-radius: 2pt;
        background-color: #45494b;
        box-sizing: border-box;
      }
      #code_editor_close_icon_centered0829 {
        transition: all 0.2s ease;
      
        /*POSITION*/
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        padding: 3pt;
      
        /*SIZE*/
        height: 13pt;
        width: 13pt;
      
        /*STYLE*/
        border-radius: 2pt;
        box-sizing: border-box;
      }
      #code_editor_close_icon_centered0829:hover {
        transition: all 0.2s ease;
      
        /*POSITION*/
        position: absolute;
        transform: translate(-50%, -50%);
        top: 50%;
        left: 50%;
        padding: 3pt;
      
        /*SIZE*/
        height: 13pt;
        width: 13pt;
      
        /*STYLE*/
        border-radius: 2pt;
        box-sizing: border-box;
        background-color: #45494b;
      }
      #code_editor_road_map_icon0829 {
        transition: all 0.2s ease;
      
        /*POSITION*/
        transform: translate(-50%, -50%);
        position: absolute;
        top: 16pt;
        right: 56pt;
        padding: 5pt;
      
        /*SIZE*/
        height: 13pt;
        width: 13pt;
      
        /*STYLE*/
        border-radius: 4pt;
      }
      #code_editor_road_map_icon0829:hover {
        transition: all 0.2s ease;
      
        /*POSITION*/
        transform: translate(-50%, -50%);
        position: absolute;
        top: 16pt;
        right: 56pt;
        padding: 5pt;
      
        /*SIZE*/
        height: 13pt;
        width: 13pt;
      
        /*STYLE*/
        border-radius: 4pt;
        background-color: #2a2d2e;
      }
      #code_editor_line_numbers_icon0829 {
        transition: all 0.2s ease;
      
        /*POSITION*/
        transform: translate(-50%, -50%);
        position: absolute;
        top: 16pt;
        left: 18pt;
        padding: 6pt;
      
        /*SIZE*/
        height: 11pt;
        width: 11pt;
      
        /*STYLE*/
        border-radius: 6pt;
      }
      #code_editor_line_numbers_icon0829:hover {
        transition: all 0.2s ease;
      
        /*POSITION*/
        transform: translate(-50%, -50%);
        position: absolute;
        top: 16pt;
        left: 18pt;
        padding: 6pt;
      
        /*SIZE*/
        height: 11pt;
        width: 11pt;
      
        /*STYLE*/
        border-radius: 6pt;
        background-color: #2a2d2e;
      }
      #code_editor_more_icon0830 {
        transition: all 0.2s ease;
      
        /*POSITION*/
        transform: translate(-50%, 0%);
        position: absolute;
        top: 6pt;
        right: 38pt;
        padding: 9pt 5pt 2pt 5pt;
      
        /*SIZE*/
        height: 10pt;
      
        /*STYLE*/
        border-radius: 4pt;
        background-color: #1e1e1e;
      }
      #code_editor_more_icon0830:hover {
        transition: all 0.2s ease;
      
        /*POSITION*/
        transform: translate(-50%, 0%);
        position: absolute;
        top: 6pt;
        right: 38pt;
        padding: 9pt 5pt 2pt 5pt;
      
        /*SIZE*/
        height: 10pt;
      
        /*STYLE*/
        border-radius: 4pt;
        background-color: #2a2d2e;
      }
      #code_editor_minus_icon0830 {
        transition: all 0.2s ease;
      
        /*POSITION*/
        transform: translate(-50%, -50%);
        position: absolute;
        top: 16pt;
        right: 18pt;
        padding: 5pt;
      
        /*SIZE*/
        height: 10pt;
      
        /*STYLE*/
        border-radius: 12pt;
        background-color: #1e1e1e;
      }
      #code_editor_minus_icon0830:hover {
        transition: all 0.2s ease;
      
        /*POSITION*/
        transform: translate(-50%, -50%);
        position: absolute;
        top: 16pt;
        right: 18pt;
        padding: 5pt;
      
        /*SIZE*/
        height: 10pt;
      
        /*STYLE*/
        border-radius: 12pt;
        background-color: #2a2d2e;
      }
      #code_editor_close_window_icon0830 {
        transition: all 0.2s ease;
      
        /*POSITION*/
        transform: translate(-50%, -50%);
        position: absolute;
        top: 16pt;
        right: -3pt;
        padding: 5pt;
      
        /*SIZE*/
        height: 10pt;
      
        /*STYLE*/
        border-radius: 12pt;
        background-color: #1e1e1e;
      }
      #code_editor_close_window_icon0830:hover {
        transition: all 0.2s ease;
      
        /*POSITION*/
        transform: translate(-50%, -50%);
        position: absolute;
        top: 16pt;
        right: -3pt;
        padding: 5pt;
      
        /*SIZE*/
        height: 10pt;
      
        /*STYLE*/
        border-radius: 12pt;
        background-color: #2a2d2e;
      }
      #code_editor_vertical_scrollbar_detector {
        /*POSITION*/
        position: absolute;
        top: 32pt;
        right: 0pt;
        bottom: 0pt;
        width: 32pt;
      
        box-sizing: border-box;
      
        /*STYLE*/
        background-color: #a89a9a;
        opacity: 0.32;
        user-select: none;
      }
      #code_editor_logo_icon0830 {
        /*POSITION*/
        display: flex;
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
        align-items: center;
        justify-content: center;
      
        /*FONT*/
        font-size: 128pt;
        font-family: Koulen;
        font-weight: 900;
        color: #111111;
      
        /*STYLE*/
        padding: 4pt 11pt 0pt 11.25pt;
        border-radius: 8pt;
        user-select: none;
      }
      #code_editor_file_type_icon0830 {
        transition: all 0.2s ease;
      
        /*POSITION*/
        position: absolute;
        top: 50%;
        left: 4pt;
        transform: translate(0%, -50%);
      
        /*SIZE*/
        width: 10pt;
      }
      #code_editor_file_type_centered0830 {
        transition: all 0.2s ease;
      
        /*POSITION*/
        position: absolute;
        top: 50%;
        left: 50%;
        transform: translate(-50%, -50%);
      
        /*SIZE*/
        width: 10pt;
      }`,
    },
    {
      fileName: "main.py",
      fileContent: `import random

      def get_compliment(color):
          """Return a compliment based on the color."""
          compliments = {
              "red": ["You have fiery taste!", "A passionate choice!"],
              "blue": ["You're cooler than a blue moon!", "Such a calming choice!"],
              "green": ["You must love nature!", "A very earthy choice!"],
              "yellow": ["Sunshine suits you!", "A bright and cheerful choice!"],
              "purple": ["A royal choice indeed!", "Mysterious and deep!"],
          }
          
          # Get a random compliment for the given color, or a default one.
          return random.choice(compliments.get(color, ["That's a unique choice!"]))
      
      def main():
          print("Hello! Let's talk about colors!")
          
          # Infinite loop until the user wants to exit.
          while True:
              color = input("What's your favorite color? (type 'exit' to quit) ").lower()
              
              if color == "exit":
                  print("Goodbye!")
                  break
              
              print(get_compliment(color))
      
      if __name__ == "__main__":
          main()
      `,
    },
  ];

  const [files, setFiles] = useState(raw_files);

  return (
    <div id="app_page_container0803">
      <CodeEditor files={files} setFiles={setFiles} />
    </div>
  );
};

export default CodeEditorPage;
