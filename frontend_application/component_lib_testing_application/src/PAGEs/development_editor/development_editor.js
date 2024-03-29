import React, { useState, useEffect, useRef } from "react";
import VecoderEditor from "../../COMPONENTs/vecoder_editor/vecoder_editor";
import RightClickContextMenu from "../../COMPONENTs/rightClickContextMenu/rightClickContextMenu";
import Explorer from "../../COMPONENTs/explorer/explorer";

import "./development_editor.css";

const DevelopmentEditor = () => {
  const raw_files = [
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
  ];
  const files_structure = {
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
        ],
      },
    ],
  };

  const [files, setFiles] = useState(files_structure);

  /* Right Click Menu ----------------------------------------------------------------- */
  const [isRightClicked, setIsRightClicked] = useState(false);
  const [rightClickX, setRightClickX] = useState(-1);
  const [rightClickY, setRightClickY] = useState(-1);
  const [onRightClickItem, setOnRightClickItem] = useState(null);
  const [rightClickCommand, setRightClickCommand] = useState(null);
  const handleRightClick = (event) => {
    event.preventDefault();
    setIsRightClicked(true);

    const boundingRect = event.currentTarget.getBoundingClientRect();

    const rightClickX = event.clientX - boundingRect.left;
    const rightClickY = event.clientY - boundingRect.top;

    setRightClickX(rightClickX);
    setRightClickY(rightClickY);
  };
  const handleLeftClick = (event) => {
    setIsRightClicked(false);
    setOnRightClickItem(null);
  };
  /* Right Click Menu ----------------------------------------------------------------- */

  /* Drag and Drop ----------------------------------------------------------------- */
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);
  const [dragCommand, setDragCommand] = useState(null);
  /* Drag and Drop ----------------------------------------------------------------- */

  return (
    <div onContextMenu={handleRightClick} onClick={handleLeftClick}>
      <div className="vector_editor_container1116_01">
        <VecoderEditor
          imported_files={raw_files.slice(0, 3)}
          onRightClickItem={onRightClickItem}
          setOnRightClickItem={setOnRightClickItem}
          rightClickCommand={rightClickCommand}
          setRightClickCommand={setRightClickCommand}
          draggedItem={draggedItem}
          setDraggedItem={setDraggedItem}
          draggedOverItem={draggedOverItem}
          setDraggedOverItem={setDraggedOverItem}
          dragCommand={dragCommand}
          setDragCommand={setDragCommand}
        />
      </div>
      <div className="vector_editor_container1116_02">
        <VecoderEditor
          imported_files={raw_files.slice(3, 5)}
          onRightClickItem={onRightClickItem}
          setOnRightClickItem={setOnRightClickItem}
          rightClickCommand={rightClickCommand}
          setRightClickCommand={setRightClickCommand}
          draggedItem={draggedItem}
          setDraggedItem={setDraggedItem}
          draggedOverItem={draggedOverItem}
          setDraggedOverItem={setDraggedOverItem}
          dragCommand={dragCommand}
          setDragCommand={setDragCommand}
        />
      </div>
      <div className="explorer_container1116">
        <Explorer
          files={files}
          onRightClickItem={onRightClickItem}
          setOnRightClickItem={setOnRightClickItem}
          rightClickCommand={rightClickCommand}
          setRightClickCommand={setRightClickCommand}
        />
      </div>
      {isRightClicked ? (
        <RightClickContextMenu
          x={rightClickX}
          y={rightClickY}
          onRightClickItem={onRightClickItem}
          setRightClickCommand={setRightClickCommand}
        />
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default DevelopmentEditor;
