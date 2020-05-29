<template>
    <div>
      <span>{{list[0].value}}</span>
    </div>
    <self v-if="this.$props.tree.left" :list="this.$props.tree.left"/>
    <self v-if="this.$props.tree.right" :list="this.$props.tree.right"/>
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