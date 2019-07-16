<template>

  <router-link
    :to="`${link}`"
    class="itemCard">
    <div
      class="itemCard-video">
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
      <span
        class="play">
        <img
          src="/img/icons/video-play.png">
      </span>
    </div>
    <div
      class="itemCard-body">
      <div
        class="itemCard-body__text">
        {{ item.title }}
      </div>
    </div>
  </router-link>

</template>

<script>
import functions from '@/modules/functions';

export default {
  props: ['link', 'item'],
  methods: {
    returnBlock(link) {
      return functions.returnVideoBlock(link, 'small');
    },
  }
}
</script>

<style lang="css">
</style>
