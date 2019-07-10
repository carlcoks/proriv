<template>

  <modal-layout
    :bgShow="recoveryPass.bg"
    :modalShow="recoveryPass.modal"
    @close="close">

    <div
      class="modalBlock recovery-pass">
      <div
        class="modalBlock-title">
        Восстановление пароля
      </div>
      <div
        class="modalBlock-text">
        Введите адрес вашего почтового ящика и мы отправим  вам письмо с информацией для восстановления пароля
      </div>
      <div
        class="modalBlock-input">
        <input
          type="text"
          v-model.trim="email"
          class="inpt"
          id="email"
          required />
        <label
          for="email"
          class="label-line">
          E-mail
        </label>
      </div>
      <div
        class="modalBlock-btn">
        <button
          type="button"
          class="btn send"
          :disabled="disabled"
          @click.prevent="send()">
          {{ btnText }}
        </button>
        <span
          v-if="error"
          class="error">
          {{ error }}
        </span>
      </div>
    </div>

  </modal-layout>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ModalLayout from './ModalLayout';
import http from '@/utils/api';

export default {
  components: {
    ModalLayout,
  },
  data() {
    return {
      email: '',
      disabled: false,
      btnText: 'Отправить',
      error: '',
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    }
  },
  computed: {
    ...mapState('layout', ['recoveryPass'])
  },
  watch: {
    email() {
      this.error = '';
    },
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_RECOVERY_PASS_MODAL']),

    close () {
      this.CHANGE_RECOVERY_PASS_MODAL({ bg: false, modal: false, })
    },

    isEmailValid() {
      return (this.email == '') ? '' : (this.reg.test(this.email)) ? true : false;
    },

    async send() {
      if (this.email == '') {
        this.error = 'Введите email';
        return false
      }
      if (!this.isEmailValid()) {
        this.error = 'Не валидный email';
        return false;
      }

      try {
        const response = await http.post('/api/v1/reset-password', {email: this.email})
        this.disabled = true;
        this.btnText = 'Новый пароль отправлен';

        setTimeout(() => {
          this.email = '';
          this.btnText = 'Отправить';
          this.disabled = false;
          this.close();
        }, 3000)

      } catch({response}) {
        if (response)
          this.error = response.data.message;
      }
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/recovery-pass.sass'
</style>
