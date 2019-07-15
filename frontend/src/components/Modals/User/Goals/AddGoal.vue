<template>

  <modal-layout
    :bgShow="addGoal.bg"
    :modalShow="addGoal.modal"
    @close="close()">

    <div
      class="modalBlock add-goal">
      <div
        class="modalBlock-title">
        Добавление цели
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
              Фотография цели
            </label>
            <div
              v-if="!preview"
              class="modalBlock-form__line-input">
              <label
                for="uploadGoal"
                class="btn addNew">
                <input
                  type="file"
                  id="uploadGoal"
                  @change="uploadGoal"
                  accept=".jpg, .jpeg, .png">
                Зарузить фото
              </label>
              <span
                v-if="errors.preview"
                class="error-mess">
                {{ errors.preview }}
              </span>
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
              Заголовок цели
            </label>
            <div class="modalBlock-form__line-input">
              <textarea
                rows="2"
                id="title"
                v-model.trim="itemEdit.title"
                class="textarea"></textarea>
              <span
                v-if="errors.title"
                class="error-mess">
                {{ errors.title }}
              </span>
            </div>
          </div>
          <div
            class="modalBlock-form__line">
            <label
              for="desc"
              class="label">
              Описание цели
            </label>
            <div class="modalBlock-form__line-input">
              <textarea
                rows="6"
                id="desc"
                v-model.trim="itemEdit.about"
                class="textarea"></textarea>
            </div>
          </div>
          <div
            class="modalBlock-form__line"
            @mouseleave="showSport = false">
            <label
              for="category"
              class="label">
              Категория спорта цели
            </label>
            <div
              class="modalBlock-form__line-input">
              <input
                type="text"
                class="inpt"
                v-model.trim="sport"
                placeholder="Начните вводить вид спорта"
                id="category"
                @input="capitalize($event)"
                @focus="showSport = true" />
              <span
                v-if="errors.category"
                class="error-mess">
                {{ errors.category }}
              </span>
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

    </div>

  </modal-layout>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import goalModel from '@/models/model-goal';

import ModalLayout from '@/components/Modals/ModalLayout';

export default {
  components: {
    ModalLayout,
  },
  data() {
    return {
      percent: 0,
      loading: false,
      preview: '',
      sport: '',
      showSport: false,
      resp: {
        status: null,
        mess: '',
      },
      errors: {
        preview: '',
        title: '',
        category: '',
      },
      itemEdit: Object.cloneDeep(goalModel),
    }
  },
  computed: {
    ...mapState(['allsport']),
    ...mapState('goals', ['addGoal']),
    filterSport() {
      const allSport = this.allsport.slice();

      return allSport.filter(item => {
        if (this.sport != '')
          return item.name.indexOf(this.sport) > -1;

        return item;
      })
    },
  },
  watch: {
    preview() {
      this.errors.preview = '';
    },
    sport() {
      this.errors.category = '';
    }
  },
  methods: {
    ...mapActions('goals', ['addItemGoal']),
    ...mapMutations('goals', ['CHANGE_ADD_GOAL']),

    close() {
      this.errors = { preview: '', title: '', category: '', };
      this.resp = { status: null, mess: '', };
      this.percent = 0;
      this.loading = false;
      this.preview = '';
      this.sport = '';
      this.showSport = false;
      this.CHANGE_ADD_GOAL({ bg: false, modal: false, })
    },

    capitalize(e) {
      this.sport = e.target.value.charAt(0).toUpperCase() + e.target.value.slice(1);
    },

    chooseSport(item) {
      const { id, name } = item;
      this.sport = name;
      this.itemEdit.category = id;
      this.showSport = false;
    },

    uploadGoal(e) {
      const file = e.target.files[0];
      this.preview = { file: file, src: URL.createObjectURL(file) };
    },

    deletePreview() {
      this.preview = '';
    },

    async send() {
      this.errors = { preview: '', title: '', category: '', };
      if (this.preview == '') {
        this.errors.preview = 'Выберите основное фото цели';
        return false;
      }
      if (this.itemEdit.title == '') {
        this.errors.title = 'Введите заголовок цели';
        return false;
      }
      if (this.itemEdit.category == '') {
        this.errors.category = 'Выберите категорию спорта цели';
        return false;
      }

      this.loading = true;

      const form = new FormData();

      form.append('file', this.preview.file);
      form.append('title', this.itemEdit.title);
      form.append('about', this.itemEdit.about);
      form.append('category', this.itemEdit.category);

      const response = await this.addItemGoal({data: form, onProgress: this.onProgress});

      this.resp.status = response.success;
      this.resp.mess = response.message;

      if (response.success) {
        setTimeout(() => {
          this.close();
        }, 2000)
      }
    },

    onProgress(progress) {
      this.percent = progress;
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/add-goal.sass'
</style>
