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
  //Drag and Drop
  draggedItem,
  setDraggedItem,
  draggedOverItem,
  setDraggedOverItem,
  dragCommand,
  setDragCommand,
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

  /* API ----------------------------------------------------------------------- */
  const getAST = async () => {
    const requestBody = {
      language: files[onSelectedIndex].fileLanguage,
      prompt: onSelectedCode.selectedText,
    };

    try {
      const response = await axios.post(
        "http://localhost:8200/AST/python",
        requestBody
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const handleCustomizeRequest = async () => {
    setCustomizeRequest(rightClickCommand.content);
    let prompt = "";
    const requestURL = rightClickCommand?.content?.requestURL;

    if (!requestURL) {
      console.log("requestURL is not defined");
      return;
    }
    switch (rightClickCommand?.content?.inputFormat) {
      case "onSelect":
        prompt = onSelectedCode?.selectedText || "";
        break;
      case "entireFile":
        if (files?.length > onSelectedIndex && files?.length) {
          const selectedFile = files[onSelectedIndex]?.fileName;
          const file = files.find((f) => f.fileName === selectedFile);
          prompt = file?.fileContent || "";
        }
        break;
      default:
        console.log("Invalid input format");
        return;
    }
    const requestBody = {
      language: files?.[onSelectedIndex]?.fileLanguage || "defaultLanguage",
      prompt: prompt,
    };
    switch (rightClickCommand?.content?.requestMethod) {
      case "GET":
        try {
          const response = await axios.get(requestURL, requestBody);
          console.log(response.data);
        } catch (e) {
          console.log("Error in axios request:", e);
        }
        break;
      case "POST":
        try {
          const response = await axios.post(requestURL, requestBody);
          console.log(response.data);
        } catch (e) {
          console.log("Error in axios request:", e);
        }
        break;
      default:
        console.log("Invalid request method");
        return;
    }
  };
  /* API ----------------------------------------------------------------------- */

  /* Context Menu ----------------------------------------------------------------------- */
  const [onAppendContent, setOnAppendContent] = useState(null);
  const [customizeRequest, setCustomizeRequest] = useState(null);
  const handleRightClick = (event) => {
    event.preventDefault();
    if (onSelectedCode || navigator.clipboard.readText() !== "") {
      setOnRightClickItem({
        source: "vecoder_editor",
        condition: { paste: true },
        content: { customizeRequest: customizeRequest },
        target: "vecoder_editor",
      });
    } else {
      setOnRightClickItem({
        source: "vecoder_editor",
        condition: { paste: false },
        content: { customizeRequest: customizeRequest },
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
      case "customizeRequest":
        await handleCustomizeRequest();
        break;
    }
  };
  /* Context Menu ----------------------------------------------------------------------- */

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
  const [onSelectedIndex, setOnSelectedIndex] = useState(null);
  const [onDragIndex, setOnDragIndex] = useState(-1);
  const [onDropIndex, setOnDropIndex] = useState(-1);
  const [onSwapIndex, setOnSwapIndex] = useState(-1);

  const onFileDelete = (e) => (index) => {
    e.stopPropagation();
    const editedFiles = [...files];
    editedFiles.splice(index, 1);
    setFiles(editedFiles);

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
    setDraggedItem(files[index]);
  };
  const onFileDragEnd = (e, index) => {
    e.target.style.opacity = 1;

    if (onDropIndex !== -1) {
      const editedFiles = [...files];
      const dragedFile = editedFiles.splice(onDragIndex, 1)[0];
      editedFiles.splice(onDropIndex, 0, dragedFile);
      setFiles(editedFiles);
      setOnSelectedIndex(Math.min(onDropIndex, files.length - 1));
    }
    if (onDropIndex === -1 && draggedOverItem !== null) {
      setDragCommand("APPEND TO TARGET");
    } else {
      setOnDragIndex(-1);
      setOnDropIndex(-1);
      setOnSwapIndex(-1);
      setDraggedItem(null);
    }
  };
  const fileSelectionBarOnDragOver = (e) => {
    e.preventDefault();
    e.stopPropagation();
    const targetElement = e.target.closest(
      ".file_selection_bar_item1114, .file_selection_bar_item_selected1114"
    );
    if (targetElement && fileSelectionBarContainerRef.current) {
      const childrenArray = Array.from(
        fileSelectionBarContainerRef.current.children
      );
      const dropIndex = childrenArray.indexOf(targetElement);
      if (dropIndex !== onDropIndex && dropIndex !== -1) {
        if (onDragIndex === -1) {
          setDraggedOverItem(files[dropIndex]);
        }
        setOnDropIndex(dropIndex);
      }
    } else {
      const childrenArray = Array.from(
        fileSelectionBarContainerRef.current.children
      );
      const lastItem = childrenArray[childrenArray.length - 1];
      const lastItemRect = lastItem.getBoundingClientRect();
      const isAfterLastItem =
        e.clientY > lastItemRect.top && e.clientX > lastItemRect.right;

      if (isAfterLastItem) {
        if (onDragIndex !== childrenArray.length - 1) {
          let dropIndex = -1;
          if (onDragIndex === -1) {
            dropIndex = childrenArray.length;
          } else {
            dropIndex = childrenArray.length - 1;
          }
          setOnDropIndex(dropIndex);
          if (onDragIndex === -1) {
            setDraggedOverItem("fileSelectionBarContainerLastItem");
          }
        }
      }
    }
  };
  const fileSelectionBarOnDragLeave = (e) => {
    setOnDropIndex(-1);
    setOnSwapIndex(-1);
    setDraggedOverItem(null);
  };
  useEffect(() => {
    setOnSwapIndex(onDropIndex);
  }, [onDropIndex]);
  useEffect(() => {
    if (onDropIndex !== -1 && dragCommand === "APPEND TO TARGET") {
      const editedFiles = [...files];
      const dragedFile = draggedItem;
      editedFiles.splice(onDropIndex, 0, dragedFile);
      setFiles(editedFiles);
      setOnSelectedIndex(onDropIndex);

      setOnDragIndex(-1);
      setOnDropIndex(-1);
      setOnSwapIndex(-1);
      setDraggedItem(null);
      setDraggedOverItem(null);
      setDragCommand("DELETE FROM SOURCE");
    }
    if (onDragIndex !== -1 && dragCommand === "DELETE FROM SOURCE") {
      const editedFiles = [...files];
      editedFiles.splice(onDragIndex, 1);
      setFiles(editedFiles);
      setOnSelectedIndex(null);

      setOnDragIndex(-1);
      setOnDropIndex(-1);
      setOnSwapIndex(-1);
      setDragCommand(null);
    }
  }, [dragCommand]);
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
              file.filePath === files[onSelectedIndex]?.filePath ? true : false
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
          fileSelectionBarOnDragOver(e);
        }}
        onDragLeave={(e) => {
          fileSelectionBarOnDragLeave(e);
        }}
      >
        {files.map((file, index) => {
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
                onDragOver={(e) => {
                  e.stopPropagation();
                  e.preventDefault();
                }}
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
