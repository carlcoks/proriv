<template>

  <div
    id="app">

    <header-block
      :class="$route.path != '/' ? 'not-main' : ''" />

    <router-view />

    <div
      v-if="$route.path == '/'">

      <footer-block />

    </div>

    <left-side
      v-if="$route.path != '/' && user.auth"
      :userId="user.user_id" />

    <after-signup />
    <after-accept />
    <recovery-pass />

  </div>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import http from '@/utils/api';

import HeaderBlock from '@/components/layout/HeaderBlock';
import FooterBlock from '@/components/layout/FooterBlock';
import LeftSide from '@/components/layout/LeftSide';

import AfterSignup from '@/components/Modals/AfterSignup';
import AfterAccept from '@/components/Modals/AfterAccept';
import RecoveryPass from '@/components/Modals/RecoveryPass';

export default {
  name: 'App',
  metaInfo: {
    titleTemplate(titleChunk) {
      return titleChunk ? `${titleChunk}` : 'СпортТут';
    },
    meta: [
      {
        vmid: 'description',
        name: 'description',
        content: '',
      },
    ],
  },
  watch: {
    $route(to, from) {
      const prevUrl = from.path;
      if (window.sessionStorage) {
        sessionStorage.setItem('prevUrl', prevUrl);
      }
    },
  },
  components: {
    HeaderBlock,
    FooterBlock,
    LeftSide,
    AfterSignup,
    AfterAccept,
    RecoveryPass,
  },
  computed: {
    ...mapState('user', ['user']),
  },
  created() {
    this.getAllSport();
    this.getCountries();
  },
  mounted() {
    this.checkAcceptEmail();
    this.checkAccpetResetPassword();
  },
  methods: {
    ...mapActions(['getAllSport', 'getCountries']),
    ...mapMutations('layout', ['CHANGE_AFTER_ACCEPT_MODAL']),

    async checkAcceptEmail() {
      const { query } = this.$route;
      if (query["accept-email"]) {
        const accept = query["accept-email"];

        try {
          const response = await http.post('/api/v1/accept-email', {accept})
          if (response.data.success)
            this.CHANGE_AFTER_ACCEPT_MODAL({ bg: true, modal: true, })
        } catch({response}) {
          console.log('Err: ', response.data.message);
        }
      }
    },

    async checkAccpetResetPassword() {
      const { query } = this.$route;
      if (query["reset-hash"]) {
        const hash = query["reset-hash"];

        try {
          const response = await http.post('/api/v1/accept-reset-password', {hash})
          if (response.data.success)
            this.CHANGE_AFTER_RESET_MODAL({ bg: true, modal: true, })
        } catch({response}) {
          console.log('Err: ', response.data.message);
        }
      }
    },
  }
};
</script>

<style lang="scss" src="@/styles/app.sass" />
