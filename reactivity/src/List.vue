<template>
    <div>
      <span>{{list[0].name}}</span>
    </div>
    <self v-if="this.$props.list.length > 1" :list="this.$props.list.slice(1)"/>
</template>
<script>

let component = {
  components: {
    
  },
  props: [
    "list"
  ]
}

component.components.self = component;
export default component;
</script>