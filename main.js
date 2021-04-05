const path = require('path')
const glob = require('glob')
const { app, dialog, globalShortcut, ipcMain } = require('electron')
const AppTray = require('./electron/window/tray/AppTray')
const isDev = require('electron-is-dev')

//单例处理
if (app.requestSingleInstanceLock()) {
    app.on('second-instance', (event, argv, workingDir) => {
        dialog.showMessageBoxSync({
            title: '提示',
            message: '程序已启动,不再重复启动'
        })
    })
} else {
    app.quit()
}

function createWindow() {
    if (isDev) {
        //调试状态下, 强制从授权界面进入
        ipcMain.emit('letsAuth')
    } else {
        //获取当前用户
        ipcMain.emit('letsAuth')
    }
}

//任务栏图标
let appTray

function startApp() {
    appTray = new AppTray()
    createWindow()
}

app.on('ready', function () {
    preloadJS()

    startApp()

    globalShortcut.register('Control+Alt+.', () => {
        ipcMain.emit('showOrHideStatusWindow')
    })
})

// Quit when all windows are closed.
app.on('window-all-closed', function () {
    // On macOS it is common for applications and their menu bar
    // to stay active until the user quits explicitly with Cmd + Q
    if (process.platform !== 'darwin') app.quit()

    if (appTray) {
        appTray.appTray.destroy()
    }
})

app.on('activate', function () {
    // On macOS it's common to re-create a window in the app when the
    // dock icon is clicked and there are no other windows open.
    // startApp()
})

function preloadJS() {
    const files = glob.sync(path.join(__dirname, 'electron/preload/*.js'))
    files.forEach((file) => { require(file) })
}
