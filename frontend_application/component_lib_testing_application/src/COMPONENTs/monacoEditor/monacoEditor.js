import React, { useState, useEffect, useRef } from "react";
import MonacoEditor from "@monaco-editor/react";
import { MonacoDiffEditor, monaco } from "react-monaco-editor";

const Editor = ({
  editor_content,
  editor_setContent,
  editor_diffContent,
  editor_setDiffContent,
  editor_language,
  editor_height,
  editor_width,
}) => {
  /*MONACO EDITOR OPTIONS-----------------------------------------------------------------------*/
  const editor_options = {
    contextmenu: false,
    smoothScrolling: true,
    minimap: {
      enabled: false,
    },
    roundedSelection: true,
    fontSize: 14,
    lineNumbers: "off",
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
  };
  const diff_editor_options = {
    smoothScrolling: true,
    contextmenu: false,
    minimap: {
      enabled: false,
    },
    roundedSelection: true,
    fontSize: 14,
    lineNumbers: "off",
    scrollbar: {
      vertical: "visible",
      horizontal: "visible",
      useShadows: false,
      verticalHasArrows: false,
      horizontalHasArrows: false,
      verticalScrollbarSize: 6,
      horizontalScrollbarSize: 6,
    },
    readOnly: true,
    overflow: "hidden",

    enableSplitViewResizing: false,
    renderSideBySide: false,
  };
  /*MONACO EDITOR OPTIONS-----------------------------------------------------------------------*/

  /*INITIALIZE MONACO EDITOR FUNCTION GROUP----------------------------------------------------*/
  ////Define theme for monaco editor
  const defineTheme = (monaco) => {
    monaco.editor.defineTheme("customTheme", {
      base: "vs-dark",
      inherit: true,
      rules: [],
      colors: {},
    });
    monaco.editor.setTheme("customTheme");
  };
  ////Register completion provider for monaco editor
  const registerCompletionProvider = (monaco) => {
    monaco.languages.registerCompletionItemProvider("javascript", {
      provideCompletionItems: (model, position) => {
        const suggestions = getSuggestionsBasedOnPrefix(model, position);
        return { suggestions: suggestions };
      },
    });
  };
  ////Get suggestions based on prefix for monaco editor
  const getSuggestionsBasedOnPrefix = (model, position) => {
    const textUntilPosition = model.getValueInRange({
      startLineNumber: position.lineNumber,
      startColumn: 1,
      endLineNumber: position.lineNumber,
      endColumn: position.column,
    });
    console.log(textUntilPosition);

    if (textUntilPosition.endsWith("utill")) {
      return [
        {
          label: "utillFunctionOne",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "utillFunctionOne()",
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column - 5,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          },
        },
        {
          label: "utillFunctionTwo",
          kind: monaco.languages.CompletionItemKind.Function,
          insertText: "utillFunctionTwo()",
          range: {
            startLineNumber: position.lineNumber,
            startColumn: position.column - 5,
            endLineNumber: position.lineNumber,
            endColumn: position.column,
          },
        },
        // ... more utility functions
      ];
    }

    return [];
  };
  ////Initialize monaco editor
  const initializeMonacoEditor = () => {
    if (editor_diffContent !== undefined) {
      return (
        <MonacoDiffEditor
          language={editor_language}
          theme="vs-dark"
          original={editor_content}
          value={editor_diffContent}
          options={diff_editor_options}
          onChange={(value) => editor_setDiffContent(value)}
          onMount={(editor, monaco) => {
            defineTheme(monaco);
          }}
        ></MonacoDiffEditor>
      );
    } else {
      return (
        <MonacoEditor
          language={editor_language}
          theme="vs-dark"
          value={editor_content}
          options={editor_options}
          onChange={(value) => editor_setContent(value)}
          onMount={(editor, monaco) => {
            defineTheme(monaco), registerCompletionProvider(monaco);
          }}
        ></MonacoEditor>
      );
    }
  };
  /*INITIALIZE MONACO EDITOR FUNCTION GROUP----------------------------------------------------*/

  return (
    <div
      style={{
        position: "relative",
        height: editor_height,
        width: editor_width,
      }}
    >
      {initializeMonacoEditor()}
    </div>
  );
};

export default Editor;
