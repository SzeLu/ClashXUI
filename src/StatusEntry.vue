<template>
  <div id="mainWindow">
    <WinTitle :appName='appName'/>
    <div id="content">
      <SpeedTool @startSpeed="startSpeed" @stopSpeed="stopSpeed"/>
      <ProxyZone/>
    </div>
  </div>
</template>

<script>
import WinTitle from './components/window/WinTitle'
import SpeedTool from './components/clash/SpeedTool'
import ProxyZone from './components/clash/ProxyZone'
const ipcRenderer = window.require('electron').ipcRenderer

export default {
  name: 'StatusWin',
  components: { WinTitle, SpeedTool, ProxyZone },
  data () {
    return {
      pageOffset: 0,
      appName: 'ClashXUI'
    }
  },
  methods: {
    startSpeed: () => {
      ipcRenderer.send('getSpeed')
    },
    stopSpeed: () => {
      ipcRenderer.send('stopSpeed')
    }
  },
  mounted () {
    ipcRenderer.on('windowResize', (event, message) => {
      if (message && Number(message)) {
        document.body.style.height = (message - 25) + 'px'
      }
    })
  }
}

</script>
