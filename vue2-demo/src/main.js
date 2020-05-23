import Vue from 'vue'
import App from './list/list.vue'

var s = window.performance.now()
console.profile('render')

let vm = new Vue({
  render: h => h(App),
}).$mount('#app')


setTimeout(function () {
  vm.time = window.performance.now() - s
  console.profileEnd('render')
}, 0)

