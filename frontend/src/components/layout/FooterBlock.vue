<template>

  <footer
    class="footer">
    <div class="wr">
      <div
        class="footer-block">
        <div
          class="smallText">
          СпортТут, {{ date }}
        </div>
        <div
          class="center-block">
          <div
            class="greyText">
            Нужна работа?
          </div>
          <a
            href="/reg"
            class="link"
            @click.prevent="openReg()">
            Зарегистрируйся тренером
          </a>
        </div>
        <div
          class="smallText">
          Сайт создан
        </div>
      </div>
    </div>
  </footer>

</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {

    }
  },
  computed: {
    date() {
      return (new Date()).getFullYear()
    }
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_LOGIN_MODAL']),

    openReg() {
      this.CHANGE_LOGIN_MODAL({ bg: true, modal: true, active: 'signup' })
    },
  }
}
</script>

<style lang="css">
</style>
