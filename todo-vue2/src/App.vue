<template>
  <div class="app">
    <input type="text" v-model="newTodo" @keyup.enter="addTodo" />
    <div>
      <input type="checkbox" v-model="allDone" /> Select All
      <ul>
        <li
          v-for="todo in todos"
          :key="todo.id"
          :class="{completed: todo.completed, editing: todo == editedTodo}"
        >
          <div class="view">
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
      <div>
        <span>
          <strong v-text="remaining"></strong>
          {{remaining}} left
        </span>
        <button @click="removeCompleted" v-show="todos.length > remaining">Clear completed</button>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
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
    };
  },

  // computed properties
  // http://vuejs.org/guide/computed.html
  computed: {
    remaining: function() {
      return this.todos.filter(todo => !todo.completed).length;
    },
    allDone: {
      get: function() {
        return this.remaining === 0;
      },
      set: function(value) {
        this.todos.forEach(function(todo) {
          todo.completed = value;
        });
      }
    }
  },

  // methods that implement data logic.
  // note there's no DOM manipulation here at all.
  methods: {
    addTodo: function() {
      var value = this.newTodo && this.newTodo.trim();
      if (!value) {
        return;
      }
      this.todos.push({
        id: this.todos.length + 1,
        title: value,
        completed: false
      });
      this.newTodo = "";
    },

    removeTodo: function(todo) {
      var index = this.todos.indexOf(todo);
      this.todos.splice(index, 1);
    },

    editTodo: function(todo) {
      this.beforeEditCache = todo.title;
      this.editedTodo = todo;
    },

    doneEdit: function(todo) {
      if (!this.editedTodo) {
        return;
      }
      this.editedTodo = null;
      todo.title = todo.title.trim();
      if (!todo.title) {
        this.removeTodo(todo);
      }
    },

    cancelEdit: function(todo) {
      this.editedTodo = null;
      todo.title = this.beforeEditCache;
    },

    removeCompleted: function() {
      this.todos = this.todos.filter(todo => todo.completed);
    }
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
