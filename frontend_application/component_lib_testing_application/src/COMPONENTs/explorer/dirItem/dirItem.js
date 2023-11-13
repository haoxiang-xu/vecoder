import React, { useState, useEffect, useRef } from "react";

import "./dirItem.css";
import arrow_icon from "./ICONs/arrow.png";
import { ICON_MANAGER } from "../../../ICONs/icon_manager";

const DirItem = ({
  file,
  root,
  explorerExpand,
  setExplorerExpand,
  setChildrenOnClicked,
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
  parentSortFiles,
  parentDeleteFile,
  parentCheckNameExist,
  copyFile,
  onSingleClickFile,
  setOnSingleClickFile,
  parentForceRefresh,
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
  const forceRefresh = () => {
    setRefresh(!refresh);
  };
  //EXPAND
  const [expanded, setExpanded] = useState(false);
  const [expandIconClassName, setExpandIconClassName] = useState(
    file.fileExpend
      ? "dir_item_component_arrow_icon_down0725"
      : "dir_item_component_arrow_icon_right0725"
  );
  const dirListClassName = "dir_item_component_dir_list0725";
  //Generate File name, File Icon and Text Color
  const [filename, setFilename] = useState(file.fileName);
  const [renameInput, setRenameInput] = useState(filename);
  const [fileIcon, setFileIcon] = useState();
  const [fileTextColor, setFileTextColor] = useState("#C8C8C8");

  const [dir, setDir] = useState(file.files);
  const [isRightClicked, setIsRightClicked] = useState(false);
  const [onCommand, setOnCommand] = useState("false");

  const [fileNameClassName, setFileNameClassName] = useState(
    "dir_item_component_file_name0725"
  );

  //UPDATE FILE
  useEffect(() => {
    setFilename(file.fileName);
    setRenameInput(file.fileName);
    setFileIcon(
      FILE_TYPE_STYLING_MANAGER[file.fileName.split(".").pop()]?.ICON
    );
    setFileTextColor(
      FILE_TYPE_STYLING_MANAGER[file.fileName.split(".").pop()]?.LABEL_COLOR
    );
    setDir(file.files);
    setExpanded(file.fileExpend);
  }, [file]);

  const DirListRef = useRef();

  //EXPAND RELATED
  const expandingTime = Math.min(
    Math.max(file.files.length * 0.015, 0.08),
    0.16
  );
  const unexpandingTime = Math.min(
    Math.max(file.files.length * 0.015, 0.32),
    0.64
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
      top: "-13pt",
      opacity: 0,
    },
    "20%": {
      opacity: 0,
    },
    "100%": {
      top: "0pt",
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

    forceRefresh();
  };
  const handleFolderOnRightClick = () => {
    setOnRightClickItem(JSON.parse(JSON.stringify(file)));
    setIsRightClicked(true);
  };
  const handleFileOnRightClick = () => {
    setOnRightClickItem(JSON.parse(JSON.stringify(file)));
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
    }
  }, [onRightClickItem]);

  //ON COMMAND
  //RENAME
  const inputRef = useRef();
  const [inputBoxClassName, setInputBoxClassName] = useState(
    "dir_item_component_input_box0803"
  );
  useEffect(() => {
    if (onCommand === "rename" && inputRef.current) {
      inputRef.current.select();
    }
  }, [onCommand]);
  const handleRenameInputOnChange = (event) => {
    setRenameInput(event.target.value);
  };
  const handleRenameInputOnKeyDown = async (event) => {
    if (event.key === "Enter") {
      if (renameInput === file.fileName) {
        setOnCommand("false");
        return;
      }
      if (!parentCheckNameExist(renameInput)) {
        if (renameInput !== "") {
          file.filePath = file.filePath.replace(file.fileName, renameInput);
          file.fileName = renameInput;
        }
        renameAllChildren(
          file,
          file.filePath.split("/").length - 1,
          renameInput
        );
        parentSortFiles();

        setOnSingleClickFile(JSON.parse(JSON.stringify(file)));
        parentForceRefresh();

        setOnCommand("false");
      } else {
        setInputBoxClassName("dir_item_component_input_box_shake0826");
        setTimeout(() => {
          setInputBoxClassName("dir_item_component_input_box0803");
        }, 160);
      }
    }
    if (event.key === "Escape") {
      setOnCommand("delete");
    }
  };
  const checkNameExist = (name) => {
    for (let i = 0; i < file.files.length; i++) {
      if (file.files[i].fileName === name) {
        return true;
      }
    }
    return false;
  };
  const renameAllChildren = (file, pathIndex, renameInput) => {
    for (let i = 0; i < file.files.length; i++) {
      const path = file.files[i].filePath.split("/");
      path[pathIndex] = renameInput;
      file.files[i].filePath = path.join("/");

      renameAllChildren(file.files[i], pathIndex, renameInput);
    }
  };
  const sortFiles = () => {
    file.files.sort((a, b) => {
      if (a.fileType === "folder" && b.fileType === "file") {
        return -1;
      }
      if (a.fileType === "file" && b.fileType === "folder") {
        return 1;
      }
      if (a.fileName < b.fileName) {
        return -1;
      }
      if (a.fileName > b.fileName) {
        return 1;
      }
      return 0;
    });
    setRefresh(!refresh);
  };
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

      file.files.push(newFile);
      setOnCommand("false");
      setRightClickCommand({
        command: "rename",
        target_file: newFile,
      });

      //EXPAND FOLDER
      setExpanded(true);
      file.expanded = true;
      if (setExplorerExpand) {
        setExplorerExpand(true);
      }
      setExpandIconClassName("dir_item_component_arrow_icon_down0725");

      setTimeout(() => {
        setChildrenOnClicked(true);
      }, 20);
      setTimeout(() => {
        setChildrenOnClicked(false);
      }, 40);
      sortFiles();
    }
  }, [onCommand]);
  const getNewFileDefaultName = () => {
    let newFileDefaultName = "untitled_file";
    let newFileDefaultNameIndex = 1;
    let newFileDefaultNameExist = true;
    while (newFileDefaultNameExist) {
      newFileDefaultNameExist = false;
      for (let i = 0; i < file.files.length; i++) {
        if (file.files[i].fileName === newFileDefaultName) {
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
        filePath: file.filePath + "/" + newFolderDefaultName,
        files: [],
      };

      file.files.push(newFolder);
      setOnCommand("false");
      setRightClickCommand({
        command: "rename",
        target_file: newFolder,
      });
      setExpanded(true);
      file.expanded = true;
      if (setExplorerExpand) {
        setExplorerExpand(true);
      }
      setExpandIconClassName("dir_item_component_arrow_icon_down0725");

      setTimeout(() => {
        setChildrenOnClicked(true);
      }, 20);
      setTimeout(() => {
        setChildrenOnClicked(false);
      }, 40);
      sortFiles();
    }
  }, [onCommand]);
  const getNewFolderDefaultName = () => {
    let newFolderDefaultName = "untitled_folder";
    let newFolderDefaultNameIndex = 1;
    let newFolderDefaultNameExist = true;
    while (newFolderDefaultNameExist) {
      newFolderDefaultNameExist = false;
      for (let i = 0; i < file.files.length; i++) {
        if (file.files[i].fileName === newFolderDefaultName) {
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
        parentDeleteFile(file);
      }

      setTimeout(() => {
        setChildrenOnClicked(true);
      }, 20);
      setTimeout(() => {
        setChildrenOnClicked(false);
      }, 40);

      setOnSingleClickFile(null);
      setOnCommand("false");
    }
  }, [onCommand]);
  const deleteFile = (delete_file) => {
    for (let i = 0; i < file.files.length; i++) {
      if (file.files[i].filePath === delete_file.filePath) {
        file.files.splice(i, 1);
        break;
      }
    }
    setOnSingleClickFile(null);
    setRefresh(!refresh);
  };
  //PASTE
  useEffect(() => {
    if (onCommand === "paste") {
      if (copyFile !== null) {
        const pasteFile = JSON.parse(JSON.stringify(copyFile));
        pasteFile.expanded = false;
        setOnSingleClickFile(pasteFile);

        if (!checkNameExist(pasteFile.fileName)) {
          const pasteFileIndex = pasteFile.filePath.split("/").length - 1;
          addPathNameAllChildren(pasteFile, file.filePath, pasteFileIndex);

          const path = pasteFile.filePath.split("/");
          const add_path = file.filePath.split("/");
          let combinedPath = add_path.concat(path.slice(pasteFileIndex));
          pasteFile.filePath = combinedPath.join("/");

          file.files.push(pasteFile);

          //EXPAND FOLDER
          setExpanded(true);
          file.expanded = true;
          if (setExplorerExpand) {
            setExplorerExpand(true);
          }
          setExpandIconClassName("dir_item_component_arrow_icon_down0725");
          sortFiles();
        } else {
          alert("File name already exist");
        }

        setTimeout(() => {
          setChildrenOnClicked(true);
        }, 20);
        setTimeout(() => {
          setChildrenOnClicked(false);
        }, 40);

        setOnCommand("false");
      }
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
  //RIGHT CLICK COMMAND MAIN
  useEffect(() => {
    if (rightClickCommand !== undefined && rightClickCommand !== null) {
      if (rightClickCommand.target_file.filePath === file.filePath) {
        //console.log(rightClickCommand.command + " " + file.fileName);
        if (rightClickCommand.command === "rename") {
          setOnCommand("rename");
        } else if (rightClickCommand.command === "newFile") {
          setOnCommand("newFile");
        } else if (rightClickCommand.command === "newFolder") {
          setOnCommand("newFolder");
        } else if (rightClickCommand.command === "delete") {
          setOnCommand("delete");
        } else if (rightClickCommand.command === "paste") {
          setOnCommand("paste");
        }
        setRightClickCommand(null);
      } else {
        setOnCommand("false");
      }
    }
  }, [rightClickCommand]);

  return (
    <div>
      <link
        href="https://fonts.googleapis.com/css?family=Roboto"
        rel="stylesheet"
      ></link>
      {file.fileType === "folder" ? (
        /*If file type is folder -> style as folder*/
        <div>
          {file.files.length !== 0 ? (
            /*If file has children -> style as expendable folder*/
            <div>
              {onCommand !== "false" ? (
                /*If file on command*/
                <div>
                  {onCommand === "rename" ? (
                    /*If file on command is rename -> display rename input box*/
                    <input
                      type="text"
                      value={renameInput}
                      className={inputBoxClassName}
                      onChange={handleRenameInputOnChange}
                      onKeyDown={handleRenameInputOnKeyDown}
                      ref={inputRef}
                      style={{
                        width: `calc(100% - ${10.7}pt)`,
                      }}
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                /* SPAN If file not on command -> diplay folder name and expand arrow button>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
                <span
                  className={fileNameClassName}
                  onClick={handleExpandIconOnClick}
                  onContextMenu={handleFolderOnRightClick}
                  style={
                    onRightClickItem !== null &&
                    isRightClicked &&
                    onRightClickItem.fileName === file.fileName
                      ? {
                          backgroundColor: "#2a2d2e",
                        }
                      : {}
                  }
                >
                  <img
                    src={arrow_icon}
                    className={expandIconClassName}
                    onClick={handleExpandIconOnClick}
                    loading="lazy"
                  />
                  {filename}
                </span>
              )}
            </div>
          ) : (
            /*If file doesn't has children -> style as unexpendable folder*/
            <div>
              {onCommand !== "false" ? (
                /*If file on command*/
                <div>
                  {onCommand === "rename" ? (
                    /*If file on command is rename -> display rename input box*/
                    <input
                      type="text"
                      value={renameInput}
                      className={inputBoxClassName}
                      onChange={handleRenameInputOnChange}
                      onKeyDown={handleRenameInputOnKeyDown}
                      ref={inputRef}
                    />
                  ) : (
                    <div></div>
                  )}
                </div>
              ) : (
                /* SPAN If file not on command -> diplay folder name and expand arrow button>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
                <span
                  className={fileNameClassName}
                  onClick={(e) => handleOnLeftClick(e)}
                  onContextMenu={handleFolderOnRightClick}
                  style={
                    onRightClickItem !== null &&
                    isRightClicked &&
                    onRightClickItem.fileName === file.fileName
                      ? {
                          backgroundColor: "#2a2d2e",
                        }
                      : {}
                  }
                >
                  <img
                    src={arrow_icon}
                    className="dir_item_component_unexpendable_arrow_icon_right0826"
                    loading="lazy"
                  />
                  {filename}
                </span>
              )}
            </div>
          )}
        </div>
      ) : (
        /*If file type is not folder -> style as file*/
        <div>
          {onCommand !== "false" ? (
            <div>
              {onCommand === "rename" ? (
                <input
                  type="text"
                  value={renameInput}
                  className={inputBoxClassName}
                  onChange={handleRenameInputOnChange}
                  onKeyDown={handleRenameInputOnKeyDown}
                  ref={inputRef}
                  style={{
                    width: `calc(100% - ${10.7}pt)`,
                  }}
                />
              ) : (
                <div></div>
              )}
            </div>
          ) : (
            /* SPAN file>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
            <span
              className={fileNameClassName}
              onClick={(e) => handleOnLeftClick(e)}
              style={
                fileIcon !== undefined
                  ? {
                      color: fileTextColor,
                      animation:
                        "dir_item_component_container_expand_animation " +
                        expandingTime +
                        "s",
                      ...(onRightClickItem !== null &&
                      isRightClicked &&
                      onRightClickItem.fileName === file.fileName
                        ? {
                            backgroundColor: "#2a2d2e",
                          }
                        : {}),
                    }
                  : {
                      ...(onRightClickItem !== null &&
                      isRightClicked &&
                      onRightClickItem.fileName === file.fileName
                        ? {
                            backgroundColor: "#2a2d2e",
                          }
                        : {}),
                    }
              }
              onContextMenu={handleFileOnRightClick}
            >
              {fileIcon !== undefined ? (
                <img
                  src={fileIcon !== undefined ? fileIcon : ""}
                  className="dir_item_component_script_icon0725"
                  loading="lazy"
                  draggable={"false"}
                ></img>
              ) : (
                <div></div>
              )}
              {filename}
            </span>
          )}
        </div>
      )}
      {file.files.length !== 0 && expanded ? (
        /*If file has children -> Including the children file list*/
        <div ref={DirListRef} style={{ height: "fit-content" }}>
          <ul className={dirListClassName}>
            {dir.map((item, index) => (
              <li key={index} style={expendAnimation}>
                <DirItem
                  file={item}
                  root={false}
                  setChildrenOnClicked={setChildrenOnClicked}
                  onRightClickItem={onRightClickItem}
                  setOnRightClickItem={setOnRightClickItem}
                  rightClickCommand={rightClickCommand}
                  setRightClickCommand={setRightClickCommand}
                  parentSortFiles={sortFiles}
                  parentDeleteFile={deleteFile}
                  parentCheckNameExist={checkNameExist}
                  copyFile={copyFile}
                  onSingleClickFile={onSingleClickFile}
                  setOnSingleClickFile={setOnSingleClickFile}
                  parentForceRefresh={forceRefresh}
                />
              </li>
            ))}
          </ul>
        </div>
      ) : (
        /*If file doesn't have children -> Leave empty*/
        <div style={unexpendAnimation}></div>
      )}
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
