<template>

  <div
    class="sidecard">
    <div
      class="sidecard-block">
      <div
        class="sidecard-title2">
        Основной вид спорта:
        <a
          v-if="user_profile.id == userId"
          href="/edit"
          title="Редактировать"
          @click.prevent="CHANGE_SPORT_MODAL({ bg: true, modal: true, })">
          <img src="/img/icons/edit.png" alt="">
        </a>
      </div>
      <div
        class="sidecard-name">
        <a
          href=""
          class="sidecard-border"
          @click.prevent="">
          {{ returnMainSport(user_profile.user_info ? user_profile.user_info.main_sport : '') }}
        </a>
      </div>
    </div>
    <div
      class="sidecard-block">
      <div
        class="sidecard-title2">
        Дополнительные виды спорта:
      </div>
      <div
        class="sidecard-list">
        <a
          href="#"
          class="sidecard-border"
          v-for="(item, i) in returnDopSport(user_profile.user_info ? user_profile.user_info.dop_sport : '')" :key="i"
          @click.prevent="">
          {{ item.name }}
        </a>
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: ['userId'],
  computed: {
    ...mapState(['allsport']),
    ...mapState('profile', ['user_profile']),
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_SPORT_MODAL']),

    returnMainSport(id) {
      if (!id) return '';
      let item = this.allsport.filter(item => {
        return item.id == parseInt(id);
      })
      return item[0] ? item[0].name : '';
    },

    returnDopSport(str) {
      if (!str) return [];
      const dop = str.split(',');
      return this.allsport.filter(item => {
        return dop.indexOf((item.id).toString()) > -1
      })
    }
  }
}
</script>

<style lang="sass">
</style>
