<template>

  <div
    class="lenta">

    <add-new />

    <div
      class="lenta-list">

      <list-item
        v-for="(item, i) in lenta" :key="i"
        :item="item"
        :admin="user.user_id == user_profile.id"
        :profile="user_profile"
        :lengthFiles="item.lenta_files.length"
        @delete="deleteItem($event, item.id)" />

    </div>

  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';

import AddNew from './Lenta/AddNew';
import ListItem from './Lenta/List';

export default {
  asyncData ({ store, route }) {
    return store.dispatch('lenta/getLenta', { user_id: route.params.id })
  },
  components: {
    AddNew,
    ListItem,
  },
  computed: {
    ...mapState('lenta', ['lenta']),
    ...mapState('user', ['user']),
    ...mapState('profile', ['user_profile']),
  },
  methods: {
    ...mapActions('lenta', ['deleteInLenta']),

    deleteItem(e, id) {
      this.deleteInLenta({id});
    },
  }
}
</script>

<style lang="css">
</style>
