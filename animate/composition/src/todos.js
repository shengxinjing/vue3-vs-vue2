import { reactive, ref } from 'vue'

export default function useTodo() {
  let val = ref('')
  let todos = reactive([
    { id: 0, title: '吃饭', done: false },
    { id: 1, title: '睡觉', done: false },
    { id: 2, title: 'lsp', done: false },
  ])
  function addTodo() {
    todos.push({
      id: todos.length,
      title: val.value,
      done: false
    })
    val.value = ''
  }
  return { val,todos, addTodo}
}