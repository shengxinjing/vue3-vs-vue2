const  STORAGE_KEY = 'todo-vue2'
export default {
  get: function () {
    var todos = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
    todos.forEach(function (todo, index) {
      todo.id = index
    })
    return todos
  },
  set: function (todos) {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(todos))
  }
}