<template>
  <div id="winTitle">
    <span style="color:#080808;top:7px;position:fixed;">{{appName}}</span>

    <i class="opt-img el-icon-circle-close" @click="close"/>
    <i class="opt-img el-icon-remove-outline" @click="hide"/>
    <i class="opt-img el-icon-refresh" @click="refresh"/>
  </div>
</template>

<script>
import '../../assets/less/win-title.less'
const ipcRenderer = window.require('electron').ipcRenderer

export default {
  name: 'WinTitle',
  methods: {
    close () {
      ipcRenderer.send('appQuit')
    },
    hide () {
      ipcRenderer.send('hideStatusWindow')
    },
    refresh () {
      // ipcRenderer.send('getProxies')
      ipcRenderer.send('getSpeed')
    }
  },
  props: ['appName']
}
</script>
