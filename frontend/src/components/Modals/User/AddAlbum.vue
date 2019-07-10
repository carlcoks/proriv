<template>

  <modal-layout
    :bgShow="addAlbum.bg"
    :modalShow="addAlbum.modal"
    @close="close()">

    <div
      class="modalBlock add-album">
      <div
        class="modalBlock-title">
        Добавление альбома
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
            <div class="modalBlock-form__line-input">
              <textarea
                col="2"
                v-model.trim="title"
                class="textarea"></textarea>
            </div>
          </div>
          <div
            class="modalBlock-form__line">
            <label
              class="label">
              Загрузка фотографий
            </label>
            <div class="modalBlock-form__line-input">
              <label
                for="uploadPhoto"
                class="btn addNew">
                <input
                  type="file"
                  id="uploadPhoto"
                  @change="changeUpload"
                  multiple
                  accept=".jpg, .jpeg, .png">
                Зарузить фото
              </label>
            </div>
          </div>
          <div
            v-if="previews.length > 0"
            class="modalBlock-form__line">
            <label
              class="label">
              Фотографии
            </label>
            <div
              class="modalBlock-form__line-imglist">
              <div
                class="modalBlock-form__line-imglist__item"
                v-for="(item, i) in previews" :key="i">
                <a
                  href="/delete"
                  class="delete"
                  @click.prevent="deletePreview(i)">
                  <img
                    src="/img/icons/closedel.png">
                </a>
                <label
                  :for="`item_${i}`">
                  <div
                    class="modalBlock-form__line-imglist__item-img"
                    :style="`background-image: url(${item.src})`">
                  </div>
                  <div
                    class="modalBlock-form__line-imglist__item-block">
                    <input
                      type="radio"
                      :id="`item_${i}`"
                      name="inputRadio"
                      @click="checkCover(i)"
                      :checked="item.check ? true : false">
                    <span
                      class="cover">
                      Обложка
                    </span>
                  </div>
                </label>
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
import { mapState, mapMutations } from 'vuex';
import ModalLayout from '@/components/Modals/ModalLayout';
import http from '@/utils/api';

export default {
  components: {
    ModalLayout,
  },
  data() {
    return {
      title: '',
      previews: [], // не более 8
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
    ...mapState('albums', ['addAlbum']),
  },
  watch: {
    previews() {
      this.resp.status = null;
      this.resp.mess = '';
    }
  },
  methods: {
    ...mapMutations('albums', ['CHANGE_ADD_ALBUM_MODAL']),

    close() {
      this.loading = false;
      this.percent = 0;
      this.title = '';
      this.previews = [];
      this.resp = { status: null, mess: '' };
      this.CHANGE_ADD_ALBUM_MODAL({ bg: false, modal: false, })
    },

    checkCover(id) { // Выбор обложки
      this.previews.map((item, i) => {
        item.check = false;
        if (i == id) item.check = true
      })
    },

    deletePreview(i) { // Удаление из превью
      this.previews.splice(i, 1);
    },

    changeUpload(e) {
      const files = e.target.files;

      if (this.previews.length + files.length > 8) {
        this.resp.status = false;
        this.resp.mess = 'Не более 8 фотографий';
        return false;
      }

      for (let key = 0; key < files.length; key++) {
        let file = files[key];
        const image = new Image();

        const vm = this;
        let reader = new FileReader();
        reader.onload = (function(theFile) {
          return function(e) {
            const img = e.target.result;
            vm.previews.push({ file: file, src: img, check: false, });
          }
        })(file);

        reader.readAsDataURL(file);
      }
    },

    async send() {
      this.resp = { status: null, mess: '' };
      if (this.previews.length == 0) {
        this.resp.status = false;
        this.resp.mess = 'Вы не выбрали фотографии';
        return false
      }
      let checked = false;
      this.previews.map(item => {
        if (item.check) checked = true;
      })
      if (!checked) {
        this.resp.status = false;
        this.resp.mess = 'Вы не выбрали обложку';
        return false
      }

      const form = new FormData();

      form.append('title', this.title);
      form.append('length', this.previews.length);

      this.previews.map((item, i) => {
        if (item.check)
          form.append('img_cover', item.file);
        else
          form.append('img'+i, item.file);
      })

      try {
        this.loading = true;
        const response = await http.post('/api/v1/user-albums', form, {
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

        this.$store.dispatch('albums/getAlbums', {user_id: this.$route.params.id});
        this.$store.dispatch('photos/getPhotosMain', {user_id: this.$route.params.id});

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
  @import '@/styles/components/modals/add-album.sass'
</style>
