import React, { useState, useEffect, useRef, useContext } from "react";
import { ICON_MANAGER, ICON_LOADER } from "../../../ICONs/icon_manager";
import { vecoderEditorContexts } from "../../../CONTEXTs/vecoderEditorContexts";
import { rightClickContextMenuCommandContexts } from "../../../CONTEXTs/rightClickContextMenuContexts";
import "./dirItem.css";

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

const FileTypeIconLoader = ({ fileIcon, fileIconBackground }) => {
  /* ICON Loader ----------------------------------------------------------------- */
  const [isFileTypeIconLoad, setIsFileTypeIconLoad] = useState(false);
  const handleFileTypeIconLoad = () => {
    setIsFileTypeIconLoad(true);
  };
  /* ICON Loader ----------------------------------------------------------------- */
  return (
    <div>
      {fileIcon !== undefined ? (
        <div
          className="dir_item_component_script_icon0725"
          style={
            isFileTypeIconLoad
              ? {}
              : {
                  backgroundImage: `url(${fileIconBackground})`,
                }
          }
        >
          <img
            src={fileIcon}
            className="dir_item_component_script_icon0725"
            loading="lazy"
            onLoad={handleFileTypeIconLoad}
            draggable={"false"}
          ></img>
        </div>
      ) : null}
    </div>
  );
};
const RenameInputBox = ({
  filePath,
  dirItemOnHover,
  onCommand,
  setOnCommand,
}) => {
  const {
    renameAndRepathAllSubFiles,
    checkDirNameExist,
    accessFileNameByPath,
    accessFileTypeByPath,
    accessFileExpendByPath,
  } = useContext(vecoderEditorContexts);
  const inputRef = useRef();
  useEffect(() => {
    if (onCommand === "rename" && inputRef.current) {
      inputRef.current.select();
    }
  }, [onCommand]);
  const [renameInput, setRenameInput] = useState(
    accessFileNameByPath(filePath)
  );
  const [inputBoxClassName, setInputBoxClassName] = useState(
    "dir_item_component_input_box0803"
  );
  const handleRenameInputOnChange = (event) => {
    setRenameInput(event.target.value);
  };
  const handleRenameInputOnKeyDown = async (event) => {
    if (event.key === "Enter") {
      if (renameInput === accessFileNameByPath(filePath)) {
        setOnCommand("false");
        return;
      }
      let parentDirPath = filePath.split("/");
      parentDirPath.pop();
      parentDirPath = parentDirPath.join("/");
      if (!checkDirNameExist(parentDirPath, renameInput)) {
        if (renameInput !== "") {
          renameAndRepathAllSubFiles(filePath, renameInput);
        }
        setOnCommand("false");
      } else {
        setInputBoxClassName("dir_item_component_input_box_shake0826");
        setTimeout(() => {
          setInputBoxClassName("dir_item_component_input_box0803");
        }, 160);
      }
    }
    // if (event.key === "Escape") {
    //   setOnCommand("delete");
    // }
  };

  return (
    <input
      type="text"
      value={renameInput}
      className={inputBoxClassName}
      onChange={handleRenameInputOnChange}
      onKeyDown={handleRenameInputOnKeyDown}
      ref={inputRef}
      style={{
        width: `calc(100% - ${22}px)`,
        borderRadius:
          dirItemOnHover && accessFileExpendByPath(filePath)
            ? "6px 6px 0px 0px"
            : "6px",
        padding:
          accessFileTypeByPath(filePath) === "folder"
            ? "1px 0px 1px 22px"
            : "1px 0px 1px 21px",
        margin: "0px 0px 0px 0px",
      }}
    />
  );
};

const DirItem = ({
  file,
  filePath,
  root,
  explorerExpand,
  setExplorerExpand,
  setChildrenOnClicked,
  onSingleClickFile,
  setOnSingleClickFile,
  onCopyFile,
  setOnCopyFile,
}) => {
  const {
    exploreOptionsAndContentData,
    setExploreOptionsAndContentData,
    updateFileOnExploreOptionsAndContentData,
    removeFileOnExploreOptionsAndContentData,
    checkDirNameExist,
    accessFileByPath,
    accessFileNameByPath,
    accessFileTypeByPath,
    accessFileExpendByPath,
    accessFilesByPath,
  } = useContext(vecoderEditorContexts);
  const {
    onRightClickItem,
    setOnRightClickItem,
    rightClickCommand,
    setRightClickCommand,
  } = useContext(rightClickContextMenuCommandContexts);

  //EXPAND
  const [expanded, setExpanded] = useState(false);
  const [expandIconClassName, setExpandIconClassName] = useState(
    file.fileExpend
      ? "dir_item_component_arrow_icon_down0725"
      : "dir_item_component_arrow_icon_right0725"
  );
  //Generate File name, File Icon and Text Color
  const [filename, setFilename] = useState(file.fileName);
  const [fileIcon, setFileIcon] = useState();
  const [fileIconBackground, setFileIconBackground] = useState();
  const [fileTextColor, setFileTextColor] = useState("#C8C8C8");

  const [isRightClicked, setIsRightClicked] = useState(false);
  const [onCommand, setOnCommand] = useState("false");

  const [fileNameClassName, setFileNameClassName] = useState(
    "dir_item_component_file_name0725"
  );

  /*Styling Related ----------------------------------------------------------------------------- */
  const [dirItemOnHover, setDirItemOnHover] = useState(false);
  const handleMouseEnter = () => {
    setDirItemOnHover(true);
  };
  const handleMouseLeave = () => {
    setDirItemOnHover(false);
  };
  /*Styling Related ----------------------------------------------------------------------------- */

  //UPDATE FILE
  useEffect(() => {
    setFilename(file.fileName);
    setFileIcon(
      FILE_TYPE_ICON_MANAGER[file.fileName.split(".").pop()]?.ICON512
    );
    setFileIconBackground(
      FILE_TYPE_ICON_MANAGER[file.fileName.split(".").pop()]?.ICON16
    );
    setFileTextColor(
      FILE_TYPE_ICON_MANAGER[file.fileName.split(".").pop()]?.LABEL_COLOR
    );
    setExpanded(file.fileExpend);
  }, [file, file.fileName]);

  const DirListRef = useRef();

  //EXPAND RELATED
  const expandingTime = Math.min(
    Math.max(accessFilesByPath(filePath).length * 0.015, 0.08),
    0.16
  );
  const unexpandingTime = Math.min(
    Math.max(accessFilesByPath(filePath).length * 0.015, 0.08),
    0.16
  );
  let dirListUnexpendKeyframes = {
    "0%": {
      height: "6.6px",
      opacity: 0,
    },
    "90%": {
      height: "1.2px",
      opacity: 0,
    },
    "100%": {
      height: "0px",
      opacity: 0,
    },
  };
  const [dirListExpendKeyframes, setDirListExpendKeyframes] = useState({
    "0%": {
      top: "-6px",
      opacity: 0,
    },
    "20%": {
      opacity: 0,
    },
    "100%": {
      top: "0px",
      opacity: 1,
    },
  });
  const dirListUnexpendAnimation = {
    animation:
      "dir_item_component_dir_list_unexpend_animation " + unexpandingTime + "s",
  };
  const dirListExpendAnimation = {
    animation:
      "dir_item_component_dir_list_expend_animation " + expandingTime + "s",
  };
  const [expendAnimation, setExpendAnimation] = useState({});
  const [unexpendAnimation, setUnexpendAnimation] = useState({});
  useEffect(() => {
    if (expanded) {
      setExpandIconClassName("dir_item_component_arrow_icon_down0725");
    } else {
      setExpandIconClassName("dir_item_component_arrow_icon_right0725");
    }
  }, [expanded]);

  const handleExpandIconOnClick = (event) => {
    setChildrenOnClicked(true);
    handleOnLeftClick(event);
    if (root) {
      setExplorerExpand(!explorerExpand);
    }
    if (!expanded) {
      setExpendAnimation({
        ...dirListExpendAnimation,
        ...dirListExpendKeyframes,
      });
      setUnexpendAnimation({});
      setExpandIconClassName("dir_item_component_arrow_icon_down0725");
      setTimeout(() => {
        setExpandIconClassName(
          "dir_item_component_arrow_icon_down_no_animation1018"
        );
      }, expandingTime * 1000);
      setExpanded(true);
      file.fileExpend = true;
      //REMOVE ANIMATION
      setTimeout(() => {
        setExpendAnimation({});
      }, expandingTime * 1000);
    } else {
      setExpendAnimation({});
      setUnexpendAnimation({
        ...dirListUnexpendAnimation,
        ...dirListUnexpendKeyframes,
      });
      setExpandIconClassName("dir_item_component_arrow_icon_right0725");
      setTimeout(() => {
        setExpandIconClassName(
          "dir_item_component_arrow_icon_right_no_animation1018"
        );
      }, expandingTime * 1000);
      setExpanded(false);
      file.fileExpend = false;
      //REMOVE ANIMATION
      setTimeout(() => {
        setUnexpendAnimation({});
      }, unexpandingTime * 1000);
    }
  };
  const handleFolderOnRightClick = () => {
    if (onCopyFile !== null) {
      setOnRightClickItem({
        source: "vecoder_explorer/" + file.filePath,
        condition: { paste: onCopyFile.fileName },
        content: JSON.parse(JSON.stringify(file)),
        target: "vecoder_explorer/" + file.filePath,
      });
    } else {
      setOnRightClickItem({
        source: "vecoder_explorer/" + file.filePath,
        condition: { paste: false },
        content: JSON.parse(JSON.stringify(file)),
        target: "vecoder_explorer/" + file.filePath,
      });
    }
    setIsRightClicked(true);
  };
  const handleFileOnRightClick = () => {
    if (onCopyFile !== null) {
      setOnRightClickItem({
        source: "vecoder_explorer/" + file.filePath,
        condition: { paste: onCopyFile.fileName },
        content: JSON.parse(JSON.stringify(file)),
        target: "vecoder_explorer/" + file.filePath,
      });
    } else {
      setOnRightClickItem({
        source: "vecoder_explorer/" + file.filePath,
        condition: { paste: false },
        content: JSON.parse(JSON.stringify(file)),
        target: "vecoder_explorer/" + file.filePath,
      });
    }
    setIsRightClicked(true);
  };
  //SINGLE CLICK
  const handleOnLeftClick = (event) => {
    if (event.shiftKey) {
      console.log("shift from file: " + file.fileName);
    } else {
      setOnSingleClickFile(file);
    }
  };
  useEffect(() => {
    if (onSingleClickFile !== null) {
      if (onSingleClickFile.filePath === file.filePath) {
        setFileNameClassName("dir_item_component_file_name_on_selected0827");
      } else {
        setFileNameClassName("dir_item_component_file_name0725");
      }
    }
  }, [onSingleClickFile]);
  useEffect(() => {
    if (onRightClickItem === null) {
      setIsRightClicked(false);
    } else if (
      onRightClickItem.source ===
      "vecoder_explorer/" + file.filePath
    ) {
      setFileNameClassName("dir_item_component_file_name_on_selected0827");
    } else {
      if (onSingleClickFile !== null) {
        if (onSingleClickFile.filePath === file.filePath) {
          setFileNameClassName("dir_item_component_file_name_on_selected0827");
        } else {
          setFileNameClassName("dir_item_component_file_name0725");
        }
      } else {
        setFileNameClassName("dir_item_component_file_name0725");
      }
    }
  }, [onRightClickItem]);

  /* ON COMMAND -------------------------------------------------------------------------------------------------- */
  //NEW FILE
  useEffect(() => {
    if (onCommand === "newFile") {
      const newFileDefaultName = getNewFileDefaultName();

      const newFile = {
        fileName: newFileDefaultName,
        fileType: "file",
        filePath: file.filePath + "/" + newFileDefaultName,
        files: [],
      };

      let editedFile = accessFileByPath(filePath);
      editedFile.files.push(newFile);
      updateFileOnExploreOptionsAndContentData(filePath, editedFile);

      setOnCommand("false");
      setRightClickCommand({
        command: "rename",
        content: null,
        target: "vecoder_explorer/" + newFile.filePath,
      });

      //EXPAND FOLDER
      setExpanded(true);
      file.expanded = true;
      if (setExplorerExpand) {
        setExplorerExpand(true);
      }
      setExpandIconClassName("dir_item_component_arrow_icon_down0725");
    }
  }, [onCommand]);
  const getNewFileDefaultName = () => {
    let newFileDefaultName = "untitled_file";
    let newFileDefaultNameIndex = 1;
    let newFileDefaultNameExist = true;
    while (newFileDefaultNameExist) {
      newFileDefaultNameExist = false;
      const file_list = accessFilesByPath(filePath);
      for (let i = 0; i < file_list.length; i++) {
        if (file_list[i].fileName === newFileDefaultName) {
          newFileDefaultNameExist = true;
          break;
        }
      }
      if (newFileDefaultNameExist) {
        newFileDefaultName = "untitled_file" + newFileDefaultNameIndex;
        newFileDefaultNameIndex++;
      }
    }
    return newFileDefaultName;
  };
  //NEW FOLDER
  useEffect(() => {
    if (onCommand === "newFolder") {
      const newFolderDefaultName = getNewFolderDefaultName();
      const newFolder = {
        fileName: newFolderDefaultName,
        fileType: "folder",
        filePath: filePath + "/" + newFolderDefaultName,
        files: [],
      };

      let editedFile = accessFileByPath(filePath);
      editedFile.files.push(newFolder);
      updateFileOnExploreOptionsAndContentData(filePath, editedFile);

      setOnCommand("false");
      setRightClickCommand({
        command: "rename",
        content: null,
        target: "vecoder_explorer/" + newFolder.filePath,
      });
      setExpanded(true);
      file.expanded = true;
      if (setExplorerExpand) {
        setExplorerExpand(true);
      }
      setExpandIconClassName("dir_item_component_arrow_icon_down0725");
    }
  }, [onCommand]);
  const getNewFolderDefaultName = () => {
    let newFolderDefaultName = "untitled_folder";
    let newFolderDefaultNameIndex = 1;
    let newFolderDefaultNameExist = true;
    while (newFolderDefaultNameExist) {
      newFolderDefaultNameExist = false;
      const file_list = accessFilesByPath(filePath);
      for (let i = 0; i < file_list.length; i++) {
        if (file_list[i].fileName === newFolderDefaultName) {
          newFolderDefaultNameExist = true;
          break;
        }
      }
      if (newFolderDefaultNameExist) {
        newFolderDefaultName = "untitled_folder" + newFolderDefaultNameIndex;
        newFolderDefaultNameIndex++;
      }
    }
    return newFolderDefaultName;
  };
  //DELETE
  useEffect(() => {
    if (onCommand === "delete") {
      if (!root) {
        removeFileOnExploreOptionsAndContentData(filePath);
      }
      setOnSingleClickFile(null);
      setOnCommand("false");
    }
  }, [onCommand]);
  //PASTE
  useEffect(() => {
    if (onCommand === "paste") {
      let pasteFile = JSON.parse(JSON.stringify(onCopyFile));

      if (!checkDirNameExist(filePath, pasteFile)) {
        pasteFile.expanded = false;
        setOnSingleClickFile(pasteFile);

        const pasteFileIndex = pasteFile.filePath.split("/").length - 1;
        addPathNameAllChildren(pasteFile, filePath, pasteFileIndex);

        const path = pasteFile.filePath.split("/");
        const add_path = file.filePath.split("/");
        const combinedPath = add_path.concat(path.slice(pasteFileIndex));
        pasteFile.filePath = combinedPath.join("/");

        let editedFile = accessFileByPath(filePath);
        editedFile.files.push(pasteFile);
        updateFileOnExploreOptionsAndContentData(filePath, editedFile);

        //EXPAND FOLDER
        setExpanded(true);
        file.expanded = true;
        if (setExplorerExpand) {
          setExplorerExpand(true);
        }
        setExpandIconClassName("dir_item_component_arrow_icon_down0725");
      } else {
        alert("File name already exist");
      }
      setOnCommand("false");
    }
  }, [onCommand]);
  const addPathNameAllChildren = (file, addPath, copyFileIndex) => {
    const add_path = addPath.split("/");

    for (let i = 0; i < file.files.length; i++) {
      const path = file.files[i].filePath.split("/");
      let combinedPath = add_path.concat(path.slice(copyFileIndex));
      file.files[i].filePath = combinedPath.join("/");

      addPathNameAllChildren(file.files[i], addPath, copyFileIndex);
    }
  };
  //COPY
  useEffect(() => {
    if (onCommand === "copy") {
      setOnCopyFile(JSON.parse(JSON.stringify(accessFileByPath(filePath))));
      setOnCommand("false");
    }
  }, [onCommand]);

  //RIGHT CLICK COMMAND MAIN
  useEffect(() => {
    if (
      rightClickCommand &&
      rightClickCommand.target === "vecoder_explorer/" + filePath
    ) {
      switch (rightClickCommand.command) {
        case "rename":
          setOnCommand("rename");
          break;
        case "newFile":
          setOnCommand("newFile");
          break;
        case "newFolder":
          setOnCommand("newFolder");
          break;
        case "delete":
          setOnCommand("delete");
          break;
        case "paste":
          setOnCommand("paste");
          break;
        case "copy":
          setOnCommand("copy");
          break;
        default:
          break;
      }
      setRightClickCommand(null);
    }
  }, [rightClickCommand]);
  /* ON COMMAND -------------------------------------------------------------------------------------------------- */

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      ></link>
      {/* Dir Item ----------------------------------------------------------------------------------------- */}
      {accessFileTypeByPath(filePath) === "folder" ? (
        /*If file type is folder -> style as folder*/
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {accessFilesByPath(filePath).length !== 0 ? (
            /*If file has children -> style as expendable folder*/
            <div>
              {onCommand === "rename" ? (
                /*If file on command is rename -> display rename input box*/
                <RenameInputBox
                  filePath={filePath}
                  dirItemOnHover={dirItemOnHover}
                  onCommand={onCommand}
                  setOnCommand={setOnCommand}
                />
              ) : (
                /* SPAN If file not on command -> diplay folder name and expand arrow button>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
                <span
                  className={fileNameClassName}
                  onClick={handleExpandIconOnClick}
                  onContextMenu={handleFolderOnRightClick}
                  style={
                    expanded && dirItemOnHover
                      ? { borderRadius: "6px 6px 0pt 0pt" }
                      : { borderRadius: "6px" }
                  }
                >
                  <img
                    src={SYSTEM_ICON_MANAGER.arrow.ICON512}
                    className={expandIconClassName}
                    onClick={handleExpandIconOnClick}
                    loading="lazy"
                  />
                  {accessFileNameByPath(filePath)}
                </span>
              )}
            </div>
          ) : (
            /*If file doesn't has children -> style as unexpendable folder*/
            <div>
              {onCommand === "rename" ? (
                /*If file on command is rename -> display rename input box*/
                <RenameInputBox
                  filePath={filePath}
                  dirItemOnHover={dirItemOnHover}
                  onCommand={onCommand}
                  setOnCommand={setOnCommand}
                />
              ) : (
                /* SPAN If file not on command -> diplay folder name and expand arrow button>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
                <span
                  className={fileNameClassName}
                  style={{
                    borderRadius: "6px",
                  }}
                  onClick={(e) => handleOnLeftClick(e)}
                  onContextMenu={handleFolderOnRightClick}
                >
                  <img
                    src={SYSTEM_ICON_MANAGER.arrow.ICON512}
                    className="dir_item_component_unexpendable_arrow_icon_right0826"
                    loading="lazy"
                  />
                  {accessFileNameByPath(filePath)}
                </span>
              )}
            </div>
          )}
        </div>
      ) : (
        /*If file type is not folder -> style as file*/
        <div onMouseEnter={handleMouseEnter} onMouseLeave={handleMouseLeave}>
          {onCommand === "rename" ? (
            <RenameInputBox
              filePath={filePath}
              dirItemOnHover={dirItemOnHover}
              onCommand={onCommand}
              setOnCommand={setOnCommand}
            />
          ) : (
            /* SPAN file>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
            <span
              className={fileNameClassName}
              onClick={(e) => handleOnLeftClick(e)}
              style={{
                color: fileTextColor,
                borderRadius: "6px",
                animation:
                  "dir_item_component_container_expand_animation " +
                  expandingTime +
                  "s",
                padding:
                  fileIcon !== undefined
                    ? "1px 0px 1px 6px"
                    : "1px 0px 1px 21px",
              }}
              onContextMenu={handleFileOnRightClick}
            >
              <FileTypeIconLoader
                fileIcon={fileIcon}
                fileIconBackground={fileIconBackground}
              />
              {accessFileNameByPath(filePath)}
            </span>
          )}
        </div>
      )}
      {/* Dir Item ----------------------------------------------------------------------------------------- */}

      {/* SubFile List -------------------------------------------------------------------------------------------- */}
      {accessFilesByPath(filePath).length !== 0 && expanded ? (
        /*If file has children -> Including the children file list*/
        <div ref={DirListRef} style={{ height: "fit-content" }}>
          <ul
            className={
              dirItemOnHover
                ? "dir_item_component_dir_list_on_hover0304"
                : "dir_item_component_dir_list0725"
            }
          >
            {accessFilesByPath(filePath).map((item, index) => (
              <li key={item.filePath} style={expendAnimation}>
                <DirItem
                  file={item}
                  filePath={item.filePath}
                  root={false}
                  setChildrenOnClicked={setChildrenOnClicked}
                  onSingleClickFile={onSingleClickFile}
                  setOnSingleClickFile={setOnSingleClickFile}
                  onCopyFile={onCopyFile}
                  setOnCopyFile={setOnCopyFile}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        /*If file doesn't have children -> Leave empty*/
        <div style={unexpendAnimation}></div>
      )}
      {/* SubFile List -------------------------------------------------------------------------------------------- */}

      <style>
        {`
          @keyframes dir_item_component_dir_list_unexpend_animation {
            ${Object.entries(dirListUnexpendKeyframes)
              .map(
                ([key, value]) =>
                  `${key} { ${Object.entries(value)
                    .map(([k, v]) => `${k}: ${v};`)
                    .join(" ")} }`
              )
              .join(" ")}
          }
          @keyframes dir_item_component_dir_list_expend_animation {
            ${Object.entries(dirListExpendKeyframes)
              .map(
                ([key, value]) =>
                  `${key} { ${Object.entries(value)
                    .map(([k, v]) => `${k}: ${v};`)
                    .join(" ")} }`
              )
              .join(" ")}
          }
        `}
      </style>
    </div>
  );
};

export default DirItem;
