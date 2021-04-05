const AppConst = require('../consts/AppConst')
const fs = require('fs')

//检查相关配置目录
let appDir = AppConst.appDir
if (!fs.existsSync(appDir)) {
    //递归创建目录
    fs.mkdirSync(appDir, { recursive: true });
}
