import Vue from "vue";
import App from "./App.vue";
import VueRouter from 'vue-router'
import 'echarts'
Vue.use(VueRouter)
Vue.config.productionTip = false;
import router from './router/index'
import 'element-ui/lib/theme-chalk/index.css'
import './plugins/element-ui'
import './assets/font/iconfont.css'
import VueECharts from 'vue-echarts'
Vue.component('v-chart', VueECharts)
new Vue({
  render: (h) => h(App),
  router
}).$mount("#app");
