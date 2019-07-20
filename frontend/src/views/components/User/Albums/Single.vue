<template>

  <div>

    <modal-layout
      v-if="!addPhoto.modal"
      :bgShow="true"
      :modalShow="true"
      @close="$router.push(`/user/${$route.params.id}/albums`)">

      <div
        class="modalBlock albums-page">
        <div
          class="modalBlock-title">
          <div
            class="abs-left">
            <button
              @click="$router.push(`/user/${$route.params.id}/albums`)"
              class="btn addNew">
              <img
                src="/img/icons/arrow-back.png">
              Альбомы
            </button>
          </div>
          {{ single.album.title }}
        </div>
        <div
          class="modalBlock-cards">
          <a
            v-if="user_profile.id == user.user_id"
            href="/add"
            @click.prevent="CHANGE_ADD_PHOTO_MODAL({ bg: true, modal: true })"
            class="itemCard addCard">
            <div
              class="addBtn">
              <img
                src="/img/icons/bigplus.png">
            </div>
            <div
              class="addText">
              Добавить фото
            </div>
          </a>

          <photo-list
            v-for="(item, i) in single.photos" :key="i"
            :item="item"
            :link="`/user/${$route.params.id}/photos/${item.id}`" />

        </div>
      </div>

    </modal-layout>

    <add-photo
      v-if="user.user_id == user_profile.id" />

  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';

import ModalLayout from '@/components/Modals/ModalLayout';
import AddPhoto from '@/components/Modals/User/AddPhoto';
import PhotoList from './PhotoList';

export default {
  name: 'user-album',
  asyncData({ store, route }) {
    return store.dispatch('albums/getAlbum', {user_id: route.params.id, album_id: route.params.album});
  },
  components: {
    ModalLayout,
    AddPhoto,
    PhotoList,
  },
  computed: {
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
    ...mapState('albums', ['single', 'addPhoto']),
  },
  methods: {
    ...mapMutations('albums', ['CHANGE_ADD_PHOTO_MODAL']),
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/user/albums.sass'
</style>
