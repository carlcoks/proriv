<template>

  <section
    class="pt-80 bg-fon">

    <div
      class="wr">

      <breadcrumbs
        :breads="[{ name: 'Закладки' }]" />

      <div
        class="bookmarks">

        <h1
          class="bookmarks-title">
          Закладки
        </h1>

        <div
          class="bookmarks-filter">
          <div
            class="bookmarks-filter__line w50">
            <label
              for="user"
              class="label">
              Имя и фамилия пользователя
            </label>
            <div
              class="input">
              <input
                type="text"
                class="inpt"
                id="user">
            </div>
          </div>
          <div
            class="bookmarks-filter__line">
            <label
              for="city"
              class="label">
              Город
            </label>
            <div
              class="input">
              <input
                type="text"
                class="inpt"
                id="city">
            </div>
          </div>
          <div
            class="bookmarks-filter__line">
            <label
              for="sport"
              class="label">
              Вид спорта
            </label>
            <div
              class="input">
              <input
                type="text"
                class="inpt"
                id="sport">
            </div>
          </div>
        </div>

        <div
          class="bookmarks-content">

          <trener-card
            v-for="(item, i) in treners" :key="i"
            :item="item" />

        </div>

      </div>

    </div>

  </section>

</template>

<script>
import Breadcrumbs from '@/components/Breadcrumbs';
import TrenerCard from '@/components/Cards/TrenerCard';

export default {
  components: {
    Breadcrumbs,
    TrenerCard,
  },
  data() {
    return {
      treners: [],
    }
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/bookmarks.sass'
</style>
