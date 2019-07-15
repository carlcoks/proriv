<template>

  <div>

    <modal-layout
      v-if="!addVideo.modal"
      :bgShow="true"
      :modalShow="true"
      @close="$router.push(`/user/${$route.params.id}`)">

      <div
        class="modalBlock video-page">
        <div
          class="modalBlock-title">
          Видео
        </div>
        <div
          class="modalBlock-cards">
          <a
            v-if="user_profile.id == user.user_id"
            href="/add"
            @click.prevent="CHANGE_ADD_VIDEO_MODAL({ bg: true, modal: true })"
            class="itemCard addCard">
            <div
              class="addBtn">
              <img
                src="/img/icons/bigplus.png">
            </div>
            <div
              class="addText">
              Добавить видео
            </div>
          </a>

          <video-list
            v-for="(item, i) in videos" :key="i"
            :item="item"
            :link="`${$route.path}/${item.id}`" />

        </div>
      </div>

    </modal-layout>

    <add-video
      v-if="user_profile.id == user.user_id" />

  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';

import ModalLayout from '@/components/Modals/ModalLayout';
import VideoList from './VideoList';
import AddVideo from '@/components/Modals/User/AddVideo';

export default {
  name: 'user-alboms',
  metaInfo() {
    return {
      title: `Видео`,
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('videos/getVideos', {user_id: route.params.id});
  },
  components: {
    ModalLayout,
    AddVideo,
    VideoList,
  },
  computed: {
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
    ...mapState('videos', ['videos', 'addVideo']),
  },
  methods: {
    ...mapMutations('videos', ['CHANGE_ADD_VIDEO_MODAL']),
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/user/videos.sass'
</style>
