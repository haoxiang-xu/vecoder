import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";

const CodeEditor = ({ code }) => {
  const [language, setLanguage] = useState("javascript");

  return (
    <div>
      <div
        style={{
          width: "500pt",
          height: "200pt",
          transform: "translate(50%, 50%)",
          borderRadius: "12pt",
          padding: "8pt 8pt 8pt 2pt",
          overflow: "hidden",
          boxShadow: "0px 4px 16px 8px rgba(0, 0, 0, 0.2)",
          backgroundColor: "#1e1e1e",
          userSelect: "none",
        }}
      >
        <MonacoEditor
          width="100%"
          height="100%"
          defaultLanguage="javascript"
          theme="vs-dark"
          value={code}
          automaticLayout={true}
          options={{
            minimap: {
              enabled: false,
            },
            fontSize: 16,
            fontFamily: "Consolas",
            lineNumbers: "off",
            scrollbar: {
              vertical: "visible",
              horizontal: "hidden",
              useShadows: false,
              verticalHasArrows: false,
              horizontalHasArrows: false,
              verticalScrollbarSize: 6,
              horizontalScrollbarSize: 0,
            },
            readOnly: false,
            overflow: "hidden",
          }}
        />
      </div>
    </div>
  );
};

export default CodeEditor;
