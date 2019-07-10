<template>

  <div
    class="sidecard">
    <div
      class="sidecard-title">
      Контактная информация:
      <a
        v-if="user_profile.id == userId"
        href="/edit"
        title="Редактировать"
        @click.prevent="CHANGE_CONTACTS_MODAL({ bg: true, modal: true, })">
        <img src="/img/icons/edit.png" alt="">
      </a>
    </div>
    <div
      class="sidecard-line">
      <img
        class="sidecard-icon"
        src="/img/icons/phone.png"
        alt="">
      <div
        class="sidecard-text">
        {{ user_profile.telefon }}
      </div>
    </div>
    <div
      class="sidecard-line">
      <img
        class="sidecard-icon"
        src="/img/icons/mail.png"
        alt="">
      <div
        class="sidecard-text">
        {{ user_profile.email }}
      </div>
    </div>
  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';

export default {
  props: ['userId'],
  computed: {
    ...mapState('profile', ['user_profile']),
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_CONTACTS_MODAL']),
  }
}
</script>

<style lang="sass">
</style>
