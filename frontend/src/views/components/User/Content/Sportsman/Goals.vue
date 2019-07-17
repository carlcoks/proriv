<template>

  <div
    class="goals">

    <div
      class="resume-block__title">
      <span></span>
      <button
        v-if="user.user_id == user_profile.id"
        class="btn addNew"
        @click.prevent="CHANGE_ADD_GOAL({ bg: true, modal: true, })">
        + Добавить цель
      </button>
    </div>

    <div
      class="goalslist">

      <goals-item
        class="goalslist-item"
        v-for="(item, i) in goals" :key="i"
        :item="item"
        :i="i" />

    </div>

    <add-goal />

  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';

import GoalsItem from './Goals/GoalsItem';
import AddGoal from '@/components/Modals/User/Goals/AddGoal';

export default {
  name: 'user-goals',
  initialMutations: [
    'goals/RESET_GOALS',
  ],
  asyncData ({ store, route }) {
    return store.dispatch('goals/getGoals', { user_id: route.params.id });
  },
  components: {
    GoalsItem,
    AddGoal,
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('profile', ['user_profile']),
    ...mapState('goals', ['goals']),
  },
  methods: {
    ...mapMutations('goals', ['CHANGE_ADD_GOAL']),
  }
}
</script>

<style lang="css">
</style>
