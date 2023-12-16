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

import { ICON_MANAGER } from "../../ICONs/icon_manager";

const CodeEditor = ({
  files,
  setFiles,
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
}) => {
  //Files Icon and Text Color declaration
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

  const [content, setContent] = useState(files[onSelectedIndex].fileContent);
  const [language, setLanguage] = useState(files[onSelectedIndex].fileLanguage);

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
  const contentOnSave = (content) => {
    setContent(content);
    const newFileList = [...files];
    newFileList[onSelectedIndex].fileContent = content;
    setFiles(newFileList);
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
      files[i].fileLanguage =
        FILE_TYPE_STYLING_MANAGER[files[i].fileType]?.language;
    }

    setRefresh(!refresh);
  }, [files]);
  useEffect(() => {
    //Detect file language
    setContent(files[onSelectedIndex].fileContent);
    setLanguage(files[onSelectedIndex].fileLanguage);
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
  const appendTextToSelection = (appendText, range) => {
    if (!monacoRef.current) return;

    monacoRef.current.executeEdits(null, [
      {
        range: range,
        text: appendText,
      },
    ]);
  };
  const overwriteTextInSelection = (newText, range) => {
    if (!monacoRef.current) return;

    monacoRef.current.executeEdits("", [
      {
        range: range,
        text: newText,
        forceMoveMarkers: true,
      },
    ]);

    // Optionally, you might want to push an undo stop for a better undo/redo experience
    monacoRef.current.pushUndoStop();
  };

  const handleAppendTextClick = async (command) => {
    const selection = monacoRef.current.getSelection();
    const selectedText = monacoRef.current
      .getModel()
      .getValueInRange(selection);
    const editor = monacoRef.current;
    const model = editor.getModel();

    // Convert the start and end positions of the selection to absolute offsets
    const startOffset = model.getOffsetAt(selection.getStartPosition());
    const endOffset = model.getOffsetAt(selection.getEndPosition());

    const range = model.getValueInRange({
      startLineNumber: selection.startLineNumber,
      startColumn: startOffset,
      endLineNumber: selection.endLineNumber,
      endColumn: endOffset,
    });

    let appendText = " // Appended text";

    if (command.command === "continue") {
      const requestBody = {
        language: files[onSelectedIndex].fileLanguage,
        prompt: selectedText,
        analyzeCode: String(files[onSelectedIndex].fileAnalysis),
      };

      try {
        const response = await axios.post(
          "http://localhost:8200/openAI/continue",
          requestBody
        );
        if (response !== undefined) {
          appendText = String(response.data.data.content);
        }
      } catch (err) {
        console.error("[ERROR]: " + err);
      }
      appendTextToSelection(appendText, selection);
    } else if (command.command === "fix") {
      const requestBody = {
        language: files[onSelectedIndex].fileLanguage,
        prompt: selectedText,
        analyzeCode: files[onSelectedIndex].fileAnalysis,
      };

      try {
        const response = await axios.post(
          "http://localhost:8200/openAI/fix",
          requestBody
        );
        if (response !== undefined) {
          appendText = String(response.data.data.content);
        }
      } catch (err) {
        console.error("[ERROR]: " + err);
      }
      overwriteTextInSelection(appendText, selection);
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
  //ANALYZE CODE
  const analyzeCode = async () => {
    const requestBody = {
      language: files[onSelectedIndex].fileLanguage,
      prompt: files[onSelectedIndex].fileContent,
    };

    // try {
    //   const response = await axios.post(
    //     "http://localhost:8200/openAI/analyze",
    //     requestBody
    //   );
    //   if (response !== undefined) {
    //     console.log(response.data.data.content);
    //     return response.data.data.content;
    //   }
    // } catch (err) {
    //   console.error("[ERROR]: " + err);
    // }
  };
  useEffect(() => {
    if (files[onSelectedIndex].fileAnalysis === undefined) {
      files[onSelectedIndex].fileAnalysis = analyzeCode();
    }
  }, [onSelectedIndex]);

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
                  src={FILE_TYPE_STYLING_MANAGER[file.fileType]?.ICON}
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
                        src={FILE_TYPE_STYLING_MANAGER[file.fileType]?.ICON}
                        id="code_editor_file_type_centered0830"
                        alt="file type"
                      />
                    )}
                  </div>
                ) : (
                  <img
                    src={FILE_TYPE_STYLING_MANAGER[file.fileType]?.ICON}
                    id="code_editor_file_type_centered_unselected0830"
                    alt="file type"
                  />
                )}
              </div>
            )}
          </div>
        ))}
      </div>

      {/* <img
        src={road_map_icon}
        id="code_editor_road_map_icon0829"
        onClick={handleRoadMapIconClick}
      /> */}
      {/* <img
        src={line_numbers_icon}
        id="code_editor_line_numbers_icon0829"
        onClick={handleLineNumbersIconClick}
      /> */}
      <img src={minus_icon} id="code_editor_minus_icon0830" />
      <img src={close_icon} id="code_editor_close_window_icon0830" />
      <img src={more_icon} id="code_editor_more_icon0830" />

      {files[onSelectedIndex] ? (
        <MonacoEditor
          id="code_editor_monaco_editor1112"
          onMount={handleEditorDidMount}
          onChange={(content) => contentOnSave(content)}
          top="0pt"
          left="0pt"
          position="absolute"
          width="100%"
          height="100%"
          defaultLanguage="javascript"
          language={language}
          theme="vs-dark"
          value={content}
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
