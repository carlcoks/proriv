<template>

  <modal-layout
    :bgShow="changeSport.bg"
    :modalShow="changeSport.modal"
    @close="close()">

    <div
      class="modalBlock change-sport"
      @mouseleave="showSport = false, showSport2 = false">
      <div
        class="modalBlock-title">
        Редактирование видов спорта
      </div>
      <div
        class="modalBlock-form">
        <div
          class="modalBlock-form__line">
          <label
            for="sport"
            class="label">
            Основной вид спорта
          </label>
          <div
            class="modalBlock-form__line-input">
            <input
              type="text"
              class="inpt"
              v-model.trim="sport.name"
              placeholder="Начните вводить вид спорта"
              id="sport"
              @input="capitalize($event)"
              @focus="showSport = true" />
            <div
              v-show="showSport"
              class="modalBlock-form__line-input__select">
              <div
                class="modalBlock-form__line-input__select-option"
                v-for="(item, i) in filterSport" :key="i"
                @click="chooseSport(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="modalBlock-form__line">
          <label
            for="dopsport"
            class="label">
            Дополнительные виды спорта
          </label>
          <div
            class="modalBlock-form__line-input">
            <input
              type="text"
              class="inpt"
              v-model.trim="dopsportname"
              placeholder="Начните вводить вид спорта"
              id="dopsport"
              @input="capitalize2($event)"
              @focus="showSport2 = true" />
            <div
              v-show="showSport2"
              class="modalBlock-form__line-input__select">
              <div
                class="modalBlock-form__line-input__select-option"
                v-for="(item, i) in filterSport2" :key="i"
                @click="chooseSport2(item)">
                {{ item.name }}
              </div>
            </div>
          </div>
          <div
            class="modalBlock-form__line-list">
            <div
              class="modalBlock-form__line-list__item"
              v-for="(item, i) in dopsport" :key="i">
              <a
                href="/delete"
                class="delete"
                @click.prevent="delDopsport(item.id)">
                <img
                  src="/img/icons/closedel.png">
              </a>
              {{ item.name }}
            </div>
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
          @click="saveSport()">
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
      showSport: false, // Основной вид спорта
      showSport2: false, // Доп вид спорта
      sport: {
        id: '',
        name: ''
      },
      dopsportname: '',
      dopsport: [],
      resp: {
        status: null,
        mess: '',
      },
    }
  },
  computed: {
    ...mapState(['allsport']),
    ...mapState('layout', ['changeSport']),
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
    filterSport() {
      const allSport = this.allsport.slice();

      return allSport.filter(item => {
        if (this.sport.name != '')
          return item.name.indexOf(this.sport.name) > -1;

        return item;
      })
    },
    filterSport2() {
      const allSport = this.allsport.slice();

      return allSport.filter(item => {
        if (this.dopsportname != '')
          return item.name.indexOf(this.dopsportname) > -1;

        return item;
      })
    },
  },
  watch: {
    allsport() {
      this.setData();
    }
  },
  mounted() {
    this.setData();
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_SPORT_MODAL']),
    ...mapMutations('profile', ['CHANGE_PROFILE']),

    setData() {
      const { user_info } = this.user_profile;
      if (user_info && user_info.main_sport) {
        const mainSport = user_info.main_sport;
        this.allsport.map(item => {
          if (item.id == parseInt(mainSport)) {
            const { id, name } = item;
            this.sport = {id, name}
          }
        })
      }
      if (user_info && user_info.dop_sport) {
        const dopSport = user_info.dop_sport.split(',');
        this.allsport.map(item => {
          if (dopSport.indexOf((item.id).toString()) > -1) {
            const { id, name } = item;
            this.dopsport.push({ id, name });
          }
        })
      }
    },

    close () {
      this.resp = {
        status: null,
        mess: '',
      }
      this.CHANGE_SPORT_MODAL({ bg: false, modal: false, })
    },

    chooseSport(item) {
      const { id, name } = item;
      this.sport = { id, name };
      this.showSport = false;
    },

    chooseSport2(item) {
      const { id, name } = item;
      this.dopsportname = '';
      this.dopsport.push({ id, name });
      this.showSport2 = false;
    },

    delDopsport(id) {
      this.dopsport.map((item, i) => {
        if (id == item.id) this.dopsport.splice(i, 1);
      })
    },

    capitalize(e) {
      this.sport.name = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    },
    capitalize2(e) {
      this.dopsportname = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    },

    async saveSport() {
      let dopArr = [];
      this.dopsport.map(item => {
        dopArr.push(item.id);
      })
      const data = {
        main_sport: this.sport ? this.sport.id : '',
        dop_sport: dopArr.join(',')
      };

      try {

        const response = await http.put('/api/v1/user-info', {
          user_id: this.user.user_id,
          data: data,
        }, {
          headers: {
            'Authorization': `Bearer ${this.user.token}`
          }
        })
        this.resp.status = response.data.success;
        this.resp.mess = response.data.message;

        if (response.data.success)
          this.CHANGE_PROFILE({user_info: data});

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
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/change-sport.sass'
</style>
