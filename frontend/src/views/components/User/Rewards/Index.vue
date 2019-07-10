<template>

  <div>

    <modal-layout
      v-if="!addReward.modal"
      :bgShow="true"
      :modalShow="true"
      @close="$router.push(`/user/${$route.params.id}`)">

      <div
        class="modalBlock albums-page">
        <div
          class="modalBlock-title">
          Награды
        </div>
        <div
          class="modalBlock-cards">
          <a
            v-if="user_profile.id == user.user_id"
            href="/add"
            @click.prevent="CHANGE_ADD_REWARD_MODAL({ bg: true, modal: true })"
            class="itemCard addCard">
            <div
              class="addBtn">
              <img
                src="/img/icons/bigplus.png">
            </div>
            <div
              class="addText">
              Добавить награду
            </div>
          </a>

          <reward-list
            v-for="(item, i) in rewards" :key="i"
            :item="item" />

        </div>
      </div>

    </modal-layout>

    <add-reward
      v-if="user_profile.id == user.user_id" />

  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';

import ModalLayout from '@/components/Modals/ModalLayout';
import RewardList from './RewardList';
import AddReward from '@/components/Modals/User/AddReward';

export default {
  name: 'user-rewards',
  metaInfo() {
    return {
      title: `Награды`,
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('rewards/getRewards', {user_id: route.params.id});
  },
  components: {
    ModalLayout,
    RewardList,
    AddReward,
  },
  computed: {
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
    ...mapState('rewards', ['rewards', 'addReward']),
  },
  methods: {
    ...mapMutations('rewards', ['CHANGE_ADD_REWARD_MODAL']),
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/user/rewards.sass'
</style>
