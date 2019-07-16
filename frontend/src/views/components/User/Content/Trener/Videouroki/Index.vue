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

      <videokursi-list
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
          type="button"
          @click.prevent="CHANGE_ADD_UROK({ bg: true, modal: true })">
          + Добавить видеоурок
        </button>
      </div>

      <videouroki-list
        :admin="user.user_id == user_profile.id"
        :data="videouroki" />

    </div>

    <add-kurs />
    <add-urok />

  </div>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

import VideokursiList from './VideokursiList';
import VideourokiList from './VideourokiList';
import AddKurs from '@/components/Modals/User/Videouroki/AddKurs';
import AddUrok from '@/components/Modals/User/Videouroki/AddUrok';

export default {
  components: {
    VideokursiList,
    VideourokiList,
    AddKurs,
    AddUrok,
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('profile', ['user_profile']),
    ...mapState('videouroki', ['videokursi', 'videouroki']),
  },
  created() {
    this.getVideokursi({ user_id: this.$route.params.id });
    this.getVideouroki({ user_id: this.$route.params.id });
  },
  methods: {
    ...mapMutations('videouroki', ['CHANGE_ADD_KURS', 'CHANGE_ADD_UROK']),
    ...mapActions('videouroki', ['getVideokursi', 'getVideouroki']),
  },
}
</script>

<style lang="css">
</style>
