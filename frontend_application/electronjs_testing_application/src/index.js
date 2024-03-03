const { app, BrowserWindow, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs");

// Handle creating/removing shortcuts on Windows when installing/uninstalling.
if (require("electron-squirrel-startup")) {
  app.quit();
}
const createWindow = () => {
  // Create the browser window.
  const mainWindow = new BrowserWindow({
    width: 800,
    height: 600,
    webPreferences: {
      preload: path.join(__dirname, "preload.js"),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // and load the index.html of the app.
  //mainWindow.loadFile(path.join(__dirname, "index.html"));
  mainWindow.loadURL('http://localhost:5000');

  // Open the DevTools.
  mainWindow.webContents.openDevTools();
};
app.on("ready", createWindow);

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
app.on("activate", () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});

const readDir = async (dirPath) => {
  return new Promise((resolve, reject) => {
    fs.readdir(dirPath, { withFileTypes: true }, async (err, dirents) => {
      if (err) {
        reject(err);
      } else {
        try {
          const files = await Promise.all(
            dirents.map(async (dirent) => {
              const res = path.resolve(dirPath, dirent.name);
              if (dirent.isDirectory()) {
                return {
                  fileName: dirent.name,
                  filePath: res,
                  fileSize: fs.statSync(res).size + " bytes",
                  fileType: "folder",
                  fileExtname: path.extname(dirent.name),
                  subFiles: await readDir(res),
                };
              } else {
                return {
                  fileName: dirent.name,
                  filePath: res,
                  fileSize: fs.statSync(res).size + " bytes",
                  fileType: "file",
                  fileExtname: path.extname(dirent.name),
                };
              }
            })
          );
          resolve(files.flat());
        } catch (e) {
          reject(e);
        }
      }
    });
  });
};
ipcMain.on("open-directory-dialog", async (event) => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openDirectory"],
    });

    if (!result.canceled) {
      const dirPath = result.filePaths[0];
      const dirs = await readDir(dirPath);
      event.reply("directory-data", { dirs });
    }
  } catch (err) {
    event.reply("directory-data", { error: err.message });
  }
});
