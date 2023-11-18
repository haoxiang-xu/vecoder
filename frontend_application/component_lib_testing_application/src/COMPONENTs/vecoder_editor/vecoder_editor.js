import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Editor from "../monacoEditor/monacoEditor";
import "./vecoder_editor.css";
import { ICON_MANAGER } from "../../ICONs/icon_manager";

const VecoderEditor = ({
  imported_files,
  //Context Menu
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
}) => {
  /* Initialize File Data ------------------------------------------------------ */
  const [files, setFiles] = useState(imported_files);
  /* Initialize File Data ------------------------------------------------------ */

  /* Load ICON manager -------------------------------- */
  let FILE_TYPE_ICON_MANAGER = {
    default: {
      ICON: null,
      LABEL_COLOR: "#C8C8C8",
    },
  };
  try {
    FILE_TYPE_ICON_MANAGER = ICON_MANAGER().FILE_TYPE_ICON_MANAGER;
  } catch (e) {
    console.log(e);
  }
  let SYSTEM_ICON_MANAGER = {
    default: {
      ICON: null,
      LABEL_COLOR: "#C8C8C8",
    },
  };
  try {
    SYSTEM_ICON_MANAGER = ICON_MANAGER().SYSTEM_ICON_MANAGER;
  } catch (e) {
    console.log(e);
  }
  /* Load ICON manager -------------------------------- */

  /* Context Menu ----------------------------------------------------------------------- */
  const [onAppendContent, setOnAppendContent] = useState(null);
  const handleRightClick = (event) => {
    event.preventDefault();
    if (onSelectedCode || navigator.clipboard.readText() !== "") {
      setOnRightClickItem({
        source: "vecoder_editor",
        condition: { paste: true },
        content: null,
        target: "vecoder_editor",
      });
    } else {
      setOnRightClickItem({
        source: "vecoder_editor",
        condition: { paste: false },
        content: null,
        target: "vecoder_editor",
      });
    }
  };
  const handleLeftClick = (event) => {
    setOnRightClickItem(null);
  };
  useEffect(() => {
    if (rightClickCommand && rightClickCommand.target === "vecoder_editor") {
      handleRightClickCommand(rightClickCommand.command);
      setRightClickCommand(null);
      setOnRightClickItem(null);
    }
  }, [rightClickCommand]);
  const handleRightClickCommand = async (command) => {
    switch (command) {
      case "viewAST":
        getAST();
        break;
      case "copy":
        navigator.clipboard.writeText(onSelectedCode.selectedText);
        break;
      case "paste":
        setOnAppendContent(await navigator.clipboard.readText());
        break;
    }
  };
  /* Context Menu ----------------------------------------------------------------------- */

  /* API ----------------------------------------------------------------------- */
  const getAST = async () => {
    const requestBody = {
      language: fileList[onSelectedIndex].fileLanguage,
      prompt: onSelectedCode.selectedText,
    };

    try {
      const response = await axios.post(
        "http://localhost:8200/AST",
        requestBody
      );
      console.log(response.data.data.content);
    } catch (e) {
      console.log(e);
    }
  };
  /* API ----------------------------------------------------------------------- */

  /* Editor parameters ------------------------------------------------- */
  //// Editor container ref
  const editorContainerRef = useRef(null);
  //// Editor content
  const setFileContent = (index) => (value) => {
    const editedFiles = [...files];
    editedFiles[index].fileContent = value;
    setFiles(editedFiles);
  };
  const [diffContent, setDiffContent] = useState(null);
  const [onSelectedCode, setOnSelectedCode] = useState(null);
  /* Editor parameters ------------------------------------------------- */

  /* File Selection Bar parameters & Functions ------------------------------------------------- */
  const fileSelectionBarContainerRef = useRef(null);
  const [fileList, setFileList] = useState(
    imported_files.map((file) => ({
      fileName: String(file.fileName),
      fileLanguage: String(file.fileLanguage),
    }))
  );
  const [onSelectedIndex, setOnSelectedIndex] = useState(null);
  const [onDragIndex, setOnDragIndex] = useState(-1);
  const [onDropIndex, setOnDropIndex] = useState(-1);
  const [onSwapIndex, setOnSwapIndex] = useState(-1);

  const onFileDelete = (e) => (index) => {
    e.stopPropagation();
    const editedFiles = [...fileList];
    editedFiles.splice(index, 1);
    setFileList(editedFiles);

    if (onSelectedIndex === index) {
      setOnSelectedIndex(null);
    } else {
      if (onSelectedIndex > index) {
        setOnSelectedIndex(onSelectedIndex - 1);
      }
    }
  };
  const onFileDragStart = (e, index) => {
    e.target.style.opacity = 0.1;

    setOnSelectedIndex(index);
    setOnDragIndex(index);
  };
  const onFileDragEnd = (e, index) => {
    e.target.style.opacity = 1;

    if (onDropIndex !== -1) {
      const editedFiles = [...fileList];
      const dragedFile = editedFiles.splice(onDragIndex, 1)[0];
      editedFiles.splice(onDropIndex, 0, dragedFile);
      setFileList(editedFiles);
      setOnSelectedIndex(onDropIndex);
    }
    setOnDragIndex(-1);
    setOnDropIndex(-1);
    setOnSwapIndex(-1);
  };
  const containerOnDragOver = (e) => {
    e.preventDefault();

    const targetElement = e.target.closest(
      ".file_selection_bar_item1114, .file_selection_bar_item_selected1114"
    );
    if (targetElement && fileSelectionBarContainerRef.current) {
      const childrenArray = Array.from(
        fileSelectionBarContainerRef.current.children
      );
      const dropIndex = childrenArray.indexOf(targetElement);
      if (dropIndex !== onDropIndex && dropIndex !== -1) {
        setOnDropIndex(dropIndex);
      }
    }
  };
  useEffect(() => {
    setOnSwapIndex(onDropIndex);
  }, [onDropIndex]);

  /* File Selection Bar parameters & Functions ------------------------------------------------- */
  return (
    <div
      className="code_editor_container1113"
      ref={editorContainerRef}
      onClick={(e) => {
        handleLeftClick(e);
      }}
    >
      {/*Monaco Editor -------------------------------------------------------------- */}
      {files.map((file, index) => {
        return (
          <Editor
            key={index}
            editor_content={files[index].fileContent}
            editor_setContent={setFileContent(index)}
            editor_language={files[index].fileLanguage}
            //Functional props
            onAppendContent={onAppendContent}
            setOnAppendContent={setOnAppendContent}
            setOnSelected={setOnSelectedCode}
            onContextMenu={(e) => {
              handleRightClick(e);
            }}
            display={
              file.fileName === fileList[onSelectedIndex]?.fileName
                ? true
                : false
            }

            //editor_diffContent={diffContent}
            //editor_setDiffContent={setDiffContent}
          ></Editor>
        );
      })}
      {/*Monaco Editor -------------------------------------------------------------- */}

      {/*Editor Top Bar Container -------------------------------------------------------------- */}
      {/*Editor Top Right Section*/}
      <div className="code_editor_top_right_section1113">
        <img
          src={SYSTEM_ICON_MANAGER.close.ICON512}
          className="code_editor_close_icon1113"
          draggable="false"
          alt="close"
        />
      </div>
      {/*Editor File Selection Bar*/}
      <div
        className="file_selection_bar_container1114"
        ref={fileSelectionBarContainerRef}
        onDragOver={(e) => {
          containerOnDragOver(e);
        }}
        onDragLeave={(e) => {
          setOnDropIndex(-1);
        }}
      >
        {fileList.map((file, index) => {
          let className;
          switch (true) {
            case index === onSelectedIndex:
              className = "file_selection_bar_item_selected1114";
              break;
            case index === onSwapIndex:
              className = "file_selection_bar_item_selected1114";
              break;
            default:
              className = "file_selection_bar_item1114";
          }
          return (
            <div
              key={index}
              className={className}
              draggable={true}
              onDragStart={(e) => {
                onFileDragStart(e, index);
              }}
              onDragEnd={(e) => {
                onFileDragEnd(e);
              }}
              onClick={() => {
                setOnSelectedIndex(index);
              }}
            >
              <img
                src={
                  FILE_TYPE_ICON_MANAGER[file.fileName.split(".").pop()]
                    ?.ICON512
                }
                className="file_selection_bar_item_filetype_icon1114"
                alt="close"
                style={{ opacity: index === onSelectedIndex ? "1" : "0.32" }}
              />
              <span
                className="file_selection_bar_file_text1114"
                style={{ opacity: index === onSelectedIndex ? "1" : "0.32" }}
              >
                {file.fileName}
              </span>
              <img
                src={SYSTEM_ICON_MANAGER.close.ICON512}
                className="file_selection_bar_item_close_icon1114"
                alt="close"
                draggable="false"
                onClick={(e) => {
                  onFileDelete(e)(index);
                }}
              />
            </div>
          );
        })}
      </div>
      {/*Editor Top Bar Container -------------------------------------------------------------- */}
    </div>
  );
};

export default VecoderEditor;
