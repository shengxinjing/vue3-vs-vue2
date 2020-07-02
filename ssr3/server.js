const express = require('express')
const app = express()
const vueapp = require('vue-comp/ssr')
const Vue = require('vue') // vue@next
const renderer3 = require('@vue/server-renderer')
const vue3Compile= require('@vue/compiler-ssr')
vueapp.ssrRender = new Function('require',vue3Compile.compile(vueapp.template).code)(require)

app.get('/',async function(req,res){
    let vapp = Vue.createApp(vueapp)
    let html = await renderer3.renderToString(vapp)
    res.send(`<h1>vue3</h1>`+html)
})

app.listen(9093,()=>{
    console.log('listen 9093')
}) 



web组招聘需求
训练营一月4次+奖学金班人数越来越多，外加上后面核心讲师要分出精力研究标准和开源，需要招聘讲师和逐渐

讲师5位
助教9位（每次训练营大概需要2~3位助教， 20期开班需要3个助教，21期只会需求量更大）