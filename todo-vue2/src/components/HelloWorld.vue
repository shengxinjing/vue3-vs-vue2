<template>
  <div class="hello">
    <h1>{{ name }}</h1>
    <hr>
    <h1>{{ type }}</h1>
        <hr>
    <h1>{{ age }}</h1>
  </div>
</template>

<script>
export default {
  name: 'HelloWorld',
  props:['name','type','age','type:age'],
  mounted(){
    console.log(this['type:age'])
  }
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped>
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
</style>
