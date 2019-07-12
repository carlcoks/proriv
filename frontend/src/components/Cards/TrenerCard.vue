<template>

  <div
    class="trener-card">

    <div
      class="trener-card__top">
      <div
        class="trener-card__top-bg"
        :style="`background-image: url(${returnBg()})`"></div>
      <router-link
        :to="`/user/${item.id}`"
        class="trener-card__top-avatar">
        <img
          :src="returnAvatar()"
          class="img">
      </router-link>
    </div>
    <div
      class="trener-card__info">

      <router-link
        :to="`/user/${item.id}`"
        class="trener-card__info-title">
        {{ item.firstname }} {{ item.lastname }}
      </router-link>
      <div
        class="trener-card__info-btn">
        <button
          class="btn addNew">
          <img
            src="/img/icons/bookmark_add.png">
          В закладки
        </button>
      </div>
      <div
        class="trener-card__info-city">
        Россия, Москва
      </div>

    </div>

  </div>

</template>

<script>
import modules from '@/modules/user';

export default {
  props: ['item'],
  methods: {
    returnAvatar() {
      const profile = this.item;
      let src, image;
      if (profile.user_info) {
        src = profile.user_info.src;
        image = profile.user_info.image
      }
      return modules.returnAvatar(this.item.gender, src, image);
    },

    returnBg() {
      return modules.getUserBg();
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/components/cards/trener-card.sass'
</style>
