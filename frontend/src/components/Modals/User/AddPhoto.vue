<template>

  <modal-layout
    :bgShow="addPhoto.bg"
    :modalShow="addPhoto.modal"
    @close="close()">

    <div
      class="modalBlock add-album">
      <div
        class="modalBlock-title">
        Добавление фотографии
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
              Загрузка фотографий
            </label>
            <div
              class="modalBlock-form__line-input">
              <label
                v-if="!preview"
                for="uploadSinglePhoto"
                class="btn addNew">
                <input
                  type="file"
                  id="uploadSinglePhoto"
                  @change="uploadSinglePhoto"
                  accept=".jpg, .jpeg, .png">
                Зарузить фото
              </label>
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
                  <div
                    class="modalBlock-form__line-imglist__item-img"
                    :style="`background-image: url(${preview.src})`">
                  </div>
                </div>
              </div>
              <span
                v-if="errors.photo"
                class="error-mess">
                {{ errors.photo }}
              </span>
            </div>
          </div>
        </div>
        <div
          class="modalBlock-btn twoBtns">
          <button
            class="btn addNew"
            @click="close()">
            Отменить
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
import { mapState, mapMutations, mapActions } from 'vuex';
import http from '@/utils/api';

import ModalLayout from '@/components/Modals/ModalLayout';

export default {
  components: {
    ModalLayout,
  },
  data() {
    return {
      preview: '',
      resp: {
        status: null,
        mess: '',
      },
      errors: {
        photo: '',
      },
      percent: 0,
      loading: false,
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('albums', ['addPhoto', 'single']),
  },
  watch: {
    preview() {
      this.errors.photo = '';
    }
  },
  methods: {
    ...mapActions('albums', ['addSinglePhoto']),
    ...mapMutations('albums', ['CHANGE_ADD_PHOTO_MODAL']),

    close() {
      this.loading = false;
      this.percent = 0;
      this.preview = '';
      this.resp = { status: null, mess: '' };
      this.errors.photo = '';
      this.CHANGE_ADD_PHOTO_MODAL({ bg: false, modal: false, })
    },

    deletePreview() { // Удаление превью
      this.preview = '';
    },

    uploadSinglePhoto(e) {
      this.errors.photo = '';
      const file = e.target.files[0];
      this.preview = { file: file, src: URL.createObjectURL(file) };
    },

    async send() {
      this.resp = { status: null, mess: '' };
      this.errors.photo = '';
      if (this.preview == '') {
        this.errors.photo = 'Вы не выбрали фотографию';
        return false;
      }

      this.loading = true;

      const form = new FormData();
      form.append('file', this.preview.file);

      const response = await this.addSinglePhoto({ data: form, id: this.$route.params.album, onProgress: this.onProgress });

      this.resp.status = response.success;
      this.resp.mess = response.message;

      if (response.success) {
        setTimeout(() => {
          this.close();
        }, 2000)

        // this.$store.dispatch('albums/getAlbums', {user_id: this.$route.params.id});
        this.$store.dispatch('photos/getPhotosMain', {user_id: this.$route.params.id});
      }
    },

    onProgress(progress) {
      this.percent = progress;
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/add-album.sass'
</style>
