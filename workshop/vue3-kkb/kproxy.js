
let activeEffect
// mini依赖中心
class Dep {
  constructor(){
    this.subs = new Set()
  }
  depend(){
    // 收集依赖
    if(activeEffect){
      this.subs.add(activeEffect)
    }
  }
  notofy(){
    // 数据变化，触发effect执行
    this.subs.forEach(effect=>effect())
  }
}
function effect(fn){
  activeEffect = fn
  fn()
}
const dep = new Dep() // vue3就变成一个大的map

// ref大概的原理 待会我们看代码
function ref(val){
  let _value = val
  // 拦截.value操作
  let state = {
    get value(){
      // 获取值，收集依赖 track
      dep.depend()
      return _value
    },
    set value(newCount){
      // 修改，通知dep，执行有这个依赖的effect函数
      _value = newCount
      // trigger
      dep.notofy()
    }
  }
  return state
}
const state = ref(0)

effect(()=>{
  // 这个函数内部，依赖state的变化
  console.log(state.value)
})

setInterval(()=>{
  state.value++
},1000)