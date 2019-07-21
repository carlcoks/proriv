<template>

  <div
    class="form-block">
    <div
      class="form-block__line">
      <masked-input
        class="inpt"
        v-model="telefon"
        mask="\+\7 (111) 111-11-11"
        id="telefon"
        required />
      <label
        for="telefon"
        class="label">
        Номер телефона
      </label>
    </div>
    <div
      class="form-block__line">
      <input
        type="password"
        id="password"
        v-model.trim="password"
        class="inpt"
        required>
      <label
        for="password"
        class="label">
        Пароль
      </label>
    </div>
    <div
      class="form-block__line">
      <div
        class="line-btns">
        <div
          class="checkbox">
          <input
            type="checkbox"
            id="saveme">
          <label
            class="checkbox-label"
            for="saveme">
            <span class="squad"></span>
            Запомнить меня
          </label>
        </div>
        <a
          href="/reset-password"
          class="link"
          @click.prevent="">
          Забыли пароль?
        </a>
      </div>
    </div>
    <div
      class="form-block__line">
      <button
        class="btn btnAccept"
        @click.prevent="login()">
        Войти
      </button>
      <span
         v-if="errorAuth"
         class="error">
        {{ errorAuth }}
      </span>
    </div>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      telefon: '',
      password: '',
    }
  },
  computed: {
    ...mapState('user', ['errorAuth']),
  },
  methods: {
    ...mapActions('user', ['auth']),

    async login() {
      const response = await this.auth({
        telefon: this.telefon, password: this.password
      });

      if (response && response.success)
        this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
</style>
