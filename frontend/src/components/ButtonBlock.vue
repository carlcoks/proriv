<template>

  <button
    class="btn"
    :class="className"
    @click.prevent="$emit('clicked')">
    {{ title }}
  </button>

</template>

<script>
export default {
  props: {
    title: {
      type: String,
    },
    className: {
      type: String,  
    }
  }
}
</script>

<style lang="css">
</style>
