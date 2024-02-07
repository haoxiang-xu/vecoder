import React, { useState, useEffect, useRef } from "react";
import VecoderEditor from "../../COMPONENTs/vecoder_editor/vecoder_editor";
import { ContextMenu } from "../../COMPONENTs/rightClickContextMenu/rightClickContextMenu";
import Explorer from "../../COMPONENTs/explorer/explorer";
import "./stack_structure.css";
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

/* CONSTANT VARIABLES ================================================================================================================================== */
const RESIZER_CONTAINER = {
  type: "RESIZER",
  min_width: 12,
  width: 12,
  max_width: 12,
  content: "",
};
const ENDING_CONTAINER = {
  type: "END",
  min_width: 128,
  width: 128,
  max_width: 128,
  content: "",
};
const TEST_CONTAINER = {
  type: "TESTING_CONTAINER",
  min_width: 40,
  width: 600,
  max_width: 2048,
  content: "TEST",
};
/* CONSTANT VARIABLES ================================================================================================================================== */

/* CONTAINERS ------------------------------------------------------------------------------------------------------------- */
const TestingLabelContainer = ({
  index,
  //Stack Data
  item,
  stackRefs,
  //Stack Structure Container Drag and Drop
  onStackItemDragStart,
  onStackItemDragEnd,
  resizerOnMouseDown,
  onDropIndex,
}) => {
  return (
    <div
      className={"stack_structure_item_test0128"}
      ref={(el) => (stackRefs.current[index] = el)}
      key={index}
      draggable={resizerOnMouseDown ? false : true}
      onDragStart={(e) => {
        onStackItemDragStart(e, index);
      }}
      onDragEnd={(e) => {
        onStackItemDragEnd(e);
      }}
      style={{
        width: item.width,
      }}
    >
      {index === onDropIndex ? (
        <div className="stack_structure_item_overlay0122"></div>
      ) : (
        <div></div>
      )}
      <span className="stack_structure_label0116">{item.content}</span>
    </div>
  );
};
const ResizerTypeContainer = ({
  index,
  //Stack Data
  item,
  stackRefs,
  stacks,
  setStacks,
  //Reszier Drag and Drop
  onDragIndex,
  setOnDropIndex,
  resizerOnMouseDown,
  setResizerOnMouseDown,
  //Resizer Double Click Functions
  maximizeContainer,
  minimizeContainer,
}) => {
  const [resizerClassname, setResizerClassname] = useState(
    "stack_structure_resizer0122"
  );
  const handleResizerMouseDown = (e, index) => {
    setResizerOnMouseDown(true);
    const startX = e.clientX;
    const left_start_width = stacks[index - 1].width;
    const right_start_width = stacks[index + 1].width;
    const scroll_x_start_position = window.scrollX;

    const handleMouseMove = (e) => {
      e.preventDefault();
      const moveX = e.clientX - startX;
      const left_width = left_start_width + moveX;
      const right_width = right_start_width - moveX;
      if (e.clientX > window.innerWidth - RESIZER_CONTAINER.width / 2) {
        // IF RIGHT ITEM OUTSIDE OF WINDOW
        const editedStacks = [...stacks];
        editedStacks[index - 1].width = Math.min(
          editedStacks[index - 1].max_width,
          window.innerWidth -
            stackRefs.current[index - 1]?.getBoundingClientRect().x -
            RESIZER_CONTAINER.width / 2
        );
        setStacks(editedStacks);
      } else if (
        index + 1 === stacks.length - 1 ||
        e.clientX + right_width >= window.innerWidth - 6
      ) {
        // IF RIGHT ITEM OUTSIDE OF WINDOW OR SECOND LAST ITEM WON'T CHANGE END WIDTH
        if (
          left_width > stacks[index - 1].min_width &&
          left_width < stacks[index - 1].max_width
        ) {
          const editedStacks = [...stacks];
          editedStacks[index - 1].width = left_width;
          setStacks(editedStacks);
        } else if (left_width < stacks[index - 1].min_width) {
          const new_left_width = stacks[index - 1].min_width;

          const editedStacks = [...stacks];
          editedStacks[index - 1].width = new_left_width;
          setStacks(editedStacks);
        }
      } else {
        if (
          left_width > stacks[index - 1].min_width &&
          right_width > stacks[index + 1].min_width &&
          left_width < stacks[index - 1].max_width &&
          right_width < stacks[index + 1].max_width
        ) {
          const editedStacks = [...stacks];
          editedStacks[index - 1].width = left_width;
          editedStacks[index + 1].width = right_width;
          setStacks(editedStacks);
        } else if (
          left_width > stacks[index - 1].min_width &&
          left_width < stacks[index - 1].max_width &&
          stacks[index + 1].width === stacks[index + 1].min_width
        ) {
          const editedStacks = [...stacks];
          editedStacks[index - 1].width = left_width;
          setStacks(editedStacks);
        } else if (
          left_width < stacks[index - 1].min_width &&
          right_width < stacks[index + 1].max_width
        ) {
          const new_left_width = stacks[index - 1].min_width;
          const new_right_width =
            right_start_width +
            (left_start_width - stacks[index - 1].min_width);

          const editedStacks = [...stacks];
          editedStacks[index - 1].width = new_left_width;
          editedStacks[index + 1].width = new_right_width;
          setStacks(editedStacks);
        } else if (
          right_width < stacks[index + 1].min_width &&
          left_width < stacks[index - 1].max_width
        ) {
          const new_right_width = stacks[index + 1].min_width;
          const new_left_width =
            left_start_width +
            (right_start_width - stacks[index + 1].min_width);

          const editedStacks = [...stacks];
          editedStacks[index - 1].width = new_left_width;
          editedStacks[index + 1].width = new_right_width;
          setStacks(editedStacks);
        }
      }
    };
    const handleMouseUp = (e) => {
      document.removeEventListener("mousemove", handleMouseMove);
      document.removeEventListener("mouseup", handleMouseUp);
      setResizerOnMouseDown(false);
    };
    document.addEventListener("mousemove", handleMouseMove);
    document.addEventListener("mouseup", handleMouseUp);
  };
  const handleResizerDoubleClick = (e, index) => {
    if (stacks[index + 1].width === stacks[index + 1].min_width) {
      maximizeContainer(index + 1);
    } else {
      minimizeContainer(index + 1);
    }
  };
  const resizerOnDragOver = (e, index) => {
    if (onDragIndex === -1) {
      return;
    }
    setOnDropIndex(index);
  };
  return (
    <div
      className={"stack_structure_resizer_container0122"}
      ref={(el) => (stackRefs.current[index] = el)}
      key={index}
      style={{
        width: item.width,
        cursor: "ew-resize",
      }}
      onMouseEnter={(e) => {
        if (!resizerOnMouseDown) {
          setResizerClassname("stack_structure_resizer_hover0122");
        }
      }}
      onMouseLeave={(e) => {
        if (!resizerOnMouseDown) {
          setResizerClassname("stack_structure_resizer0122");
        }
      }}
      onMouseDown={(e) => {
        handleResizerMouseDown(e, index);
      }}
      onDragOver={(e) => {
        resizerOnDragOver(e, index),
          setResizerClassname("stack_structure_resizer_onDragOver0122");
      }}
      onDragLeave={(e) => {
        setResizerClassname("stack_structure_resizer0122");
      }}
      onDoubleClick={(e) => {
        handleResizerDoubleClick(e, index);
      }}
      draggable={false}
    >
      <div className={resizerClassname}></div>
    </div>
  );
};
const ExplorerTypeContainer = ({
  index,
  //Stack Data
  item,
  stackRefs,
  stacks,
  setStacks,
  //Explorer Data
  explorer_files,
  setExplorer_files,
  //Stack Structure Container Drag and Drop
  onDropIndex,
  onDragIndex,
  onStackItemDragStart,
  onStackItemDragEnd,
  resizerOnMouseDown,
  //Context Menu Data
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
  //Expand and Narrow Container
  expandContainer,
  narrowContainer,
}) => {
  const onMaximizeOnClick = () => {
    expandContainer(index);
  };
  const onMinimizeOnClick = () => {
    narrowContainer(index);
  };
  return (
    <div
      className="stack_structure_explorer0122"
      ref={(el) => (stackRefs.current[index] = el)}
      key={index}
      draggable={resizerOnMouseDown ? false : true}
      onDragStart={(e) => {
        onStackItemDragStart(e, index);
      }}
      onDragEnd={(e) => {
        onStackItemDragEnd(e);
      }}
      style={{
        width: item.width,
      }}
    >
      <Explorer
        explorer_width={item.width}
        files={explorer_files}
        setFiles={setExplorer_files}
        onRightClickItem={onRightClickItem}
        setOnRightClickItem={setOnRightClickItem}
        rightClickCommand={rightClickCommand}
        setRightClickCommand={setRightClickCommand}
        onMaximizeOnClick={onMaximizeOnClick}
        onMinimizeOnClick={onMinimizeOnClick}
      />
      {index === onDropIndex ? (
        <div className="stack_structure_item_overlay0122"></div>
      ) : null}
      {onDragIndex !== -1 ? (
        <div className="stack_structure_item_overlay_invisible0206"></div>
      ) : null}
    </div>
  );
};
const VecoderEditorTypeContainer = ({
  index,
  //Stack Data
  item,
  stackRefs,
  stacks,
  setStacks,
  //Vecoder Editor Data
  code_editor_files,
  setCode_editor_files,
  setCode_editor_file_on_index,
  //Stack Structure Container Drag and Drop
  onDropIndex,
  onDragIndex,
  onStackItemDragStart,
  onStackItemDragEnd,
  resizerOnMouseDown,
  //Context Menu Data
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
  //Code Editor Drag and Drop
  draggedItem,
  setDraggedItem,
  draggedOverItem,
  setDraggedOverItem,
  dragCommand,
  setDragCommand,
  //Expand and Narrow Container
  expandContainer,
  narrowContainer,
}) => {
  const onMaximizeOnClick = () => {
    expandContainer(index);
  };
  const onMinimizeOnClick = () => {
    narrowContainer(index);
  };
  return (
    <div
      className="stack_structure_code_editor0122"
      ref={(el) => (stackRefs.current[index] = el)}
      key={index}
      draggable={resizerOnMouseDown ? false : true}
      onDragStart={(e) => {
        e.stopPropagation();
        onStackItemDragStart(e, index);
      }}
      onDragEnd={(e) => {
        onStackItemDragEnd(e);
      }}
      style={{
        width: item.width,
      }}
    >
      <VecoderEditor
        code_editor_width={item.width}
        code_editor_container_ref_index={item.code_editor_container_ref_index}
        imported_files={code_editor_files[item.code_editor_container_ref_index]}
        setImportedFiles={setCode_editor_file_on_index(
          item.code_editor_container_ref_index
        )}
        //Context Menu
        onRightClickItem={onRightClickItem}
        setOnRightClickItem={setOnRightClickItem}
        rightClickCommand={rightClickCommand}
        setRightClickCommand={setRightClickCommand}
        //Drag and Drop
        draggedItem={draggedItem}
        setDraggedItem={setDraggedItem}
        draggedOverItem={draggedOverItem}
        setDraggedOverItem={setDraggedOverItem}
        dragCommand={dragCommand}
        setDragCommand={setDragCommand}
        //Maximize and Minimize Container
        onMaximizeOnClick={onMaximizeOnClick}
        onMinimizeOnClick={onMinimizeOnClick}
      />
      {index === onDropIndex ? (
        <div className="stack_structure_item_overlay0122"></div>
      ) : null}
      {onDragIndex !== -1 ? (
        <div className="stack_structure_item_overlay_invisible0206"></div>
      ) : null}
    </div>
  );
};
const EndingContainer = ({
  index,
  //Stack Data
  item,
  stackRefs,
  //Reszier Drag and Drop
  onDropIndex,
}) => {
  return (
    <div
      className={"stack_structure_item0116"}
      ref={(el) => (stackRefs.current[index] = el)}
      key={index}
      style={{
        width: item.width,
      }}
      draggable={false}
    >
      {" "}
      {index === onDropIndex ? (
        <div className="stack_structure_item_overlay0122"></div>
      ) : (
        <div></div>
      )}
    </div>
  );
};
/* CONTAINERS ------------------------------------------------------------------------------------------------------------- */

const StackStructure = () => {
  const [
    stackStructureContainerClassName,
    setStackStructureContainerClassName,
  ] = useState("stack_structure_container0116");

  /* Right Click Menu ================================================================================================================================== */
  const [isRightClicked, setIsRightClicked] = useState(false);
  const [rightClickX, setRightClickX] = useState(-1);
  const [rightClickY, setRightClickY] = useState(-1);
  const [onRightClickItem, setOnRightClickItem] = useState(null);
  const [rightClickCommand, setRightClickCommand] = useState(null);
  const handleRightClick = (event) => {
    event.preventDefault();
    setIsRightClicked(true);

    const boundingRect = event.currentTarget.getBoundingClientRect();

    const rightClickX = event.clientX;
    const rightClickY = event.clientY;

    setRightClickX(rightClickX);
    setRightClickY(rightClickY);
  };
  const handleLeftClick = (event) => {
    setIsRightClicked(false);
    setOnRightClickItem(null);
  };
  /* Right Click Menu ================================================================================================================================== */

  /* Children Item Drag and Drop ----------------------------------------------------------------- */
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);
  const [dragCommand, setDragCommand] = useState(null);
  /* Children Item Drag and Drop ----------------------------------------------------------------- */

  /* DATA =============================================================================================================================================== */
  //Explorer Data ----------------------------------------------------------------------
  const EXPLORER_FILES = {
    fileName: "vecoder",
    fileType: "folder",
    filePath: "vecoder",
    fileExpend: true,
    files: [
      {
        fileName: "vecoder_sample",
        fileType: "folder",
        filePath: "vecoder/vecoder_sample",
        fileExpend: true,
        files: [
          {
            fileName: "public",
            fileType: "folder",
            filePath: "vecoder/vecoder_sample/public",
            fileExpend: true,
            files: [
              {
                fileName: "favicon.icon",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/favicon.icon",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "index.html",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/index.html",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "index.php",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/index.php",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "logo192.png",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/logo192.png",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "resume.pdf",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/resume.pdf",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "manifest.json",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/manifest.json",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "robots.txt",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/robots.txt",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "test.py",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/test.py",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "test.java",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/test.java",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "test.xls",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/test.xls",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "test.doc",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/test.doc",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "test.ppt",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/test.ppt",
                fileExpend: false,
                files: [],
              },
            ],
          },
          {
            fileName: "src",
            fileType: "folder",
            filePath: "vecoder/vecoder_sample/src",
            fileExpend: true,
            files: [
              {
                fileName: "COMPONENTs",
                fileType: "folder",
                filePath: "vecoder/vecoder_sample/src/COMPONENTs",
                fileExpend: false,
                files: [
                  {
                    fileName: "explorer",
                    fileType: "folder",
                    filePath: "vecoder/vecoder_sample/src/COMPONENTs/explorer",
                    fileExpend: false,
                    files: [
                      {
                        fileName: "dirItem",
                        fileType: "folder",
                        filePath:
                          "vecoder/vecoder_sample/src/COMPONENTs/explorer/dirItem",
                        fileExpend: false,
                        files: [
                          {
                            fileName: "dirItem.css",
                            fileType: "file",
                            filePath:
                              "vecoder/vecoder_sample/src/COMPONENTs/explorer/dirItem/dirItem.css",
                            fileExpend: false,
                            files: [],
                          },
                          {
                            fileName: "dirItem.js",
                            fileType: "file",
                            filePath:
                              "vecoder/vecoder_sample/src/COMPONENTs/explorer/dirItem/dirItem.js",
                            fileExpend: false,
                            files: [],
                          },
                        ],
                      },
                    ],
                  },
                ],
              },
              {
                fileName: "App.css",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/src/App.css",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "App.js",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/src/App.js",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "App.test.js",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/src/App.test.js",
                fileExpend: false,
                files: [],
              },
            ],
          },
          {
            fileName: ".gitignore",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/.gitignore",
            fileExpend: false,
            files: [],
          },
          {
            fileName: "package.json",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/package.json",
            fileExpend: false,
            files: [],
          },
          {
            fileName: "package-lock.json",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/package-lock.json",
            fileExpend: false,
            files: [],
          },
          {
            fileName: "README.md",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/README.md",
            fileExpend: false,
            files: [],
          },
          {
            fileName: ".env",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/.env",
            fileExpend: false,
            files: [],
          },
        ],
      },
    ],
  };
  const [explorer_files, setExplorer_files] = useState(EXPLORER_FILES);
  const EXPLORER_CONTAINER = {
    unique_key: 202402073,
    type: "EXPLORER",
    min_width: 40,
    width: 256,
    max_width: 2048,
    explorer_container_ref_index: 0,
  };
  //Code Editor Data -------------------------------------------------------------------
  const CODE_EDITOR_FILES = [
    [
      {
        fileName: "code_editor.js",
        fileLanguage: "javascript",
        filePath: "./code_editor.js",
        fileContent: `import React, { useState, useEffect, useRef } from "react";
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
        fileLanguage: "css",
        filePath: "./code_editor.css",
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

`,
      },
      {
        fileName: "main.py",
        fileLanguage: "python",
        filePath: "./main.py",
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
    ],
    [
      {
        fileName: "index.html",
        fileLanguage: "html",
        filePath: "./index.html",
        fileContent: `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8">
  <meta name="viewport" content="width=device-width, initial-scale=1.0">
  <title>File Content Editor</title>
  <style>
    .file-editor {
      margin-bottom: 10px;
    }
  </style>
</head>
<body>
  <div id="fileEditors"></div>
  <ul id="fileContents"></ul>
      
  <script>
    // Sample files array
    let files = [
      { fileName: "file1.txt", fileContent: "Content of file 1" },
      { fileName: "file2.txt", fileContent: "Content of file 2" }
    ];
      
    const setContent = (index) => (value) => {
      files[index].fileContent = value;
      renderFileContents();
    };
      
    const renderEditors = () => {
      const editorsContainer = document.getElementById('fileEditors');
      editorsContainer.innerHTML = ''; // Clear existing content
      
      files.forEach((file, index) => {
        const textarea = document.createElement('textarea');
        textarea.className = 'file-editor';
        textarea.value = file.fileContent;
        textarea.oninput = (e) => setContent(index)(e.target.value);
        editorsContainer.appendChild(textarea);
      });
    };
      
    const renderFileContents = () => {
      const contentsContainer = document.getElementById('fileContents');
      contentsContainer.innerHTML = ''; // Clear existing content
      
      files.forEach((file) => {
        const listItem = document.createElement('li');
        listItem.textContent = file.fileContent;
        contentsContainer.appendChild(listItem);
      });
    };
      
    // Initial rendering
    renderEditors();
    renderFileContents();
  </script>
</body>
</html>
      
      `,
      },
      {
        fileName: "main.java",
        fileLanguage: "java",
        filePath: "./main.java",
        fileContent: `public class Main {
  public static void main(String[] args) {
    // Create some car objects
    Car myCar = new Car("Toyota", "Corolla", 2020);
    Car anotherCar = new Car("Honda", "Civic", 2019);
    
    // Display car details
    System.out.println(myCar.getDescription());
    System.out.println(anotherCar.getDescription());
  }
}
    
class Car {
  private String make;
  private String model;
  private int year;
    
  // Constructor
  public Car(String make, String model, int year) {
    this.make = make;
    this.model = model;
    this.year = year;
  }
    
  // Method to get car's description
  public String getDescription() {
    return year + " " + make + " " + model;
  }
}
      `,
      },
    ],
  ];
  const [code_editor_files, setCode_editor_files] = useState(CODE_EDITOR_FILES);
  const setCode_editor_file_on_index = (index) => (value) => {
    const newCode_editor_files = [...code_editor_files];
    newCode_editor_files[index] = value;
    setCode_editor_files(newCode_editor_files);
  };
  const CODE_EDITORs = [
    {
      unique_key: 202402071,
      type: "CODE_EDITOR",
      min_width: 40,
      width: 600,
      max_width: 2048,
      code_editor_container_ref_index: 0,
    },
    {
      unique_key: 202402072,
      type: "CODE_EDITOR",
      min_width: 40,
      width: 600,
      max_width: 2048,
      code_editor_container_ref_index: 1,
    },
  ];
  //Stacking Data ----------------------------------------------------------------------
  const stacking_structure = [
    EXPLORER_CONTAINER,
    RESIZER_CONTAINER,
    CODE_EDITORs[0],
    RESIZER_CONTAINER,
    CODE_EDITORs[1],
    RESIZER_CONTAINER,
    ENDING_CONTAINER,
  ];
  const [stacks, setStacks] = useState(stacking_structure);
  const stackRefs = useRef([]);
  /* DATA =============================================================================================================================================== */

  /* Stack Container Drag and Drop ------------------------------------------------------------ */
  const stackStructureContainerRef = useRef(null);
  const [onDragIndex, setOnDragIndex] = useState(-1);
  const [onDropIndex, setOnDropIndex] = useState(-1);

  const onStackItemDragStart = (e, index) => {
    const cloneNode = stackRefs.current[index].cloneNode(true);
    cloneNode.style.position = "absolute";
    cloneNode.style.top = "-10000px";
    cloneNode.style.left = "-10000px";
    cloneNode.style.opacity = "1";
    cloneNode.style.overflow = "hidden";
    cloneNode.style.backgroundColor = "#323232";

    cloneNode.style.width = "128px";
    cloneNode.style.height = "128px";

    document.body.appendChild(cloneNode);

    e.dataTransfer.setDragImage(
      new Image(FILE_TYPE_ICON_MANAGER.java.ICON512),
      128,
      128
    );
    setTimeout(() => document.body.removeChild(cloneNode), 0);

    setOnDragIndex(index);
  };
  const onStackItemDragEnd = (e) => {
    if (onDropIndex !== -1 && onDropIndex === stacks.length - 1) {
      const editedStacks = [...stacks];
      const dragedItems = editedStacks.splice(onDragIndex, 2);
      editedStacks.splice(onDropIndex - 2, 0, ...dragedItems);
      setStacks(editedStacks);
    } else if (onDropIndex !== -1 && onDropIndex % 2 === 0) {
      const editedStacks = [...stacks];
      const dragedItems = editedStacks.splice(onDragIndex, 2);
      editedStacks.splice(onDropIndex, 0, ...dragedItems);
      setStacks(editedStacks);
    } else if (onDropIndex !== -1 && onDropIndex % 2 === 1) {
      const editedStacks = [...stacks];
      const dragedItems = editedStacks.splice(onDragIndex, 2);
      editedStacks.splice(onDropIndex - 1, 0, ...dragedItems);
      setStacks(editedStacks);
    }

    setOnDragIndex(-1);
    setOnDropIndex(-1);
  };
  const containerOnDragOver = (e) => {
    e.preventDefault();
    if (onDragIndex === -1) {
      return;
    }
    const targetElement = e.target.closest(
      ".stack_structure_item0116, " +
        ".stack_structure_item_test0128, " +
        ".stack_structure_explorer0122, " +
        ".stack_structure_code_editor0122"
    );
    if (targetElement && stackStructureContainerRef.current) {
      const childrenArray = Array.from(
        stackStructureContainerRef.current.children
      );
      const dropIndex = childrenArray.indexOf(targetElement);
      if (dropIndex !== onDropIndex && dropIndex !== -1) {
        setOnDropIndex(dropIndex);
      }
    }
  };
  useEffect(() => {
    if (onDragIndex !== -1) {
      setStackStructureContainerClassName(
        "stack_structure_container_minimize0207"
      );
    } else {
      setStackStructureContainerClassName("stack_structure_container0116");
    }
  }, [onDragIndex]);
  /* Stack Container Drag and Drop ------------------------------------------------------------ */

  /* Resizer =============================================================================================================================================== */
  const [resizerOnMouseDown, setResizerOnMouseDown] = useState(false);
  const scrollToPosition = (position) => {
    window.scrollTo({
      left: position,
      behavior: "auto",
    });
  };
  const maximizeContainer = (index) => {
    const editedStacks = [...stacks];
    editedStacks[index].width = Math.min(
      editedStacks[index].max_width,
      window.innerWidth -
        stackRefs.current[index]?.getBoundingClientRect().x -
        RESIZER_CONTAINER.width / 2
    );
    setStacks(editedStacks);
  };
  const minimizeContainer = (index) => {
    const editedStacks = [...stacks];
    editedStacks[index].width = editedStacks[index].min_width;
    setStacks(editedStacks);
  };
  const expandContainer = (index) => {
    const editedStacks = [...stacks];
    let next_index = index + 2;
    let current_index = index;

    while (
      next_index < editedStacks.length - 1 &&
      stackRefs.current[next_index]?.getBoundingClientRect().x +
        editedStacks[next_index].width +
        RESIZER_CONTAINER.width / 2 <
        window.innerWidth
    ) {
      current_index = next_index;
      next_index = next_index + 2;
    }

    const adding_width =
      window.innerWidth -
      (stackRefs.current[current_index]?.getBoundingClientRect().x +
        editedStacks[current_index].width +
        RESIZER_CONTAINER.width / 2);

    editedStacks[index].width = Math.min(
      editedStacks[index].max_width,
      editedStacks[index].width + adding_width
    );
    setStacks(editedStacks);
  };
  const narrowContainer = (index) => {
    const editedStacks = [...stacks];
    let next_index = index + 2;
    let current_index = index;

    while (
      next_index < editedStacks.length &&
      stackRefs.current[next_index]?.getBoundingClientRect().x +
        editedStacks[next_index].width +
        RESIZER_CONTAINER.width / 2 <=
        window.innerWidth
    ) {
      current_index = next_index;
      next_index = next_index + 2;
    }

    if (
      stackRefs.current[current_index]?.getBoundingClientRect().x +
        editedStacks[current_index].width +
        RESIZER_CONTAINER.width / 2 >
      window.innerWidth
    ) {
      editedStacks[index].width = Math.max(
        editedStacks[index].min_width,
        editedStacks[index].width -
          (stackRefs.current[current_index]?.getBoundingClientRect().x +
            editedStacks[current_index].width +
            RESIZER_CONTAINER.width / 2 -
            window.innerWidth)
      );
      setStacks(editedStacks);
    } else if (next_index < editedStacks.length) {
      editedStacks[index].width = Math.max(
        editedStacks[index].min_width,
        editedStacks[index].width -
          (stackRefs.current[next_index]?.getBoundingClientRect().x +
            editedStacks[next_index].width -
            window.innerWidth) -
          RESIZER_CONTAINER.width / 2
      );
    } else {
      //Else set current container to min width
      editedStacks[index].width = editedStacks[index].min_width;
    }

    setStacks(editedStacks);
  };
  /* Resizer =============================================================================================================================================== */

  return (
    <div
      className={stackStructureContainerClassName}
      ref={stackStructureContainerRef}
      onDragOver={(e) => {
        containerOnDragOver(e);
      }}
      onDragLeave={(e) => {
        setOnDropIndex(-1);
      }}
      onContextMenu={handleRightClick}
      onClick={handleLeftClick}
    >
      {/*Stack Structure Containers-----------------------------------------------------------------*/}
      {stacks.map((item, index) => {
        switch (item?.type) {
          case "TESTING_CONTAINER":
            return (
              <TestingLabelContainer
                key={index}
                index={index}
                //Stack Data
                item={item}
                stackRefs={stackRefs}
                //Stack Structure Container Drag and Drop
                onStackItemDragStart={onStackItemDragStart}
                onStackItemDragEnd={onStackItemDragEnd}
                resizerOnMouseDown={resizerOnMouseDown}
                onDropIndex={onDropIndex}
              />
            );
          case "EXPLORER":
            return (
              <ExplorerTypeContainer
                key={item.unique_key}
                index={index}
                //Stack Data
                item={item}
                stackRefs={stackRefs}
                stacks={stacks}
                setStacks={setStacks}
                //Explorer Data
                explorer_files={explorer_files}
                setExplorer_files={setExplorer_files}
                //Stack Structure Container Drag and Drop
                onDropIndex={onDropIndex}
                onDragIndex={onDragIndex}
                onStackItemDragStart={onStackItemDragStart}
                onStackItemDragEnd={onStackItemDragEnd}
                resizerOnMouseDown={resizerOnMouseDown}
                //Context Menu Data
                onRightClickItem={onRightClickItem}
                setOnRightClickItem={setOnRightClickItem}
                rightClickCommand={rightClickCommand}
                setRightClickCommand={setRightClickCommand}
                //Expand and Narrow Container
                expandContainer={expandContainer}
                narrowContainer={narrowContainer}
              />
            );
          case "CODE_EDITOR":
            return (
              <VecoderEditorTypeContainer
                key={item.unique_key}
                index={index}
                //Stack Data
                item={item}
                stackRefs={stackRefs}
                stacks={stacks}
                setStacks={setStacks}
                //Vecoder Editor Data
                code_editor_files={code_editor_files}
                setCode_editor_files={setCode_editor_files}
                setCode_editor_file_on_index={setCode_editor_file_on_index}
                //Stack Structure Container Drag and Drop
                onDropIndex={onDropIndex}
                onDragIndex={onDragIndex}
                onStackItemDragStart={onStackItemDragStart}
                onStackItemDragEnd={onStackItemDragEnd}
                resizerOnMouseDown={resizerOnMouseDown}
                //Context Menu Data
                onRightClickItem={onRightClickItem}
                setOnRightClickItem={setOnRightClickItem}
                rightClickCommand={rightClickCommand}
                setRightClickCommand={setRightClickCommand}
                //Code Editor Drag and Drop
                draggedItem={draggedItem}
                setDraggedItem={setDraggedItem}
                draggedOverItem={draggedOverItem}
                setDraggedOverItem={setDraggedOverItem}
                dragCommand={dragCommand}
                setDragCommand={setDragCommand}
                //Expand and Narrow Container
                expandContainer={expandContainer}
                narrowContainer={narrowContainer}
              />
            );
          case "RESIZER":
            return (
              <ResizerTypeContainer
                key={index}
                index={index}
                //Stack Data
                item={item}
                stackRefs={stackRefs}
                stacks={stacks}
                setStacks={setStacks}
                //Reszier Drag and Drop
                onDragIndex={onDragIndex}
                setOnDropIndex={setOnDropIndex}
                resizerOnMouseDown={resizerOnMouseDown}
                setResizerOnMouseDown={setResizerOnMouseDown}
                //Resizer Double Click Functions
                maximizeContainer={maximizeContainer}
                minimizeContainer={minimizeContainer}
              />
            );
          case "END":
            return (
              <EndingContainer
                key={index}
                index={index}
                //Stack Data
                item={item}
                stackRefs={stackRefs}
                //Reszier Drag and Drop
                onDropIndex={onDropIndex}
              />
            );
          default:
            break;
        }
      })}
      {/*Stack Structure Containers-----------------------------------------------------------------*/}
      {/*Right Click Menu===============================================================*/}
      {isRightClicked ? (
        <ContextMenu
          x={rightClickX}
          y={rightClickY}
          onRightClickItem={onRightClickItem}
          setOnRightClickItem={setOnRightClickItem}
          setRightClickCommand={setRightClickCommand}
        />
      ) : (
        <div></div>
      )}
      {/*Right Click Menu===============================================================*/}
    </div>
  );
};

export default StackStructure;
