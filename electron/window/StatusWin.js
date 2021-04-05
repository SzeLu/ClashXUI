const { BrowserWindow, ipcMain } = require('electron')
const AppConst = require('../consts/AppConst')
const path = require('path')

const isDev = require('electron-is-dev')

const StatusWin = (() => {
    let _instance = null

    let resize = (window) => {
        if (window) {
            let size = window.getSize()
            if (size && size.length > 1) {
                window.webContents.send('windowResize', size[1])
            }
        }
    }

    class _module {
        constructor() {
            // Create the browser window.
            let winConfig = {
                height: 880,
                minHeight: 880,
                width: 460,
                minWidth: 460,
                maxWidth: 460,
                frame: false,
                show: false,
                alwaysOnTop: true,
                webPreferences: {
                    nodeIntegration: true
                },
                transparent: true,
            }

            this.window = new BrowserWindow(winConfig)
            //debug
            if (isDev) {
                this.window.webContents.openDevTools({ mode: 'detach' })
                this.window.loadURL('http://localhost:8080/StatusWin.html')
            } else {
                let filePath = path.join(__dirname, '../../dist/StatusWin.html')
                this.window.loadFile(filePath)
            }
            //在任务栏中隐藏
            this.window.setSkipTaskbar(true)
            this.window.on('ready-to-show', () => {
                resize(this.window)
                this.window.show()
            })
            this.window.on('resize', () => {
                resize(this.window)
            })
            if (AppConst.platform === 'mac') {
                this.window.on('moved', () => {
                    //
                })
            } else {
                this.window.on('move', () => {
                    //
                })
            }
            this.window.on('close', () => {
                //窗体关闭            
            })

            ipcMain.on('showStatusWindow', () => {
                if (this.window) {
                    this.window.show()
                }
            })
            ipcMain.on('hideStatusWindow', () => {
                if (this.window) {
                    this.window.hide()
                }
            })
            ipcMain.on('closeStatusWindow', () => {
                if (this.window) {
                    this.window.close()
                }
            })
            ipcMain.on('showOrHideStatusWindow', () => {
                if (this.window) {
                    if (this.window.isVisible()) {
                        this.window.hide()
                    }
                    else {
                        this.window.show()
                    }
                }
            })
            ipcMain.on('trafficMsg', (data) => {                
                if (this.window) {
                    this.window.webContents.send('recTrafficMsg', data)
                }
            })
            ipcMain.on('recvProxies', (data) => {
                if (this.window) {
                    this.window.webContents.send('recvProxies', data)
                }
            })
        }

        close() {
            ipcMain.removeAllListeners('showStatusWindow')
            ipcMain.removeAllListeners('hideStatusWindow')
            ipcMain.removeAllListeners('closeStatusWindow')
            ipcMain.removeAllListeners('showOrHideStatusWindow')
            ipcMain.removeAllListeners('sendMsg')
            ipcMain.removeAllListeners('trafficMsg')
            ipcMain.removeAllListeners('recvProxies')

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

module.exports = StatusWin
