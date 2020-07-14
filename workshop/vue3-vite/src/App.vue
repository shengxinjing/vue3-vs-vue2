<template>
<div>
  <div :class="{fixed:top>100}">

  <input 
    type="text" 
    v-model="state.newTodo"
    @keyup.enter="addNewTodo"

  >
  </div>

  <ul>
    <li :key="todo.id" v-for="todo in state.todos">{{todo.title}}</li>
  </ul>
</div>

</template>

<script>
// state数据，进入本地存储
import {reactive,ref,computed,onMounted,watchEffect} from 'vue'
import useScroll from './components/scroll'
// 上面这个写法，很好的支持和tree-shaking
// proxy
export default{
  setup(){
    // 滚动的时候，input框悬浮
    // reactive把对象变成响应式
    const state = reactive({
      newTodo:'',
      todos:[
        {id:'1',title:'吃西瓜',computed:false},
        {id:'2',title:'吃麻辣烫',computed:false},
        {id:'3',title:'学习vue3',computed:false},
        {id:'4',title:'学习vue3',computed:false},
        {id:'5',title:'学习vue3',computed:false},
        {id:'6',title:'学习vue3',computed:false},
        {id:'7',title:'学习vue3',computed:false},
        {id:'8',title:'学习vue3',computed:false},
        {id:'9',title:'学习vue3',computed:false},
      ]
    })
    function addNewTodo(){
      const val = state.newTodo 
      if(!val){ 
        return 
      }
      state.todos.push({
        id:state.todos.length+1,
        title:val,
        computed:false
      })
      state.newTodo = ''
    }
    // watchEffect(()=>{
    //   console.log('state is',state.todos)
    // })
    const {top} = useScroll()
    return {state, addNewTodo,top}
  }
}

// 下面，reactivity的源码实现
// 新增滚动fixed功能

// export default{
//   data(){
//     return {
//       name:'kkb'
//     }
//   },
//   setup(){
//     const {count,double,add} = useCount(1)
//     // const data = xx
//     return {count,double,add}
//   }
// }




// 可以单独拆成文件 取代vue2的mixin
// // 由于生命周期， 
// function useCount(init){
//     let count = ref(init)
//     function add(){
//       count.value++
//     }
//     const double = computed(()=>count.value*2)
//     onMounted(()=>{
//       console.log('mounted')
//     })
//     watchEffect(()=>{
//       console.log('count is ',count.value)
//     })
//     // const data = xx
//     return {count,double,add}
// }
</script>
<style>
li{
  height:100px;
}
.fixed{
  position: fixed;
  top:20px;
  left:20px;
}
</style>
