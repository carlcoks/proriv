<template>

  <div
    class="dialogs-list__item"
    :class="item.user_dialog.id == activeId ? 'active' : ''"
    @click="goToDialog(item.user.id)">
    <div
      class="dialogs-list__item-avatar">
      <img
        class="image"
        :src="returnImg(item.user)">
    </div>
    <div
      class="dialogs-list__item-mess">
      <div
        class="user-info">
        <span>
          {{ item.user.firstname }} {{ item.user.lastname }}
        </span>
        <span>
          {{ returnDate(item.user_dialog.user_messages[0].date_created) }}
        </span>
      </div>
      <div
        class="user-text">
        <span
          v-show="item.user_dialog.user_messages[0].user_id == userId"
          class="me">
          Вы:
        </span>
        <span
          class="mess"
          v-html="item.user_dialog.user_messages[0].message"></span>
      </div>
    </div>
  </div>

</template>

<script>
import modules from '@/modules/user';

export default {
  props: ['item', 'activeId', 'userId'],
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
      return day+'.'+month+'.'+year+' '+hours+':'+mins;
    },

    goToDialog(id) {
      this.$router.push(`/im?sel=${id}`);
    },
  }
}
</script>

<style lang="css">
</style>
