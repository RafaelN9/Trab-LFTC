const { app, remote, BrowserWindow, Menu, ipcMain, ipcRenderer } = require('electron')
const path = require('path')

// Enable live reload for all the files inside your project directory
require('electron-reload')(__dirname);



const mainMenuTemplate = [
    {
        label: 'Dev',
        submenu: [
            {
                role: 'toggleDevTools'
            },
            {
                role: 'reload'
            }
        ]

    },
    {
        label: "Seletor",
        submenu: [
            {
                label: "Regex",
                click: () => {
                    windowSelector('regex')
                }
            },
            {
                label: "Grammar",
                click: () => {
                    windowSelector('grammar')
                }
            },
            {
                label: "Finite Automata",
                click: () => {
                    windowSelector('finite')
                }
            },
        ]
    },
    {
        label: 'Edit',
        submenu: [
            { role: 'undo' },
            { role: 'redo' },
            { type: 'separator' },
            { role: 'cut' },
            { role: 'copy' },
            { role: 'paste' },
        ]
    }
]

const createWindow = () => {
    const win = new BrowserWindow({
        width: 800,
        height: 600,
        minWidth: 600,
        minHeight: 400,
        webPreferences: {
            preload: path.join(__dirname, 'preload.js'),
        },
    })
    const mainMenu = Menu.buildFromTemplate(mainMenuTemplate)
    Menu.setApplicationMenu(mainMenu)

    win.loadFile('regex/index.html')
    //win.webContents.openDevTools()
}

const windowSelector = (selector) => {
    BrowserWindow.getAllWindows()[0].loadFile(selector + "/index.html")
}

app.whenReady().then(() => {
    createWindow()
})