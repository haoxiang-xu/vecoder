import React, { useState, useEffect, useRef, useContext } from "react";
import { ICON_MANAGER } from "../../ICONs/icon_manager";
import "./headerMenuBar.css";

/* Load ICON manager --------------------------------------------------------------------------------- */
let FILE_TYPE_ICON_MANAGER = {
  default: {
    ICON: null,
    LABEL_COLOR: "#C8C8C8",
  },
};
try {
  FILE_TYPE_ICON_MANAGER = ICON_MANAGER().FILE_TYPE_ICON_MANAGER;
} catch (e) {
  console.log(e);
}
let SYSTEM_ICON_MANAGER = {
  default: {
    ICON: null,
    LABEL_COLOR: "#C8C8C8",
  },
};
try {
  SYSTEM_ICON_MANAGER = ICON_MANAGER().SYSTEM_ICON_MANAGER;
} catch (e) {
  console.log(e);
}
/* Load ICON manager --------------------------------------------------------------------------------- */

const HeaderMenuBar = ({
  platform,
  isMenuBarHovered,
  setIsMenuBarHovered,
  cursorPosition,
}) => {
  const handleMenuBarOnHover = () => {
    setIsMenuBarHovered(true);
  };
  const handleClose = () => {
    window.electron.send("window-control", "close");
  };
  const handleMinimize = () => {
    window.electron.send("window-control", "minimize");
  };
  const handleMaximize = () => {
    window.electron.send("window-control", "maximize");
  };
  useEffect(() => {
    if (cursorPosition.y > 50) {
      setIsMenuBarHovered(false);
    }
    if (cursorPosition.y < 20) {
      setIsMenuBarHovered(true);
    }
  }, [cursorPosition]);
  const renderMenuBar = () => {
    switch (platform) {
      case "darwin":
        return (
          <div className="header_menu_bar_container0316">
            <img
              src={SYSTEM_ICON_MANAGER.macosMinimize.ICON512}
              className="header_menu_bar_darwin_minimize_icon0316"
              style={{ opacity: isMenuBarHovered ? 1 : 0 }}
              onClick={handleMinimize}
              draggable="false"
              alt="close"
            />
            <img
              src={SYSTEM_ICON_MANAGER.macosMaximize.ICON512}
              className="header_menu_bar_darwin_maximize_icon0316"
              style={{ opacity: isMenuBarHovered ? 1 : 0 }}
              onClick={handleMaximize}
              draggable="false"
              alt="close"
            />
            <img
              src={SYSTEM_ICON_MANAGER.macosClose.ICON512}
              className="header_menu_bar_darwin_close_icon0316"
              style={{ opacity: isMenuBarHovered ? 1 : 0 }}
              onClick={handleClose}
              draggable="false"
              alt="close"
            />
            <div>
              <div
                className="header_menu_bar_darwin_file_button0316"
                style={{ opacity: isMenuBarHovered ? 1 : 0 }}
              >
                File
              </div>
            </div>
            <div
              className="header_menu_bar_darwin_container_dragging_area0316"
              style={{ height: isMenuBarHovered ? "40px" : "12px" }}
              onMouseOver={handleMenuBarOnHover}
            ></div>
          </div>
        );
      case "win32":
        return (
          <div className="header_menu_bar_container0316">
            <img
              src={SYSTEM_ICON_MANAGER.minimize.ICON512}
              className="header_menu_bar_minimize_icon0316"
              style={{ opacity: isMenuBarHovered ? 0.72 : 0 }}
              onClick={handleMinimize}
              draggable="false"
              alt="close"
            />
            <img
              src={SYSTEM_ICON_MANAGER.maximize.ICON512}
              className="header_menu_bar_maximize_icon0316"
              style={{ opacity: isMenuBarHovered ? 0.72 : 0 }}
              onClick={handleMaximize}
              draggable="false"
              alt="close"
            />
            <img
              src={SYSTEM_ICON_MANAGER.close.ICON512}
              className="header_menu_bar_close_icon0316"
              style={{ opacity: isMenuBarHovered ? 0.72 : 0 }}
              onClick={handleClose}
              draggable="false"
              alt="close"
            />
            <div>
              <div
                className="header_menu_bar_file_button0316"
                style={{ opacity: isMenuBarHovered ? 1 : 0 }}
              >
                File
              </div>
            </div>
            <div
              className="header_menu_bar_container_dragging_area0316"
              style={{ height: isMenuBarHovered ? "40px" : "12px" }}
              onMouseOver={handleMenuBarOnHover}
            ></div>
          </div>
        );
      default:
        return null;
    }
  };
  return renderMenuBar();
};

export default HeaderMenuBar;
