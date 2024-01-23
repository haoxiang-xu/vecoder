import React, { useState, useEffect, useRef } from "react";
import VecoderEditor from "../../COMPONENTs/vecoder_editor/vecoder_editor";
import RightClickContextMenu from "../../COMPONENTs/rightClickContextMenu/rightClickContextMenu";
import Explorer from "../../COMPONENTs/explorer/explorer";

import "./stack_structure.css";

const StackStructure = () => {
  /* Right Click Menu ---------------------------------------------------------------------------------------------------------------------------------- */
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
  /* Right Click Menu ---------------------------------------------------------------------------------------------------------------------------------- */

  /* Stack Item Drag and Drop ----------------------------------------------------------------- */
  const [draggedItem, setDraggedItem] = useState(null);
  const [draggedOverItem, setDraggedOverItem] = useState(null);
  const [dragCommand, setDragCommand] = useState(null);
  /* Stack Item Drag and Drop ----------------------------------------------------------------- */

  /* DATA ----------------------------------------------------------------------------------------------------------------------------------------------- */
  const RESIZER = { type: "RESIZER", width: 16, content: "" };
  const END = {
    type: "END",
    min_width: 512,
    width: 512,
    max_width: 512,
    content: "",
  };
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
  const [explorer_files, setExplorer_files] = useState(EXPLORER_FILES);
  const EXPLORER = {
    type: "EXPLORER",
    min_width: 6,
    width: 256,
    max_width: 2048,
    content: explorer_files,
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
  const CODE_EDITORs = [
    {
      type: "CODE_EDITOR",
      min_width: 40,
      width: 600,
      max_width: 2048,
      code_editor_index: 0,
    },
    {
      type: "CODE_EDITOR",
      min_width: 40,
      width: 600,
      max_width: 2048,
      code_editor_index: 1,
    },
  ];
  //Stacking Data ----------------------------------------------------------------------
  const stacking_data = [
    EXPLORER,
    RESIZER,
    CODE_EDITORs[0],
    RESIZER,
    CODE_EDITORs[1],
    RESIZER,
    END,
  ];
  const [stacks, setStacks] = useState(stacking_data);
  /* DATA ----------------------------------------------------------------------------------------------------------------------------------------------- */

  /* Stack Container Drag and Drop ------------------------------------------------------------ */
  const stackStructureContainerRef = useRef(null);
  const [onDragIndex, setOnDragIndex] = useState(-1);
  const [onDropIndex, setOnDropIndex] = useState(-1);

  const onStackItemDragStart = (e, index) => {
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
  const resizerOnDragOver = (e, index) => {
    if (onDragIndex === -1) {
      return;
    }
    setOnDropIndex(index);
  };
  /* Stack Container Drag and Drop ------------------------------------------------------------ */

  /* Resizer ------------------------------------------------------------------------------------------------------------------------------------------- */
  const [resizerOnMouseDown, setResizerOnMouseDown] = useState(false);
  const handleResizerMouseDown = (e, index) => {
    setResizerOnMouseDown(true);
    const startX = e.clientX;
    const left_start_width = stacks[index - 1].width;
    const right_start_width = stacks[index + 1].width;
    const handleMouseMove = (e) => {
      e.preventDefault();

      const moveX = e.clientX - startX;
      const left_width = left_start_width + moveX;
      const right_width = right_start_width - moveX;
      if (index + 1 === stacks.length - 1) {
        // SECOND LAST ITEM WON'T CHANGE END WIDTH
        if (
          left_width > stacks[index - 1].min_width &&
          left_width < stacks[index - 1].max_width
        ) {
          const editedStacks = [...stacks];
          editedStacks[index - 1].width = left_width;
          setStacks(editedStacks);
        }
      } else if (e.clientX + right_width >= window.innerWidth - 6) {
        // IF RIGHT ITEM OUTSIDE OF WINDOW
        if (
          left_width > stacks[index - 1].min_width &&
          left_width < stacks[index - 1].max_width
        ) {
          const editedStacks = [...stacks];
          editedStacks[index - 1].width = left_width;
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
      const editedStacks = [...stacks];
      editedStacks[index + 1].width = Math.min(
        editedStacks[index + 1].max_width,
        window.innerWidth - e.clientX - (RESIZER.width + 6)
      );
      setStacks(editedStacks);
    } else {
      const editedStacks = [...stacks];
      editedStacks[index + 1].width = editedStacks[index + 1].min_width;
      setStacks(editedStacks);
    }
  };
  /* Resizer ------------------------------------------------------------------------------------------------------------------------------------------- */

  return (
    <div
      className="stack_structure_container0116"
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
      {stacks.map((item, index) => {
        switch (item?.type) {
          case "EMPTY_CONTAINER":
            return (
              <div
                className={"stack_structure_item0116"}
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
                <span className="stack_structure_label0116">
                  {item.content}
                </span>
              </div>
            );
          case "EXPLORER":
            return (
              <div
                className="stack_structure_explorer0122"
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
                  files={item.content}
                  onRightClickItem={onRightClickItem}
                  setOnRightClickItem={setOnRightClickItem}
                  rightClickCommand={rightClickCommand}
                  setRightClickCommand={setRightClickCommand}
                />
                {index === onDropIndex ? (
                  <div className="stack_structure_item_overlay0122"></div>
                ) : (
                  <div></div>
                )}
              </div>
            );
          case "CODE_EDITOR":
            return (
              <div
                className="stack_structure_code_editor0122"
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
                <VecoderEditor
                  imported_files={code_editor_files[item.code_editor_index]}
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
                {index === onDropIndex ? (
                  <div className="stack_structure_item_overlay0122"></div>
                ) : (
                  <div></div>
                )}
              </div>
            );
          case "RESIZER":
            const [resizerClassname, setResizerClassname] = useState(
              "stack_structure_resizer0122"
            );
            const [resizerContainerWidth, setResizerContainerWidth] = useState(
              item.width
            );
            return (
              <div
                className={"stack_structure_resizer_container0122"}
                key={index}
                style={{
                  width: resizerContainerWidth + "px",
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
                    setResizerClassname(
                      "stack_structure_resizer_onDragOver0122"
                    );
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
          case "END":
            return (
              <div
                className={"stack_structure_item0116"}
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
          default:
            break;
        }
      })}
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

export default StackStructure;
