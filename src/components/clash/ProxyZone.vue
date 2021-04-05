<template>
  <div id="proxies" style="margin-top: 20px;">
    <el-collapse v-if="proxies" accordion v-loading="triedProxyCount != 0">
      <el-collapse-item v-for="proxy in proxies" :key="proxy.name">
        <template slot="title">
          {{ proxy.alias + "    ( " + proxy.now + " )" }}
          <el-tooltip class="item" content="测速" placement="top">
            <i
              v-if="proxy.speed"
              @click="testSpeed(proxy.channelList)"
              style="color: #409eff; font-size: 24px; margin-left: 20px; margin-top: 2px;"
              class="el-icon-refresh"
            />
          </el-tooltip>
        </template>
        <Channel v-for="channel in proxy.channelList" :key="channel.name" :proxy="proxy.target"
        :channel="channel" :ttl="TTL" :hasProgess="proxy.speed" @selectedChange="changeChannel"/>
      </el-collapse-item>
    </el-collapse>
  </div>
</template>

<script>
import axios from 'axios'
import Channel from './Channel'
const ipcRenderer = window.require('electron').ipcRenderer

export default {
  name: 'ProxyZone',
  components: { Channel },
  data () {
    return {
      TTL: 2000,
      proxies: [],
      noticeList: [
        {
          target: 'PROXY',
          alias: '代理策略',
          speed: true
        },
        {
          target: 'FINAL',
          alias: '兜底策略',
          speed: false
        },
        {
          target: 'Hijacking',
          alias: '劫持策略',
          speed: false
        }
      ],
      triedProxyCount: 0
    }
  },
  methods: {
    changeChannel (data) {
      for (let i = 0; i < this.proxies.length; i++) {
        let proxy = this.proxies[i]
        if (proxy.target === data.proxy) {
          proxy.now = data.channel
          break
        }
      }
    },
    testSpeed (channelList) {
      event.stopPropagation()
      if (this.triedProxyCount > 0) {
        return
      }

      this.triedProxyCount = 0
      channelList.forEach((channel) => {
        let testURL = `http://localhost:9090/proxies/${channel.name}/delay?timeout=${this.TTL}&url=https%3A%2F%2Fwww.google.com`
        axios.get(testURL).then(response => {
          this.triedProxyCount++
          channel.delay = response.data.delay
        }).catch(() => {
          this.triedProxyCount++
          channel.delay = this.TTL
        }).finally(() => {
          if (this.triedProxyCount === channelList.length) {
            channelList.sort((a, b) => { return a.delay - b.delay })
            this.triedProxyCount = 0
          }
        })
      })
    }
  },
  mounted () {
    ipcRenderer.on('recvProxies', (event, data) => {
      this.proxies = []

      let json = JSON.parse(data)
      if (json && json.proxies) {
        let proxyList = json.proxies

        this.noticeList.forEach((n) => {
          if (proxyList[n.target]) {
            let proxy = proxyList[n.target]
            let allChannel = proxy.all
            let channels = []
            allChannel.forEach(c => {
              channels.push({name: c, delay: 0})
            })
            proxy.all = null
            proxy.channelList = channels
            this.proxies.push(Object.assign(proxy, n))
          }
        })
      }
    })

    ipcRenderer.send('getProxies')
  }
}
</script>
