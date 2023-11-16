import React, { useState, useRef, useEffect } from "react";
import Editor from "../monacoEditor/monacoEditor";
import "./vecoder_editor.css";
import { ICON_MANAGER } from "../../ICONs/icon_manager";

/* ICONs ----------------------------------------------------------------- */
import close_icon_16X16 from "./ICONs/16X16/close.png";
import close_icon_512X512 from "./ICONs/512X512/close.png";
/* ICONs ----------------------------------------------------------------- */

const VecoderEditor = ({ imported_files }) => {
  /* Initialize File Data ------------------------------------------------------ */
  const [files, setFiles] = useState(imported_files);
  /* Initialize File Data ------------------------------------------------------ */

  /* Load ICON manager -------------------------------- */
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
  /* Load ICON manager -------------------------------- */

  /* Editor parameters ------------------------------------------------- */
  //// Editor container ref
  const editorContainerRef = useRef(null);
  //// Editor content
  const setFileContent = (index) => (value) => {
    const editedFiles = [...files];
    editedFiles[index].fileContent = value;
    setFiles(editedFiles);
  };
  const [diffContent, setDiffContent] = useState(
    'import React, { useState } from "react";'
  );
  const [onSelectedCode, setOnSelectedCode] = useState(0);
  /* Editor parameters ------------------------------------------------- */

  /* File Selection Bar parameters & Functions ------------------------------------------------- */
  const fileSelectionBarContainerRef = useRef(null);
  const [onSelectedIndex, setOnSelectedIndex] = useState(null);
  const [onDragIndex, setOnDragIndex] = useState(-1);
  const [onDropIndex, setOnDropIndex] = useState(-1);
  const [onSwapIndex, setOnSwapIndex] = useState(-1);

  const onFileDelete = (index) => () => {
    const editedFiles = [...files];
    editedFiles.splice(index, 1);
    setFiles(editedFiles);
  };
  const onFileDragStart = (e, index) => {
    e.target.style.opacity = 0.1;

    setOnSelectedIndex(index);
    setOnDragIndex(index);
  };
  const onFileDragEnd = (e, index) => {
    e.target.style.opacity = 1;

    if (onDropIndex !== -1) {
      const editedFiles = [...files];
      const dragedFile = editedFiles.splice(onDragIndex, 1)[0];
      editedFiles.splice(onDropIndex, 0, dragedFile);
      setFiles(editedFiles);
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
    <div className="code_editor_container1113" ref={editorContainerRef}>
      {files.map((file, index) => {
        return (
          <Editor
            key={index}
            editor_content={files[index].fileContent}
            editor_setContent={setFileContent(index)}
            editor_language={files[index].fileLanguage}
            setOnSelected={setOnSelectedCode}
            display={index === onSelectedIndex ? true : false}

            //editor_diffContent={diffContent}
            //editor_setDiffContent={setDiffContent}
          ></Editor>
        );
      })}

      {/*Editor Top Bar Container -------------------------------------------------------------- */}
      {/*Editor Top Right Section*/}
      <div className="code_editor_top_right_section1113">
        <img
          src={close_icon_512X512}
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
                  FILE_TYPE_STYLING_MANAGER[file.fileName.split(".").pop()]
                    ?.ICON
                }
                className="file_selection_bar_item_filetype_icon1114"
                alt="close"
              />
              <span className="file_selection_bar_file_text1114">
                {file.fileName}
              </span>
              <img
                src={close_icon_512X512}
                className="file_selection_bar_item_close_icon1114"
                alt="close"
                draggable="false"
                onClick={onFileDelete(index)}
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
