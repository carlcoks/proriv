<template>

  <div
    class="itemCard hover-desc">
    <div
      class="itemCard-image">
      <img
        class="img"
        :src="`/api/${item.src}/cover_${item.image}`">
    </div>
    <div
      class="itemCard-body">
      <div
        class="itemCard-body__text">
        {{ item.title }}
      </div>
    </div>
    <div
      class="itemCard-description">
      {{ item.description }}
    </div>
  </div>

</template>

<script>
export default {
  props: ['item']
}
</script>

<style lang="css">
</style>
