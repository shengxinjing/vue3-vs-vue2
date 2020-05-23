<template>
      <tr>
        <td class="col-md-1">静态</td>
        <td class="col-md-1">静态</td>
        <td class="col-md-1">静态</td>
        <td class="col-md-1">静态</td>
        <td class="col-md-1">静态</td>
        <td class="col-md-1">静态</td>
        <td class="col-md-1">静态</td>
        <td class="col-md-1">静态</td>
        <td class="col-md-1">静态</td>
        <td class="col-md-1">静态</td>
        <td class="col-md-1">{{item.id}}</td>
        <td class="col-md-4">
            <a @click="$emit('select')">{{item.label}}</a>
        </td>
        <td class="col-md-1">
          <button @click="$emit('remove')">remove</button>
        </td>
      </tr> 
</template>

<script>
export default {
    props: ['item']
}
</script>
<style>

</style>