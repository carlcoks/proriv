<template>

  <div
    v-if="photo">

    <modal-layout
      :bgShow="true"
      :modalShow="true"
      @close="close()">

      <div
        class="modalBlock video-page no-pad">
        <div
          class="video-page__img">
          <img
            class="image"
            :src="`/api/${photo.single.src}/${photo.single.image}`">
        </div>
        <div
          class="photo-page__about">
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
                {{ returnDate(photo.single.date_created) }}
              </div>
            </div>
          </div>
          <div
            class="about-info">
            <div
              v-if="!edit"
              class="about-info__text">
              {{ photo.single.about }}
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
              @click.prevent="edit = true, editText = photo.about">
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
import { mapState, mapMutations } from 'vuex';
import modules from '@/modules/user';
import http from '@/utils/api';

import ModalLayout from '@/components/Modals/ModalLayout';
// import CommentsBlock from './CommentsBlock';

export default {
  name: 'user-video',
  asyncData({ store, route }) {
    // return store.dispatch('photos/getPhoto', { user_id: route.params.id, photo_id: route.params.photo });
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
    ...mapState('photos', ['photo']),
  },
  methods: {
    ...mapMutations('photos', ['CHANGE_PHOTO']),

    async saveAbout() {
      const data = {
        about: this.editText,
      };

      try {
        const response = await http.put('/api/v1/photo', {
          user_id: this.user.user_id,
          photo_id: this.photo.id,
          data,
        }, {
          headers: {
            'Authorization': `Bearer ${this.user.token}`
          }
        })

        if (response.data.success)
          this.CHANGE_PHOTO({ single: { about: this.editText } });

        this.edit = false;
        this.editText = '';
      } catch(e) {
        console.log(e);
      }
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
