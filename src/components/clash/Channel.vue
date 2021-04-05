<template>
  <div class="light-line" @click="click">
    {{ channel.name }}
    <el-progress v-if="hasProgess" :text-inside="true" :stroke-width="16" style="margin: 10px;"
      :percentage="percentage" :format="delayFormat" :color="colors"></el-progress>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  name: 'Channel',
  data () {
    return {
      percentage: 0,
      colors: [
        {color: '#67C23A', percentage: 20},
        {color: '#409EFF', percentage: 50},
        {color: '#F56C6C', percentage: 100}
      ]
    }
  },
  methods: {
    delayFormat () {
      if (this.hasProgess) {
        if (this.channel.delay !== this.ttl) {
          this.percentage = this.channel.delay / this.ttl * 100
          return `${this.channel.delay} ms`
        } else {
          this.percentage = 100
          return '超时'
        }
      } else {
        return ''
      }
    },
    click () {
      let url = `http://localhost:9090/proxies/${this.proxy}`
      axios.put(url, { name: this.channel.name }).then(response => {
        if (response.status === 204) {
          let data = {
            channel: this.channel.name,
            proxy: this.proxy
          }
          this.$emit('selectedChange', data)
        }
      }).catch(() => {
        // do nothing
      }).finally(() => {
        // do nothing
      })
    }
  },
  props: ['proxy', 'channel', 'ttl', 'hasProgess']
}
</script>
