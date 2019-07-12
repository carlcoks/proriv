<template>

  <div
    class="user-page__main">

    <div
      class="user-page__main-left">

      <content-block />

    </div>

    <div
      class="user-page__main-right">

      <contacts-block
        :userId="userId" />

      <sport-block
        :userId="userId" />

      <achives-block />

      <div
        class="commoncard">
        
        <photo-block />

        <video-block />

      </div>

    </div>

  </div>

</template>

<script>
import ContentBlock from './Content/Index';
import ContactsBlock from './RightSide/Contacts';
import SportBlock from './RightSide/Sport';
import AchivesBlock from './RightSide/Achives';
import PhotoBlock from './RightSide/Photo';
import VideoBlock from './RightSide/Video';

export default {
  props: ['userId'],
  components: {
    ContentBlock,
    ContactsBlock,
    SportBlock,
    AchivesBlock,
    PhotoBlock,
    VideoBlock,
  },
}
</script>

<style lang="css">
</style>
