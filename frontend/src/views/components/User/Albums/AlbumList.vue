<template>

  <router-link
    :to="`${link}`"
    class="itemCard">
    <div
      class="itemCard-image">
      <img
        class="img"
        :src="`/api/${item.user_photo.src}/cover_${item.user_photo.image}`">
    </div>
    <div
      class="itemCard-body">
      <div
        class="itemCard-body__text">
        {{ item.title }}
      </div>
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
