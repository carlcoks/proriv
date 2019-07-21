<template>

  <div
    id="app">

    <header-block
      v-if="$route.path != '/login'" />

    <router-view />

    <footer-block
      v-if="$route.path != '/login'" />

  </div>

</template>

<script>
import HeaderBlock from '@/components/layout/HeaderBlock';
import FooterBlock from '@/components/layout/FooterBlock';

export default {
  name: 'App',
  metaInfo: {
    titleTemplate(titleChunk) {
      return titleChunk ? `${titleChunk}` : 'Dolinger Analytics';
    },
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: '',
      },
    ],
  },
  components: {
    HeaderBlock,
    FooterBlock,
  },
  methods: {
  }
};
</script>

<style lang="scss" src="@/styles/app.sass" />
