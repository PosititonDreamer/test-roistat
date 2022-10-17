import Vue from 'vue'
import App from './App.vue'
import router from './router'
import store from './store'
import VueMask from 'v-mask'
import people from "@/components/people/people";
Vue.use(VueMask)
Vue.component('people', people)
Vue.config.productionTip = false

new Vue({
  router,
  store,
  render: h => h(App)
}).$mount('#app')
