<template>

  <div
    v-if="single">

    <modal-layout
      :bgShow="true"
      :modalShow="true"
      @close="close()">

      <div
        class="modalBlock video-page no-pad">
        <div
          class="video-page__video">
          <video
            v-if="single.src && single.video"
            class="video"
            :src="`/api/${single.src}/${single.video}`"
            controls
            preload="auto"></video>
          <iframe
            v-if="single.link"
            class="iframe"
            :src="returnLink(single.link)"
            frameborder="0"></iframe>
        </div>
        <div
          class="video-page__about">
          <div
            class="user-info">
            <img
              class="image"
              :src="returnAva()">
            <div
              class="user-info__block">
              <div
                class="user-info__block-name">
                {{ user_profile.firstname }} {{ user_profile.lastname }}
              </div>
              <div
                class="user-info__block-date">
                {{ returnDate(single.date_created) }}
              </div>
            </div>
          </div>
          <div
            class="about-info">
            <div
              v-if="!edit"
              class="about-info__text">
              {{ single.about }}
            </div>
            <div
              v-else
              class="about-info__edit">
              <textarea
                class="about-info__edit-textarea"
                col="3"
                v-model.trim="editText"></textarea>
              <div
                class="about-info__edit-btns">
                <button
                  class="btn addNew"
                  @click="edit = false, editText = ''">
                  Отмена
                </button>
                <button
                  class="btn send"
                  @click="saveAbout()">
                  Сохранить
                </button>
              </div>
            </div>
            <a
              v-if="!edit && user_profile.id == user.user_id"
              href="/edit"
              class="edit"
              title="Редактировать описание"
              @click.prevent="edit = true, editText = single.about">
              <img
                src="/img/icons/edit.png">
            </a>
          </div>
        </div>

        <!-- <comments-block
          :comments="photo.comments"
          :photoId="$route.params.photo" /> -->

      </div>

    </modal-layout>

  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';
import modules from '@/modules/user';
import functions from '@/modules/functions';

import ModalLayout from '@/components/Modals/ModalLayout';
// import CommentsBlock from './CommentsBlock';

export default {
  name: 'user-video',
  asyncData({ store, route }) {
    return store.dispatch('videos/getVideo', { user_id: route.params.id, id: route.params.video });
  },
  components: {
    ModalLayout,
    // CommentsBlock,
  },
  data() {
    return {
      edit: false,
      editText: '',
    }
  },
  computed: {
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
    ...mapState('videos', ['single']),
  },
  methods: {
    ...mapActions('videos', ['updateVideo']),

    async saveAbout() {
      const data = {
        about: this.editText,
      };

      const response = await this.updateVideo({data: data, id: this.$route.params.video});

      if (response.success) {
        this.edit = false;
        this.editText = '';
      }
    },

    returnLink(link) {
      return functions.returnVideoLink(link);
    },

    close() {
      if (window.history.length <= 2) {
        this.$router.push(`/user/${this.$route.params.id}`);
      } else {
        if (window.sessionStorage) {
          this.$router.push(sessionStorage.getItem('prevUrl'))
        } else {
          this.$router.push(`/user/${this.$route.params.id}`);
        }
      }
    },

    returnDate(data) {
      const date = new Date(data);

      let day = date.getDate();
      day = day < 10 ? '0' + day : day;
      let month = date.getMonth()+1;
      month = month < 10 ? '0' + month : month;
      const year = date.getFullYear();
      return day+'.'+month+'.'+year;
    },

    returnAva() {
      return modules.returnAvatarMini(this.user_profile.gender, this.user_profile.src, this.user_profile.image);
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/user/videos.sass'
</style>
