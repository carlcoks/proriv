<template>

  <form
    class="form">
    <div
      class="form-bg form-pad-all">
      <div
        class="form-line">
        <input
          type="text"
          class="inpt"
          v-model.trim="email"
          id="email"
          required />
        <label
          for="email"
          class="label-line">
          E-mail
        </label>
        <span
          v-if="validation.email != null"
          class="validation">
          <img
            v-if="validation.email"
            src="/img/icons/valid.png" alt="">
          <img
            v-else-if="!validation.email"
            src="/img/icons/notvalid.png" alt="">
        </span>
      </div>
      <div
        class="form-line">
        <input
          type="password"
          class="inpt"
          v-model.trim="password"
          id="password"
          required />
        <label
          for="password"
          class="label-line">
          Пароль
        </label>
        <span
          v-if="validation.password != null"
          class="validation">
          <img
            v-if="validation.password"
            src="/img/icons/valid.png" alt="">
          <img
            v-else-if="!validation.password"
            src="/img/icons/notvalid.png" alt="">
        </span>
      </div>
      <div
        class="form-btns">
        <button
          type="sumbit"
          class="btn send"
          @click.prevent="send()">
          Вход
        </button>
        <a
          href="/recovery"
          class="reset"
          @click.prevent="recovery()">
          Забыли пароль?
        </a>
        <span
          v-if="errorAuth"
          class="error-mess">
          {{ errorAuth }}
        </span>
      </div>
    </div>
  </form>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

export default {
  data() {
    return {
      email: '',
      password: '',
      validation: {
        email: null,
        password: null,
      },
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    }
  },
  computed: {
    ...mapState('user', ['errorAuth']),
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_LOGIN_MODAL']),
    ...mapMutations('layout', ['CHANGE_RECOVERY_PASS_MODAL']),
    ...mapActions('user', ['auth']),

    send() {
      this.validation = { email: null, password: null, };

      if (this.email == '' || !this.isEmailValid()) this.validation.email = false
      else this.validation.email = true

      if (this.password == '') this.validation.password = false
      else this.validation.password = true

      for (let key in this.validation) {
        if (this.validation[key] == false) {
          return false;
        }
      }

      this.auth({ email: this.email, password: this.password });
    },

    isEmailValid() {
      return (this.email == '') ? '' : (this.reg.test(this.email)) ? true : false;
    },

    recovery() {
      this.CHANGE_LOGIN_MODAL({ bg: false, modal: false });
      this.CHANGE_RECOVERY_PASS_MODAL({ bg: true, modal: true });
    }
  }
}
</script>

<style lang="css">
</style>
