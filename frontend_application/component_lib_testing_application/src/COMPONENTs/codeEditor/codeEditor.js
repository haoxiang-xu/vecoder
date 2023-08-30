import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";

import "./codeEditor.css";

import road_map_icon from "./ICONs/road-map.png";
import line_numbers_icon from "./ICONs/number-sign.png";
import close_file_icon from "./ICONs/delete.png";
import close_icon from "./ICONs/close.png";
import minus_icon from "./ICONs/minus.png";
import more_icon from "./ICONs/more.png";

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

const CodeEditor = ({ files }) => {
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

  const LANGUAGEs = {
    js: "javascript",
    html: "html",
    css: "css",
    py: "python",
    json: "json",
    txt: "txt",
    md: "markdown",
    java: "java",
    php: "php",
    xml: "xml",
    sql: "database",
    cpp: "cpp",
    cs: "csharp",
    ipynb: "ipynb",
    csv: "table",
  };

  const [refresh, setRefresh] = useState(false);
  const [fileList, setFileList] = useState(files);
  const [logo_text, setLogoText] = useState("</>");
  const [roadMapVisible, setRoadMapVisible] = useState(false);
  const [lineNumbersVisible, setLineNumbersVisible] = useState("off");
  const [verticalScrollbarVisible, setVerticalScrollbarVisible] =
    useState(false);
  const [horizontalScrollbarVisible, setHorizontalScrollbarVisible] =
    useState(false);
  const filesContainerRef = useRef(null);
  const [filesContainerWidth, setFilesContainerWidth] = useState(0);
  const [fileAverageContainerWidth, setFileAverageContainerWidth] = useState(0);

  const [onSelectedIndex, setOnSelectedIndex] = useState(0);
  const [onHoverIndex, setOnHoverIndex] = useState(-1);

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
    for (let i = 0; i < fileList.length; i++) {
      fileList[i].fileType = fileList[i].fileName.split(".").pop();
      fileList[i].fileLanguage = LANGUAGEs[fileList[i].fileType];
    }
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
      <link
        href="https://fonts.googleapis.com/css?family=Koulen"
        rel="stylesheet"
      ></link>
      <div id="code_editor_files_container0829" ref={filesContainerRef}>
        {fileList.map((file, index) => (
          <div
            key={index}
            id={
              index === onSelectedIndex
                ? "code_editor_file_container_on_selected0830"
                : "code_editor_file_container0829"
            }
            draggable={true}
            style={{ width: fileAverageContainerWidth }}
            onClick={() => {
              setOnSelectedIndex(index);
            }}
          >
            <div id="code_editor_fileName_container0829">{file.fileName}</div>

            {filesContainerWidth / (fileList.length + 2) - 4.5 >= 30 ? (
              <div>
                <img
                  src={close_file_icon}
                  id="code_editor_close_icon0829"
                  alt="close"
                  onClick={handleFileCloseIconClick(index)}
                />
                <img
                  src={ICONs[file.fileType]}
                  id="code_editor_file_type_icon0830"
                  alt="file type"
                />
              </div>
            ) : (
              <div
                onMouseEnter={() => setOnHoverIndex(index)}
                onMouseLeave={() => setOnHoverIndex(-1)}
              >
                {onHoverIndex === index ? (
                  <img
                    src={close_file_icon}
                    id="code_editor_close_icon_centered0829"
                    alt="close"
                    onClick={handleFileCloseIconClick(index)}
                  />
                ) : (
                  <img
                    src={ICONs[file.fileType]}
                    id="code_editor_file_type_centered0830"
                    alt="file type"
                  />
                )}
              </div>
            )}
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

      {fileList[onSelectedIndex] ? (
        <MonacoEditor
          top="0px"
          left="0px"
          position="absolute"
          width="100%"
          height="100%"
          defaultLanguage="javascript"
          language={fileList[onSelectedIndex].fileLanguage}
          theme="vs-dark"
          value={fileList[onSelectedIndex].content}
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
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 6,
            },
            readOnly: false,
            overflow: "hidden",
          }}
        />
      ) : (
        <div>
          <div id="code_editor_logo_icon0830">{logo_text}</div>
        </div>
      )}
    </div>
  );
};

export default CodeEditor;
