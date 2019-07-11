<template>

  <div
    class="content">

    <tabs-block
      :tabs="tabs[user_profile.user_status.id]"/>

    <div
      class="content-page">

      <div
        v-if="user_profile.user_status.id == 1">

        <transition
          name="slideLeft"
          mode="out-in">

          <resume-block
            v-if="tabs[1][0].active" />

          <lenta-block
            v-if="tabs[1][1].active" />

        </transition>

      </div>

    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex';

import TabsBlock from './Tabs';
import ResumeBlock from './Trener/Resume';
import LentaBlock from './Trener/Lenta';

export default {
  components: {
    TabsBlock,
    ResumeBlock,
    LentaBlock,
  },
  data() {
    return {
      tabs: {
        0: [
          { name: 'О себе', hash: 'about', active: false, },
          { name: 'Лента', hash: 'lenta', active: false, },
          { name: 'Цели', hash: 'goals', active: false, },
        ],
        1: [
          { name: 'Резюме', hash: 'resume', active: false, },
          { name: 'Лента', hash: 'lenta', active: false, },
          { name: 'Видео уроки', hash: 'videouroki', active: false, },
          { name: 'Услуги', hash: 'uslugi', active: false, },
        ]
      },
    }
  },
  computed: {
    ...mapState('profile', ['user_profile']),
  },
  watch: {
    $route (to, from) {
      this.checkTabs();
    }
  },
  mounted() {
    this.checkTabs();
  },
  methods: {
    checkTabs() {
      const id = this.user_profile.user_status.id;
      const hash = this.$route.hash.replace('#', '');
      if (hash != '') {
        this.tabs[id].map(item => {
          item.active = false
          if (item.hash == hash)
            item.active = true;
        })
      } else {
        this.tabs[id][0].active = true;
      }
    }
  },
}
</script>

<style lang="css">
</style>
