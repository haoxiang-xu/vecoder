import React, { useState, useEffect, useRef } from "react";
import axios from "axios";

import StartIcon from "../startIcon/startIconSection";
import Explorer from "../explorer/explorer";
import "./monitor.css";

const Monitor = ({
  onRightClickItem,
  setOnRightClickItem,
  rightClickCommand,
  setRightClickCommand,
  copyFile,
}) => {
  let raw_files = {
    fileName: "vecoder",
    fileType: "folder",
    filePath: "vecoder",
    expanded: false,
    files: [
      {
        fileName: "vecoder_sample",
        fileType: "folder",
        filePath: "vecoder/vecoder_sample",
        expanded: false,
        files: [
          {
            fileName: "public",
            fileType: "folder",
            filePath: "vecoder/vecoder_sample/public",
            expanded: false,
            files: [
              {
                fileName: "favicon.icon",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/favicon.icon",
                expanded: false,
                files: [],
              },
              {
                fileName: "index.html",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/index.html",
                expanded: false,
                files: [],
              },
              {
                fileName: "logo192.png",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/logo192.png",
                expanded: false,
                files: [],
              },
              {
                fileName: "logo512.png",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/logo512.png",
                expanded: false,
                files: [],
              },
              {
                fileName: "manifest.json",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/manifest.json",
                expanded: false,
                files: [],
              },
              {
                fileName: "robots.txt",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/robots.txt",
                expanded: false,
                files: [],
              },
            ],
          },
          {
            fileName: "src",
            fileType: "folder",
            filePath: "vecoder/vecoder_sample/src",
            expanded: false,
            files: [
              {
                fileName: "COMPONENTs",
                fileType: "folder",
                filePath: "vecoder/vecoder_sample/src/COMPONENTs",
                expanded: false,
                files: [
                  {
                    fileName: "explorer",
                    fileType: "folder",
                    filePath: "vecoder/vecoder_sample/src/COMPONENTs/explorer",
                    expanded: false,
                    files: [
                      {
                        fileName: "dirItem",
                        fileType: "folder",
                        filePath:
                          "vecoder/vecoder_sample/src/COMPONENTs/explorer/dirItem",
                        expanded: false,
                        files: [
                          {
                            fileName: "dirItem.css",
                            fileType: "file",
                            filePath:
                              "vecoder/vecoder_sample/src/COMPONENTs/explorer/dirItem/dirItem.css",
                            expanded: false,
                            files: [],
                          },
                          {
                            fileName: "dirItem.js",
                            fileType: "file",
                            filePath:
                              "vecoder/vecoder_sample/src/COMPONENTs/explorer/dirItem/dirItem.js",
                            expanded: false,
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
                expanded: false,
                files: [],
              },
              {
                fileName: "App.js",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/src/App.js",
                expanded: false,
                files: [],
              },
              {
                fileName: "App.test.js",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/src/App.test.js",
                expanded: false,
                files: [],
              },
            ],
          },
          {
            fileName: ".gitignore",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/.gitignore",
            expanded: false,
            files: [],
          },
          {
            fileName: "package.json",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/package.json",
            expanded: false,
            files: [],
          },
          {
            fileName: "package-lock.json",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/package-lock.json",
            expanded: false,
            files: [],
          },
          {
            fileName: "README.md",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/README.md",
            expanded: false,
            files: [],
          },
        ],
      },
    ],
  };
  const [startOnClick, setStartOnClick] = useState(false);
  const [explorerTop, setExplorerTop] = useState(-1);
  const [explorerBottom, setExplorerBottom] = useState(-1);
  const [files, setFiles] = useState(raw_files);
  const [refeshKey, setRefeshKey] = useState(0);

  const getFilesFromDatabase = async () => {
    try {
      const response = await axios.post("http://localhost:8000/getFiles/all");
      forceExplorerRefresh();
      setFiles(response.data[0]);
    } catch (err) {
      console.error("[ERROR]: " + err);
    }
  };
  const forceExplorerRefresh = () => {
    setRefeshKey(refeshKey + 1);
  };

  // RESIZER
  const monitorContainerRef = useRef(null);
  const [width, setWidth] = useState(Math.min(750, window.innerWidth) + "px");
  const [resizerStartX, setResizerStartX] = useState(0);
  const [resizerEndX, setResizerEndX] = useState(0);
  const [onResize, setOnResize] = useState(false);
  const resizerOnDrag = (e) => {
    setResizerEndX(e.clientX);
  };
  const resizerOnClick = (e) => {
    setResizerStartX(e.clientX);
  };
  const resizerOnRelease = (e) => {
    setResizerStartX(e.clientX);
    setOnResize(false);
  };
  useEffect(() => {
    if (onResize) {
      setWidth(
        Math.min(
          window.innerWidth,
          monitorContainerRef.current.offsetWidth +
            2 * (resizerEndX - resizerStartX)
        ) + "px"
      );
      setResizerStartX(resizerEndX);
    }
  }, [resizerEndX, resizerStartX]);
  useEffect(() => {
    if (monitorContainerRef.current.offsetWidth > window.innerWidth) {
      setWidth(window.innerWidth + "px");
    }
  }, [window.innerWidth]);

  return (
    <div
      id="monitor_component_container0728"
      ref={monitorContainerRef}
      style={{ width: width }}
      onMouseUp={(e) => {
        resizerOnRelease(e);
      }}
      onMouseLeave={(e) => {
        resizerOnRelease(e);
      }}
      onMouseDown={(e) => {
        resizerOnClick(e);
      }}
      onMouseMove={(e) => {
        resizerOnDrag(e);
      }}
    >
      <StartIcon
        startOnClick={startOnClick}
        setStartOnClick={setStartOnClick}
        explorerTop={explorerTop}
        getFilesFromDatabase={getFilesFromDatabase}
        setOnRightClickItem={setOnRightClickItem}
      />
      {startOnClick ? (
        <Explorer
          files={files}
          startOnClick={startOnClick}
          setExplorerTop={setExplorerTop}
          setExplorerBottom={setExplorerBottom}
          onRightClickItem={onRightClickItem}
          setOnRightClickItem={setOnRightClickItem}
          rightClickCommand={rightClickCommand}
          setRightClickCommand={setRightClickCommand}
          refeshKey={refeshKey}
          copyFile={copyFile}
        />
      ) : (
        <div></div>
      )}
      <div
        id="monitor_component_resizer0919"
        style={
          explorerTop != -1 && explorerBottom != -1
            ? {
                top: explorerTop + "px",
                bottom: explorerBottom + "px",
              }
            : {
                height: "0px",
              }
        }
        onMouseUp={(e) => {
          resizerOnRelease(e);
        }}
      >
        <div
          id="monitor_component_visual_resizer0919"
          onMouseDown={() => {
            setOnResize(true);
          }}
          style={
            explorerTop == 0
              ? {
                  borderRadius: "0px",
                  top: "0px",
                  bottom: "0px",
                }
              : {
                  borderRadius: "4px",
                }
          }
        ></div>
      </div>
    </div>
  );
};

export default Monitor;
