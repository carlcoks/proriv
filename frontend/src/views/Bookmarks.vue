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

        <transition-group
          tag="div"
          name="slideMove"
          class="bookmarks-content">

          <trener-card
            v-for="(item, i) in bookmarks" :key="item.id"
            :item="item.user"
            :bookmark="true"
            @bookmark="bookmark($event, i)" />

        </transition-group>

      </div>

    </div>

  </section>

</template>

<script>
import { mapState, mapActions } from 'vuex';

import Breadcrumbs from '@/components/Breadcrumbs';
import TrenerCard from '@/components/Cards/TrenerCard';

export default {
  asyncData ({ store, route }) {
    return store.dispatch('bookmarks/getBookmarks');
  },
  components: {
    Breadcrumbs,
    TrenerCard,
  },
  computed: {
    ...mapState('bookmarks', ['bookmarks']),
  },
  methods: {
    ...mapActions('bookmarks', ['deleteBookmark']),

    bookmark(data, num) {
      const array = {
        bookmark_user: data.id,
        num: num,
      };
      this.deleteBookmark(array);
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/bookmarks.sass'
</style>
