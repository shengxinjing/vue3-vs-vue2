const express = require('express')
const app = express()
const vueapp = require('vue-comp/ssr')
const Vue = require('vue') // vue@next
const renderer3 = require('@vue/server-renderer')
const vue3Compile= require('@vue/compiler-ssr')

const start = async function(){
    // template=>render 
    const fn = new Function('require',vue3Compile.compile(vueapp.template).code)(require)
    vueapp.ssrRender = fn

    app.get('/',async function(req,res){
        // console.time('ssr3')
        // let vapp
        // let html
        // for (let i = 0; i < 100; i++) {
        //     vapp = Vue.createApp(vueapp)
        //     html = await renderer3.renderToString(vapp)
        // }
        // console.timeEnd('ssr3')
        let vapp = Vue.createApp(vueapp)
        let html = await renderer3.renderToString(vapp)
        res.send(`<h1>vue3</h1>`+html)
    })
    
    app.listen(9093,()=>{
        console.log('listen 9093')
    }) 
}
start()
