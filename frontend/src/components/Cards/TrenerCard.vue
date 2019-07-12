<template>

  <div
    class="trener-card">

    {{ item }}
    
  </div>

</template>

<script>
export default {
  props: ['item'],
}
</script>

<style lang="sass">
  @import '@/styles/components/cards/trener-card.sass'
</style>
