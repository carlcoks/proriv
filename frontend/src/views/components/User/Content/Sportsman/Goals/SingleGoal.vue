<template>

  <div
    v-if="single"
    class="goal">
    <div
      class="goal-top">
      <router-link
        :to="`/user/${$route.params.id}/goals`"
        class="btn addNew">
        <img
          src="/img/icons/arrow-back.png">
        Все цели
      </router-link>
      <div
        class="btns">
        <button
          class="btn addNew"
          title="Удалить цель"
          @click.prevent="btnDeleteGoal()">
          Удалить
        </button>
      </div>
    </div>
    <div
      class="goal-card">
      <div
        class="goal-card__top">
        <div
          class="goal-card__top-img">
          <img
            :src="`/api/${single.src}/cover_${single.image}`"
            class='image'>
        </div>
        <div
          class="goal-card__top-right">
          <div
            class="goal-title">
            {{ single.title }}
          </div>
          <div
            class="goal-more">
            <div
              class="goal-more__line">
              <div
                class="label">
                Категория:
              </div>
              <div
                class="text">
                {{ single.sport_type.name }}
              </div>
            </div>
            <div
              class="goal-more__line">
              <button
                class="btn infoBtn">
                Обсудить цель
              </button>
            </div>
          </div>
        </div>

      </div>
    </div>
    <div
      class="goal-content">
      <div
        class="label">
        Описание:
      </div>
      <div
        class="text">{{ single.about }}</div>
    </div>

  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'user-goal',
  initialMutations: [
    'goals/RESET_SINGLE',
  ],
  asyncData ({ store, route }) {
    return store.dispatch('goals/getGoal', { user_id: route.params.id, id: route.params.goal });
  },
  computed: {
    ...mapState('goals', ['single']),
  },
  methods: {
    ...mapActions('goals', ['deleteGoal']),

    async btnDeleteGoal() {
      const response = await this.deleteGoal({ id: this.single.id });
      if (response.success)
        this.$router.push(`/user/${this.$route.params.id}/goals`)
    }
  }
}
</script>

<style lang="sass">
</style>
