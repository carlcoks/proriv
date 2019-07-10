<template>

  <div>

    <transition
      name="fade">
      <div
        v-if="loginModal.bg"
        class="modal-bg"
        @click.prevent="CHANGE_LOGIN_MODAL({ bg: false, modal: false })"></div>
    </transition>

    <transition
      name="slideTop">
      <div
        v-if="loginModal.modal"
        class="login-form">
        <div
          class="login-form__head">
          <div
            v-for="(item, i) in auth" :key="i"
            :class="[item.className, item.className == loginModal.active ? 'active' : '']"
            class="login-form__head-btn"
            @click="changeActive(item.className)">
            {{ item.name }}
          </div>
        </div>
        <div
          class="login-form__body">

          <sign-in
            v-if="auth[0].className == loginModal.active" />
          <sign-up
            v-if="auth[1].className == loginModal.active" />

        </div>
      </div>
    </transition>

  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import SignIn from './Forms/SignIn';
import SignUp from './Forms/SignUp';

export default {
  components: {
    SignIn,
    SignUp,
  },
  data() {
    return {
      auth: [
        { id: 1, name: 'Вход', className: 'signin', },
        { id: 2, name: 'Регистрация', className: 'signup', }
      ]
    }
  },
  computed: {
    ...mapState('layout', ['loginModal']),
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_LOGIN_MODAL']),

    changeActive(classname) {
      this.CHANGE_LOGIN_MODAL({ active: classname })
    }
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/login-form.sass'
</style>
