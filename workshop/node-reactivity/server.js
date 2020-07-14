const {ref, computed,effect} = require('@vue/reactivity')

let count = ref(1)
setInterval(()=>{
  count.value++
},1000)
// let double = computed(()=> count.value*2)
effect(()=>{
  console.log('count is',count.value)
})

// composition = @vue/reactivity + 生命周期