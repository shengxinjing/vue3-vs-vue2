<template>
  <div>
    <h1>{{x}},{{y}}</h1>

    <input type="text" v-model="newTodo" @keyup.enter="addTodo" />
    <div>
      <input type="checkbox" v-model="allDone" />
      <ul v-if="x<500">
        <li
          v-for="todo in todos"
          :key="todo.id"
          :class="{completed: todo.completed, editing: todo == editedTodo}"
		  
        >
          <div class="view" >
            <input type="checkbox" v-model="todo.completed" />
            <label @dblclick="editTodo(todo)">{{todo.title}}</label>
            <button @click="removeTodo(todo)">X</button>
          </div>
          <input
            class="edit"
            type="text"
            v-model="todo.title"
            v-todo-focus="todo == editedTodo"
            @blur="doneEdit(todo)"
            @keyup.enter="doneEdit(todo)"
            @keyup.esc="cancelEdit(todo)"
          />
        </li>
      </ul>
      <!-- <div>
		<span>
			<strong v-text="remaining"></strong> {{remaining}} left
		</span>
		<button @click="removeCompleted" v-show="todos.length > remaining">
			Clear completed
		</button>
      </div>-->
    </div>
  </div>
</template>

<script>
import { reactive, computed, toRefs } from "vue";
import useMousePosition from "./mouse";

export default {
  setup() {
    const { x, y } = useMousePosition();
    const state = reactive({
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
      newTodo: "123",
      editedTodo: null
    });
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

    function addTodo() {
      var value = state.newTodo && state.newTodo.trim();
      if (!value) {
        return;
      }
      state.todos.push({
        id: state.todos.length + 1,
        title: value,
        completed: false
      });
      state.newTodo = "";
    }
    function removeTodo(todo) {
      var index = state.todos.indexOf(todo);
      state.todos.splice(index, 1);
    }
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
      x, y
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
