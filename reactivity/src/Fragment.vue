<template>
    <List :list="data" />
</template>
<script>
import List from "./List.vue";

export default {
  components:{
    List:List
  },
  data: () => ({
    data:[
      {"name":"winter"},
      {"name":"summer"},
      {"name":"autumn"}
    ]
  })
}
</script>