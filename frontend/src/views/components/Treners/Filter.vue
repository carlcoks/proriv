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
          @input="changeName"
          :value="filter.name"
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
            @input="showSport = true"
            @click="showSport = true"
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
        class="treners-filter__block-line"
        @mouseleave="showCountry = false">
        <label
          for="country"
          class="label">
          Страна
        </label>
        <div
          class="treners-filter__block-line__input">
          <input
            type="text"
            id="country"
            v-model.trim="country.name"
            @input="changeCountry"
            @click="changeCountry"
            class="inpt" />
          <div
            v-if="showCountry"
            class="filter-over">
            <div
              class="filter-list">
              <div
                class="filter-list__item"
                v-for="(item, i) in filterAllCountries" :key="i"
                @click.prevent="setCountry(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
      </div>
      <div
        v-if="country.id"
        class="treners-filter__block-line"
        @mouseleave="showCity = false">
        <label
          for="city"
          class="label">
          Город
        </label>
        <div
          class="treners-filter__block-line__input">
          <input
            type="text"
            id="city"
            v-model.trim="city.name"
            @input="showCity = true"
            @click="showCity = true"
            class="inpt" />
          <div
            v-if="showCity"
            class="filter-over">
            <div
              class="filter-list">
              <div
                class="filter-list__item"
                v-for="(item, i) in filterAllCities" :key="i"
                @click.prevent="setCity(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
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
      showCountry: false,
      showCity: false,
      sport: '',
      country: {
        id: '',
        name: '',
      },
      city: {
        id: '',
        name: '',
      },
    }
  },
  computed: {
    ...mapState('treners', ['filter']),
    ...mapState(['allsport', 'countries', 'cities']),

    filterAllsport() {
      const allSport = this.allsport.slice();

      return allSport.filter(item => {
        if (this.sport != '')
          return item.name.indexOf(this.sport) > -1;

        return item;
      })
    },

    filterAllCountries() {
      const allCountries = this.countries.slice();

      return allCountries.filter(item => {
        if (this.country.name != '')
          return item.name.indexOf(this.country.name) > -1;

        return item;
      })
    },

    filterAllCities() {
      let allCities = this.cities.slice();

      allCities = allCities.filter(item => {

        if (this.country.id != '')
          return item.country_id == this.country.id

        return item;
      })

      return allCities.filter(item => {
        if (this.city.name != '')
          return item.name.indexOf(this.city.name) > -1;

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

    setCountry(item) {
      this.country.id = item.id;
      this.country.name = item.name;
      this.showCountry = false;
    },

    setCity(item) {
      this.city.id = item.id;
      this.city.name = item.name;
      this.showCity = false;
    },

    changeCountry(e) {
      const value = e.target.value;
      if (value == '') {
        this.country.id = '';
        this.country.name = '';
        this.city.id = '';
        this.city.name = '';
      }
      this.showCountry = true;
    },

    changeName(e) {
      this.SET_FILTER({ name: e.target.value });
    }
  }
}
</script>

<style lang="css">
</style>
