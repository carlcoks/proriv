<template>

  <div
    class="videouroki-list">

    <a
      v-if="admin"
      href="/add"
      title="Добавить курс"
      class="videouroki-list__item add-item"
      @click.prevent="CHANGE_ADD_KURS({ bg: true, modal: true })">
      <div
        class="add-item__btn">
        <img
          src="/img/icons/bigplus.png">
      </div>
      <div
        class="add-item__text">
        Добавить курс
      </div>
    </a>

    <router-link
      class="videouroki-list__item"
      v-for="(item, i) in data" :key="i"
      :to="`/user/${$route.params.id}/videouroki/kursi/${item.id}`">
      <div
        class="item-image item-kurs"
        :style="`background-image: url(/api/${item.src}/cover_${item.image})`">
      </div>
      <div
        class="item-about item-kurs">
        <div
          class="item-about__title">
          {{ item.title }}
        </div>
        <div
          class="item-about__price">
          {{ item.price }} руб.
        </div>
      </div>
    </router-link>

  </div>

</template>

<script>
import { mapMutations } from 'vuex';

export default {
  props: ['admin', 'data'],
  methods: {
    ...mapMutations('videouroki', ['CHANGE_ADD_KURS']),
  }
}
</script>

<style lang="css">
</style>
