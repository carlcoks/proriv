<template>

  <div>

    <modal-layout
      v-if="!addAlbum.modal"
      :bgShow="true"
      :modalShow="true"
      @close="$router.push(`/user/${$route.params.id}`)">

      <div
        class="modalBlock albums-page">
        <div
          class="modalBlock-title">
          Фотоальбомы
        </div>
        <div
          class="modalBlock-cards">
          <a
            v-if="user_profile.id == user.user_id"
            href="/add"
            @click.prevent="CHANGE_ADD_ALBUM_MODAL({ bg: true, modal: true })"
            class="itemCard addCard">
            <div
              class="addBtn">
              <img
                src="/img/icons/bigplus.png">
            </div>
            <div
              class="addText">
              Добавить альбом
            </div>
          </a>

          <album-list
            v-for="(item, i) in albums" :key="i"
            :item="item"
            :link="`${$route.path}/${item.id}`" />

        </div>
      </div>

    </modal-layout>

    <add-album
      v-if="user_profile.id == user.user_id" />

  </div>

</template>

<script>
import { mapState, mapMutations } from 'vuex';

import ModalLayout from '@/components/Modals/ModalLayout';
import AddAlbum from '@/components/Modals/User/AddAlbum';
import AlbumList from './AlbumList';

export default {
  name: 'user-alboms',
  metaInfo() {
    return {
      title: `Альбомы`,
    };
  },
  asyncData({ store, route }) {
    return store.dispatch('albums/getAlbums', {user_id: route.params.id});
  },
  components: {
    ModalLayout,
    AddAlbum,
    AlbumList,
  },
  computed: {
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
    ...mapState('albums', ['albums', 'addAlbum']),
  },
  methods: {
    ...mapMutations('albums', ['CHANGE_ADD_ALBUM_MODAL']),
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/user/albums.sass'
</style>
