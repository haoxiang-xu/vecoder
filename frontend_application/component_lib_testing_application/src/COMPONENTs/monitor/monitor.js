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
    files: [
      {
        fileName: "vecoder_sample",
        fileType: "folder",
        filePath: "vecoder/vecoder_sample",
        files: [
          {
            fileName: "public",
            fileType: "folder",
            filePath: "vecoder/vecoder_sample/public",
            files: [
              {
                fileName: "favicon.icon",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/favicon.icon",
                files: [],
              },
              {
                fileName: "index.html",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/index.html",
                files: [],
              },
              {
                fileName: "logo192.png",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/logo192.png",
                files: [],
              },
              {
                fileName: "logo512.png",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/logo512.png",
                files: [],
              },
              {
                fileName: "manifest.json",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/manifest.json",
                files: [],
              },
              {
                fileName: "robots.txt",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/robots.txt",
                files: [],
              },
            ],
          },
          {
            fileName: "src",
            fileType: "folder",
            filePath: "vecoder/vecoder_sample/src",
            files: [
              {
                fileName: "COMPONENTs",
                fileType: "folder",
                filePath: "vecoder/vecoder_sample/src/COMPONENTs",
                files: [
                  {
                    fileName: "explorer",
                    fileType: "folder",
                    filePath: "vecoder/vecoder_sample/src/COMPONENTs/explorer",
                    files: [
                      {
                        fileName: "dirItem",
                        fileType: "folder",
                        filePath:
                          "vecoder/vecoder_sample/src/COMPONENTs/explorer/dirItem",
                        files: [
                          {
                            fileName: "dirItem.css",
                            fileType: "file",
                            filePath:
                              "vecoder/vecoder_sample/src/COMPONENTs/explorer/dirItem/dirItem.css",
                            files: [],
                          },
                          {
                            fileName: "dirItem.js",
                            fileType: "file",
                            filePath:
                              "vecoder/vecoder_sample/src/COMPONENTs/explorer/dirItem/dirItem.js",
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
                files: [],
              },
              {
                fileName: "App.js",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/src/App.js",
                files: [],
              },
              {
                fileName: "App.test.js",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/src/App.test.js",
                files: [],
              },
            ],
          },
          {
            fileName: ".gitignore",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/.gitignore",
            files: [],
          },
          {
            fileName: "package.json",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/package.json",
            files: [],
          },
          {
            fileName: "package-lock.json",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/package-lock.json",
            files: [],
          },
          {
            fileName: "README.md",
            fileType: "file",
            filePath: "vecoder/vecoder_sample/README.md",
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
