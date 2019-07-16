<template>

  <modal-layout
    :bgShow="addUrok.bg"
    :modalShow="addUrok.modal"
    @close="close()">

    <div
      class="modalBlock add-kurs">
      <div
        class="modalBlock-title">
        Добавление видеоурока
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
          class="add-kurs__form">

          <div
            class="add-kurs__form-line">
            <label
              class="add-kurs__form-line__label">
              Обложка видео
            </label>
            <div
              class="add-kurs__form-line__input">
              <label
                v-if="!cover"
                for="uploadPhotoUrok"
                class="btn addNew">
                <input
                  type="file"
                  id="uploadPhotoUrok"
                  @change="uploadPhotoUrok"
                  accept="image/*" />
                Загрузить фото
              </label>
              <div
                v-else
                class="cover"
                :style="`background-image: url(${cover.src})`">
                <a
                  href="/delete"
                  class="delete"
                  @click.prevent="deleteCover()">
                  <img
                    src="/img/icons/closedel.png">
                </a>
              </div>
              <span
                v-show="errors.cover"
                class="error-mess">
                {{ errors.cover }}
              </span>
            </div>
          </div>
          <div
            class="add-kurs__form-line">
            <label
              for="price"
              class="add-kurs__form-line__label">
              Цена видео
            </label>
            <div
              class="add-kurs__form-line__input">
              <div
                class="price">
                <input
                  type="text"
                  id="price"
                  class="inpt with-text"
                  @keydown="checkNumber"
                  v-model.trim="item.price"
                  placeholder="0" />
                <span
                  class="text">
                  руб.
                </span>
              </div>
              <span
                v-show="errors.price"
                class="error-mess">
                {{ errors.price }}
              </span>
            </div>
          </div>
          <div
            class="add-kurs__form-line">
            <label
              for="title"
              class="add-kurs__form-line__label">
              Заголовок видео
            </label>
            <div
              class="add-kurs__form-line__input">
              <textarea
                rows="2"
                id="title"
                class="textarea"
                @input="inputWatch"
                v-model.trim="item.title"
                placeholder="Введите заголовок"></textarea>
              <span
                v-show="errors.title"
                class="error-mess">
                {{ errors.title }}
              </span>
            </div>
          </div>
          <div
            class="add-kurs__form-line">
            <label
              for="desc"
              class="add-kurs__form-line__label">
              Подробнее о видео
            </label>
            <div
              class="add-kurs__form-line__input">
              <textarea
                rows="2"
                id="desc"
                class="textarea"
                v-model.trim="item.description"
                placeholder="Введите подробный текст о видеоуроке"></textarea>
            </div>
          </div>
          <div
            class="add-kurs__form-line">
            <label
              class="add-kurs__form-line__label">
              Превью видео
            </label>
            <div
              class="add-kurs__form-line__input">
              <label
                v-if="!preview"
                for="uploadPreviewUrok"
                class="btn addNew">
                <input
                  type="file"
                  id="uploadPreviewUrok"
                  @change="uploadPreviewUrok"
                  accept="video/*" />
                Загрузить видеопревью
              </label>
              <div
                v-else
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
                    :src="preview.src"></video>
                </div>
              </div>
              <span
                v-show="errors.preview"
                class="error-mess">
                {{ errors.preview }}
              </span>
            </div>
          </div>
          <div
            class="add-kurs__form-line">
            <label
              class="add-kurs__form-line__label">
              Прикрепленные файлы
            </label>
            <div
              class="add-kurs__form-line__input">
              <label
                for="uploadFilesUrok"
                class="btn addNew">
                <input
                  type="file"
                  id="uploadFilesUrok"
                  multiple
                  @change="uploadFilesUrok"
                  accept=".docx, .doc, application/msword, .txt, .pdf" />
                Прикрепить
              </label>
              <div
                class="files">
                <div
                  class="files-item"
                  v-for="(item, i) in files" :key="i">
                  <a
                    href="/delete"
                    class="delete"
                    @click.prevent="deleteFilesUrok(i)">
                    <img
                      src="/img/icons/closedel.png">
                  </a>
                  {{ item.real_name }}
                </div>
              </div>
              <span
                v-show="errors.files"
                class="error-mess">
                {{ errors.files }}
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
            class="btn send"
            @click="send()">
            Добавить
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
import videourokModel from '@/models/model-videourok';

import ModalLayout from '@/components/Modals/ModalLayout';

export default {
  components: {
    ModalLayout,
  },
  data() {
    return {
      percent: 0,
      loading: false,
      cover: '',
      preview: '',
      files: [],
      errors: {
        files: '',
        cover: '',
        price: '',
        title: '',
        preview: '',
      },
      resp: {
        status: null,
        mess: '',
      },
      item: Object.cloneDeep(videourokModel),
    }
  },
  computed: {
    ...mapState('videouroki', ['addUrok']),
  },
  watch: {
    files() {
      this.errors.files = '';
    },
  },
  methods: {
    ...mapActions('videouroki', ['addVideourok']),
    ...mapMutations('videouroki', ['CHANGE_ADD_UROK']),

    inputWatch() {
      this.errors.title = '';
    },

    checkNumber(e) {
      this.errors.price = '';
      return functions.checkNumber(e);
    },

    uploadPhotoUrok(e) {
      this.errors.cover = '';
      const file = e.target.files[0];
      this.cover = { file: file, src: URL.createObjectURL(file) };
    },

    deleteCover() {
      this.cover = '';
    },

    uploadPreviewUrok(e) {
      this.errors.preview = '';
      const file = e.target.files[0];
      this.preview = { file: file, src: URL.createObjectURL(file) };
    },

    deletePreview() {
      this.preview = '';
    },

    uploadFilesUrok(e) {
      const files = e.target.files;

      if (parseInt(this.files.length) + parseInt(files.length) >= 10)
        this.errors.files = 'Не более 10 файлов';

      for (let i = 0; i < files.length; i++) {
        if (this.files.length < 10) {
          this.files.push({ file: files[i], real_name: files[i].name })
        }
      }
    },

    deleteFilesUrok(i) {
      this.files.splice(i, 1);
    },

    close() {
      this.percent = 0;
      this.loading = false;
      this.cover = '';
      this.preview = '';
      this.files = [];
      this.errors = {
        files: '',
        cover: '',
        price: '',
        title: '',
        preview: '',
      };
      this.CHANGE_ADD_UROK({ bg: false, modal: false, })
    },

    async send() {
      this.resp = { status: null, mess: '' };
      if (this.cover == '') {
        this.errors.cover = 'Вы не выбрали обложку видео';
        return false;
      }
      if (this.item.price == '') {
        this.errors.price = 'Вы не указали цену видео';
        return false;
      }
      if (this.item.title == '') {
        this.errors.title = 'Вы не указали заголовок видео';
        return false;
      }
      if (this.preview == '') {
        this.errors.preview = 'Вы не выбрали превью видео';
        return false;
      }

      const form = new FormData();

      form.append('cover', this.cover.file);
      form.append('preview', this.preview.file);

      form.append('title', this.item.title);
      form.append('description', this.item.description);
      form.append('price', this.item.price);
      form.append('kurs_id', this.item.kurs_id);

      form.append('length', 2 + parseInt(this.files.length));

      if (this.files.length > 0) {
        this.files.map((item, i) => {
          form.append('file_'+i, item.file);
        })
      }

      this.loading = true;

      const response = await this.addVideourok({data: form, onProgress: this.onProgress});

      if (response.success) {
        setTimeout(() => {
          this.close();
        }, 2000)
      }

      this.resp.status = response.success;
      this.resp.mess = response.message;

      // this.$store.dispatch('albums/getAlbums', {user_id: this.$route.params.id});
      // this.$store.dispatch('photos/getPhotosMain', {user_id: this.$route.params.id});
    },

    onProgress(progress) {
      this.percent = progress;
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/add-kurs.sass'
</style>
