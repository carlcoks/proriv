<template>

  <div
    class="resume-block">
    <div
      class="resume-block__title">
      О себе
      <a
        v-if="admin"
        href="/edit"
        title="Редактировать"
        @click.prevent="aboutEdit = true, newAbout = about">
        <img
          src="/img/icons/edit.png">
      </a>
    </div>
    <div
      class="resume-block__text">
      <div
        v-if="!aboutEdit">
        <p>
          {{ about }}
        </p>
      </div>
      <div
        v-else>
        <textarea
          col="3"
          v-model.trim="newAbout"></textarea>
        <div
          class="save-btns">
          <div>

          </div>
          <div
            class="save-btns__right">
            <button
              class="btn addNew"
              @click="aboutEdit = false">
              Отмена
            </button>
            <button
              class="btn infoBtn"
              @click="save()">
              Сохранить
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapMutations, mapActions } from 'vuex';

export default {
  props: ['admin', 'about'],
  data() {
    return {
      aboutEdit: false, // Редактирование о себе
      newAbout: '', // Редактируемое о себе
    }
  },
  methods: {
    ...mapActions('resume', ['saveResume']),
    ...mapMutations('resume', ['UPDATE_RESUME']),

    save() {
      this.saveResume({
        name: 'resume',
        data: {
          value: this.newAbout,
        }
      });
      this.UPDATE_RESUME({ value: this.newAbout })

      this.aboutEdit = false;
      this.newAbout = '';
    },
  },
}
</script>

<style lang="css">
</style>
