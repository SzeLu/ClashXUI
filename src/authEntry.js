import Vue from 'vue'

import AuthEntry from './AuthEntry.vue'
import './assets/less/auth.less'

/* eslint-disable no-new */
new Vue({
  el: '#AuthWin',
  render: h => h(AuthEntry)
})
