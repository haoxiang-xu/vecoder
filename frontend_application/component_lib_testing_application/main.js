const { app, BrowserWindow, Menu, ipcMain, dialog } = require("electron");
const path = require("path");
const fs = require("fs/promises");

let mainWindow;
const menuTemplate = [
  {
    label: "File",
    submenu: [
      {
        label: "Open Folder",
        click: () => {
          openFolderDialog(); // This function now has access to `mainWindow`
        },
      },
      { type: "separator" },
      { role: "quit" },
    ],
  },
  // Other menu items...
];
const createWindow = () => {
  // Initialize the browser window.
  mainWindow = new BrowserWindow({
    width: 800,
    height: 800,
    webPreferences: {
      preload:
        "K:\\GIT\\vecoder\\frontend_application\\component_lib_testing_application\\preload.js",
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  console.log(path.join(__dirname, "preload.js"));

  // Load the index.html of the app.
  mainWindow.loadURL("http://localhost:3000");

  // Set up the application menu
  const menu = Menu.buildFromTemplate(menuTemplate);
  Menu.setApplicationMenu(menu);

  // Optionally open the DevTools.
  mainWindow.webContents.openDevTools();
};

const openFolderDialog = () => {
  dialog
    .showOpenDialog({
      properties: ["openDirectory"],
    })
    .then((result) => {
      if (!result.canceled) {
        readDir(result.filePaths[0], result.filePaths[0])
          .then((dirs) => {
            console.log(result.filePaths[0]);
            const rootFolder = result.filePaths[0]
              .replace(/\\/g, "/")
              .split("/")
              .pop();
            const opendFolder = {
              fileName: rootFolder,
              filePath: rootFolder,
              fileSize: "0 bytes",
              fileType: "folder",
              fileExtname: path.extname(rootFolder),
              files: dirs,
              fileExpanded: true,
            };
            mainWindow.webContents.send("directory-data", opendFolder);
          })
          .catch((err) => {
            console.error("Error reading directory:", err);
          });
      }
    })
    .catch((err) => {
      console.error(err);
    });
};
const readDir = async (dirPath, rootPath = dirPath) => {
  try {
    const dirents = await fs.readdir(dirPath, { withFileTypes: true });
    const files = await Promise.all(
      dirents.map(async (dirent) => {
        const res = path.resolve(dirPath, dirent.name);
        const normalizedResPath = res.replace(/\\/g, "/");
        const normalizedRootPath = rootPath.replace(/\\/g, "/");
        const rootFolder = normalizedRootPath.split("/").pop();
        const relPath =
          rootFolder +
          "/" +
          normalizedResPath
            .substring(normalizedRootPath.length)
            .replace(/^\/|\\/, ""); // Ensure the leading slash is removed

        const stats = await fs.stat(res); // Use asynchronous stat

        if (dirent.isDirectory()) {
          return {
            fileName: dirent.name,
            filePath: relPath,
            fileSize: stats.size + " bytes",
            fileType: "folder",
            fileExtname: path.extname(dirent.name),
            files: await readDir(res, rootPath), // Pass the original rootPath for correct relative paths
            fileExpanded: false,
          };
        } else {
          return {
            fileName: dirent.name,
            filePath: relPath,
            fileSize: stats.size + " bytes",
            fileType: "file",
            fileExtname: path.extname(dirent.name),
            files: [],
            fileExpanded: false,
          };
        }
      })
    );
    return files.flat();
  } catch (e) {
    throw e; // Rethrow the error to be caught by the caller
  }
};

app.on("ready", createWindow);
app.on("activate", () => {
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow();
  }
});
app.on("window-all-closed", () => {
  if (process.platform !== "darwin") {
    app.quit();
  }
});
