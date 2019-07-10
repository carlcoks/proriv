<template>

  <div
    class="education">

    <list-block
      v-for="(item, i) in data" :key="`edu_${i}`"
      :item="item"
      :admin="admin"
      :edit="item.edit"
      :type="`edu`"
      @saveItem="saveItem($event, i)"
      @cancel="CANCEL_EDIT_EDUCATION({id: i})"
      @delete="deleteItem($event, i)"
      @edit="editItem($event, i)"
      @changeOrder="changeOrderItem($event, i)" />

  </div>

</template>

<script>
import { mapMutations, mapActions } from 'vuex';

import ListBlock from './List';

export default {
  props: ['data', 'admin'],
  components: {
    ListBlock,
  },
  methods: {
    ...mapActions('resume', ['saveResume']),
    ...mapMutations('resume', ['UPDATE_EDUCATION', 'DELETE_EDUCATION', 'CANCEL_EDIT_EDUCATION', 'EDIT_EDUCATION', 'CHANGE_EDUCATION_ORDER']),

    saveItem(data, id) {
      this.UPDATE_EDUCATION({
        item: data.item,
        id: id
      });
      this.saveResume({ name: 'education', data: { value: JSON.stringify(this.data) } });
    },

    deleteItem(data, i) {
      this.DELETE_EDUCATION({id: i});
      this.saveResume({ name: 'education', data: { value: JSON.stringify(this.data) } });
    },

    editItem(data, i) {
      this.EDIT_EDUCATION({id: i});
    },

    changeOrderItem(data, i) {
      this.CHANGE_EDUCATION_ORDER({ type: data.type, id: i });
      this.saveResume({ name: 'education', data: { value: JSON.stringify(this.data) } });
    },
  },
}
</script>

<style lang="sass">
</style>
