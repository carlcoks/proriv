<template>

  <section
    class="pt-80">

    <div
      class="wr">

      <breadcrumbs
        :breads="[{ name: 'Поиск тренеров' }]" />

      <div
        class="treners">

        <filter-block />

        <div
          class="treners-block">
          <div
            class="treners-block__title">
            Найти тренера
          </div>
          <div
            class="treners-block__sort">

          </div>

          <div
            class="treners-block__list">

            <trener-card
              v-for="(item, i) in treners" :key="i"
              :item="item" />

          </div>

        </div>

      </div>

    </div>

  </section>

</template>

<script>
import { mapState } from 'vuex';

import Breadcrumbs from '@/components/Breadcrumbs';
import FilterBlock from './components/Treners/Filter';
import TrenerCard from '@/components/Cards/TrenerCard';

export default {
  asyncData ({ store, route }) {
    return store.dispatch('treners/getTreners');
  },
  components: {
    Breadcrumbs,
    FilterBlock,
    TrenerCard,
  },
  computed: {
    ...mapState('treners', ['treners']),
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/treners.sass'
</style>
