<template>
<section class="todoapp">
  <header class="header" :class="{fixed:top>130}">

    <h1>{{x}},{{y}}</h1>
    <input class="new-todo"
      placeholder="想干的事"
      v-model="newTodo"
      @keyup.enter="addTodo">
  </header>
  <section class="main" v-show="todos.length">
    <input id="toggle-all" class="toggle-all" type="checkbox" v-model="allDone">
    <label for="toggle-all">Mark all as complete</label>
    <ul class="todo-list">
      <li v-for="todo in todos"
        class="todo"
        :key="todo.id"
        :class="{ completed: todo.completed }"
        >
        <div class="view">
          <input class="toggle" type="checkbox" v-model="todo.completed" >

          <label>{{ todo.title }}</label>
          <button class="destroy" @click="removeTodo(todo)"></button>
        </div>
      </li>
    </ul>
  </section>
  <footer class="footer" v-show="todos.length" v-cloak>
    <span class="todo-count">
      <strong>{{ remaining }}</strong>  left
    </span>
    <button class="clear-completed" @click="removeCompleted" v-show="todos.length > remaining">
      Clear completed
    </button>
  </footer>
</section>
</template>

<script>
import {ref,reactive,toRefs,computed} from 'vue'
import useScroll from './scroll'
import useMouse from './mouse'
export default {
  setup(){
    const state = reactive({
      newTodo:'',
      todos: [
        { id: "1", title: "吃饭", completed: false },
        { id: "2", title: "睡觉", completed: false },
        { id: "3", title: "学习vue3", completed: false },
        { id: "4", title: "写文章", completed: false },
        { id: "5", title: "看动画", completed: false },
        { id: "6", title: "逛知乎", completed: false },
        { id: "7", title: "撸狗", completed: false },
        { id: "8", title: "摸鱼", completed: true },
      ],
    })
    function addTodo(){
      var value = state.newTodo && state.newTodo.trim()
      if (!value) {
        return
      }
      state.todos.push({
        id: state.todos.length + 1,
        title: value,
        completed: false
      })
      state.newTodo = ""
    }

    const remaining = computed(
      () => state.todos.filter(todo => !todo.completed).length
    );
    const allDone = computed({
      get: function() {
        return remaining.value === 0;
      },
      set: function(value) {
        state.todos.forEach(function(todo) {
          todo.completed = value;
        });
      }
    });
    function removeCompleted() {
      state.todos = state.todos.filter(todo => !todo.completed);
    }
    const {top} = useScroll()
    const {x,y} = useMouse()
    return {
      ...toRefs(state),remaining,allDone,top,
      x,y,top,
      addTodo,removeCompleted
    }
  }
}
</script>


<style>
.header.fixed{
  background: #fff;
  position: fixed;
  top:0;
  left:0;
  right:0;
  width:100%;
  z-index:100;
}
</style>