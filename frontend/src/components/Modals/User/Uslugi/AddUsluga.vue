<template>

  <modal-layout
    :bgShow="addUsluga.bg"
    :modalShow="addUsluga.modal"
    @close="close()">

    <div
      class="modalBlock add-usluga">
      <div
        class="modalBlock-title">
        Добавление услуги
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
          class="add-usluga__form">
          <div
            class="add-usluga__form-left">
            <label
              for="uploadCoverUsluga"
              class="cover"
              :style="`background-image: url(${cover.src ? cover.src : `/img/icons/usluga-add.jpg`})`">
              <input
                type="file"
                id="uploadCoverUsluga"
                @change="uploadCoverUsluga"
                accept="image/*" />
              <div
                class="cover-label"
                :class="cover.src ? 'active' : ''">
                {{ cover.src ? 'Изменить обложку' : 'Добавить обложку' }}
              </div>
            </label>
          </div>
          <div
            class="add-usluga__form-right">

          </div>
        </div>
        <div
          class="modalBlock-btn threeBtns">
          <div></div>
          <div
            class="btns">
            <button
              class="btn addNew"
              @click="close()">
              Отмена
            </button>
            <button
              class="btn send"
              @click="send()">
              Опубликовать
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

    </div>

  </modal-layout>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';

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
      resp: {
        status: null,
        mess: '',
      },
      // item: Object.cloneDeep(videokusrModel),
    }
  },
  computed: {
    ...mapState('uslugi', ['addUsluga']),
  },
  methods: {
    ...mapMutations('uslugi', ['CHANGE_ADD_USLUGA']),

    close() {
      this.percent = 0;
      this.loading = false;
      this.CHANGE_ADD_USLUGA({ bg: false, modal: false, })
    },

    uploadCoverUsluga(e) {
      const file = e.target.files[0];
      this.cover = { file: file, src: URL.createObjectURL(file) };
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/add-usluga.sass'
</style>
