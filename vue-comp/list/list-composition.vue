<template>
    <div>
    <h1>{{ items.length }} Components</h1>
    <p>{{ action }} took {{time}}ms.</p>
    <button @click="shuffle">shuffle</button>
    <button @click="add">add</button>
    <table class="table table-hover table-striped test-data">
        <row v-for="item in items" :key="item.id"
        :class="{ danger: item.id === selected }"
        :item="item"
        @select="select(item)"
        @remove="remove(item)">
        </row>
    </table>
    </div>
</template>

<script>
import _ from 'lodash'
import Row from './row.vue'
// import {} from 'vue'
var total = 1000
    var items = []
    for (var i = 0; i < total; i++) {
      items.push({
        id: i,
        label: String(Math.random()).slice(0, 5)
      })
    }
        function monitor (action, fn) {
            return  function(){
                var s = window.performance.now()
                fn.apply(this, arguments)
                this.$nextTick( ()=> {
                    this.action = action
                    this.time = window.performance.now() - s
                })
            }
        }


    export default{
        data(){
            return {
            total: total,
            time: 0,
            action: 'Render',
            items: items,
            selected: null
            }
        },
      methods: {

        shuffle: monitor('shuffle', function () {
          this.items = _.shuffle(this.items)
        }),
        add: monitor('add', function () {
          this.items.push({
            id: total++,
            label: String(Math.random()).slice(0, 5)
          })
        }),
        select: monitor('select', function (item) {
          this.selected = item.id
        }),
        remove: monitor('remove', function (item) {
          this.items.splice(this.items.indexOf(item), 1)
        })
      },
      components: {
          Row
      }
    }

</script>


