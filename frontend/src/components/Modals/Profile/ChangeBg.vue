<template>

  <modal-layout
    :bgShow="changeBg.bg"
    :modalShow="changeBg.modal"
    @close="close()">

    <div
      class="modalBlock changePhoto change-avatar">
      <div
        class="modalBlock-title">
        {{
          status == null ? 'Загрузка нового фона' :
          status == 'loading' ? 'Идёт загрузка' :
          status == 'crop' ? 'Обрезка фотографии' : ''
        }}
      </div>
      <div
        v-if="status == 'crop'"
        class="modalBlock-textsmall">
        Выбранная область будет показываться на вашей странице
      </div>
      <div
        class="modalBlock-body">

        <label
          v-if="status == null"
          for="selectFile"
          class="btn selectFile">
          <input
            id="selectFile"
            type="file"
            @change="selectFile"
            accept=".jpg, .jpeg, .png" />
          Выбрать файл
        </label>

        <div
          v-if="status == 'crop'"
          class="modalBlock-body__image">
          <img
            :src="preview">
        </div>

        <div
          v-if="status == 'loading'"
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

      </div>
      <div
        v-if="status == null"
        class="modalBlock-footer">
        <p
          class="text">
          Если у вас возникают проблемы с загрузкой, попробуйте выбрать фотографию меньшего размера.
        </p>
      </div>
    </div>

  </modal-layout>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import http from '@/utils/api';

import ModalLayout from '../ModalLayout';

export default {
  components: {
    ModalLayout,
  },
  data() {
    return {
      status: null,
      preview: '',
      percent: 0,
      resp: {
        status: null,
        mess: '',
      }
    }
  },
  computed: {
    ...mapState('layout', ['changeBg']),
    ...mapState('user', ['user'])
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_BG_MODAL']),
    ...mapMutations('profile', ['CHANGE_PROFILE']),

    close() {
      this.status = null;
      this.preview = '';
      this.percent = 0;
      this.resp = { status: null, mess: '' };
      this.CHANGE_BG_MODAL({ bg: false, modal: false, })
    },

    async selectFile(e) {
      const file = e.target.files[0];

      let form = new FormData();
      form.append('file', file);

      try {
        this.status = 'loading';
        const response = await http.post('/api/v1/user-bg', form, {
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

        if (response.data.data) {
          this.CHANGE_PROFILE({ user_info: response.data.data })
        }

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
  @import '@/styles/components/modals/change-avatar.sass'
</style>
