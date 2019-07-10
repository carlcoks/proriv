<template>

  <div>

    <transition
      name="fade">
      <div
        v-if="bgShow"
        class="modal-bg"></div>
    </transition>

    <transition
      name="slideTop">
      <div
        v-if="modalShow"
        class="modal-block"
        @click.self="$emit('close')">
        <div
          class="modal-block__content">
          <a
            href="/close"
            class="close"
            @click.prevent="$emit('close')">
            <img
              src="/img/icons/close.png"
              title="Закрыть"
              alt="Закрыть">
          </a>

          <slot />

        </div>
      </div>
    </transition>

  </div>

</template>

<script>
export default {
  props: ['bgShow', 'modalShow'],
}
</script>

<style lang="sass">
  @import '@/styles/components/modals/modal-layout.sass'
</style>
