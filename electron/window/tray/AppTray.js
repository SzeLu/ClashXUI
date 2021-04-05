const { app, ipcMain, Tray, Menu } = require('electron')
const path = require('path')
const AppConst = require('../../consts/AppConst')

class AppTray {
    static loaded = false

    constructor() {
        if (!AppTray.loaded) {
            const iconPath = path.join(__dirname, AppConst.platform == 'mac' ? '../image/App16.png' : '../image/App32.png')

            this.appTray = new Tray(iconPath)

            const menu = Menu.buildFromTemplate([
                {
                    label: '显示',
                    click: () => {
                        ipcMain.emit('showStatusWindow')
                    }
                },
                {
                    type: 'separator'
                },
                {
                    label: '退出',
                    click: () => {
                        app.quit()
                    }
                }
            ])

            this.appTray.setToolTip(AppConst.appName)
            this.appTray.setContextMenu(menu)

            this.appTray.on('double-click', () => {
                ipcMain.emit('showStatusWindow')
            })

            AppTray.loaded = true
        }
    }

}

module.exports = AppTray
