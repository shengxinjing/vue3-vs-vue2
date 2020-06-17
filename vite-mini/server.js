const fs = require('fs')
const path = require('path')
const Koa = require('koa')
const compilerSfc = require('@vue/compiler-sfc') // .vue
const compilerDom = require('@vue/compiler-dom') // 模板
// jsx解析
const app = new Koa()
function rewriteImport(content){
  return content.replace(/from ['|"]([^'"]+)['|"]/g, function(s0,s1){
    // console.log(s1)
    // . ../ /开头的，都是相对路径
    if(s1[0]!=='.'&& s1[1]!=='/'){
      return `from '/@modules/${s1}'`
    }else{
      return s0
    }
  })
}
app.use(async ctx=>{
  ctx.body = 'hello'
  const {request } = ctx
  const {url} = request
  if(url==='/'){
    ctx.type="text/html"
    ctx.body = fs.readFileSync('./index.html','utf-8')
  }else if(url.endsWith('.js')){
    // js我们需要做额外处理，所以不是简单的静态资源
    const p = path.resolve(__dirname,url.slice(1))
    ctx.type = 'application/javascript'
    const ret = fs.readFileSync(p,'utf-8')
    ctx.body = rewriteImport(ret)
    // 如果仕react 还需要解析jsx
  }else if(url.startsWith('/@modules/')){
    // 这是一个node_module李的东西
    const prefix = path.resolve(__dirname,'node_modules',url.replace('/@modules/',''))
    const module = require(prefix+'/package.json').module
    const p = path.resolve(prefix,module)
    const ret = fs.readFileSync(p,'utf-8')
    ctx.type = 'application/javascript'
    ctx.body = rewriteImport(ret)
  }else if(url.indexOf('.vue')>-1){
    // vue单文件组件
    const p = path.resolve(__dirname, url.split('?')[0].slice(1))
    const {descriptor} = compilerSfc.parse(fs.readFileSync(p,'utf-8'))

    if(!request.query.type){
      ctx.type = 'application/javascript'
      // 借用vue自导的compile框架 解析单文件组件，其实相当于vue-loader做的事情
      ctx.body = `
      // option组件
  const __script = ${descriptor.script.content.replace('export default ','').replace(/\n/g,'')}
  import { render as __render } from "${url}?type=template"
  __script.render = __render
  export default __script
      `
    }else if(request.query.type==='template'){
      // 模板内容
      const template = descriptor.template
      // 要在server端吧compiler做了
      const render = compilerDom.compile(template.content, {mode:"module"}).code
      ctx.type = 'application/javascript'

      ctx.body = rewriteImport(render)
    }

  }
})
// vite开发环境，build还是得webpack或者rollup
// 好处仕首页用刀啥，就import啥  天生的懒加载
// webpack是全量打包 放在内存

app.listen(3001, ()=>{
  console.log('success listen 3001')
})
// 原则： 简单粗暴，了解原理为上
// 1. 能够访问index.html