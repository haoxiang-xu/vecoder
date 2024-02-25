import React, { useState, useEffect, useRef, useContext } from "react";
import { vecoderEditorContexts } from "../../CONTEXTs/vecoderEditorContexts";
import StackStructure from "../../COMPONENTs/stack_structure/stack_structure";

const MONACO_EDITOR_DEFAULT_TEST_DATA = {
  "./code_editor.js": {
    viewState: null,
    model: null,
  },
  "./code_editor.css": {
    viewState: null,
    model: null,
  },
  "./main.py": {
    viewState: null,
    model: null,
  },
  "./index.html": {
    viewState: null,
    model: null,
  },
  "./main.java": {
    viewState: null,
    model: null,
  },
};
const VECODER_EDITOR_DEFAULT_TEST_DATA = [
  {
    codeEditorContainerRefIndex: 0,
    onSelectedMonacoIndex: 0,
    monacoEditorPaths: ["./code_editor.js", "./code_editor.css", "./main.py"],
  },
  {
    codeEditorContainerRefIndex: 1,
    onSelectedMonacoIndex: 0,
    monacoEditorPaths: ["./index.html", "./main.java"],
  },
];

const VecoderEditorPage = () => {
  /* Monaco Editor Data and Functions ------------------------------------ */
  const [
    monacoEditorsOptionsAndContentData,
    setMonacoEditorsOptionsAndContentData,
  ] = useState(MONACO_EDITOR_DEFAULT_TEST_DATA);
  const accessMonacoEditorsDataByPath = (path) => {
    return monacoEditorsOptionsAndContentData[path];
  };
  const updateMonacoEditorsDataByPath = (path, data) => {
    setMonacoEditorsOptionsAndContentData((prevData) => {
      return { ...prevData, [path]: data };
    });
  };
  const appendMonacoEditorsDataByPath = (path, data) => {
    setMonacoEditorsOptionsAndContentData((prevData) => {
      return { ...prevData, [path]: data };
    });
  };
  const removeMonacoEditorsDataByPath = (path) => {
    setMonacoEditorsOptionsAndContentData((prevData) => {
      const newData = { ...prevData };
      delete newData[path];
      return newData;
    });
  };
  const updateMonacoEditorViewStateByPath = (path, newViewState) => {
    setMonacoEditorsOptionsAndContentData((prevData) => {
      return {
        ...prevData,
        [path]: { ...prevData[path], viewState: newViewState },
      };
    });
  };
  const updateMonacoEditorModelByPath = (path, newModel) => {
    setMonacoEditorsOptionsAndContentData((prevData) => {
      return {
        ...prevData,
        [path]: { ...prevData[path], model: newModel },
      };
    });
  };
  /* Monaco Editor Data and Functions ------------------------------------ */

  /* Vecoder Editor Data and Functions ============================================================== */
  const [
    vecoderEditorOptionsAndContentData,
    setVecoderEditorOptionsAndContentData,
  ] = useState(VECODER_EDITOR_DEFAULT_TEST_DATA);
  /* Vecoder Editor Data and Functions ============================================================== */

  return (
    <vecoderEditorContexts.Provider
      value={{
        monacoEditorsOptionsAndContentData,
        setMonacoEditorsOptionsAndContentData,
        accessMonacoEditorsDataByPath,
        updateMonacoEditorsDataByPath,
        appendMonacoEditorsDataByPath,
        removeMonacoEditorsDataByPath,
        updateMonacoEditorViewStateByPath,
        updateMonacoEditorModelByPath,
      }}
    >
      <StackStructure />
    </vecoderEditorContexts.Provider>
  );
};

export default VecoderEditorPage;
