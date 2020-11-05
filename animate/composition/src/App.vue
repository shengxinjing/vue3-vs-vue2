<template>
  <div id="app">
    <h1>X is {{x}} ,double is{{doubleX}}</h1>
    <h1 @click="add">LSP {{count}}号 double is{{double}}</h1>
    <input type="text" v-model="val" @keyup.enter="addTodo">
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{todo.title}}</li>
    </ul>
  </div>
</template>

<script setup>
import useCounter from './counter'
import useMouse from './mouse'
import useTodo from './todos'

let { val, todos, addTodo } = useTodo()
export {val, todos, addTodo}

let {count,double,add} = useCounter()
export {count,double,add}

let {x, double:doubleX} = useMouse()
export {x,doubleX}

// export default {
//   setup(){
//     let { val, todos, addTodo } = useTodo()
//     // let {count,double,add} = useCounter() 
//     // let {x, double:doubleX} = useMouse()
//     return {
//       val, todos, addTodo,
//       count,double,add,
//       x,doubleX
//     }
//   }
// }
</script>
