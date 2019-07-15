<template>

  <div
    class="resume-block">

    <div
      class="resume-block__title">
      Цели
      <router-link
        :to="`/user/${$route.params.id}/goals`"
        class="btn addNew">
        Смотреть все
      </router-link>
    </div>

    <div
      class="goalslist">

      <goals-item
        class="goalslist-item"
        v-for="(item, i) in data" :key="i"
        :item="item"
        :i="i" />

    </div>

  </div>

</template>

<script>
import GoalsItem from '../Goals/GoalsItem';

export default {
  props: ['data'],
  components: {
    GoalsItem,
  },
}
</script>

<style lang="css">
</style>
