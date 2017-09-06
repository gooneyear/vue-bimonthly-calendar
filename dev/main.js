import Vue from 'vue'
import App from './App.vue'

import vueBimonthlyCalendar from '../src/'
// import vueEventCalendar from '../dist'
// import '../dist/style.css'
Vue.use(vueBimonthlyCalendar, {locale: 'zh'})

new Vue({
  el: '#app',
  render: h => h(App)
})
