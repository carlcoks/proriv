<template>

  <modal-layout
    :bgShow="addVideo.bg"
    :modalShow="addVideo.modal"
    @close="close()">

    <div
      class="modalBlock add-video">
      <div
        class="modalBlock-title">
        Добавление видео
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
              for="title"
              class="label">
              Заголовок
            </label>
            <div
              class="modalBlock-form__line-input">
              <textarea
                col="2"
                v-model.trim="title"
                class="textarea"
                placeholder="Введите заголовок"></textarea>
              <span
                v-if="errors.title"
                class="error-mess">
                {{ errors.title }}
              </span>
            </div>
          </div>
          <div
            class="modalBlock-form__half">
            <div
            class="modalBlock-form__line">
            <label
              for=""
              class="label">
              Загрузка
            </label>
            <div
              v-if="!video"
              class="modalBlock-form__line-input">
              <label
                for="uploadVideo"
                class="btn addNew"
                :class="link != '' ? 'disabled' : ''">
                <input
                  type="file"
                  id="uploadVideo"
                  @change="uploadVideo"
                  accept="video/*"
                  :disabled="link != '' ? true : false">
                Загрузить видео
              </label>
              <span
                v-if="errors.video"
                class="error-mess">
                {{ errors.video }}
              </span>
            </div>
            <div
              v-else
              class="modalBlock-form__line-input">
              <div
                class="cover">
                <a
                  href="/delete"
                  class="delete"
                  @click.prevent="deletePreview()">
                  <img
                    src="/img/icons/closedel.png">
                </a>
                <div
                  class="video">
                  <video
                    :src="`${video.src}`">
                  </video>
                </div>
              </div>
            </div>
          </div>
            <div
              class="modalBlock-form__line">
              <label
                for="link"
                class="label">
                Вставьте ссылку на видео
              </label>
              <div
                class="modalBlock-form__line-input">
                <input
                  type="text"
                  id="link"
                  class="inpt"
                  v-model.trim="link"
                  :disabled="video != '' ? true : false"
                  placeholder="Ссылка на видео" />
                <span
                  v-if="errors.link"
                  class="error-mess">
                  {{ errors.link }}
                </span>
              </div>
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
import functions from '@/modules/functions';

import ModalLayout from '@/components/Modals/ModalLayout';

export default {
  components: {
    ModalLayout,
  },
  data() {
    return {
      title: '',
      video: '', // загрузка видео
      link: '', // ссылка на видео
      resp: {
        status: null,
        mess: '',
      },
      percent: 0,
      loading: false,
      errors: {
        title: '',
        video: '',
        link: '',
      }
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('videos', ['addVideo']),
  },
  watch: {
    title() {
      this.errors.title = '';
    },
    link() {
      this.errors.video = '';
      this.errors.link = '';
    },
    previews() {
      this.resp.status = null;
      this.resp.mess = '';
    }
  },
  methods: {
    ...mapActions('videos', ['addNewVideo']),
    ...mapMutations('videos', ['CHANGE_ADD_VIDEO_MODAL']),

    close() {
      this.loading = false;
      this.percent = 0;
      this.title = '';
      this.video = '';
      this.link = '';
      this.resp = { status: null, mess: '' };
      this.errors = { title: '', video: '', link: '' };
      this.CHANGE_ADD_VIDEO_MODAL({ bg: false, modal: false, })
    },

    uploadVideo(e) {
      this.errors.video = '';
      const file = e.target.files[0];
      this.video = { file: file, src: URL.createObjectURL(file) };
    },

    deletePreview() {
      this.video = '';
    },

    async send() {
      this.resp = { status: null, mess: '' };

      if (this.title == '') {
        this.errors.title = 'Введите заголовок';
        return false;
      }
      if (this.video == '' && this.link == '') {
        this.errors.video = 'Выберите видео или вставьте ссылку';
        return false
      }

      if (this.link != '') {
        if (functions.isValidUrl(this.link)) {
          if (this.link.indexOf('youtube.com') == -1 && this.link.indexOf('youtu.be') == -1) {
            this.errors.link = 'Некорректная ссылка';
            return false;
          }
        } else {
          this.errors.link = 'Некорректная ссылка';
          return false;
        }
      }

      const form = new FormData();

      form.append('title', this.title);

      if (this.video != '')
        form.append('file', this.video.file);
      else if (this.link != '')
        form.append('link', this.link);

      this.loading = true;
      const response = await this.addNewVideo({ data: form, onProgress: this.onProgress });

      this.$store.dispatch('videos/getVideosMain', {user_id: this.$route.params.id})

      this.resp.status = response.success;
      this.resp.mess = response.message;

      if (response.success)
        setTimeout(() => {
          this.close();
        }, 2000)
    },

    onProgress(progress) {
      this.percent = progress;
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/add-video.sass'
</style>
