import React, { useState, useEffect, useRef, useContext } from "react";
import VecoderEditorPage from "../vecoder_editor_page/vecoder_editor_page";
import HeaderMenuBar from "../../COMPONENTs/headerMenuBar/headerMenuBar";
import "./main.css";

const Main = () => {
  const [isMenuBarHovered, setIsMenuBarHovered] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const handleMouseMove = (event) => {
    setCursorPosition({
      x: event.clientX,
      y: event.clientY,
    });
  };
  const [platform, setPlatform] = useState("");
  useEffect(() => {
    setPlatform(window.osInfo.platform);
  }, []);
  return (
    <div className="main_container0315" onMouseMove={handleMouseMove}>
      <HeaderMenuBar
        platform={platform}
        isMenuBarHovered={isMenuBarHovered}
        setIsMenuBarHovered={setIsMenuBarHovered}
        cursorPosition={cursorPosition}
      />
      <div
        className="major_content_container0316"
        style={{ top: isMenuBarHovered ? "29px" : "0px" }}
      >
        <VecoderEditorPage />
      </div>
    </div>
  );
};

export default Main;
