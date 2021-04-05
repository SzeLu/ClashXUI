const path = require('path')
const os = require('os')
const isDev = require('electron-is-dev')
const Config = require('../../package.json')

//platform
const platform = getPlatform()
//app
const AppName = Config.description
const appDir = path.join(os.homedir(), '.' + (isDev ? 'devivi' : 'danvivi'))
//status cache
const statusFile = 'statuses.json'

function getPlatform() {
    switch (process.platform) {
        case 'win32':
            return 'win'
        case 'linux':
            return 'linux'
        case 'darwin':
            return 'mac'
        default:
            return null
    }
}
const AppConst = {
    appName: AppName,
    appDir,
    statusFile,
    platform,
}

module.exports = AppConst
