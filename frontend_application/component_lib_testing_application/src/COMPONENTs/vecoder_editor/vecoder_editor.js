import React, { useState, useRef, useEffect } from "react";
import axios from "axios";
import Editor from "../monacoEditor/monacoEditor";
import "./vecoder_editor.css";
import { ICON_MANAGER } from "../../ICONs/icon_manager";

/* Load ICON manager --------------------------------------------------------------------------------- */
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
/* Load ICON manager --------------------------------------------------------------------------------- */

const TopRightSection = () => {
  return (
    <div className="code_editor_top_right_section1113">
      <img
        src={SYSTEM_ICON_MANAGER.close.ICON512}
        className="code_editor_close_icon1113"
        draggable="false"
        alt="close"
      />
    </div>
  );
};
const FileSelectionBar = ({
  //DATA
  files,
  setFiles,
  onSelectedIndex,
  setOnSelectedIndex,
  //DRAG AND DROP
  draggedItem,
  setDraggedItem,
  draggedOverItem,
  setDraggedOverItem,
  dragCommand,
  setDragCommand,
  //HORIZONTAL OR VERTICAL MODE
  mode,
}) => {
  const [forceRefresh, setForceRefresh] = useState(false);
  const refresh = () => {
    setForceRefresh(!forceRefresh);
  };

  /* File Selection Bar parameters & Functions ==================================================== */
  const fileSelectionBarContainerRef = useRef(null);
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
    e.stopPropagation();

    setOnSelectedIndex(index);
    setOnDragIndex(index);
    setDraggedItem(files[index]);
  };
  const onFileDragEnd = (e, index) => {
    e.stopPropagation();

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
      ".file_selection_bar_item1114, " +
        ".file_selection_bar_item_selected1114, " +
        ".file_selection_bar_item_vertical0123, " +
        ".file_selection_bar_item_selected_vertical0123"
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
    e.stopPropagation();
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
  /* File Selection Bar parameters & Functions ==================================================== */

  /* Styling----------------------------------------------------------------------------------- */
  const spanRefs = useRef([]);
  useEffect(() => {
    refresh();
  }, [spanRefs.current[onSelectedIndex]?.offsetWidth]);
  /* Styling----------------------------------------------------------------------------------- */

  return (
    <div
      className={
        mode === "HORIZONTAL"
          ? "file_selection_bar_container1114"
          : "file_selection_bar_container_vertical0122"
      }
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
            mode === "HORIZONTAL"
              ? (className = "file_selection_bar_item_selected1114")
              : (className = "file_selection_bar_item_selected_vertical0123");
            break;
          case index === onSwapIndex:
            mode === "HORIZONTAL"
              ? (className = "file_selection_bar_item_selected1114")
              : (className = "file_selection_bar_item_selected_vertical0123");
            break;
          default:
            mode === "HORIZONTAL"
              ? (className = "file_selection_bar_item1114")
              : (className = "file_selection_bar_item_vertical0123");
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
            style={
              mode === "HORIZONTAL"
                ? {}
                : {
                    minHeight: spanRefs.current[index]?.offsetWidth + 60 + "px",
                  }
            }
          >
            <img
              src={
                FILE_TYPE_ICON_MANAGER[file.fileName.split(".").pop()]?.ICON512
              }
              className={
                mode === "HORIZONTAL"
                  ? "file_selection_bar_item_filetype_icon1114"
                  : "file_selection_bar_item_filetype_icon_vertical0123"
              }
              alt="close"
              style={{
                opacity: index === onSelectedIndex ? "1" : "0.32",
              }}
            />
            <span
              ref={(el) => (spanRefs.current[index] = el)}
              className={
                mode === "HORIZONTAL"
                  ? "file_selection_bar_file_text1114"
                  : "file_selection_bar_file_text_vertical0123"
              }
              style={{
                opacity: index === onSelectedIndex ? "1" : "0.32",
              }}
            >
              {file.fileName}
            </span>
            <img
              src={SYSTEM_ICON_MANAGER.close.ICON512}
              className={
                mode === "HORIZONTAL"
                  ? "file_selection_bar_item_close_icon1114"
                  : "file_selection_bar_item_close_icon_vertical0123"
              }
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
  );
};
const MonacoEditorGroup = ({
  code_editor_index,
  //FILE DATA
  files,
  setFiles,
  //CONTEXT MENU
  setOnRightClickItem,
  onSelectedIndex,
  onSelectedContent,
  setOnSelectedContent,
  onAppendContent,
  setOnAppendContent,
  customizeRequest,
  //HORIZONTAL OR VERTICAL MODE
  mode,
}) => {
  const [diffContent, setDiffContent] = useState(null);
  const setFileContent = (index) => (value) => {
    const editedFiles = [...files];
    editedFiles[index].fileContent = value;
    setFiles(editedFiles);
  };
  const handleRightClick = (event) => {
    event.preventDefault();
    if (onSelectedContent || navigator.clipboard.readText() !== "") {
      setOnRightClickItem({
        source: "vecoder_editor" + "/" + code_editor_index.toString(),
        condition: { paste: true },
        content: { customizeRequest: customizeRequest },
        target: "vecoder_editor" + "/" + code_editor_index.toString(),
      });
    } else {
      setOnRightClickItem({
        source: "vecoder_editor" + "/" + code_editor_index.toString(),
        condition: { paste: false },
        content: { customizeRequest: customizeRequest },
        target: "vecoder_editor" + "/" + code_editor_index.toString(),
      });
    }
  };
  return mode === "HORIZONTAL"
    ? files.map((file, index) => {
        return (
          <Editor
            key={index}
            //Editor required parameters
            editor_content={files[index].fileContent}
            editor_setContent={setFileContent(index)}
            editor_language={files[index].fileLanguage}
            //Editor function parameters
            onAppendContent={onAppendContent}
            setOnAppendContent={setOnAppendContent}
            setOnSelectedContent={setOnSelectedContent}
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
      })
    : null;
};
const VecoderEditor = ({
  code_editor_index,
  imported_files,
  setImportedFiles,
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
  const [onSelectedIndex, setOnSelectedIndex] = useState(null);
  const [onSelectedCotent, setOnSelectedCotent] = useState(null);
  const [onAppendContent, setOnAppendContent] = useState(null);

  /* API =================================================================================== */
  const getAST = async () => {
    const requestBody = {
      language: imported_files[onSelectedIndex].fileLanguage,
      prompt: onSelectedCotent?.selectedText,
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
        prompt = onSelectedCotent?.selectedText || "";
        break;
      case "entireFile":
        if (
          imported_files?.length > onSelectedIndex &&
          imported_files?.length
        ) {
          const selectedFile = imported_files[onSelectedIndex]?.fileName;
          const file = imported_files.find((f) => f.fileName === selectedFile);
          prompt = file?.fileContent || "";
        }
        break;
      default:
        console.log("Invalid input format");
        return;
    }
    const requestBody = {
      language:
        imported_files?.[onSelectedIndex]?.fileLanguage || "defaultLanguage",
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
  /* API =================================================================================== */

  /* Context Menu ----------------------------------------------------------------------- */
  const [customizeRequest, setCustomizeRequest] = useState(null);
  const handleLeftClick = (event) => {
    setOnRightClickItem(null);
  };
  useEffect(() => {
    if (
      rightClickCommand &&
      rightClickCommand.target ===
        "vecoder_editor" + "/" + code_editor_index.toString()
    ) {
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
        if (onSelectedCotent) {
          await navigator.clipboard.writeText(onSelectedCotent?.selectedText);
        }
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

  /* HORIZONTAL OR VERTICAL MODE ====================================================== */
  const editorContainerRef = useRef(null);
  const [mode, setMode] = useState("HORIZONTAL"); //["HORIZONTAL", "VERTICAL"]
  useEffect(() => {
    if (editorContainerRef.current) {
      editorContainerRef.current?.offsetWidth <= 50
        ? setMode("VERTICAL")
        : setMode("HORIZONTAL");
    }
  }, [editorContainerRef.current?.offsetWidth]);
  /* HORIZONTAL OR VERTICAL MODE ====================================================== */

  return (
    <div
      className="code_editor_container1113"
      ref={editorContainerRef}
      onClick={(e) => {
        handleLeftClick(e);
      }}
    >
      <div style={{ height: "100%" }}>
        <MonacoEditorGroup
          code_editor_index={code_editor_index}
          //FILE DATA
          files={imported_files}
          setFiles={setImportedFiles}
          //CONTEXT MENU
          setOnRightClickItem={setOnRightClickItem}
          onSelectedIndex={onSelectedIndex}
          onSelectedContent={onSelectedCotent}
          setOnSelectedContent={setOnSelectedCotent}
          onAppendContent={onAppendContent}
          setOnAppendContent={setOnAppendContent}
          customizeRequest={customizeRequest}
          //HORIZONTAL OR VERTICAL MODE
          mode={mode}
        />
        <TopRightSection />
        <FileSelectionBar
          //DATA
          files={imported_files}
          setFiles={setImportedFiles}
          onSelectedIndex={onSelectedIndex}
          setOnSelectedIndex={setOnSelectedIndex}
          //DRAG AND DROP
          draggedItem={draggedItem}
          setDraggedItem={setDraggedItem}
          draggedOverItem={draggedOverItem}
          setDraggedOverItem={setDraggedOverItem}
          dragCommand={dragCommand}
          setDragCommand={setDragCommand}
          //HORIZONTAL OR VERTICAL MODE
          mode={mode}
        />
      </div>
    </div>
  );
};

export default VecoderEditor;
