<template>

  <div
    class="treners-block__sort">
    <div
      class="treners-block__sort-line">
      Сортировать:
    </div>
    <div
      class="treners-block__sort-line">
      <a
        href="#"
        class="link"
        @click.prevent="sorted('name')">
        По имени
      </a>
    </div>
    <div
      class="treners-block__sort-line">
      <a
        href="#"
        class="link"
        @click.prevent="sorted('date')">
        Дате регистрации
      </a>
    </div>
  </div>

</template>

<script>
import { mapMutations } from 'vuex';

export default {
  data() {
    return {
      initial: {
        name: 'asc',
        date: 'asc',
      }
    }
  },
  methods: {
    ...mapMutations('treners', ['SET_SORT']),

    sorted(name) {
      switch (name) {
        case 'name':
          if (this.initial.name == 'asc') {
            this.initial.name = 'desc';
            this.SET_SORT({ name: 'name', order: 'desc' })
          } else {
            this.initial.name = 'asc'
            this.SET_SORT({ name: 'name', order: 'asc' })
          }
          break
        case 'date':
          if (this.initial.date == 'asc') {
            this.initial.date = 'desc';
            this.SET_SORT({ name: 'date', order: 'desc' })
          } else {
            this.initial.date = 'asc'
            this.SET_SORT({ name: 'date', order: 'asc' })
          }
          break
        default:
          break
      }
    }
  }
}
</script>

<style lang="css">
</style>
