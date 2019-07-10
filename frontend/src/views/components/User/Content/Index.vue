<template>

  <div
    class="content">

    <tabs-block
      :tabs="tabs[user_profile.user_status.id]"/>

    <div
      class="content-page">

      <div
        v-if="user_profile.user_status.id == 1">

        <transition-group
          name="slideLeft">

          <resume-block
            v-if="$route.hash == '#resume' || $route.hash == ''"
            :key="`1`" />

        </transition-group>

      </div>

    </div>

  </div>

</template>

<script>
import { mapState } from 'vuex';
import TabsBlock from './Tabs';
import ResumeBlock from './Trener/Resume';

export default {
  components: {
    TabsBlock,
    ResumeBlock,
  },
  data() {
    return {
      tabs: {
        0: [
          { name: 'О себе', hash: 'about', active: true, },
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
}
</script>

<style lang="css">
</style>
