import React, { useState, useRef, useEffect } from "react";
import MonacoEditor from "@monaco-editor/react";
import { MonacoDiffEditor } from "react-monaco-editor";

const Editor = ({
  //Editor required parameters
  editor_content,
  editor_setContent,
  editor_language,

  setOnSelected,
  display,

  //Diff Editor optional parameters
  editor_diffContent,
  editor_setDiffContent,
}) => {
  /*MONACO EDITOR OPTIONS-----------------------------------------------------------------------*/
  const monacoRef = useRef(null);
  const baseEditorOptions = React.useMemo(
    () => ({
      contextmenu: false,
      smoothScrolling: true,
      minimap: { enabled: false },
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
    }),
    []
  );
  const diffEditorOptions = React.useMemo(
    () => ({
      ...baseEditorOptions,
      readOnly: true,
      enableSplitViewResizing: false,
      renderSideBySide: true,
    }),
    [baseEditorOptions]
  );
  const editorProps = {
    language: editor_language,
    theme: "vs-dark",
    options: editor_diffContent ? diffEditorOptions : baseEditorOptions,
    onChange: editor_setContent,
    onMount: onEditorMount,
  };
  /*MONACO EDITOR OPTIONS-----------------------------------------------------------------------*/

  /*MONACO EDITOR FUNCTIONs-----------------------------------------------------------------------*/
  ////On editor mount
  function onEditorMount(editor, monaco) {
    monacoRef.current = editor;
    defineTheme(monaco);
    registerCompletionProvider(monaco);
    registerInlineCompletionProvider(monaco);
  }
  ////Get monaco editor on selected content
  const getEditorOnSelected = (monacoRef) => {
    const select_range = monacoRef.current.getSelection();
    const selectedText = monacoRef.current
      .getModel()
      .getValueInRange(selection);

    setOnSelected({ selectedText: selectedText, select_range: select_range });
  };
  /*MONACO EDITOR FUNCTIONs-----------------------------------------------------------------------*/

  return display ? (
    <div
      className="MONACO_EDITOR_CONTAINER"
      style={{ height: "100%", width: "100%" }}
    >
      {editor_diffContent ? (
        <MonacoDiffEditor
          {...editorProps}
          original={editor_content}
          value={editor_diffContent}
        />
      ) : (
        <MonacoEditor {...editorProps} value={editor_content} />
      )}
    </div>
  ) : (
    <div
      className="MONACO_EDITOR_CONTAINER"
      style={{ height: "100%", width: "100%", display: "none" }}
    >
      {editor_diffContent ? (
        <MonacoDiffEditor
          {...editorProps}
          original={editor_content}
          value={editor_diffContent}
        />
      ) : (
        <MonacoEditor {...editorProps} value={editor_content} />
      )}
    </div>
  );
};

export default Editor;

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
////Register snippet completion provider for monaco editor
const registerCompletionProvider = (monaco) => {
  monaco.languages.registerCompletionItemProvider("javascript", {
    provideCompletionItems: (model, position) => {
      const suggestions = getSuggestionsBasedOnPrefix(model, position);
      return { suggestions: suggestions };
    },
  });
};
////Register inline completion provider for monaco editor
const registerInlineCompletionProvider = (monaco) => {
  const inlineCompletionProvider = {
    provideInlineCompletions: (model, position, context, token) => {
      return {
        items: [
          {
            insertText: "InlineCompletion",
            range: {
              startLineNumber: position.lineNumber,
              startColumn: position.column,
              endLineNumber: position.lineNumber,
              endColumn: position.column,
            },
          },
        ],
      };
    },
    freeInlineCompletions: () => {},
  };
  monaco.languages.registerInlineCompletionsProvider(
    "javascript",
    inlineCompletionProvider
  );
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
    ];
  }

  return [];
};
/*INITIALIZE MONACO EDITOR FUNCTION GROUP----------------------------------------------------*/
