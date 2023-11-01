const { app, BrowserWindow, dialog, Menu } = require('electron');
const fs = require('fs');
const path = require('path');

let win;
let tabs = [];
let activeTab = null;

function createWindow() {
    win = new BrowserWindow({ width: 1200, height: 800 });
    win.loadFile('index.html');

    const menuTemplate = [
        {
            label: 'File',
            submenu: [
                {
                    label: 'Open',
                    click: openFile
                }
            ]
        }
    ];

    const menu = Menu.buildFromTemplate(menuTemplate);
    Menu.setApplicationMenu(menu);

    addInitialTab();
}

app.whenReady().then(createWindow);

function addInitialTab() {
    const initialTab = document.createElement('li');
    initialTab.textContent = 'New File';
    initialTab.classList.add('tab');
    initialTab.setAttribute('data-filepath', '');
    initialTab.addEventListener('click', switchTab);

    document.getElementById('tabList').appendChild(initialTab);

    tabs.push({
        filePath: '',
        content: ''
    });

    setActiveTab(0);
}

// Rest of the functions remain unchanged...
