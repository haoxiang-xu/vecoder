// ContainerPage.js
import React, { useState, useEffect } from "react";
import "container_231107.css";

const ContainerPage = () => {
  const [tabCount, setTabCount] = useState(0);

  const openNewEditor = () => {
    setTabCount((prevCount) => prevCount + 1);

    const editorId = `codeEditor_${tabCount}`;
    const newTab = `
        <div class="editor-container resizable" id="container_${tabCount}">
            <div class="tab" id="tab_${tabCount}">
                <span class="file-name">File ${tabCount}</span>
                <div class="tab-buttons">
                    <span class="close-btn" onclick="closeEditor(${tabCount})">✖</span>
                    <span class="minimize-btn" onclick="minimizeEditor(${tabCount})">-</span>
                    <span class="maximize-btn" onclick="maximizeEditor(${tabCount})">□</span>
                </div>
            </div>
            <div class="code-editor" id="${editorId}">
                <div class="code-container">
                    <pre class="code-lines"><span>1</span></pre>
                    <pre class="code-content">// Your code goes here</pre>
                </div>
            </div>
        </div>
    `;

    document.getElementById("editorTabs").insertAdjacentHTML("beforeend", newTab);

    // Set initial height to match screen height
    document.getElementById(`container_${tabCount}`).style.height =
      window.innerHeight + "px";

    // Make the container draggable and resizable
    $("#" + `container_${tabCount}`).draggable().resizable({
      handles: "s, e", // Resizable from the bottom and right
    });
  };

  const closeEditor = (tabId) => {
    document.getElementById(`container_${tabId}`).remove();
  };

  useEffect(() => {  
    const handleResize = () => {
      const explorerRect = explorerContainerRef.current.getBoundingClientRect();
      const explorerTop = explorerRect.top;
      const explorerBottom = explorerRect.bottom;
      setExplorerTop(explorerTop);
      setExplorerBottom(window.innerHeight - explorerBottom);
    };
      window.addEventListener("resize", handleResize);

  
    return () => {
  
      window.removeEventListener("resize", handleResize);
  

    };
  }, []); 
  

  return (
    <div className="container">
      <button id="openEditorBtn" onClick={openNewEditor}>
        Open File
      </button>
      <div id="editorTabs" className="editor-tabs"></div>

      {/* Include jQuery and jQuery UI script tags here if not included globally */}
      {/* <script src="https://code.jquery.com/jquery-3.6.0.min.js"></script>
      <script src="https://code.jquery.com/ui/1.12.1/jquery-ui.js"></script> */}
    </div>
  );
};

export default ContainerPage;
