<template>
    {{remoteData.a}}
</template>
<script>
import HTTPRequest from "./HTTPRequest"
export default {
  data: () => ({
    remoteData:HTTPRequest("abc.json")
  })
}
</script>