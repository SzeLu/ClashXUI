const { ipcMain, BrowserWindow } = require('electron')
const path = require('path')
const isDev = require('electron-is-dev')

const AuthWin = (() => {
    let _instance = null

    class _module {
        constructor() {
            this.window = new BrowserWindow({
                width: 500,
                height: 180,
                resizable: false,
                frame: false,   //无边框
                transparent: true,
                webPreferences: {
                    nodeIntegration: true
                }
            })

            if (isDev) {
                this.window.loadURL('http://localhost:8080/AuthWin.html')
                // this.window.webContents.openDevTools({ mode: 'detach' })
            } else {
                let filePath = path.join(__dirname, '../../dist/AuthWin.html')
                this.window.loadFile(filePath)
            }
        }

        close() {
            if (this.window) {
                this.window.close()
            }
        }
    }

    return {
        getInstance: () => {
            if (!_instance) {
                _instance = new _module()
            }

            return _instance
        },

        destroy: () => {
            if (_instance) {
                _instance.close()
                _instance = null
            }
        }
    }
})()

module.exports = AuthWin
