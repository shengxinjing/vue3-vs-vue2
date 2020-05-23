const vue2Compile= require('vue-template-compiler')
const vue3Compile= require('@vue/compiler-ssr')
const fs = require('fs')
const ssr = require('./ssr')

// console.log(comp)
fs.writeFileSync('ssr/ssr2.js',`module.exports = {
    ${ssr.data.toString()},
    render(){${vue2Compile.compile(ssr.template).render}}
}`)


console.log(vue3Compile.compile(ssr.template))
fs.writeFileSync('ssr/ssr3.js',`module.exports = {
    ${ssr.data.toString()},
    ssrRender(){${vue3Compile.compile(ssr.template).code}}
}`)






