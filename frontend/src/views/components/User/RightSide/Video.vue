<template>

  <div
    class="sidecard videos">
    <div
      class="sidecard-title">
      Видеозаписи
      <div
        v-show="showArrows"
        class="slider-arrows">
        <button
          class="btn swiper-videos-prev">
          <img
            src="/img/icons/slide-left.png">
        </button>
        <button
          class="btn swiper-videos-next">
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
            v-for="(item, i) in videosmain" :key="i">
            <router-link
              :to="`/user/${$route.params.id}/videos/${item.id}`"
              class="itemSlide-video">
              <video
                v-if="item.src && item.video"
                class="video"
                :src="`/api/${item.src}/${item.video}`"
                preload="auto"
                muted="muted"></video>
              <div
                v-else
                class="itemCard-video__cover"
                v-html="returnBlock(item.link)">
              </div>
              <!-- <iframe
                v-if="item.link"
                class="iframe"
                :src="returnLink(item.link)"
                frameborder="0"></iframe> -->
              <span
                class="play">
                <img
                  src="/img/icons/video-play-small.png">
              </span>
            </router-link>
          </div>

        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div
      class="sidecard-btns">
      <router-link
        :to="`/user/${$route.params.id}/videos`"
        class="btn addNew">
        Все видеозаписи
      </router-link>
    </div>
  </div>

</template>

<script>
import functions from '@/modules/functions';

export default {
  data() {
    return {
      showArrows: false,
      swiperOption: {
        navigation: {
          nextEl: '.swiper-videos-next',
          prevEl: '.swiper-videos-prev',
        },
        init: true,
        slidesPerView: 3,
        spaceBetween: 5,
      }
    }
  },
  computed: {
    videosmain() {
      const videosmain = this.$store.state['videos'].videosmain;
      if (videosmain.length > 3) this.showArrows = true;
      return videosmain;
    }
  },
  // created() {
  //   this.getVideosMain({user_id: this.$route.params.id});
  // },
  methods: {
    // ...mapActions('videos', ['getVideosMain']),

    returnBlock(link) {
      return functions.returnVideoBlock(link, 'small');
    },
  }
}
</script>

<style lang="sass">
</style>
