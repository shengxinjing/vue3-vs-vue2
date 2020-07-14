
const effectStack = []
let targetMap = new WeakMap() // 存储所有reactive，所有key对应的依赖
// {
//   target1:{
//     key: [effect]
//   }
// }


function track(target,key){
  // 收集依赖
  // reactive可能又多个，一个又有N各属性key
  const effect = effectStack[effectStack.length-1]
  if(effect){
    let depMap = targetMap.get(target)
    if(!depMap){
      depMap = new Map()
      targetMap.set(target, depMap)
    }
    let dep = depMap.get(key)
    if(!dep){
      dep = new Set()
      depMap.set(key,dep)
    }
    // 添加依赖
    dep.add(effect)
    effect.deps.push(dep)
  }
}

function trigger(target,key,info){
  // 触发更新
  let depMap = targetMap.get(target)
  if(!depMap){
    return 
  }
  const effects = new Set()
  const computedRunners = new Set()

  if(key){
    let deps = depMap.get(key)
    deps.forEach(effect=>{
      if(effect.computed){
        computedRunners.add(effect)
      }else{
        effects.add(effect)
      }
    })
  }
  computedRunners.forEach(computed=>computed())
  effects.forEach(effect=>effect())
}

function effect(fn,options={}){
  // {lazy:false,computed:false}
  // 副作用
  // computed是一个特殊的effect
  let e = createReactiveEffect(fn,options)

  if(!options.lazy){
    // lazy决定是不是首次就执行effect
    e()
  }
  return e
}

const baseHandler = {
  get(target,key){
    const res = target[key] // reflect更合理的
    // 收集依赖
    track(target,key)
    return res
  },
  set(target,key,val){
    const info = {oldValue:target[key], newValue:val}
    target[key] = val // Reflect.set
    // 触发更新
    trigger(target,key,info)
  }
}
function reactive(target){
  // target变成响应式
  const observerd = new Proxy(target,baseHandler)
  return observerd
}

function createReactiveEffect(fn,options){
  const effect = function effect(...args){
    return run(effect,fn,args)
  }
  // 为了后续清理 以及缓存
  effect.deps = []
  effect.computed = options.computed
  effect.lazy = options.lazy
  return effect
}
function run(effect,fn,args){
  if(effectStack.indexOf(effect)===-1){
    try{
      effectStack.push(effect)
      return fn(...args)
    }finally{
      effectStack.pop()
    }
  }
}
function computed(fn){
  // 特殊的effect
  const runner = effect(fn, {computed:true,lazy:true})
  return{
    effect:runner,
    get value(){
      return runner()
    }
  }
}