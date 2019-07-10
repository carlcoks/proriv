<template>

  <div
    class="messages-list__item"
    :class="item.user.id == userId ? 'me' : ''">
    <div
      class="user-avatar">
      <img
        class="image"
        :src="returnImg(item.user)">
      <span
        class="time">
        {{ returnDate(item.date_created) }}
      </span>
    </div>
    <div
      class="messages-list__item-block">
      <div
        class="user-info">
        {{ item.user.firstname }} {{ item.user.lastname }}:
      </div>
      <div
        class="user-text">
        {{ item.message }}
      </div>
    </div>
  </div>

</template>

<script>
import modules from '@/modules/user';

export default {
  props: ['item', 'userId'],
  methods: {
    returnImg(profile) {
      let gender, src, image;
      if (profile) {
        gender = profile.gender;
        if (profile.user_info) {
          src = profile.user_info.src;
          image = profile.user_info.image;
        }
      }
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
      return hours+':'+mins;
    },
  }
}
</script>

<style lang="css">
</style>
