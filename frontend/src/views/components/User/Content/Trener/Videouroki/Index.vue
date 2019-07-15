<template>

  <div>
    <div
      class="videouroki">

      <div
        class="videouroki-title">
        Видеокурсы
        <button
          v-if="user.user_id == user_profile.id"
          class="btn addNew"
          type="button"
          @click.prevent="CHANGE_ADD_KURS({ bg: true, modal: true })">
          + Добавить курс
        </button>
      </div>

      <videouroki-list
        :admin="user.user_id == user_profile.id"
        :data="videokursi" />

    </div>

    <div
      class="videouroki">

      <div
        class="videouroki-title">
        Отдельные видеуроки
        <button
          v-if="user.user_id == user_profile.id"
          class="btn addNew"
          type="button">
          + Добавить видеоурок
        </button>
      </div>

    </div>

    <add-kurs />

  </div>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import VideourokiList from './VideourokiList';
import AddKurs from '@/components/Modals/User/Videouroki/AddKurs';

export default {
  components: {
    VideourokiList,
    AddKurs,
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('profile', ['user_profile']),
    ...mapState('videouroki', ['videokursi']),
  },
  created() {
    this.getVideokursi({ user_id: this.$route.params.id });
  },
  methods: {
    ...mapMutations('videouroki', ['CHANGE_ADD_KURS']),
    ...mapActions('videouroki', ['getVideokursi']),
  },
}
</script>

<style lang="css">
</style>
