import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import '@mdi/font/css/materialdesignicons.css'

Vue.config.productionTip = false

new Vue({
  render: h => h(App)
}).$mount('#app')
