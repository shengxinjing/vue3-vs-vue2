<template>
  <div id="app">
    <h1>X is {{x}} ,double is{{double}}</h1>
    <h1 @click="add">LSP {{count}}号 double is{{double}}</h1>
    <input type="text" v-model="val" @keyup.enter="addTodo">
    <ul>
      <li v-for="todo in todos" :key="todo.id">{{todo.title}}</li>
    </ul>
  </div>
</template>

<script>
import Counter from './counter'
import Mouse from './mouse'
export default {
  mixins:[Counter,Mouse],
  data(){
    return{
      val:'',
      todos:[ 
        {id:0, title:'吃饭', done:false},
        {id:1, title:'睡觉', done:false},
        {id:2, title:'lsp', done:false},
      ]
    }
  },
  methods:{
    addTodo(){
      this.todos.push({
        id:this.todos.length,
        title:this.val,
        done:false
      })
      this.val = ''
    }
  }
}
</script>