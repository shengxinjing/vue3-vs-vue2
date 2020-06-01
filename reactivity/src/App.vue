<template>
  <div id="demo">
    {{route.value}}
    <LocalStorage v-if="route.value == '#LocalStorage'"/>
    <Fragment v-if="route.value == '#Fragment'"/>
    <HTTPRequest v-if="route.value == '#HTTPRequest'"/>
    
  </div>
</template>

<script>
import LocalStorage from "./LocalStorage.vue"
import Fragment from "./Fragment.vue"
import HTTPRequest from "./HTTPRequest.vue"


import Hash from "./Hash.js"

export default {
  components: {
    LocalStorage, Fragment, HTTPRequest
  },
  data: () => ({
    route: Hash(),
  })

}
</script>

<style>

</style>
