<template>
  <h1>大家好 kkb欢迎你</h1>
  <h2>
    <span>count is {{count}}</span>
    <button @click="count++">戳我</button>
  </h2>
</template>

<script>
export default {
  data:()=>({count:0})
}
</script>