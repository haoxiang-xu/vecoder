import React, { useState, useRef, useEffect, useContext } from "react";
import axios from "axios";
import Editor from "../monacoEditor/monacoEditor";
import "./vecoder_editor.css";
import { ICON_MANAGER } from "../../ICONs/icon_manager";
import { rightClickContextMenuCommandContexts } from "../../CONTEXTs/rightClickContextMenuContexts";
import { globalDragAndDropContexts } from "../../CONTEXTs/globalDragAndDropContexts";
import { vecoderEditorContexts } from "../../CONTEXTs/vecoderEditorContexts";

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
  const { accessVecoderEditorFileNameDataByPath } = useContext(
    vecoderEditorContexts
  );
  const [position, setPosition] = useState({
    x: -9999,
    y: -9999,
  });
  const [containerWidth, setContainerWidth] = useState(0);
  const labelRef = useRef(null);
  useEffect(() => {
    const onDragOver = (e) => {
      e.preventDefault();
      e.stopPropagation();
      setPosition({
        x: e.clientX,
        y: e.clientY,
      });
    };
    window.addEventListener("dragover", onDragOver);
    return () => {
      window.removeEventListener("dragover", onDragOver);
    };
  }, []);
  useEffect(() => {
    if (labelRef.current) {
      setContainerWidth(labelRef.current.offsetWidth);
    }
  }, [labelRef.current]);

  return (
    <>
      {draggedItem ? (
        <div
          className="ghost_drag_image_container0207"
          style={{
            left: position.x,
            top: position.y,
            width: containerWidth + 24,
          }}
        >
          <span className="ghost_drag_image_filetype_label0207" ref={labelRef}>
            {accessVecoderEditorFileNameDataByPath(draggedItem)}
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
  code_editor_container_ref_index,
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
  const {
    updateMonacoEditorPathsByEditorIndex,
    accessMonacoEditorPathsByEditorIndex,
    accessVecoderEditorFileNameDataByPath,
  } = useContext(vecoderEditorContexts);
  const [forceRefresh, setForceRefresh] = useState(false);
  const refresh = () => {
    setForceRefresh(!forceRefresh);
  };

  /* File Selection Bar parameters & Functions ==================================================== */
  const fileSelectionBarContainerRef = useRef(null);
  const fileItemRefs = useRef([]);
  const [onDragIndex, setOnDragIndex] = useState(-1);
  const [onDropIndex, setOnDropIndex] = useState(-1);
  const [onSwapIndex, setOnSwapIndex] = useState(-1);

  const onFileDelete = (e) => (index) => {
    e.stopPropagation();
    const editedFiles = [
      ...accessMonacoEditorPathsByEditorIndex(code_editor_container_ref_index),
    ];
    editedFiles.splice(index, 1);
    updateMonacoEditorPathsByEditorIndex(
      code_editor_container_ref_index,
      editedFiles
    );

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
    setDraggedItem(
      accessMonacoEditorPathsByEditorIndex(code_editor_container_ref_index)[
        index
      ]
    );
  };
  const onFileDragEnd = (e, index) => {
    e.stopPropagation();

    document.body.style.cursor = "";

    if (onDropIndex !== -1) {
      const editedFiles = [
        ...accessMonacoEditorPathsByEditorIndex(
          code_editor_container_ref_index
        ),
      ];
      const dragedFile = editedFiles.splice(onDragIndex, 1)[0];
      editedFiles.splice(onDropIndex, 0, dragedFile);
      updateMonacoEditorPathsByEditorIndex(
        code_editor_container_ref_index,
        editedFiles
      );
      setOnSelectedIndex(
        Math.min(
          onDropIndex,
          accessMonacoEditorPathsByEditorIndex(code_editor_container_ref_index)
            .length - 1
        )
      );
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
          setDraggedOverItem(
            accessMonacoEditorPathsByEditorIndex(
              code_editor_container_ref_index
            )[dropIndex]
          );
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
      const editedFiles = [
        ...accessMonacoEditorPathsByEditorIndex(
          code_editor_container_ref_index
        ),
      ];
      const dragedFile = draggedItem;
      editedFiles.splice(onDropIndex, 0, dragedFile);
      updateMonacoEditorPathsByEditorIndex(
        code_editor_container_ref_index,
        editedFiles
      );
      setOnSelectedIndex(onDropIndex);

      setOnDragIndex(-1);
      setOnDropIndex(-1);
      setOnSwapIndex(-1);
      setDraggedItem(null);
      setDraggedOverItem(null);
      setDragCommand("WAITING FOR MODE APPEND");
    }
    if (onDragIndex !== -1 && dragCommand === "DELETE FROM SOURCE") {
      const editedFiles = [
        ...accessMonacoEditorPathsByEditorIndex(
          code_editor_container_ref_index
        ),
      ];
      editedFiles.splice(onDragIndex, 1);
      updateMonacoEditorPathsByEditorIndex(
        code_editor_container_ref_index,
        editedFiles
      );
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
      {accessMonacoEditorPathsByEditorIndex(
        code_editor_container_ref_index
      ).map((filePath, index) => {
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
            width: spanRefs.current[index]?.offsetWidth + 38 + "px",
          };
        } else {
          containerStyle = {
            height: spanRefs.current[index]?.offsetWidth + 38 + "px",
          };
        }
        return (
          <div
            key={filePath}
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
            <span
              ref={(el) => (spanRefs.current[index] = el)}
              className={
                mode === "HORIZONTAL"
                  ? "file_selection_bar_file_text1114"
                  : "file_selection_bar_file_text_vertical0123"
              }
            >
              {accessVecoderEditorFileNameDataByPath(filePath)}
            </span>
            <img
              src={
                FILE_TYPE_ICON_MANAGER[
                  accessVecoderEditorFileNameDataByPath(filePath)
                    .split(".")
                    .pop()
                ]?.ICON512
              }
              className={
                mode === "HORIZONTAL"
                  ? "file_selection_bar_item_filetype_icon1114"
                  : "file_selection_bar_item_filetype_icon_vertical0123"
              }
              alt="close"
              style={{
                opacity: index === onSelectedIndex ? "0" : "0.64",
              }}
            />
            <img
              src={SYSTEM_ICON_MANAGER.close.ICON512}
              className={
                mode === "HORIZONTAL"
                  ? "file_selection_bar_item_close_icon1114"
                  : "file_selection_bar_item_close_icon_vertical0123"
              }
              style={
                onSelectedIndex === index
                  ? { opacity: "1" }
                  : { opacity: "0", pointerEvents: "none" }
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
  const { accessMonacoEditorPathsByEditorIndex } = useContext(
    vecoderEditorContexts
  );
  const [diffContent, setDiffContent] = useState(null);
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

  return accessMonacoEditorPathsByEditorIndex(
    code_editor_container_ref_index
  ).map((filePath, index) => {
    return (
      <Editor
        key={filePath}
        //Editor required parameters
        editor_filePath={filePath}
        //Editor function parameters
        onAppendContent={onAppendContent}
        setOnAppendContent={setOnAppendContent}
        setOnSelectedContent={setOnSelectedContent}
        onContextMenu={(e) => {
          handleRightClick(e);
        }}
        mode={mode}
        display={
          filePath ===
          accessMonacoEditorPathsByEditorIndex(code_editor_container_ref_index)[
            onSelectedIndex
          ]
            ? true
            : false
        }
        //editor_diffContent={diffContent}
        //editor_setDiffContent={setDiffContent}
      ></Editor>
    );
  });
};
const VecoderEditor = ({
  code_editor_width,
  code_editor_container_ref_index,
  //Maximize and Minimize Container
  onMaximizeOnClick,
  onMinimizeOnClick,
}) => {
  const {
    accessMonacoEditorFileLanguageDataByEditorIndexAndOnSelectedIndex,
    accessMonacoEditorFileContentDataByEditorIndexAndOnSelectedIndex,
  } = useContext(vecoderEditorContexts);

  const [onSelectedIndex, setOnSelectedIndex] = useState(null);
  const [onSelectedCotent, setOnSelectedCotent] = useState(null);
  const [onAppendContent, setOnAppendContent] = useState(null);

  /* API =================================================================================== */
  const continueAPI = async () => {
    const requestBody = {
      language:
        accessMonacoEditorFileLanguageDataByEditorIndexAndOnSelectedIndex(
          code_editor_container_ref_index,
          onSelectedIndex
        ),
      prompt: onSelectedCotent?.selectedText,
    };

    try {
      const response = await axios.post(
        "http://localhost:8200/openai/continue",
        requestBody
      );
      console.log(onSelectedCotent);
      setOnAppendContent(response.data.data.content);
      console.log(response.data);
    } catch (e) {
      console.log(e);
    }
  };
  const getAST = async () => {
    const requestBody = {
      language:
        accessMonacoEditorFileLanguageDataByEditorIndexAndOnSelectedIndex(
          code_editor_container_ref_index,
          onSelectedIndex
        ),
      prompt: onSelectedCotent?.selectedText,
    };

    try {
      const response = await axios.post(
        "http://localhost:8200/AST/" +
          accessMonacoEditorFileLanguageDataByEditorIndexAndOnSelectedIndex(
            code_editor_container_ref_index,
            onSelectedIndex
          ),
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
        prompt =
          accessMonacoEditorFileContentDataByEditorIndexAndOnSelectedIndex(
            code_editor_container_ref_index,
            onSelectedIndex
          ) || "";
        break;
      default:
        console.log("Invalid input format");
        return;
    }
    const requestBody = {
      language:
        accessMonacoEditorFileLanguageDataByEditorIndexAndOnSelectedIndex(
          code_editor_container_ref_index,
          onSelectedIndex
        ) || "defaultLanguage",
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
  const {
    onRightClickItem,
    setOnRightClickItem,
    rightClickCommand,
    setRightClickCommand,
  } = useContext(rightClickContextMenuCommandContexts);
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
          code_editor_container_ref_index={code_editor_container_ref_index}
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
