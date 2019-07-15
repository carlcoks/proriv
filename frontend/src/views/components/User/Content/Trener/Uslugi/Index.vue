<template>

  <div
    class="uslugi">

    <div
      class="uslugi-top">
      <div
        class="uslugi-top__list">

        <div
          class="uslugi-top__list-item"
          v-for="(item, i) in sport" :key="i"
          :class="item.active ? 'active' : ''"
          @click.prevent="activeTab(item.id)">
          {{ item.name }}
        </div>

      </div>
      <button
        v-if="user.user_id == user_profile.id"
        class="btn addNew"
        @click.prevent="CHANGE_ADD_USLUGA({ bg: true, modal: true })">
        + Добавить услугу
      </button>
    </div>

    <div
      class="uslugi-list">

      <uslugi-list
        class="uslugi-list__item"
        />

    </div>

    <add-usluga />

  </div>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import UslugiList from './UslugiList';
import AddUsluga from '@/components/Modals/User/Uslugi/AddUsluga';

export default {
  components: {
    UslugiList,
    AddUsluga,
  },
  data() {
    return {
      sport: [{
        id: 0,
        name: 'Все',
        active: true,
      }],
      activeItem: 0,
    }
  },
  computed: {
    ...mapState(['allsport']),
    ...mapState('user', ['user']),
    ...mapState('profile', ['user_profile']),
  },
  watch: {
    allsport(data) {
      if (data) this.getSport();
    }
  },
  mounted() {
    if (this.allsport)
      this.getSport();
  },
  methods: {
    ...mapMutations('uslugi', ['CHANGE_ADD_USLUGA']),
    activeTab(id) {
      this.activeItem = id;
      this.sport.map(item => {
        item.active = false;
        if (item.id == id) item.active = true;
      })
    },

    getSport() {
      const { user_info } = this.user_profile;
      if (user_info && user_info.main_sport) {
        const mainSport = user_info.main_sport;
        this.allsport.map(item => {
          if (item.id == parseInt(mainSport)) {
            const { id, name } = item;
            this.sport.push({id, name, active: false})
          }
        })
      }
      if (user_info && user_info.dop_sport) {
        const dopSport = user_info.dop_sport.split(',');
        this.allsport.map(item => {
          if (dopSport.indexOf((item.id).toString()) > -1) {
            const { id, name } = item;
            this.sport.push({ id, name, active: false });
          }
        })
      }
    }
  },
}
</script>

<style lang="css">
</style>
