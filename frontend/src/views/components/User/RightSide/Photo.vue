<template>

  <div
    class="sidecard photos">
    <div
      class="sidecard-title">
      Фотографии
      <div
        v-show="showArrows"
        class="slider-arrows">
        <button
          class="btn swiper-photos-prev">
          <img
            src="/img/icons/slide-left.png">
        </button>
        <button
          class="btn swiper-photos-next">
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
            v-for="(item, i) in photos" :key="i">
            <div
              class="itemSlide"
              v-for="(photo, p) in item" :key="p">
              <router-link
                :to="`/user/${$route.params.id}/photos/${photo.id}`">
                <img
                  class="itemSlide-image"
                  :src="`/api/${photo.src}/mini_${photo.image}`">
              </router-link>
            </div>
          </div>

        </div>
        <div class="swiper-pagination"></div>
      </div>
    </div>
    <div class="sidecard-btns">
      <router-link
        :to="`/user/${$route.params.id}/albums`"
        class="btn addNew">
        Все фотографии
      </router-link>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      showArrows: false,
      swiperOption: {
        navigation: {
          nextEl: '.swiper-photos-next',
          prevEl: '.swiper-photos-prev',
        },
        init: true,
        slidesPerView: 3,
        spaceBetween: 5,
      }
    }
  },
  computed: {
    photos() {
      const photos = this.$store.state['photos'].photos;
      if (photos.length > 3) this.showArrows = true;
      return photos;
    }
  },
  // created() {
  //   this.getPhotosMain({user_id: this.$route.params.id});
  // },
  // methods: {
  //   ...mapActions('photos', ['getPhotosMain']),
  // }
}
</script>

<style lang="sass">
</style>
