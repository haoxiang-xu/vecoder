import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./PAGEs/home/home";
import UploadFile from "./PAGEs/upload_file/uploadfile";
import CodeEditorPage from "./PAGEs/code_editor/code_editor";
import DevelopmentEditor from "./PAGEs/development_editor/development_editor";

import CustomizeRequestForm from './PAGEs/customize_request_form/customize_request_form';

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<DevelopmentEditor />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/codeeditor" element={<CodeEditorPage />} />
        <Route path="/explorer" element={<Home />} />
        <Route path="/customize" element={<CustomizeRequestForm />} />

      </Routes>
    </Router>
  );
}

export default App;
