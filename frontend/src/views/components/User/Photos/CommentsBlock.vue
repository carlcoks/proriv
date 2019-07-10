<template>

  <div
    class="photo-page__comments">
    <div
      v-if="comments.length > 0"
      class="photo-page__comments-list">
      <div
        class="commentsItem"
        v-for="(item, i) in comments" :key="i">
        <div
          class="commentsItem-avatar">
          <img
            class="image"
            :src="returnAvatar(item.user.gender, item.user.user_info.src, item.user.user_info.image)">
        </div>
        <div
          class="commentsItem-comment">
          <div
            class="commentsItem-comment__name">
            {{ item.user.firstname }} {{ item.user.lastname }}
            <span
              class="date">
              {{ returnDate(item.date_created) }}
            </span>
          </div>
          <div
            class="commentsItem-comment__text">
            {{ item.comment }}
          </div>
        </div>
      </div>
    </div>
    <div
      v-if="user.auth"
      class="photo-page__comments-form">
      <input
        type="text"
        class="inpt"
        v-model.trim="message"
        placeholder="Оставить комментарий">
      <button
        class="btn"
        @click="send()">
        <img
          src="/img/icons/send.png">
      </button>
    </div>
  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import modules from '@/modules/user';
import http from '@/utils/api';

export default {
  props: ['comments', 'photoId'],
  data() {
    return {
      message: '',
    }
  },
  computed: {
    ...mapState('user', ['user']),
  },
  sockets: {
    addPhotoComment(data) {
      this.ADD_PHOTO_COMMENT(data);
    }
  },
  methods: {
    ...mapMutations('photos', ['CHANGE_PHOTO', 'ADD_PHOTO_COMMENT']),

    returnAvatar(gender, src, image) {
      return modules.returnAvatarMini(gender, src, image);
    },

    returnDate(data) {
      const date = new Date(data);

      let day = date.getDate();
      day = day < 10 ? '0' + day : day;
      let month = date.getMonth()+1;
      month = month < 10 ? '0' + month : month;
      const year = date.getFullYear();
      let hours = date.getHours();
      hours = hours < 10 ? '0' + hours : hours;
      let mins = date.getMinutes();
      mins = mins < 10 ? '0' + mins : mins;
      return day+'.'+month+'.'+year+' '+hours+':'+mins;
    },

    async send() {
      if (this.user.auth) {
        const date = new Date();

        const data = {
          date_created: date,
          comment: this.message,
          user: {
            id: this.user.user_id,
            firstname: this.user.profile.firstname,
            lastname: this.user.profile.lastname,
            gender: this.user.profile.gender,
            user_info: {
              src: this.user.profile.user_info.src,
              image: this.user.profile.user_info.image
            }
          },
        };

        try {
          const response = await http.post('/api/v1/photo-comments', {
            user_id: this.user.user_id,
            photo_id: this.photoId,
            message: this.message,
            data,
          }, {
            headers: {
              'Authorization': `Bearer ${this.user.token}`
            }
          })

          this.message = '';
        } catch(e) {
          console.log(e);
        }
      }
    },
  }
}
</script>

<style lang="css">
</style>
