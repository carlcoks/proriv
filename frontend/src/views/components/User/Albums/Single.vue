<template>

  <div
    v-if="single">

    <modal-layout
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
          {{ single[0].user_album.title }}
        </div>
        <div
          class="modalBlock-cards">
          <a
            v-if="user_profile.id == user.user_id"
            href="/add"
            @click.prevent=""
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
            v-for="(item, i) in single" :key="i"
            :item="item"
            :link="`/user/${$route.params.id}/photos/${item.id}`" />

        </div>
      </div>

    </modal-layout>

  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import ModalLayout from '@/components/Modals/ModalLayout';
import PhotoList from './PhotoList';

export default {
  name: 'user-album',
  asyncData({ store, route }) {
    return store.dispatch('albums/getAlbum', {user_id: route.params.id, album_id: route.params.album});
  },
  components: {
    ModalLayout,
    PhotoList,
  },
  computed: {
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
    ...mapState('albums', ['single']),
  },
}
</script>

<style lang="sass">
  @import '@/styles/pages/user/albums.sass'
</style>
