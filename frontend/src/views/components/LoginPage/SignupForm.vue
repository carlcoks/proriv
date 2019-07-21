<template>

  <div
    class="form-block">
    <div
      class="form-block__line">
      <input
        type="text"
        id="name"
        v-model.trim="name"
        class="inpt"
        required>
      <label
        for="name"
        class="label">
        Имя и фамилия
      </label>
    </div>
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
      <button
        class="btn btnAccept"
        @click.prevent="reg()">
        Зарегистрироваться
      </button>
      <span
        v-if="errorSignup"
        class="error">
        {{ errorSignup }}
      </span>
    </div>
  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      name: '',
      telefon: '',
      password: '',
    }
  },
  computed: {
    ...mapState('user', ['errorSignup']),
  },
  methods: {
    ...mapActions('user', ['signup']),

    async reg() {
      const response = await this.signup({
        name: this.name,
        telefon: this.telefon,
        password: this.password
      })

      if (response.success)
        this.$router.push('/')
    }
  }
}
</script>

<style lang="css">
</style>
