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
      <iframe
        v-if="item.link"
        :src="item.link" frameborder="0"></iframe>
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
export default {
  props: ['link', 'item']
}
</script>

<style lang="css">
</style>
