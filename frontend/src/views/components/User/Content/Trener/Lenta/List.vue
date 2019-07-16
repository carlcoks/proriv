<template>

  <div
    class="lenta-list__item">
    <div
      class="item-top">
      <div
        class="item-top__user">
        <img
          :src="returnAvatar()"
          class="image">
        <div
          class="info">
          <div
            class="info-name">
            {{ profile.firstname }} {{ profile.lastname }}
          </div>
          <div
            class="info-date">
            {{ returnDate(item.date_created) }}
          </div>
        </div>
      </div>
      <div
        v-if="admin"
        class="item-top__edit"
        @mouseleave="showEdit = false">
        <button
          class="btn"
          @click.prevent="showEdit = true">
          <img
            src="/img/icons/lentaedit.png">
        </button>

        <transition
          name="slideTopBlock">
          <div
            v-if="showEdit"
            class="edit-list">
            <!-- <div
              class="edit-list__item">
              <img
                src="/img/icons/edit.png">
              <span>
                Редактировать
              </span>
            </div> -->
            <div
              class="edit-list__item"
              @click.prevent="$emit('delete')">
              <img
                src="/img/icons/delete_d.png">
              <span>
                Удалить
              </span>
            </div>
          </div>
        </transition>

      </div>
    </div>
    <div
      class="content">
      <div
        class="content-text">{{ item.text }}</div>
      <div
        class="content-files">
        <div
          class="content-files__item"
          v-for="(item, i) in item.lenta_files" :key="i"
          :class="returnClass(i)">
          <img
            :src="returnImg(item, i)">
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import modules from '@/modules/user';

export default {
  props: ['item', 'admin', 'profile', 'lengthFiles'],
  data() {
    return {
      showEdit: false,
    }
  },
  methods: {
    returnAvatar() {
      const profile = this.profile;
      let src, image;
      if (profile.user_info) {
        src = profile.user_info.src;
        image = profile.user_info.image;
      }
      return modules.returnAvatarMini(profile.gender, src, image);
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

    returnImg(item, i) {
      let type = '';
      if (this.lengthFiles == 1)
        type = 'big_';
      else if (this.lengthFiles == 2)
        type = 'same_';
      else if (this.lengthFiles == 3)
        type = 'small_';
      else if (this.lengthFiles == 4)
        type = 'same_';
      else if (this.lengthFiles == 5 && (i == 3 || i == 4))
        type = 'same_';
      else if (this.lengthFiles == 5)
        type = 'small_';
      else if (this.lengthFiles == 6)
        type = 'small_';
      else if (this.lengthFiles == 7 && (i == 4 || i == 5 || i == 6))
        type = 'small_';
      else if (this.lengthFiles == 7)
        type = 'mini_';
      else if (this.lengthFiles == 8)
        type = 'mini_';

      return '/api/' + this.item.src + '/' + item.src + '/' + type + item.image;
    },

    returnClass(i) {
      if (this.lengthFiles == 1)
        return 'itemOne';
      else if (this.lengthFiles == 2)
        return 'itemTwo'
      else if (this.lengthFiles == 3)
        return 'itemThree'
      else if (this.lengthFiles == 4)
        return 'itemTwo'
      else if (this.lengthFiles == 5 && (i == 3 || i == 4))
        return 'itemTwo'
      else if (this.lengthFiles == 5)
        return 'itemThree'
      else if (this.lengthFiles == 6)
        return 'itemThree'
      else if (this.lengthFiles == 7 && (i == 4 || i == 5 || i == 6))
        return 'itemThree'
      else if (this.lengthFiles == 7)
        return 'itemFour'
      else if (this.lengthFiles == 8)
        return 'itemFour'
    }
  }
}
</script>

<style lang="css">
</style>
