import React, { useState, useEffect, useRef } from "react";

import RightClickContextMenu from "../../COMPONENTs/rightClickContextMenu/rightClickContextMenu";
import Explorer from "../../COMPONENTs/explorer/explorer";

import "./home.css";

const Home = () => {
  const [isRightClicked, setIsRightClicked] = useState(false);
  const [rightClickX, setRightClickX] = useState(-1);
  const [rightClickY, setRightClickY] = useState(-1);
  const [onRightClickItem, setOnRightClickItem] = useState(null);
  const [rightClickCommand, setRightClickCommand] = useState(null);
  const [copyFile, setCopyFile] = useState(null);

  let raw_files = {
    fileName: "vecoder",
    fileType: "folder",
    filePath: "vecoder",
    fileExpend: false,
    files: [
      {
        fileName: "vecoder_sample",
        fileType: "folder",
        filePath: "vecoder/vecoder_sample",
        fileExpend: false,
        files: [
          {
            fileName: "public",
            fileType: "folder",
            filePath: "vecoder/vecoder_sample/public",
            fileExpend: false,
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
                fileName: "logo192.png",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/logo192.png",
                fileExpend: false,
                files: [],
              },
              {
                fileName: "logo512.png",
                fileType: "file",
                filePath: "vecoder/vecoder_sample/public/logo512.png",
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
            ],
          },
          {
            fileName: "src",
            fileType: "folder",
            filePath: "vecoder/vecoder_sample/src",
            fileExpend: false,
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
        ],
      },
    ],
  };
  const [files, setFiles] = useState(raw_files);

  const handleRightClick = (event) => {
    event.preventDefault();
    setIsRightClicked(true);

    const boundingRect = event.currentTarget.getBoundingClientRect();

    const rightClickX = event.clientX - boundingRect.left;
    const rightClickY = event.clientY - boundingRect.top;

    setRightClickX(rightClickX);
    setRightClickY(rightClickY);
  };
  const handleOnClick = (event) => {
    setIsRightClicked(false);
    setOnRightClickItem(null);
  };
  //COPY and CUT command
  useEffect(() => {
    if (rightClickCommand !== null) {
      if (rightClickCommand.command === "copy") {
        setCopyFile(rightClickCommand.target_file);
      }
    }
  }, [rightClickCommand]);

  return (
    <div
      id="app_page_container0803"
      onContextMenu={handleRightClick}
      onClick={handleOnClick}
    >
      <Explorer
        files={files}
        onRightClickItem={onRightClickItem}
        setOnRightClickItem={setOnRightClickItem}
        rightClickCommand={rightClickCommand}
        setRightClickCommand={setRightClickCommand}
        copyFile={copyFile}
      />
      {isRightClicked ? (
        <RightClickContextMenu
          x={rightClickX}
          y={rightClickY}
          onRightClickItem={onRightClickItem}
          setOnRightClickItem={setOnRightClickItem}
          setRightClickCommand={setRightClickCommand}
          copyFile={copyFile}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Home;
