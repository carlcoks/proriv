<template>

  <modal-layout
    :bgShow="afterAccept.bg"
    :modalShow="afterAccept.modal"
    @close="close">

    <div
      class="modalBlock after-signup">
      <div
        class="modalBlock-title">
        E-mail подтвержден
      </div>
      <div
        class="modalBlock-text">
        Теперь вы можете войти на сайт, используя свой e-mail и пароль.
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
    ...mapState('layout', ['afterAccept'])
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_AFTER_ACCEPT_MODAL']),

    close() {
      this.$router.push('/')
      this.CHANGE_AFTER_ACCEPT_MODAL({ bg: false, modal: false, })
    }
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/after-signup.sass'
</style>
