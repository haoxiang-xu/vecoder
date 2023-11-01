const { app, BrowserWindow } = require('electron');

function createWindow() {
    // Create the browser window
    const win = new BrowserWindow({
        width: 900,
        height: 800,
        minHeight: 650,
        minWidth: 600,
        frame: false,
        webPreferences: {
            nodeIntegration: true
        }
    });
    // Load the index.html of the app
    win.loadFile('index.html');
    // Open the DevTools
    win.webContents.openDevTools();
    // Emitted when the window is closed

}

app.whenReady().then(createWindow);
