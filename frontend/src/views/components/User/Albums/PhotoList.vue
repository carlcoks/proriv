<template>

  <router-link
    :to="`${link}`"
    class="itemCard">
    <div
      class="itemCard-image">
      <img
        class="img"
        :src="`/api/${item.src}/cover_${item.image}`">
    </div>
  </router-link>

</template>

<script>
export default {
  props: ['link', 'item']
}
</script>

<style lang="css">
</style>
