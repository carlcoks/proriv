<template>

  <section
    v-if="user_profile"
    class="user-page pt-80">

    <div
      class="wr">

      <breadcrumbs
        :breads="[{ name: user_profile.user_status.name }, { name: user_profile.firstname + ' ' + user_profile.lastname, }]" />

      <div
        class="user-page__top">
        <div
          class="bg"
          :style="`background-image: url(${getBg()})`">
          <div
            v-if="user_profile.id == user.user_id"
            class="hover">
            <button-block
              :title="`Сменить изображение`"
              :className="`changeBtn`"
              @clicked="" />
          </div>
          <div
            class="bg-shadow"></div>
        </div>
        <div
          class="info">
          <div
            class="info-avatar">
            <div
              class="info-avatar__block">
              <img
                :src="`${getAvatar()}`"
                alt=""
                class="img">
              <div
                class="hover">
                <button-block
                  v-if="user_profile.id == user.user_id"
                  :title="`Сменить фото`"
                  :className="`changeBtn smallBtn`"
                  @clicked="CHANGE_AVATAR_MODAL({ bg: true, modal: true })" />
              </div>
            </div>
            <div
              class="statuses">
              <div
                class="statuses-now green">
                Свободен
              </div>
            </div>
          </div>
          <div
            class="info-user">
            <div
              class="info-user__top">
              <p
                class="name">
                {{ user_profile.firstname }} {{ user_profile.lastname }}
              </p>
              <p
                class="city">
                Россия, Челябинск
              </p>
            </div>
            <div
              class="info-user__bot">
              <button-block
                v-if="user.auth && user.user_id != user_profile.id"
                :title="`Написать сообщение`"
                :className="`infoBtn`" />
            </div>
          </div>
        </div>
      </div>

      <user-main
        :userId="user.user_id" />

    </div>

    <div
      v-if="user.user_id == user_profile.id">

      <change-avatar />
      <change-contacts />
      <change-sport />

    </div>

    <router-view />

  </section>

</template>

<script>
import { mapState, mapMutations } from 'vuex';
import modules from '@/modules/user';

import Breadcrumbs from '@/components/Breadcrumbs';
import ButtonBlock from '@/components/ButtonBlock';
import ChangeAvatar from '@/components/Modals/Profile/ChangeAvatar';
import ChangeContacts from '@/components/Modals/Profile/ChangeContacts';
import ChangeSport from '@/components/Modals/Profile/ChangeSport';

import UserMain from './components/User/Main';

export default {
  name: 'user',
  asyncData({ store, route }) {
    return store.dispatch('profile/getUser', { user_id: route.params.id })
  },
  components: {
    Breadcrumbs,
    ButtonBlock,
    ChangeAvatar,
    ChangeContacts,
    ChangeSport,
    UserMain,
  },
  computed: {
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_AVATAR_MODAL']),

    getBg() {
      return modules.getUserBg();
    },

    getAvatar() {
      let gender, src, image;
      if (this.user_profile) {
        gender = this.user_profile.gender;
        if (this.user_profile.user_info) {
          src = this.user_profile.user_info.src;
          image = this.user_profile.user_info.image;
        }
      }
      return modules.returnAvatar(gender, src, image);
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/user.sass'
</style>
