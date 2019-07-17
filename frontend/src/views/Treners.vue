<template>

  <section
    class="pt-80 bg-fon">

    <div
      class="wr">

      <breadcrumbs
        :breads="[{ name: 'Поиск тренеров' }]" />

      <div
        class="treners">

        <filter-block />

        <div
          class="treners-block">
          <h1
            class="treners-block__title">
            Найти тренера
          </h1>

          <sort-block />

          <transition-group
            tag="div"
            name="slideMove"
            class="treners-block__list">

            <trener-card
              v-for="(item, i) in filterTreners" :key="item.id"
              :item="item"
              @bookmark="bookmark($event, i)" />

          </transition-group>

        </div>

      </div>

    </div>

  </section>

</template>

<script>
import { mapState, mapActions } from 'vuex';

import Breadcrumbs from '@/components/Breadcrumbs';
import FilterBlock from './components/Treners/Filter';
import SortBlock from './components/Treners/Sort';
import TrenerCard from '@/components/Cards/TrenerCard';

export default {
  name: 'treners',
  asyncData ({ store, route }) {
    return store.dispatch('treners/getTreners');
  },
  components: {
    Breadcrumbs,
    FilterBlock,
    SortBlock,
    TrenerCard,
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('treners', ['treners', 'sort', 'filter']),
    filterTreners() {
      let treners = Object.cloneDeep(this.treners);

      treners = treners.filter(item => {

        if (this.filter.name != '') {
          const fullName = item.firstname + ' ' + item.lastname;
          if (fullName.indexOf(this.filter.name) > -1)
            return item
          else
            return
        }

        if (this.filter.sport != '') {
          if (item.user_info) {
            let dopsport = item.user_info.dop_sport;
            let sport = dopsport.split(',');
            sport.push(item.user_info.main_sport);

            if (sport.indexOf(this.filter.sport.toString()) > -1)
              return item;
            else
              return
          } else
            return
        }

        return item;

      })

      if (this.sort) {

        if (this.sort.name == 'name') {
          if (this.sort.order == 'asc')
            return treners.sort(this.sortByNameAsc);
          else if (this.sort.order == 'desc')
            return treners.sort(this.sortByNameDesc);
        } else if (this.sort.name == 'date') {
          if (this.sort.order == 'asc')
            return treners.sort(this.sortByDateAsc);
          else if (this.sort.order == 'desc')
            return treners.sort(this.sortByDateDesc);
        }

      }

      return treners;

    }
  },
  methods: {
    ...mapActions('treners', ['addBookmark', 'deleteBookmark']),

    bookmark(data, num) {
      if (this.user.user_id) {
        const array = {
          bookmark_user: data.id,
          num: num,
        };
        if (data.type == 'add')
          this.addBookmark(array);
        else if (data.type == 'delete')
          this.deleteBookmark(array);
      }
    },

    sortByNameAsc(d1, d2) {
      return (d1.firstname.toLowerCase() > d2.firstname.toLowerCase()) ? 1 : -1;
    },

    sortByNameDesc(d1, d2) {
      return (d1.firstname.toLowerCase() < d2.firstname.toLowerCase()) ? 1 : -1;
    },

    sortByDateAsc(d1, d2) {
      return (d1.date_created > d2.date_created) ? 1 : -1;
    },

    sortByDateDesc(d1, d2) {
      return (d1.date_created < d2.date_created) ? 1 : -1;
    },
  },
}
</script>

<style lang="sass">
  @import '@/styles/pages/treners.sass'
</style>
