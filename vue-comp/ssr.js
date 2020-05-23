module.exports ={
    template: `<div>
    <div v-for="n in 100">
    <ul>
      <li  class="app">喝水</li>
      <li  class="app">喝123</li>
      <li  class="app">喝123</li>
      <li  class="app">喝123</li>
      <li  class="app">喝123</li>
      <li  class="app">喝123</li>
      <li class="app" style="color:red" name="kkb"  v-for="todo in todos" >{{todo}}</li>
    </ul>
    </div>
    </div>`,
    data(){
      return {
        todos:['吃饭','睡觉']
      }
    }
  }