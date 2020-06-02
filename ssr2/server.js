const express = require('express')
const app = express()
const vueapp = require('vue-comp/ssr')
const Vue = require('vue')
const renderer2 = require('vue-server-renderer').createRenderer()
const vue2Compile= require('vue-template-compiler')

vueapp.render = new Function(vue2Compile.ssrCompile(vueapp.template).render)


app.get('/',async function(req,res){

    let vapp = new Vue(vueapp)
    let html = await renderer2.renderToString(vapp)
    res.send(`<h1>vue2</h1>`+html)
})

app.listen(9092,()=>{
    console.log('listen 9092')
})
