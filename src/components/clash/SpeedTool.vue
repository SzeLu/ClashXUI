<template>
  <div id="speed" style="margin-top: 20px">
    <div id="trafficChart" style="height: 200px"></div>
    <div style="margin-top: 10px; margin-left: 30%;">
      显示流量：
      <el-switch v-model="isOpen" @change="switchChange"></el-switch>
    </div>
  </div>
</template>

<script>
import TrafficChartOption from '../../assets/config/TrafficChartOption.json'
const ipcRenderer = window.require('electron').ipcRenderer

export default {
  name: 'SpeedTool',
  data () {
    return {
      trafficChart: null,
      timestamp: [],
      download: [],
      upload: [],
      isOpen: false
    }
  },
  methods: {
    drawSpeedChart () {
      let option = TrafficChartOption

      option.xAxis[0].data = this.timestamp
      option.series[0].data = this.download
      option.series[1].data = this.upload

      this.trafficChart.setOption(option)
    },
    switchChange (value) {
      if (value) {
        this.$emit('startSpeed')
      } else {
        this.$emit('stopSpeed')
      }
    }
  },
  mounted () {
    this.trafficChart = this.$echarts.init(document.getElementById('trafficChart'))

    ipcRenderer.on('recTrafficMsg', (evnet, msg) => {
      if (!this.isOpen) {
        this.isOpen = true
      }
      let data = JSON.parse(msg)
      if (data) {
        if (this.timestamp.length > 180) {
          this.timestamp.shift()
          this.download.shift()
          this.upload.shift()
        }

        let up = data.up ? data.up : 0
        let down = data.down ? data.down : 0

        let now = new Date()
        this.timestamp.push(`${now.getHours().toString()}:${now.getMinutes().toString()}:${now.getSeconds().toString()}`)
        this.download.push(Math.round(down / 1024))
        this.upload.push(Math.round(up / 1024))

        this.drawSpeedChart()
      }
    })

    this.drawSpeedChart()
  }
}
</script>
