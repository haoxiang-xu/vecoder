import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import UploadFile from "./PAGEs/upload_file/uploadfile";
import CodeEditorPage from "./PAGEs/code_editor/code_editor";
import DevelopmentEditor from "./PAGEs/development_editor/development_editor";
import ChatBox from "./COMPONENTs/chatBox/chatBox";
import Home from "./PAGEs/home/home";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/developmenteditor" element={<DevelopmentEditor />} />
        <Route path="/upload" element={<UploadFile />} />
        <Route path="/explorer" element={<Home />} />
        <Route path="/chat" element={<ChatBox />} />
        <Route path="/" element={<Home />} />
      </Routes>
    </Router>
  );
}

export default App;
