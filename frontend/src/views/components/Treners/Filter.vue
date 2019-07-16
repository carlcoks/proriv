<template>

  <div
    class="treners-filter">
    <div
      class="treners-filter__title">
      Настройки поиска
    </div>
    <div
      class="treners-filter__block">
      <div
        class="treners-filter__block-line">
        <label
          for="name"
          class="label">
          Имя и фамилия тренера
        </label>
        <input
          type="text"
          id="name"
          v-model.trim="name"
          class="inpt">
      </div>
      <div
        class="treners-filter__block-line"
        @mouseleave="showSport = false">
        <label
          for="sport"
          class="label">
          Вид спорта
        </label>
        <div
          class="treners-filter__block-line__input">
          <input
            type="text"
            id="sport"
            v-model.trim="sport"
            @focus="showSport = true"
            @input="showSport = true"
            @click="showSport = true"
            @change=""
            class="inpt" />
          <div
            v-if="showSport"
            class="filter-over">
            <div
              class="filter-list">
              <div
                class="filter-list__item"
                v-for="(item, i) in filterAllsport" :key="i"
                @click.prevent="setSport(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="treners-filter__block">
      <div
        class="treners-filter__block-line">
        <label
          for="country"
          class="label">
          Страна
        </label>
        <input
          type="text"
          id="country"
          v-model.trim="country"
          class="inpt">
      </div>
      <div
        class="treners-filter__block-line">
        <label
          for="city"
          class="label">
          Город
        </label>
        <input
          type="text"
          id="city"
          v-model.trim="city"
          class="inpt">
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  data() {
    return {
      showSport: false,
      name: '',
      sport: '',
      country: '',
      city: '',
    }
  },
  computed: {
    ...mapState(['allsport', 'countries', 'cities']),

    filterAllsport() {
      const allSport = this.allsport.slice();

      return allSport.filter(item => {
        if (this.sport != '')
          return item.name.indexOf(this.sport) > -1;

        return item;
      })
    },
  },
  watch: {
    sport(data) {
      if (data == '')
        this.SET_FILTER({ sport: '' })
    }
  },
  methods: {
    ...mapMutations('treners', ['SET_FILTER']),

    setSport(item) {
      const { name, id } = item;
      this.sport = name;
      this.showSport = false;
      this.SET_FILTER({ sport: id });
    },
  }
}
</script>

<style lang="css">
</style>
