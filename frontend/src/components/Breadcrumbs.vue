<template>

  <div
    class="breads">
    <ul
      class="breads-ul">
      <li
        class="breads-ul__item">
        Главная
      </li>
      <li
        class="breads-ul__item"
        v-for="(item, i) in breads" :key="i">
        {{ item.name }}
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  props: ['breads']
}
</script>

<style lang="sass">
  @import '@/styles/components/breadcrumbs.sass'
</style>
