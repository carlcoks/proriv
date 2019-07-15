<template>

  <div
    class="resume">

    <about-block
      :about="resume"
      :admin="user_profile.id == user.user_id" />

    <user-card
      :admin="user_profile.id == user.user_id"
      :data="card" />

    <goals-block
      v-if="goals.length > 0"
      :data="goals" />

  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import http from '@/utils/api';

import AboutBlock from '../Trener/Resume/About';
import UserCard from './About/UserCard';
import GoalsBlock from './About/Goals';

export default {
  asyncData ({ store, route }, data) {
    return store.dispatch('resume/getResume', { user_id: route.params.id });
  },
  components: {
    AboutBlock,
    UserCard,
    GoalsBlock,
  },
  data() {
    return {
      goals: [],
    }
  },
  computed: {
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
    ...mapState('resume', ['resume', 'card']),
  },
  created() {
    this.getMainGoals();
  },
  methods: {
    async getMainGoals() {
      try {
        const response = await http.get('/api/v1/goals-main', {
          params: {
            user_id: this.$route.params.id,
          }
        })

        if (response.data.success)
          this.goals = response.data.result
      } catch(e) {
        console.log(e);
      }
    }
  }
}
</script>

<style lang="css">
</style>
