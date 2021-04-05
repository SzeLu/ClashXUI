const { ipcMain, shell, BrowserWindow, Menu, app } = require('electron')
const AuthWin = require('../window/AuthWin')
const StatusWin = require('../window/StatusWin')
const ClashAPI = require('../sdk/ClashAPI')
const AppConst = require('../consts/AppConst')

ipcMain.handle('initConfig', async () => {
    return AppConst
})

ipcMain.on('appQuit', () => app.quit())

ipcMain.on('getProxies', () => {
    ClashAPI.getProxies()
})

ipcMain.on('getSpeed', () => {    
    ClashAPI.getSpeed()
})

ipcMain.on('stopSpeed', () => {    
    ClashAPI.stopSpeed()
})

ipcMain.on('letsAuth', () => {
    AuthWin.getInstance()
    StatusWin.destroy()
})

ipcMain.on('letsMain', () => {
    StatusWin.getInstance()
    AuthWin.destroy()
})
