module.exports ={
    template: `<div>
    <div v-for="n in 1000">
    <ul >
      <li>kkb</li>
      <li>kkb</li>
      <li>kkb</li>
      <li>kkb</li>
      <li>kkb</li>
      <li>kkb</li>
      <li v-for="todo in todos" >{{n}}--{{todo}}</li>
    </ul>
    </div>
    </div>`,
    data(){
      return {
        todos:['吃饭','睡觉']
      }
    }
  }