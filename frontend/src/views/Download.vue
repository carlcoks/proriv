<template>

  <section
    class="download">
    <div
      class="wr">

      <div
        class="download-block">
        <router-link
          to="/"
          class="download-block__back">
          <img
            src="/img/icons/back.svg">
          Вернуться назад
        </router-link>

        <div
          class="download-block__form"
          id="dropzone">
          <div
            class="icon">
            <img
              src="/img/icons/excel.svg">
          </div>
          <div
            class="title">
            Перенесите файл в формате .exel с рабочего стола
          </div>
          <div
            class="or">
            или
          </div>
          <div
            class="btn">
            <input
              type="file"
              @change="uploadFile($event.target.files)"
              multiple
              accept=".csv, application/vnd.openxmlformats-officedocument.spreadsheetml.sheet, application/vnd.ms-excel"
              id="uploadFile" />
            <label
              for="uploadFile"
              class="btn selectFile"
              :class="disabled ? 'disabled' : ''">
              Выбрать файл вручную
            </label>
          </div>
        </div>

      </div>

    </div>

    <div
      v-if="uploaded.length > 0 || loading == 'end'"
      class="download-block__files">
      <div
        class="wr">
        <div
          v-if="loading == null || loading == true || loading == 'start'"
          class="download-block__files-content">
          <div
            class="downloaded">
            Загружен {{ uploaded.length }} файла:
            <div
              class="downloaded-list">
              <div
                class="downloaded-list__item"
                v-for="(item, i) in uploaded" :key="i">
                {{ item.name }}<span
                  v-if="loading != 'start'"
                  class="delete"
                  @click="deleteFile(i)">
                  <img
                    src="/img/icons/error.svg">
                </span>{{ i < uploaded.length - 1 ? `,&nbsp;` : '' }}
              </div>
            </div>
          </div>
          <div
            class="download-block__files-btns">
            <button
              class="btn startAnalize"
              @click.prevent="loading != 'start' ? analize() : ''">
              {{ loading == 'start' ? 'Идёт анализ...' : 'Начать анализ'}}
            </button>
          </div>
        </div>
        <div
          v-else
          class="download-block__files-btns">
          <button
            class="btn startAnalize">
            Скачать результат
          </button>
          <router-link
            to="/analytics"
            class="link">
            Перейти в аналитику
            <img
              src="/img/icons/next.svg">
          </router-link>
        </div>
      </div>
    </div>
  </section>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      disabled: false,
      uploaded: [],
      loading: null,
    }
  },
  mounted() {
    const self = this;
    document.querySelector("#dropzone").addEventListener("dragenter", function (e) {
      document.querySelector("#dropzone").classList.add('active');
    });

    document.querySelector("#dropzone").addEventListener("dragleave", function (e) {
      e.preventDefault();
      document.querySelector("#dropzone").classList.remove('active');
    });

    document.querySelector("#dropzone").addEventListener("dragover", function (e) {
      e.preventDefault();
      document.querySelector("#dropzone").classList.add('active');
    });

    document.querySelector("#dropzone").addEventListener("drop", function (e) {
      e.preventDefault();
      document.querySelector("#dropzone").classList.remove('active');

      const files = e.dataTransfer.files;
      self.uploadFile(files);
    });
  },
  beforeLeave() {
    document.querySelector("#dropzone").removeEventListener("dragenter");
    document.querySelector("#dropzone").removeEventListener("dragleave");
    document.querySelector("#dropzone").removeEventListener("dragover");
    document.querySelector("#dropzone").removeEventListener("drop");
  },
  methods: {
    ...mapActions('download', ['uploadForm']),

    uploadFile(files) {
      this.disabled = true;

      const self = this;
      for (let i = 0; i < files.length; i++) {
        let reader = new FileReader();

        reader.onload = function(e) {
          let content = e.target.result;
          self.uploaded.push({ file: files[i], name: files[i].name.split('.')[0] })
        }

        reader.readAsText(files[i]);
      }
    },

    deleteFile(i) {
      this.uploaded.splice(i, 1);
      this.disabled = false;
    },

    async analize() {
      const form = new FormData();

      this.uploaded.map((item, i) => {
        form.append('file_'+i, item.file);
      })

      this.loading = 'start';

      const response = await this.uploadForm(form);

      if (response.success) {
        this.loading = 'end';
      }

      this.disabled = false;
      this.uploaded = [];
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/download.sass'
</style>
