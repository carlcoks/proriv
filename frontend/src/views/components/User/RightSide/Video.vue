<template>

  <div
    class="sidecard videos">
    <div
      class="sidecard-title">
      Видеозаписи
    </div>
    <div
      class="sidecard-btns">
      <router-link
        :to="`/user/${$route.params.id}/videos`"
        class="btn addNew">
        Все видеозаписи
      </router-link>
    </div>
  </div>

</template>

<script>
export default {
}
</script>

<style lang="sass">
</style>
