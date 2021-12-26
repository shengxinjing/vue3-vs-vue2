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
