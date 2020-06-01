<template>
  <section class="todoapp">

    <div class="modal" v-if="x<10||y<10"></div>
      <header class="header" :class="{fixed:top>130}">
        <h1>Vue3 todos</h1>
        <input class="new-todo"
          placeholder="What needs to be done?"
          v-model="newTodo"
          @keyup.enter="addTodo">
      </header>
      <section class="main" v-show="todos.length" v-cloak>
        <input class="toggle-all" type="checkbox" v-model="allDone">
        <ul class="todo-list">
          <li v-for="todo in todos"
            class="todo"
            :key="todo.id"
            :class="{ completed: todo.completed, editing: todo == editedTodo }">
            <div class="view">
              <input class="toggle" type="checkbox" v-model="todo.completed">
              <label @dblclick="editTodo(todo)">{{ todo.title }}</label>
              <button class="destroy" @click="removeTodo(todo)"></button>
            </div>
            <input class="edit" type="text"
              v-model="todo.title"
              v-todo-focus="todo == editedTodo"
              @blur="doneEdit(todo)"
              @keyup.enter="doneEdit(todo)"
              @keyup.esc="cancelEdit(todo)">
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
import { reactive, computed, toRefs ,ref} from "vue"
import useAddRemove from './addRemove'
import useMousePosition from "./mouse"
import useScroll from "./scroll"
import storage from './local'
export default {
  setup() {
    const { x, y } = useMousePosition();
    const {top} = useScroll()
    const state = storage('todo-vue3',{
    // const state = reactive({
      todos: [
        {
          id: "1",
          title: "吃饭",
          completed: false
        },
        {
          id: "2",
          title: "睡觉",
          completed: false
        }
      ],
      newTodo: "",
      editedTodo: null
    });
    const {addTodo,removeTodo} = useAddRemove(state)

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


    function editTodo(todo) {
      state.beforeEditCache = todo.title;
      state.editedTodo = todo;
    }

    function doneEdit(todo) {
      if (!state.editedTodo) {
        return;
      }
      state.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        state.removeTodo(todo);
      }
    }

    function cancelEdit(todo) {
      state.editedTodo = null;
      todo.title = state.beforeEditCache;
    }

    function removeCompleted() {
      state.todos = state.todos.filter(todo => todo.completed);
    }

    return {
      ...toRefs(state),
	  remaining,allDone,
	  addTodo, removeTodo,editTodo,doneEdit,cancelEdit,removeCompleted,
      x, y,top
    };
  },
  directives: {
    "todo-focus": function(el, binding) {
      if (binding.value) {
        el.focus();
      }
    }
  }
};
</script>

<style>
.modal{
  position:fixed;
  top:0;
  left:0;
  bottom:0;
  right:0;
  background: rgba(0,0,0,0.7);
  z-index:1000;
}
.new-todo{
  background:#eee;
}
.header.fixed{
  position: fixed;
  top:0;
  left:0;
  right:0;
  width:100%;
  z-index:100;
}
.completed label {
  text-decoration: line-through;
}

li .edit {
  display: none;
}
li .view {
  display: block;
}
li.editing .edit {
  display: block;
}

li.editing .view {
  display: none;
}
</style>
