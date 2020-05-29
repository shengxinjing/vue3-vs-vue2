<template>
    <div>
    <h1>vue3 perf</h1>
    <h1>{{ items.length }} Components</h1>
    <p>{{ action }} took {{time}}ms.</p>
    <button @click="shuffle">shuffle</button>
    <table class="table table-hover table-striped test-data">
      <tr v-for="item in items" :key="item.id">
        <td class="col-md-1" >kkb</td>
        <td class="col-md-1" >kkb</td>
        <td class="col-md-1" >kkb</td>
        <td class="col-md-1" >kkb</td>
        <td class="col-md-1" >kkb</td>
        <td class="col-md-1" >kkb</td>
        <td class="col-md-1" @click="()=>item.label=2" v-for="action in actions" :key="action">
          {{action}} --  {{item.label}}
        </td>
      </tr> 
    </table>
    </div>
</template>

<script>
import {shuffle} from 'lodash'

var total = 1000
var items = []
for (var i = 0; i < total; i++) {
  items.push({
    id: i,
    label: String(Math.random()).slice(0, 5)
  })
}

let s = window.performance.now()
export default{
    data(){
        return {
        total: total,
        time: 0,
        action: 'Render',
        items: items,
        selected: null,
        actions:['删除','更新']

        }
    },
    mounted(){
        this.time = window.performance.now() - s
    },
  methods: {

    shuffle(){
      this.action = 'shuffle'
      this.items = shuffle(this.items)
      let s = window.performance.now()

      this.$nextTick(()=>{
        this.time = window.performance.now() - s
      })
    }
  },
  components: {
  }
}

</script>


