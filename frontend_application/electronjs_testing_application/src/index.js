const { app, BrowserWindow, ipcMain, dialog, Menu } = require("electron");
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
  // mainWindow.loadFile(path.join(__dirname, "index.html"));

  // load React App
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
  const readDirectory = async (currentPath) => {
    return new Promise((resolve, reject) => {
      fs.readdir(currentPath, { withFileTypes: true }, async (err, dirents) => {
        if (err) {
          reject(err);
        } else {
          try {
            const files = await Promise.all(
              dirents.map(async (dirent) => {
                const res = path.resolve(currentPath, dirent.name);
                if (dirent.isDirectory()) {
                  return {
                    fileName: dirent.name,
                    fileType: "folder",
                    filePath: res,
                    fileSize: fs.statSync(res).size + " bytes",
                    fileExtname: path.extname(dirent.name),
                    fileExpend: false,
                    files: await readDirectory(res),
                  };
                } else {
                  return {
                    fileName: dirent.name,
                    fileType: "file",
                    filePath: res,
                    fileSize: fs.statSync(res).size + " bytes",
                    fileExtname: path.extname(dirent.name),
                    fileExpend: false,
                    files: [],
                  };
                }
              })
            );
            resolve(files);
          } catch (e) {
            reject(e);
          }
        }
      });
    });
  };

  // Read the top-level directory and return it as the root of the tree
  const topLevelFiles = await readDirectory(dirPath);
  return {
    fileName: path.basename(dirPath),
    fileType: "folder",
    filePath: dirPath,
    fileSize: fs.statSync(dirPath).size + " bytes",
    fileExtname: path.extname(dirPath),
    fileExpend: true,
    files: topLevelFiles
  };
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

const readFile = async (filePath) => {
  try {
    const content = fs.readFileSync(filePath, "utf-8");
    return content;
  } catch (err) {
    return err.message;
  }
};

ipcMain.on("open-file-dialog", async (event) => {
  try {
    const result = await dialog.showOpenDialog({
      properties: ["openFile"],
      filters: [
        {
          name: "Text Files",
          extensions: [
            "js", "jsx", "ts",
            "tsx", "json", "html",
            "css", "c", "cpp",
            "h", "cs", "java",
            "py", "rb", "php",
            "swift", "go", "rs",
            "lua", "sh","ps1",
            "md", "xml", "yml",
            "yaml",
          ],
        },
        { name: "All Files", extensions: ["*"] },
      ],
    });

    if (!result.canceled) {
      const filePath = result.filePaths[0];
      const content = await readFile(filePath);
      event.reply("file-data", { content });
    }
  } catch (err) {
    event.reply("file-data", { error: err.message });
  }
});

const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Open File",
        click: async (menuItem, browserWindow) => {
          const result = await dialog.showOpenDialog({
            properties: ["openFile"],
            filters: [{ name: "All Files", extensions: ["*"] }],
          });

          if (!result.canceled) {
            browserWindow.webContents.send("open-file", result.filePaths[0]);
          }
        },
      },
      {
        label: "Open Folder",
        click: async (menuItem, browserWindow) => {
          try {
            const result = await dialog.showOpenDialog({properties: ['openDirectory']});

            if (!result.canceled) {
              const dirPath = result.filePaths[0];
              const dirs = await readDir(dirPath);
              browserWindow.webContents.send('directory-data', { dirs });
              console.log(dirs);
            }
          } catch (err) {
            browserWindow.webContents.send('directory-data', { error: err.message });
          }
        }
      },
    ],
  },
];

const menu = Menu.buildFromTemplate(menuTemplate);
Menu.setApplicationMenu(menu);
