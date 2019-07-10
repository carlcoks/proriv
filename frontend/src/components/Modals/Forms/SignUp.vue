<template>

  <form
    class="form">
    <div
      class="form-bg form-pad-top">
      <div
        class="form-line">
        <div class="form-line__small">
          <input
            type="text"
            class="inpt"
            v-model.trim="firstname"
            id="firstname"
            required />
          <label
            for="firstname"class="label-line">
            Ваше имя
          </label>
          <span
            v-if="validation.firstname != null"
            class="validation">
            <img
              v-if="validation.firstname"
              src="/img/icons/valid.png" alt="">
            <img
              v-else-if="!validation.firstname"
              src="/img/icons/notvalid.png" alt="">
          </span>
        </div>
        <div class="form-line__small">
          <input
            type="text"
            class="inpt"
            v-model.trim="lastname"
            id="lastname"
            required />
          <label
            for="lastname"class="label-line">
            Ваша фамилия
          </label>
          <span
            v-if="validation.lastname != null"
            class="validation">
            <img
              v-if="validation.lastname"
              src="/img/icons/valid.png" alt="">
            <img
              v-else-if="!validation.lastname"
              src="/img/icons/notvalid.png" alt="">
          </span>
        </div>
      </div>
      <div
        class="form-line">
        <div class="form-line__small">
          <div class="checkbox">
            <div
              class="checkbox-label">
              Кто вы?
            </div>
            <div
              class="checkbox-line">
              <div
                class="checkbox-line__item">
                <label
                  for="sportsman"
                  class="checkbox-line__item-label">
                  <input type="radio" v-model="who" id="sportsman" value="1" required>
                  <span class="circle"></span>
                  Спортсмен
                </label>
              </div>
              <div
                class="checkbox-line__item">
                <label
                  for="trener"
                  class="checkbox-line__item-label">
                  <input type="radio" v-model="who" id="trener" value="2" required>
                  <span class="circle"></span>
                  Тренер
                </label>
              </div>
              <span
                v-if="validation.who != null"
                class="validation">
                <img
                  v-if="validation.who"
                  src="/img/icons/valid.png" alt="">
                <img
                  v-else-if="!validation.who"
                  src="/img/icons/notvalid.png" alt="">
              </span>
            </div>
          </div>
        </div>
        <div class="form-line__small">
          <div class="checkbox">
            <div
              class="checkbox-label">
              Ваш пол
            </div>
            <div
              class="checkbox-line">
              <div
                class="checkbox-line__item">
                <label
                  for="muj"
                  class="checkbox-line__item-label">
                  <input type="radio" v-model="gender" id="muj" value="1" required>
                  <span class="circle"></span>
                  Мужской
                </label>
              </div>
              <div
                class="checkbox-line__item">
                <label
                  for="jen"
                  class="checkbox-line__item-label">
                  <input type="radio" v-model="gender" id="jen" value="2" required>
                  <span class="circle"></span>
                  Женский
                </label>
              </div>
              <span
                v-if="validation.gender != null"
                class="validation">
                <img
                  v-if="validation.gender"
                  src="/img/icons/valid.png" alt="">
                <img
                  v-else-if="!validation.gender"
                  src="/img/icons/notvalid.png" alt="">
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div
      class="form-pad-bot">
      <div
        class="form-line">
        <div class="form-line__small">
          <masked-input
            class="inpt"
            v-model="telefon"
            mask="\+\7 (111) 111-11-11"
            id="telefon"
            required />
          <label
            for="telefon"
            class="label-line">
            Телефон
          </label>
          <span
            v-if="validation.telefon != null"
            class="validation">
            <img
              v-if="validation.telefon"
              src="/img/icons/valid.png" alt="">
            <img
              v-else-if="!validation.telefon"
              src="/img/icons/notvalid.png" alt="">
          </span>
        </div>
        <div class="form-line__small">
          <input
            type="email"
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
      </div>
      <div
        class="form-line">
        <div class="form-line__small">
          <input
            type="password"
            class="inpt"
            v-model.trim="password1"
            id="password1"
            required />
          <label
            for="password1"
            class="label-line">
            Пароль
          </label>
          <span
            v-if="validation.password1 != null"
            class="validation">
            <img
              v-if="validation.password1"
              src="/img/icons/valid.png" alt="">
            <img
              v-else-if="!validation.password1"
              src="/img/icons/notvalid.png" alt="">
          </span>
        </div>
        <div class="form-line__small">
          <input
            type="password"
            class="inpt"
            v-model.trim="password2"
            id="password2"
            required />
          <label
            for="password2"
            class="label-line">
            Подтверждение пароля
          </label>
          <span
            v-if="validation.password2 != null && !validation.password2"
            class="validation-pass">
            Пароли не совпадают
          </span>
          <span
            v-if="validation.password2 != null"
            class="validation">
            <img
              v-if="validation.password2"
              src="/img/icons/valid.png" alt="">
            <img
              v-else-if="!validation.password2"
              src="/img/icons/notvalid.png" alt="">
          </span>
        </div>
      </div>
      <div
        class="form-btns one-btn">
        <button
          type="sumbit"
          class="btn send"
          @click.prevent="send()">
          Зарегистрироваться
        </button>
        <span
          v-if="errorSignup"
          class="error-mess">
          {{ errorSignup }}
        </span>
      </div>
    </div>
  </form>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      firstname: '',
      lastname: '',
      telefon: '',
      email: '',
      password1: '',
      password2: '',
      who: '',
      gender: '',
      validation: {
        firstname: null,
        lastname: null,
        telefon: null,
        email: null,
        password1: null,
        password2: null,
        who: null,
        gender: null,
      },
      reg: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
    }
  },
  computed: {
    ...mapState('user', ['errorSignup']),
  },
  methods: {
    ...mapActions('user', ['signup']),

    isEmailValid() {
      return (this.email == '') ? '' : (this.reg.test(this.email)) ? true : false;
    },

    send() {
      if (this.firstname == '') this.validation.firstname = false
      else this.validation.firstname = true

      if (this.lastname == '') this.validation.lastname = false
      else this.validation.lastname = true

      if (this.telefon == '') this.validation.telefon = false
      else this.validation.telefon = true

      if (this.email == '' || !this.isEmailValid()) this.validation.email = false
      else this.validation.email = true

      if (this.password1 == '') this.validation.password1 = false
      else this.validation.password1 = true

      if (this.password2 == '' || this.password2 != this.password1) this.validation.password2 = false
      else this.validation.password2 = true

      if (this.who == '') this.validation.who = false
      else this.validation.who = true

      if (this.gender == '') this.validation.gender = false
      else this.validation.gender = true

      for (let key in this.validation) {
        if (this.validation[key] == false) {
          return false;
        }
      }

      const url = document.location.protocol + '//' + document.location.host;

      this.signup({
        url: url,
        firstname:this.firstname,
        lastname: this.lastname,
        email: this.email,
        telefon: this.telefon,
        password: this.password1,
        who: this.who,
        gender: this.gender,
      })
    },
  }
}
</script>

<style lang="css">
</style>
