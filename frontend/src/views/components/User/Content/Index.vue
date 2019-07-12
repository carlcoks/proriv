<template>

  <div
    class="content">

    <tabs-block
      :tabs="tabs[user_profile.user_status.id]"/>

    <div
      class="content-page">

      <transition
        name="slideLeft"
        mode="out-in">

        <router-view
          v-if="$route.meta.type == 'tabs'" />

        <div
          v-else>

          <resume-block
            v-if="user_profile.user_status.id == 1" />

          <about-block
            v-if="user_profile.user_status.id == 2" />

        </div>

      </transition>

    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex';

import TabsBlock from './Tabs';
import ResumeBlock from './Trener/Resume';
import AboutBlock from './Sportsman/About';

export default {
  components: {
    TabsBlock,
    ResumeBlock,
    AboutBlock,
  },
  data() {
    return {
      tabs: {
        1: [
          { name: 'Резюме', hash: 'resume', active: false, },
          { name: 'Лента', hash: 'lenta', active: false, },
          { name: 'Видеоуроки', hash: 'videouroki', active: false, },
          { name: 'Услуги', hash: 'uslugi', active: false, },
        ],
        2: [
          { name: 'О себе', hash: 'about', active: false, },
          { name: 'Лента', hash: 'lenta', active: false, },
          { name: 'Цели', hash: 'goals', active: false, },
        ],
      },
    }
  },
  computed: {
    ...mapState('profile', ['user_profile']),
  },
  watch: {
    '$route' (to, from) {
      if (this.$route.name == 'user') {
        if (this.user_profile.user_status.id == 1)
          this.$router.push({ name: 'user-resume' })
        else if (this.user_profile.user_status.id == 2)
          this.$router.push({ name: 'user-about' })
      }
    }
  },
  mounted() {
    if (this.$route.name == 'user') {
      if (this.user_profile.user_status.id == 1)
        this.$router.push({ name: 'user-resume' })
      else if (this.user_profile.user_status.id == 2)
        this.$router.push({ name: 'user-about' })
    }
  },
  methods: {
    // checkTabs() {
    //   const id = this.user_profile.user_status.id;
    //   const hash = this.$route.hash.replace('#', '');
    //   if (hash != '') {
    //     this.tabs[id].map(item => {
    //       item.active = false
    //       if (item.hash == hash)
    //         item.active = true;
    //     })
    //   } else {
    //     this.tabs[id][0].active = true;
    //   }
    // }
  },
}
</script>

<style lang="css">
</style>
