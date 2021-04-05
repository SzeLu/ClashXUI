<template>
  <div id="AuthWin">
    <div class="welcome" id="welcome" @click="authUser">
      {{ authBtnMsg }}
    </div>
  </div>
</template>

<script>
const ipcRenderer = window.require('electron').ipcRenderer

export default {
  name: 'AuthWin',
  data () {
    return {
      authBtnMsg: '欢迎'
    }
  },
  methods: {
    authUser: () => {
      ipcRenderer.send('letsMain')
    }
  },
  mounted () {
    // check clash started or not
  }
}
</script>
