const http = require('http')
const { ipcMain } = require('electron')
const querystring = require('querystring')

const serverHost = 'localhost'
const serverPort = 9090

const ClashAPI = {

    getProxies: () => {
        let path = '/proxies'

        let opt = {
            hostname: serverHost,
            port: serverPort,
            path: path,
            method: 'GET'
        }

        let request = http.request(opt, (response) => {
            response.setEncoding('utf-8')

            let cache = ''

            response.on('data', (data) => {
                cache += data
            })

            response.on('end', () => {
                ipcMain.emit('sendMsg', 'getProxies')
                ipcMain.emit('recvProxies', cache)
            })
        });

        request.on('error', (e) => {
            ipcMain.emit('sendMsg', e.message)
        })

        request.end()
    },

    trafficOn: false,

    getSpeed: () => {
        let path = '/traffic'

        let opt = {
            hostname: serverHost,
            port: serverPort,
            path: path,
            method: 'GET'
        }

        this.trafficOn = true

        let request = http.request(opt, (response) => {
            response.setEncoding('utf-8')            

            response.on('data', (data) => {                                
                if (this.trafficOn) {                    
                    ipcMain.emit('trafficMsg', data)                    
                } else {
                    request.destroy()
                }
            })

            response.on('end', () => {
                console.log('traffic end')
            })
        });

        request.on('error', (e) => {
            ipcMain.emit('sendMsg', e.message)
        })

        request.end()
    },

    stopSpeed: () => {
        this.trafficOn = false
    }

}

module.exports = ClashAPI;