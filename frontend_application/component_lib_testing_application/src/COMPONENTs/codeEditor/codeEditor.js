import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import axios from "axios";

import "./codeEditor.css";

import road_map_icon from "./ICONs/road-map.png";
import line_numbers_icon from "./ICONs/number-sign.png";
import close_file_icon from "./ICONs/delete.png";
import close_icon from "./ICONs/close.png";
import minus_icon from "./ICONs/minus.png";
import more_icon from "./ICONs/more.png";

import javascript_icon from "./ICONs/FILETYPE_ICONs/js.png";
import html_icon from "./ICONs/FILETYPE_ICONs/html.png";
import css_icon from "./ICONs/FILETYPE_ICONs/css.png";
import png_icon from "./ICONs/FILETYPE_ICONs/png.png";
import pdf_icon from "./ICONs/FILETYPE_ICONs/pdf.png";
import gitignore_icon from "./ICONs/FILETYPE_ICONs/gitignore.png";
import python_icon from "./ICONs/FILETYPE_ICONs/python.png";
import json_icon from "./ICONs/FILETYPE_ICONs/json.png";
import txt_icon from "./ICONs/FILETYPE_ICONs/txt.png";
import markdown_icon from "./ICONs/FILETYPE_ICONs/markdown.png";
import java_icon from "./ICONs/FILETYPE_ICONs/java.png";
import php_icon from "./ICONs/FILETYPE_ICONs/php.png";
import image_icon from "./ICONs/FILETYPE_ICONs/photo.png";
import xml_icon from "./ICONs/FILETYPE_ICONs/xml.png";
import app_icon from "./ICONs/FILETYPE_ICONs/application.png";
import database_icon from "./ICONs/FILETYPE_ICONs/database.png";
import cpp_icon from "./ICONs/FILETYPE_ICONs/cpp.png";
import csharp_icon from "./ICONs/FILETYPE_ICONs/csharp.png";
import settings_icon from "./ICONs/FILETYPE_ICONs/settings.png";
import ipynb_icon from "./ICONs/FILETYPE_ICONs/ipynb.png";
import table_icon from "./ICONs/FILETYPE_ICONs/table.png";

const CodeEditor = ({
  files,
  setFiles,
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
}) => {
  const ICONs = {
    js: javascript_icon,
    html: html_icon,
    css: css_icon,
    png: image_icon,
    pdf: pdf_icon,
    gitignore: gitignore_icon,
    py: python_icon,
    json: json_icon,
    txt: txt_icon,
    md: markdown_icon,
    java: java_icon,
    php: php_icon,
    jpg: image_icon,
    jpeg: image_icon,
    icon: image_icon,
    xml: xml_icon,
    exe: app_icon,
    sql: database_icon,
    cpp: cpp_icon,
    cs: csharp_icon,
    config: settings_icon,
    ipynb: ipynb_icon,
    csv: table_icon,
    svg: image_icon,
  };
  const LANGUAGEs = {
    js: "javascript",
    html: "html",
    css: "css",
    py: "python",
    json: "json",
    txt: "txt",
    md: "markdown",
    java: "java",
    php: "php",
    xml: "xml",
    sql: "database",
    cpp: "cpp",
    cs: "csharp",
    ipynb: "ipynb",
    csv: "table",
  };

  const [refresh, setRefresh] = useState(false);
  const [logo_text, setLogoText] = useState("</>");
  const [roadMapVisible, setRoadMapVisible] = useState(false);
  const [lineNumbersVisible, setLineNumbersVisible] = useState("off");
  const [verticalScrollbarVisible, setVerticalScrollbarVisible] =
    useState(false);
  const [horizontalScrollbarVisible, setHorizontalScrollbarVisible] =
    useState(false);
  const filesContainerRef = useRef(null);
  const [filesContainerWidth, setFilesContainerWidth] = useState(0);
  const [fileAverageContainerWidth, setFileAverageContainerWidth] = useState(0);

  const [onSelectedIndex, setOnSelectedIndex] = useState(0);
  const [onDragIndex, setOnDragIndex] = useState(-1);
  const [onDropIndex, setOnDropIndex] = useState(-1);
  const [onHoverIndex, setOnHoverIndex] = useState(-1);
  const [onSwapIndex, setOnSwapIndex] = useState(-1);

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
    const newFileList = [...files];
    newFileList.splice(index, 1);
    setFiles(newFileList);
  };
  const handleFileOnDragStart = (e, index) => {
    //e.preventDefault();
    e.target.style.opacity = 0.1;

    setOnSelectedIndex(index);
    setOnDragIndex(index);
  };
  const handleFileOnDragEnd = (e) => {
    //e.preventDefault();
    e.target.style.opacity = 1;

    if (onDropIndex !== -1) {
      const newFileList = [...files];
      const dragFile = newFileList.splice(onDragIndex, 1)[0];
      newFileList.splice(onDropIndex, 0, dragFile);
      setFiles(newFileList);
      setOnSelectedIndex(onDropIndex);
    }
    setOnDragIndex(-1);
    setOnDropIndex(-1);
    setOnSwapIndex(-1);
  };
  const handleOnDragOver = (e) => {
    e.preventDefault();
    //get drag file index
    const dragIndex = onDragIndex;
    //get drop file after index
    const dropIndex = [...filesContainerRef.current.children].indexOf(
      e.target.closest("#code_editor_file_container0829")
    );

    if (dropIndex !== onDropIndex && dropIndex !== -1) {
      setOnDropIndex(dropIndex);
    }
  };
  useEffect(() => {
    setOnSwapIndex(onDropIndex);
  }, [onDropIndex]);
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
      Math.max(filesContainerWidth / (files.length + 2) - 4.5, 21) + "pt"
    );
  }, [filesContainerWidth]);
  useEffect(() => {
    setFileAverageContainerWidth(
      Math.min(
        Math.max(filesContainerWidth / (files.length + 2) - 4.5, 21),
        128
      ) + "pt"
    );
    for (let i = 0; i < files.length; i++) {
      files[i].fileType = files[i].fileName?.split(".").pop();
      files[i].fileLanguage = LANGUAGEs[files[i].fileType];
    }

    setRefresh(!refresh);
  }, [files]);
  useEffect(() => {
    files[onSelectedIndex].fileLanguage =
      LANGUAGEs[files[onSelectedIndex].fileType];
    setRefresh(!refresh);
  }, [onSelectedIndex]);

  //MONACO: INITALIZE MONACO EDITOR
  const monacoRef = useRef(null);
  const registerInlineCompletions = (editor, monaco) => {
    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: function (model, position) {
        const word = model.getWordAtPosition(position);
        const range = word
          ? new monaco.Range(
              position.lineNumber,
              word.startColumn,
              position.lineNumber,
              word.endColumn
            )
          : null;

        if (range) {
          return {
            suggestions: [
              {
                label: "Appended Text",
                kind: monaco.languages.CompletionItemKind.Text,
                documentation: "The text to append",
                insertText: " // Appended text",
                range: range,
              },
            ],
          };
        }

        return [];
      },
    });
  };
  const handleEditorDidMount = (editor, monaco) => {
    monacoRef.current = editor;
    defineTheme(monaco);
    registerInlineCompletions(editor, monaco);
  };
  //MONACO: PERSONAL MONACO THEME
  const defineTheme = (monaco) => {
    monaco.editor.defineTheme("customTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {},
    });
    monaco.editor.setTheme("customTheme");
  };
  const appendTextToSelection = (appendText) => {
    if (!monacoRef.current) return;
    const selection = monacoRef.current.getSelection();

    monacoRef.current.executeEdits(null, [
      {
        range: selection,
        text: appendText,
      },
    ]);
  };
  const handleAppendTextClick = async (command) => {
    const selection = monacoRef.current.getSelection();
    const selectedText = monacoRef.current
      .getModel()
      .getValueInRange(selection);

    let appendText = " // Appended text";

    if (command.command === "continue") {
      const requestBody = {
        language: files[onSelectedIndex].fileLanguage,
        prompt: selectedText,
      };

      try {
        const response = await axios.post(
          "http://localhost:8200/openAI/continue",
          requestBody
        );
        if (response !== undefined) {
          appendText = String(response.data.data.content);
          console.log(appendText);
        }
      } catch (err) {
        console.error("[ERROR]: " + err);
      }
      appendTextToSelection(selectedText + appendText);
    } else if (command.command === "fix") {
      const requestBody = {
        language: files[onSelectedIndex].fileLanguage,
        prompt: selectedText,
      };

      try {
        const response = await axios.post(
          "http://localhost:8200/openAI/fix",
          requestBody
        );
        if (response !== undefined) {
          appendText = String(response.data.data.content);
          console.log(appendText);
        }
      } catch (err) {
        console.error("[ERROR]: " + err);
      }
      appendTextToSelection(appendText);
    } else {
      appendText = "";
    }
  };
  //CONTEXT MENU
  const handleRightClick = (event) => {
    setOnRightClickItem({ fileType: "codeEditor" });
  };
  const handleOnClick = (event) => {
    setOnRightClickItem(null);
  };
  useEffect(() => {
    if (
      rightClickCommand &&
      rightClickCommand.target_file.fileType === "codeEditor"
    ) {
      handleAppendTextClick(rightClickCommand);
      setRightClickCommand(null);
      setOnRightClickItem(null);
    }
  }, [rightClickCommand]);

  return (
    <div
      id="code_editor_container0829"
      onMouseMove={handleMouseMove}
      onMouseLeave={() => {
        setVerticalScrollbarVisible(false);
        setHorizontalScrollbarVisible(false);
      }}
      onContextMenu={(e) => handleRightClick(e)}
      onClick={(e) => handleOnClick(e)}
    >
      <link
        href="https://fonts.googleapis.com/css?family=Koulen"
        rel="stylesheet"
      ></link>
      <div
        id="code_editor_files_container0829"
        ref={filesContainerRef}
        onDragOver={(e) => {
          handleOnDragOver(e);
        }}
        onDragLeave={(e) => {
          setOnDropIndex(-1);
        }}
      >
        {files.map((file, index) => (
          <div
            key={index}
            id={
              index === onSelectedIndex
                ? "code_editor_file_container_on_selected0830"
                : "code_editor_file_container0829"
            }
            draggable={true}
            style={
              index === onSelectedIndex
                ? index === onDragIndex
                  ? { width: fileAverageContainerWidth }
                  : {}
                : index === onSwapIndex
                ? {
                    width: fileAverageContainerWidth,
                    backgroundColor: "#7d7d7d",
                  }
                : { width: fileAverageContainerWidth }
            }
            onClick={() => {
              setOnSelectedIndex(index);
            }}
            onDragStart={(e) => {
              handleFileOnDragStart(e, index);
            }}
            onDragEnd={(e) => {
              handleFileOnDragEnd(e);
            }}
          >
            <div id="code_editor_fileName_container0829">{file.fileName}</div>

            {filesContainerWidth / (files.length + 2) - 4.5 >= 35 ||
            index === onSelectedIndex ? (
              <div>
                {index === onDragIndex ? (
                  <div></div>
                ) : (
                  <img
                    src={close_file_icon}
                    id="code_editor_close_icon0829"
                    alt="close"
                    onClick={handleFileCloseIconClick(index)}
                    draggable={false}
                  />
                )}
                <img
                  src={ICONs[file.fileType]}
                  id={
                    onSelectedIndex === index
                      ? "code_editor_file_type_icon0830"
                      : "code_editor_file_type_icon_unselected0830"
                  }
                  draggable={false}
                  alt="file type"
                />
              </div>
            ) : (
              <div
                onMouseEnter={() => setOnHoverIndex(index)}
                onMouseLeave={() => setOnHoverIndex(-1)}
              >
                {onSelectedIndex === index ? (
                  <div>
                    {onHoverIndex === index ? (
                      <img
                        src={close_file_icon}
                        id="code_editor_close_icon_centered0829"
                        alt="close"
                        onClick={handleFileCloseIconClick(index)}
                      />
                    ) : (
                      <img
                        src={ICONs[file.fileType]}
                        id="code_editor_file_type_centered0830"
                        alt="file type"
                      />
                    )}
                  </div>
                ) : (
                  <img
                    src={ICONs[file.fileType]}
                    id="code_editor_file_type_centered_unselected0830"
                    alt="file type"
                  />
                )}
              </div>
            )}
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

      {files[onSelectedIndex] ? (
        <MonacoEditor
          onMount={handleEditorDidMount}
          top="0px"
          left="0px"
          position="absolute"
          width="100%"
          height="100%"
          defaultLanguage="javascript"
          language={files[onSelectedIndex].fileLanguage}
          theme="vs-dark"
          value={files[onSelectedIndex].fileContent}
          options={{
            contextmenu: false,
            minimap: {
              enabled: roadMapVisible,
            },
            roundedSelection: true,
            fontSize: 14,
            fontFamily: "Consolas",
            lineNumbers: lineNumbersVisible,
            scrollbar: {
              vertical: "visible",
              horizontal: "visible",
              useShadows: false,
              verticalHasArrows: false,
              horizontalHasArrows: false,
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
            },
            readOnly: false,
            overflow: "hidden",
          }}
        />
      ) : (
        <div>
          <div id="code_editor_logo_icon0830">{logo_text}</div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
