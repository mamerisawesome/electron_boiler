import { app, BrowserWindow } from 'electron'
const locals = {}

let mainWindow

const createWindow = () => {
    // Create the browser window.
    mainWindow = new BrowserWindow({
        titleBarStyle: 'hidden',
        width: 800,
        height: 600,
    })

    mainWindow.setMenu(null)

    mainWindow.loadURL(`file://${__dirname}/../build/views/index.html`)

    // Emitted when the window is closed.
    mainWindow.on('closed', () => {
        mainWindow = null
    })

    // Disallow opening files on new window 
    mainWindow.webContents.on('new-window', function(e) {
        e.preventDefault();
    });

    // Disallow opening files on window navigation 
    mainWindow.webContents.on('will-navigate', function(e) {
        e.preventDefault();
    });

    // Disallow dev tools
    mainWindow.webContents.on("devtools-opened", () => {
        mainWindow.webContents.closeDevTools();
    });
}

app.on('ready', createWindow)

// Quit when all windows are closed.
app.on('window-all-closed', () => {
    if (process.platform !== 'darwin') {
        app.quit()
    }
})

app.on('activate', () => {
    if (mainWindow === null) {
        createWindow()
    }
})
