const fs = require('fs')
const https = require('https')
const path = require('path')

const download = (url, savePath, fileName) => {
    if (!fs.existsSync(savePath)) {
        fs.mkdirSync(savePath, { recursive: true })
    }

    if (fs.existsSync(savePath)) {
        let request = https.get(url, (response) => {
            response.pipe(fs.createWriteStream(path.join(savePath, fileName)))

            response.on('end', () => {
                console.debug(`文件 ${fileName} 下载完毕`)
            })
        })

        request.on('error', (e) => {
            console.debug(`文件 ${fileName} 下载异常: ${e.message}`)
        })
    } else {
        console.debug(`文件夹 ${savePath} 不存在`)
    }
}

module.exports = WebAPI = {
    download
}