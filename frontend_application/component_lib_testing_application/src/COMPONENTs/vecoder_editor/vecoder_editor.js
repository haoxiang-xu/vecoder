import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import Editor from "../monacoEditor/monacoEditor";
import "./vecoder_editor.css";
import { ICON_MANAGER } from "../../ICONs/icon_manager";
import { globalDragAndDropContexts } from "../../CONTEXTs/globalDragAndDropContexts";

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

const GhostDragImage = ({ draggedItem }) => {
  const [position, setPosition] = useState({ x: -9999, y: -9999 });

  useEffect(() => {
    const onDragOver = (e) => {
      e.dataTransfer.setDragImage(new Image(), 0, 0);
      setPosition({ x: e.clientX, y: e.clientY });
    };
    window.addEventListener("dragover", onDragOver);
    return () => {
      window.removeEventListener("dragover", onDragOver);
    };
  }, []);

  return (
    <>
      {draggedItem ? (
        <div
          className="ghost_drag_image_container0207"
          style={{
            left: position.x,
            top: position.y,
          }}
        >
          <img
            className="ghost_drag_image_filetype_image0207"
            src={
              FILE_TYPE_ICON_MANAGER[draggedItem?.fileName.split(".").pop()]
                ?.ICON512
            }
          />
          <span className="ghost_drag_image_filetype_label0207">
            {draggedItem?.fileName}
          </span>
        </div>
      ) : null}
    </>
  );
};
const TopLeftSection = ({
  mode,
  //Maximize and Minimize Container
  onMaximizeOnClick,
  onMinimizeOnClick,
}) => {
  const [MaxIconOnHover, setMaxIconOnHover] = useState(false);
  const [MinIconOnHover, setMinIconOnHover] = useState(false);
  const [MaximizeIconStyling, setMaximizeIconStyling] = useState(null);
  const [MinimizeIconStyling, setMinimizeIconStyling] = useState(null);
  const onMaximizeOnHover = () => {
    setMaxIconOnHover(true);
    setMinIconOnHover(false);
    setMaximizeIconStyling({
      opacity: 1,
      zIndex: 1,
      padding: "9px 4px 9px 4px",
      left: 50,
    });
    setMinimizeIconStyling({
      opacity: 0.16,
      zIndex: 0,
      padding: "9px 0px 9px 0px",
    });
  };
  const onMinimizeOnHover = () => {
    setMaxIconOnHover(false);
    setMinIconOnHover(true);
    setMaximizeIconStyling({
      opacity: 0.16,
      zIndex: 0,
      padding: "9px 0px 9px 0px",
      left: 58,
    });
    setMinimizeIconStyling({
      opacity: 1,
      zIndex: 1,
      padding: "9px 4px 9px 4px",
    });
  };
  const onMaximizeOut = () => {
    setMaxIconOnHover(false);
  };
  const onMinimizeOut = () => {
    setMinIconOnHover(false);
  };
  useEffect(() => {
    if (!MaxIconOnHover && !MinIconOnHover) {
      setMaximizeIconStyling(null);
      setMinimizeIconStyling(null);
    }
  }, [MaxIconOnHover, MinIconOnHover]);

  return mode === "HORIZONTAL" ? (
    <div className="code_editor_top_right_section1113">
      <img
        src={SYSTEM_ICON_MANAGER.rightArrow.ICON512}
        className="code_editor_maximize_icon0129"
        draggable="false"
        onClick={onMaximizeOnClick}
        onMouseOver={onMaximizeOnHover}
        onMouseOut={onMaximizeOut}
        alt="maximize"
        style={MaximizeIconStyling}
      />
      <img
        src={SYSTEM_ICON_MANAGER.leftArrow.ICON512}
        className="code_editor_minimize_icon0129"
        draggable="false"
        onClick={onMinimizeOnClick}
        onMouseOver={onMinimizeOnHover}
        onMouseOut={onMinimizeOut}
        alt="minimize"
        style={MinimizeIconStyling}
      />
      <img
        src={SYSTEM_ICON_MANAGER.close.ICON512}
        className="code_editor_close_icon1113"
        draggable="false"
        alt="close"
      />
    </div>
  ) : (
    <div className="code_editor_top_right_section_vertical0129">
      <img
        src={SYSTEM_ICON_MANAGER.rightArrow.ICON512}
        className="code_editor_maximize_icon_vertical0129"
        draggable="false"
        onClick={(e) => {
          onMaximizeOnClick();
          setMaxIconOnHover(false);
          setMinIconOnHover(false);
        }}
        alt="maximize"
      />
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
  //HORIZONTAL OR VERTICAL MODE
  mode,
}) => {
  const {
    draggedItem,
    setDraggedItem,
    draggedOverItem,
    setDraggedOverItem,
    dragCommand,
    setDragCommand,
  } = useContext(globalDragAndDropContexts);
  const [forceRefresh, setForceRefresh] = useState(false);
  const refresh = () => {
    setForceRefresh(!forceRefresh);
  };
  useEffect(() => {
    refresh();
  }, [files]);

  /* File Selection Bar parameters & Functions ==================================================== */
  const fileSelectionBarContainerRef = useRef(null);
  const fileItemRefs = useRef([]);
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
    e.dataTransfer.setDragImage(new Image(), 0, 0);

    setOnSelectedIndex(index);
    setOnDragIndex(index);
    setDraggedItem(files[index]);
  };
  const onFileDragEnd = (e, index) => {
    e.stopPropagation();

    document.body.style.cursor = "";

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
      let isAfterLastItem = false;

      if (mode === "HORIZONTAL") {
        isAfterLastItem =
          e.clientY > lastItemRect.top && e.clientX > lastItemRect.right;
      } else {
        isAfterLastItem =
          e.clientX > lastItemRect.left && e.clientY > lastItemRect.bottom;
      }

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
    if (onSelectedIndex !== -1) {
      const itemScrollLeft = fileItemRefs.current[onSelectedIndex]?.offsetLeft;
      const itemWidth = fileItemRefs.current[onSelectedIndex]?.offsetWidth;
      const containerScrollLeft =
        fileSelectionBarContainerRef.current.scrollLeft;
      const containerWidth = fileSelectionBarContainerRef.current?.offsetWidth;

      if (itemScrollLeft < containerScrollLeft) {
        fileSelectionBarContainerRef.current.scrollLeft = itemScrollLeft;
      } else if (
        itemScrollLeft + itemWidth >
        containerScrollLeft + containerWidth
      ) {
        fileSelectionBarContainerRef.current.scrollLeft = itemScrollLeft;
      }
    }
  }, [onSelectedIndex]);
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
        let containerStyle = {};
        switch (true) {
          case index === onSelectedIndex:
            mode === "HORIZONTAL"
              ? (className = "file_selection_bar_item_selected1114")
              : (className = "file_selection_bar_item_selected_vertical0123");
            break;
          default:
            mode === "HORIZONTAL"
              ? (className = "file_selection_bar_item1114")
              : (className = "file_selection_bar_item_vertical0123");
        }
        if (mode === "HORIZONTAL") {
          containerStyle = {
            width: spanRefs.current[index]?.offsetWidth + 60 + "px",
          };
        } else {
          containerStyle = {
            height: spanRefs.current[index]?.offsetWidth + 60 + "px",
          };
        }
        return (
          <div
            key={file.filePath}
            ref={(el) => (fileItemRefs.current[index] = el)}
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
            style={containerStyle}
          >
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
            <span
              ref={(el) => (spanRefs.current[index] = el)}
              className={
                mode === "HORIZONTAL"
                  ? "file_selection_bar_file_text1114"
                  : "file_selection_bar_file_text_vertical0123"
              }
            >
              {file.fileName}
            </span>
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
            {/* Drag and Drop Invisible Overlay ---------------------------------------------- */}
            {onDragIndex !== -1 || draggedItem != null ? (
              <div
                className="file_selection_bar_item_overlay_invisible0206"
                style={containerStyle}
              ></div>
            ) : null}
            {/* Drag and Drop HighLight Overlay ---------------------------------------------- */}
            {index === onDropIndex ? (
              <div
                className="file_selection_bar_item_overlay_highlight0206"
                style={containerStyle}
              ></div>
            ) : null}
          </div>
        );
      })}
      {onDragIndex !== -1 || draggedItem != null ? (
        <GhostDragImage draggedItem={draggedItem} />
      ) : null}
    </div>
  );
};
const MonacoEditorGroup = ({
  code_editor_container_ref_index,
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
        source:
          "vecoder_editor" + "/" + code_editor_container_ref_index.toString(),
        condition: { paste: true },
        content: { customizeRequest: customizeRequest },
        target:
          "vecoder_editor" + "/" + code_editor_container_ref_index.toString(),
      });
    } else {
      setOnRightClickItem({
        source:
          "vecoder_editor" + "/" + code_editor_container_ref_index.toString(),
        condition: { paste: false },
        content: { customizeRequest: customizeRequest },
        target:
          "vecoder_editor" + "/" + code_editor_container_ref_index.toString(),
      });
    }
  };
  return mode === "HORIZONTAL"
    ? files.map((file, index) => {
        return (
          <Editor
            key={files[index].filePath}
            //Editor required parameters
            editor_filePath={files[index].filePath}
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
  code_editor_width,
  code_editor_container_ref_index,
  imported_files,
  setImportedFiles,
  //Context Menu
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
  //Maximize and Minimize Container
  onMaximizeOnClick,
  onMinimizeOnClick,
}) => {
  const [onSelectedIndex, setOnSelectedIndex] = useState(null);
  const [onSelectedCotent, setOnSelectedCotent] = useState(null);
  const [onAppendContent, setOnAppendContent] = useState(null);

  /* API =================================================================================== */
  const continueAPI = async () => {
    const requestBody = {
      language: imported_files[onSelectedIndex].fileLanguage,
      prompt: onSelectedCotent?.selectedText,
    };

    try {
      const response = await axios.post(
        "http://localhost:8200/openai/continue",
        requestBody
      );
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getAST = async () => {
    const requestBody = {
      language: imported_files[onSelectedIndex].fileLanguage,
      prompt: onSelectedCotent?.selectedText,
    };

    try {
      const response = await axios.post(
        "http://localhost:8200/AST/" +
          imported_files[onSelectedIndex].fileLanguage,
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
        "vecoder_editor" + "/" + code_editor_container_ref_index.toString()
    ) {
      handleRightClickCommand(rightClickCommand.command);
      setRightClickCommand(null);
      setOnRightClickItem(null);
    }
  }, [rightClickCommand]);
  const handleRightClickCommand = async (command) => {
    switch (command) {
      case "continue":
        continueAPI();
        break;
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
  const [mode, setMode] = useState("HORIZONTAL"); //["HORIZONTAL", "VERTICAL"]
  useEffect(() => {
    code_editor_width <= 50 ? setMode("VERTICAL") : setMode("HORIZONTAL");
  }, [code_editor_width]);
  /* HORIZONTAL OR VERTICAL MODE ====================================================== */

  return (
    <div
      className="code_editor_container1113"
      onClick={(e) => {
        handleLeftClick(e);
      }}
    >
      <div style={{ height: "100%" }}>
        <MonacoEditorGroup
          code_editor_container_ref_index={code_editor_container_ref_index}
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
        <TopLeftSection
          mode={mode}
          //Maximize and Minimize Container
          onMaximizeOnClick={onMaximizeOnClick}
          onMinimizeOnClick={onMinimizeOnClick}
        />
        <FileSelectionBar
          //DATA
          files={imported_files}
          setFiles={setImportedFiles}
          onSelectedIndex={onSelectedIndex}
          setOnSelectedIndex={setOnSelectedIndex}
          //HORIZONTAL OR VERTICAL MODE
          mode={mode}
        />
      </div>
    </div>
  );
};

export default VecoderEditor;
