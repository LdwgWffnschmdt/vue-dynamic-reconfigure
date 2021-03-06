import Vue from 'vue'
import App from './App.vue'
import './plugins/vuetify';
import '@babel/polyfill'
import 'roboto-fontface/css/roboto/roboto-fontface.css'
import 'material-design-icons-iconfont/dist/material-design-icons.css';

new Vue({
  render: h => h(App)
}).$mount('#app')
