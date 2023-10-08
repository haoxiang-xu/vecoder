import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import "./dirItem.css";
import arrow_icon from "./ICONs/arrow.png";
import info_icon from "./ICONs/info.png";

import javascript_icon from "./ICONs/FILETYPE_ICONs/js.png";
import html_icon from "./ICONs/FILETYPE_ICONs/html.png";
import css_icon from "./ICONs/FILETYPE_ICONs/css.png";
import png_icon from "./ICONs/FILETYPE_ICONs/png.png";
import pdf_icon from "./ICONs/FILETYPE_ICONs/pdf.png";
import gitignore_icon from "./ICONs/FILETYPE_ICONs/gitignore.png";
import python_icon from "./ICONs/FILETYPE_ICONs/python.png";
import json_icon from "./ICONs/FILETYPE_ICONs/json.png";
import txt_icon from "./ICONs/FILETYPE_ICONs/txt.png";
import markdown_icon from "./ICONs/FILETYPE_ICONs/markdown.png";
import java_icon from "./ICONs/FILETYPE_ICONs/java.png";
import php_icon from "./ICONs/FILETYPE_ICONs/php.png";
import image_icon from "./ICONs/FILETYPE_ICONs/photo.png";
import xml_icon from "./ICONs/FILETYPE_ICONs/xml.png";
import app_icon from "./ICONs/FILETYPE_ICONs/application.png";
import database_icon from "./ICONs/FILETYPE_ICONs/database.png";
import cpp_icon from "./ICONs/FILETYPE_ICONs/cpp.png";
import csharp_icon from "./ICONs/FILETYPE_ICONs/csharp.png";
import settings_icon from "./ICONs/FILETYPE_ICONs/settings.png";
import ipynb_icon from "./ICONs/FILETYPE_ICONs/ipynb.png";
import table_icon from "./ICONs/FILETYPE_ICONs/table.png";

const DirItem = ({
  file,
  root,
  explorerExpand,
  setExplorerExpand,
  parentFileLength,
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
  const COLORs = {
    js: "#CCCCCC",
    html: "#CCCCCC",
    css: "#CCCCCC",
    png: "#8C8C8C",
    pdf: "#8C8C8C",
    gitignore: "#8C8C8C",
    py: "#CCCCCC",
    json: "#CCCCCC",
    txt: "#8C8C8C",
    md: "#CCCCCC",
    java: "#CCCCCC",
    php: "#CCCCCC",
    jpg: "#8C8C8C",
    jpeg: "#8C8C8C",
    icon: "#8C8C8C",
    xml: "#CCCCCC",
    exe: "#CCCCCC",
    sql: "#CCCCCC",
    cpp: "#CCCCCC",
    cs: "#CCCCCC",
    config: "#8C8C8C",
    ipynb: "#CCCCCC",
    csv: "#CCCCCC",
    svg: "#8C8C8C",
  };
  const ICONs = {
    js: javascript_icon,
    html: html_icon,
    css: css_icon,
    png: image_icon,
    pdf: pdf_icon,
    gitignore: gitignore_icon,
    py: python_icon,
    json: json_icon,
    txt: txt_icon,
    md: markdown_icon,
    java: java_icon,
    php: php_icon,
    jpg: image_icon,
    jpeg: image_icon,
    icon: image_icon,
    xml: xml_icon,
    exe: app_icon,
    sql: database_icon,
    cpp: cpp_icon,
    cs: csharp_icon,
    config: settings_icon,
    ipynb: ipynb_icon,
    csv: table_icon,
    svg: image_icon,
  };

  const [refresh, setRefresh] = useState(false);
  const forceRefresh = () => {
    setRefresh(!refresh);
  };

  //EXPAND
  const [expanded, setExpanded] = useState(false);
  const [expandIconId, setExpandIconId] = useState(
    file.fileExpend
      ? "dir_item_component_arrow_icon_down0725"
      : "dir_item_component_arrow_icon_right0725"
  );

  const [dirListId, setDirListId] = useState("dir_item_component_dir_list0725");

  //Generate File name, File Icon and Text Color
  const [filename, setFilename] = useState(file.fileName);
  const [renameInput, setRenameInput] = useState(filename);
  useEffect(() => {
    setFilename(file.fileName);
    if (file.fileName.split(".").pop() !== file.fileName) {
      setFileIcon(ICONs[file.fileName.split(".").pop()]);
      setFileTextColor(COLORs[file.fileName.split(".").pop()]);
    }
  }, [file.fileName]);
  const [fileIcon, setFileIcon] = useState();
  const [fileTextColor, setFileTextColor] = useState();

  const [dir, setDir] = useState(file.files);
  const [isHovered, setIsHovered] = useState(false);
  const [isRightClicked, setIsRightClicked] = useState(false);
  const [onCommand, setOnCommand] = useState("false");

  const [fileNameId, setFileNameId] = useState(
    "dir_item_component_file_name0725"
  );

  //UPDATE FILE
  useEffect(() => {
    setRenameInput(file.fileName);
    setFileIcon(ICONs[file.fileName.split(".").pop()]);
    setFileTextColor(COLORs[file.fileName.split(".").pop()]);
    setDir(file.files);
    setExpanded(file.fileExpend);
  }, [file]);

  const DirListRef = useRef();

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
  let dirListExpendKeyframes = {
    "0%": {
      opacity: 0,
      height: "0pt",
    },
    "40%": {
      opacity: 0,
    },
    "60%": {
      height: "10pt",
      opacity: 0,
    },
    "100%": {
      opacity: 1,
      height: "13pt",
    },
  };
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
      setExpandIconId("dir_item_component_arrow_icon_down0725");
      setExpanded(true);
      file.fileExpend = true;
    } else {
      setExpendAnimation({});
      setUnexpendAnimation({
        ...dirListUnexpendAnimation,
        ...dirListUnexpendKeyframes,
      });
      setExpandIconId("dir_item_component_arrow_icon_right0725");
      setExpanded(false);
      file.fileExpend = false;
    }

    setTimeout(() => {
      setChildrenOnClicked(true);
    }, 40);
    setTimeout(() => {
      setChildrenOnClicked(true);
    }, 80);
    setTimeout(() => {
      setChildrenOnClicked(true);
    }, 160);
    setTimeout(() => {
      setChildrenOnClicked(true);
    }, 320);
    setTimeout(() => {
      setChildrenOnClicked(true);
    }, 640);
    setTimeout(() => {
      setChildrenOnClicked(false);
    }, 650);
  };
  const handleMouseEnter = () => {
    setIsHovered(true);
  };
  const handleMouseLeave = () => {
    setIsHovered(false);
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
        setFileNameId("dir_item_component_file_name_on_selected0827");
      } else {
        setFileNameId("dir_item_component_file_name0725");
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
  const [inputBoxId, setInputBoxId] = useState(
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
        setInputBoxId("dir_item_component_input_box_shake0826");
        setTimeout(() => {
          setInputBoxId("dir_item_component_input_box0803");
        }, 160);
      }
    }
    if (event.key === "Escape") {
      setOnCommand("false");
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
      setExpandIconId("dir_item_component_arrow_icon_down0725");

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
      setExpandIconId("dir_item_component_arrow_icon_down0725");

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
          setExpandIconId("dir_item_component_arrow_icon_down0725");
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

  //ONDRAG
  const handleDragStart = (event) => {
    //console.log("drag start" + file.filePath);
  };
  const handleDragOver = (event) => {
    event.preventDefault();
    event.stopPropagation();
    //setDirListId("dir_item_component_dir_list_on_drag0827");
    console.log("drag over " + file.fileName);
  };

  return (
    <div className="dir_item_component_container0725">
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
                      id={inputBoxId}
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
                  id={fileNameId}
                  onClick={handleExpandIconOnClick}
                  onContextMenu={handleFolderOnRightClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  draggable={onCommand !== "false" ? "false" : "true"}
                  onDragStart={
                    onCommand !== "false" ? undefined : handleDragStart
                  }
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
                    id={expandIconId}
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
                      id={inputBoxId}
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
                /* SPAN If file not on command -> diplay folder name and expand arrow button>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>>*/
                <span
                  id={fileNameId}
                  onClick={(e) => handleOnLeftClick(e)}
                  onContextMenu={handleFolderOnRightClick}
                  onMouseEnter={handleMouseEnter}
                  onMouseLeave={handleMouseLeave}
                  draggable={onCommand !== "false" ? "false" : "true"}
                  onDragStart={
                    onCommand !== "false" ? undefined : handleDragStart
                  }
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
                    id="dir_item_component_unexpendable_arrow_icon_right0826"
                    loading="lazy"
                  />
                  {filename}
                  {isHovered ? (
                    /*If tag on hover -> highlight tag*/
                    <img
                      src={info_icon}
                      id="dir_item_component_info_icon0731"
                      onClick={(e) => {
                        e.stopPropagation();
                      }}
                    />
                  ) : (
                    <div></div>
                  )}
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
                  id={inputBoxId}
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
              id={fileNameId}
              onClick={(e) => handleOnLeftClick(e)}
              draggable={onCommand !== "false" ? "false" : "true"}
              onDragStart={onCommand !== "false" ? undefined : handleDragStart}
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
                  id="dir_item_component_script_icon0725"
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
        <div
          onDragOver={handleDragOver}
          ref={DirListRef}
          style={{ height: "fit-content" }}
        >
          <ul id={dirListId}>
            {dir.map((item, index) => (
              <li key={index} style={expendAnimation}>
                <DirItem
                  file={item}
                  root={false}
                  parentFileLength={file.files.length}
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
