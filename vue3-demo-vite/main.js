import { createApp,createStaticVNode } from 'vue'
import App from './App.vue'
import './index.css'
const ret = createStaticVNode('<tr><td class=\"col-md-1\"> kkb </td><td class=\"col-md-1\"> kkb </td><td class=\"col-md-1\"> kkb </td><td class=\"col-md-1\"> kkb </td><td class=\"col-md-1\"> kkb </td></tr>')

console.log(ret)
createApp(App).mount('#app')
