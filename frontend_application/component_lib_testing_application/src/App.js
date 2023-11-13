import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./PAGEs/home/home";
import UploadFile from "./PAGEs/upload_file/uploadfile";
import CodeEditorPage from "./PAGEs/code_editor/code_editor";
import ContainerPage from "./PAGEs/container_page/ContainerPage";


import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/codeeditor" element={<CodeEditorPage />}></Route>
        <Route path="/container" element={<ContainerPage />} />
      </Routes>
    </Router>
  );
}

export default App;
