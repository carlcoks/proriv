<template>

  <div
    class="education">

    <list-block
      v-for="(item, i) in data" :key="`edu_${i}`"
      :item="item"
      :admin="admin"
      :edit="item.edit"
      :type="`job`"
      @saveItem="saveItem($event, i)"
      @cancel="CANCEL_EDIT_JOB({id: i})"
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
    ...mapMutations('resume', ['UPDATE_JOB', 'DELETE_JOB', 'CANCEL_EDIT_JOB', 'EDIT_JOB', 'CHANGE_JOB_ORDER']),

    saveItem(data, id) {
      this.UPDATE_JOB({ item: data.item, id: id });
      this.saveResume({ name: 'job', data: { value: JSON.stringify(this.data) } });
    },

    deleteItem(data, i) {
      this.DELETE_JOB({id: i});
      this.saveResume({ name: 'job', data: { value: JSON.stringify(this.data) } });
    },

    editItem(data, i) {
      this.EDIT_JOB({id: i});
    },

    changeOrderItem(data, i) {
      this.CHANGE_JOB_ORDER({ type: data.type, id: i });
      this.saveResume({ name: 'job', data: { value: JSON.stringify(this.data) } });
    },
  },
}
</script>

<style lang="sass">
</style>
