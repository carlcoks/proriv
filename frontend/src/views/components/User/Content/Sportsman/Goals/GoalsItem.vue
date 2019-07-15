<template>

  <router-link
    :to="`/user/${$route.params.id}/goals/${item.id}`">
    <div
      class="number">
      {{ i + 1}}.
    </div>
    <div
      class="text">
      {{ item.title }}
    </div>
  </router-link>

</template>

<script>
export default {
  props: ['item', 'i'],
}
</script>

<style lang="css">
</style>
