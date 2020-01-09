import Vue from 'vue'
import './plugins/vuetify';
import App from './App.vue'
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css';

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
