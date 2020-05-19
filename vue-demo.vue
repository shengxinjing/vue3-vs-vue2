<template>
<div>
  <ul>
    <li v-for="todo in todos">
      {{todo}}
    </li>
  </ul>
</div>
</template>

<script>
export default {
  data() {
    return {
      todos:['吃饭','睡觉']
    };
  }
};
</script>

<style>
</style>