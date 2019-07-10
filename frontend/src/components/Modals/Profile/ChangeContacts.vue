<template>

  <modal-layout
    :bgShow="changeContacts.bg"
    :modalShow="changeContacts.modal"
    @close="close()">

    <div
      class="modalBlock change-contacts">
      <div
        class="modalBlock-title lh35">
        Редактирование контактной информации
      </div>
      <div
        class="modalBlock-form">
        <div
          class="modalBlock-form__line">
          <label
            for="telefon"
            class="label">
            Телефон
          </label>
          <div
            class="modalBlock-form__line-input">
            <masked-input
              class="inpt"
              v-model="telefon"
              mask="\+\7 (111) 111-11-11"
              placeholder="+7 (___) ___-__-__"
              id="telefon" />
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
        </div>
        <div
          class="modalBlock-form__line">
          <label
            for="email"
            class="label">
            Электронная почта
          </label>
          <div
            class="modalBlock-form__line-input">
            <input
              type="text"
              class="inpt"
              v-model.trim="email"
              placeholder="Адрес эл. почты"
              id="email" />
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
      </div>
      <div
        class="modalBlock-btn twoBtns">
        <button
          class="btn addNew"
          @click="close()">
          Отмена
        </button>
        <button
          class="btn infoBtn"
          @click="saveContacts()">
          Сохранить
        </button>
        <span
          v-if="resp.status != null"
          class="res-mess"
          :class="resp.status == true ? 'success' : 'error'">
          {{ resp.mess }}
        </span>
      </div>
    </div>

  </modal-layout>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ModalLayout from '../ModalLayout';
import http from '@/utils/api';

export default {
  components: {
    ModalLayout,
  },
  data() {
    return {
      telefon: '',
      email: '',
      validation: {
        telefon: null,
        email: null,
      },
      regEmail: /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,24}))$/,
      regTel: /^((8|\+7)[\- ]?)?(\(?\d{3,4}\)?[\- ]?)?[\d\- ]{5,10}$/,
      resp: {
        status: null,
        mess: '',
      },
    }
  },
  computed: {
    ...mapState('layout', ['changeContacts']),
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
  },
  watch: {
    telefon(data) {
      if (data != '' && this.isTelValid()) this.validation.telefon = true;
      else this.validation.telefon = false;

    },
    email(data) {
      if (data != '' && this.isEmailValid()) this.validation.email = true;
      else this.validation.email = false;
    },
  },
  mounted() {
    this.setData();
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_CONTACTS_MODAL']),
    ...mapMutations('profile', ['CHANGE_PROFILE']),

    isEmailValid() {
      return (this.email == '') ? '' : (this.regEmail.test(this.email)) ? true : false;
    },

    isTelValid() {
      return (this.telefon == '') ? '' : (this.regTel.test(this.telefon)) ? true : false;
    },

    setData() {
      const { telefon, email } = this.user_profile;
      this.telefon = telefon;
      this.email = email;
    },

    async saveContacts() {
      for (let key in this.validation) {
        if (this.validation[key] == false) {
          return false;
        }
      }
      const data = {
        email: this.email,
        telefon: this.telefon,
      };

      try {
        const response = await http.put('/api/v1/user-contacts', {
          user_id: this.user.user_id,
          data,
        }, {
          headers: {
            'Authorization': `Bearer ${this.user.token}`
          }
        })
        this.resp.status = response.data.success;
        this.resp.mess = response.data.message;

        if (response.data.success)
          this.CHANGE_PROFILE(data);

        setTimeout(() => {
          this.close();
        }, 2000)

      } catch(e) {
        const { response } = e;
        if (response) {
          this.resp.status = false;
          this.resp.mess = response.data.message;
        }
      }
    },

    close() {
      this.resp = {
        status: null,
        mess: '',
      }

      this.CHANGE_CONTACTS_MODAL({ bg: false, modal: false, })
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/change-contacts.sass'
</style>
