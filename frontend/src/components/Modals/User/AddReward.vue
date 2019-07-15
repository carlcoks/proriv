<template>

  <modal-layout
    :bgShow="addReward.bg"
    :modalShow="addReward.modal"
    @close="close()">

    <div
      class="modalBlock add-album">
      <div
        class="modalBlock-title">
        Добавление награды
      </div>
      <div
        v-if="loading"
        class="modalBlock-body">
        <div
          class="modalBlock-body__loading">
          <div
            class="modalBlock-body__loading-bar">
            <div
              class="modalBlock-body__loading-bar__bg"
              :style="`width: ${percent}%`"></div>
          </div>
          <div
            class="modalBlock-body__loading-text">
            <span
              v-if="resp.status == null">
              Дождитесь загрузки
            </span>
            <span
              v-else
              class="res-mess"
              :class="resp.status == true ? 'success' : 'error'">
              {{ resp.mess }}
            </span>
          </div>
        </div>
      </div>
      <div
        v-else>
        <div
          class="modalBlock-form normal-form">
          <div
            class="modalBlock-form__line">
            <label
              class="label">
              Фотография награды
            </label>
            <div
              v-if="!preview"
              class="modalBlock-form__line-input">
              <label
                for="uploadReward"
                class="btn addNew">
                <input
                  type="file"
                  id="uploadReward"
                  @change="changeUpload"
                  accept=".jpg, .jpeg, .png">
                Зарузить фото
              </label>
            </div>
            <div
              v-else
              class="modalBlock-form__line-imglist">
              <div
                class="modalBlock-form__line-imglist__item">
                <a
                  href="/delete"
                  class="delete"
                  @click.prevent="deletePreview()">
                  <img
                    src="/img/icons/closedel.png">
                </a>
                <label
                  for="item">
                  <div
                    class="modalBlock-form__line-imglist__item-img"
                    :style="`background-image: url(${preview.src})`">
                  </div>
                </label>
              </div>
            </div>
          </div>
          <div
            class="modalBlock-form__line">
            <label
              for="title"
              class="label">
              Заголовок награды
            </label>
            <div class="modalBlock-form__line-input">
              <textarea
                rows="2"
                id="title"
                v-model.trim="title"
                class="textarea"></textarea>
            </div>
          </div>
          <div
            class="modalBlock-form__line">
            <label
              for="desc"
              class="label">
              Подробнее о награде
            </label>
            <div class="modalBlock-form__line-input">
              <textarea
                rows="6"
                id="desc"
                v-model.trim="desc"
                class="textarea"></textarea>
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
            class="btn send"
            @click="send()">
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

    </div>

  </modal-layout>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import http from '@/utils/api';

import ModalLayout from '@/components/Modals/ModalLayout';

export default {
  components: {
    ModalLayout,
  },
  data() {
    return {
      title: '',
      preview: '',
      desc: '',
      resp: {
        status: null,
        mess: '',
      },
      percent: 0,
      loading: false,
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('rewards', ['addReward']),
  },
  watch: {
    preview() {
      this.resp.status = null;
      this.resp.mess = '';
    }
  },
  methods: {
    ...mapMutations('rewards', ['CHANGE_ADD_REWARD_MODAL']),

    close() {
      this.loading = false;
      this.percent = 0;
      this.title = '';
      this.desc = '';
      this.preview = '';
      this.resp = { status: null, mess: '' };
      this.CHANGE_ADD_REWARD_MODAL({ bg: false, modal: false, })
    },

    deletePreview() { // Удаление из превью
      this.preview = '';
    },

    changeUpload(e) {
      const file = e.target.files[0];
      const image = new Image();

      const vm = this;
      let reader = new FileReader();
      reader.onload = (function(theFile) {
        return function(e) {
          const img = e.target.result;
          vm.preview = {file: file, src: img};
        }
      })(file);

      reader.readAsDataURL(file);
    },

    async send() {
      this.resp = { status: null, mess: '' };
      if (this.preview == '') {
        this.resp.status = false;
        this.resp.mess = 'Вы не выбрали фотографию';
        return false
      }
      if (this.title == '') {
        this.resp.status = false;
        this.resp.mess = 'Вы не ввели заголовок';
        return false
      }

      const form = new FormData();

      form.append('title', this.title);
      form.append('desc', this.desc);
      form.append('image', this.preview.file);

      try {
        this.loading = true;
        const response = await http.post('/api/v1/rewards', form, {
          headers: {
            'Authorization': `Bearer ${this.user.token}`
          },
          params: {
            user_id: this.user.user_id,
          },
          onUploadProgress: function( progressEvent ) {
            let percentCompleted = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
            this.onProgress(percentCompleted)
            return percentCompleted;
          }.bind(this),
        })

        this.resp.status = response.data.success;
        this.resp.mess = response.data.message;

        this.$store.dispatch('rewards/getRewards', {user_id: this.$route.params.id});
        this.$store.dispatch('rewards/getRewardsMain', {user_id: this.$route.params.id})

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

    onProgress(progress) {
      this.percent = progress;
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/add-reward.sass'
</style>
