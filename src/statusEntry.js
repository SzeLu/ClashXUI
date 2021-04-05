import Vue from 'vue'
import { Button, ButtonGroup, Collapse, CollapseItem, Loading, Progress, Switch, Tooltip } from 'element-ui'
import 'element-ui/lib/theme-chalk/index.css'

import StatusEntry from './StatusEntry.vue'
import './assets/less/status.less'

import * as echarts from 'echarts'

Vue.use(Button)
Vue.use(ButtonGroup)
Vue.use(Collapse)
Vue.use(CollapseItem)
Vue.use(Loading)
Vue.use(Progress)
Vue.use(Tooltip)
Vue.use(Switch)

Vue.prototype.$echarts = echarts

Vue.config.productionTip = false

/* eslint-disable no-new */
new Vue({
  el: '#app',
  render: h => h(StatusEntry)
})
