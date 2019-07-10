<template>

  <modal-layout
    :bgShow="afterSignup.bg"
    :modalShow="afterSignup.modal"
    @close="close">

    <div
      class="modalBlock after-signup">
      <div
        class="modalBlock-title">
        Спасибо за регистрацию
      </div>
      <div
        class="modalBlock-text">
        Теперь вы можете подтвердить свой email. Перейдите по ссылке, отправленной на вашу почту.
      </div>
      <div
        class="modalBlock-btn">
        <button
          type="button"
          class="btn send"
          @click.prevent="close()">
          Ок
        </button>
      </div>
    </div>

  </modal-layout>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ModalLayout from './ModalLayout';

export default {
  components: {
    ModalLayout,
  },
  computed: {
    ...mapState('layout', ['afterSignup'])
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_AFTER_SIGNUP_MODAL']),

    close() {
      this.CHANGE_AFTER_SIGNUP_MODAL({ bg: false, modal: false, })
    }
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/after-signup.sass'
</style>
