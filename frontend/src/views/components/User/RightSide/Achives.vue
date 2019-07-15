<template>

  <div
    class="sidecard no-padding">
    <div
      class="sidecard-title">
      Награды:
      <div
        v-show="showArrows"
        class="slider-arrows">
        <button
          class="btn swiper-rewards-prev">
          <img
            src="/img/icons/slide-left.png">
        </button>
        <button
          class="btn swiper-rewards-next">
          <img
            src="/img/icons/slide-right.png">
        </button>
      </div>
    </div>
    <div
      class="sidecard-slider">
      <div
        class="sidecard-slider__container"
        v-swiper:mySwiper="swiperOption">
        <div
          class="swiper-wrapper">
          <div
            class="sidecard-slider__slide swiper-slide"
            v-for="(item, i) in rewards" :key="i">
            <img
              class="itemSlide-image"
              :src="`/api/${item.src}/mini_${item.image}`">
            <div
              class="itemSlide-text">
              {{ item.title }}
            </div>
          </div>

        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="sidecard-btns">
      <router-link
        :to="`/user/${$route.params.id}/rewards`"
        class="btn addNew">
        Смотреть все
      </router-link>
    </div>
  </div>

</template>

<script>
import { mapActions } from 'vuex';

export default {
  data() {
    return {
      showArrows: false,
      swiperOption: {
        navigation: {
          nextEl: '.swiper-rewards-next',
          prevEl: '.swiper-rewards-prev',
        },
        init: true,
      }
    }
  },
  computed: {
    rewards() {
      const rewards = this.$store.state['rewards'].rewardsmain;
      if (rewards.length > 1) this.showArrows = true;
      return rewards;
    }
  },
  created() {
    this.getRewardsMain({user_id: this.$route.params.id});
  },
  methods: {
    ...mapActions('rewards', ['getRewardsMain']),
  }
}
</script>

<style lang="sass">
</style>
