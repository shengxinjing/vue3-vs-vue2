<template>
<div @click="setName('vue3真棒')" :pos="[10,10,300,300]" fill="#eee">
    <h1 :pos="[20,20,200,100]" fill="red" color="#000">累加器{{count}}</h1>
    <span :pos="pos" fill="black" >哈喽{{name}}</span>
</div>

</template>

<script>

import {ref} from 'vue'
export default {
  setup(){
    const name = ref('kkb')
    const pos = ref([20,120,200,100])
    const count = ref(1)
    const setName = (n)=>{
      name.value = n
      pos.value[1]+=20
      count.value+=2
    }

    return {
      name,
      setName,
      pos,
      count
    }
  }
}
</script>


