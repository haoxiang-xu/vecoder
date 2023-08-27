import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./PAGEs/home/home";
import UploadFile from "./PAGEs/upload_file/uploadfile";

import "./App.css";

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/upload" element={<UploadFile />} />
      </Routes>
    </Router>
  );
}

export default App;
