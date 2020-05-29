<template>
  <div id="demo">
    <h1>Color Picker</h1>
    <div class="color" :style="`background-color:rgb(${r}, ${g}, ${b})`">
    </div>
    <br/>
    Red:<input type="range" from="0" to="255" v-model="r" /><br/>
    Green:<input type="range" from="0" to="255" v-model="g" /><br/>
    Blue:<input type="range" from="0" to="255" v-model="b" /><br/>
  </div>
</template>

<script>
const API_URL = `https://api.github.com/repos/vuejs/vue-next/commits?per_page=3&sha=`

export default {
  data: () => ({
    r:1,
    g:1,
    b:1
  })
}
</script>

<style>
  #demo {
    font-family: 'Helvetica', Arial, sans-serif;
  }
  .color {
    width:100px;
    height:100px;
  }
</style>
