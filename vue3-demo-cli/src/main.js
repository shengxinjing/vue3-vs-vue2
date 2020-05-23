

import {createApp} from 'vue'
import App from './App.vue'
var s = window.performance.now()
console.profile('render')

let vm = createApp(App).mount('#app')

