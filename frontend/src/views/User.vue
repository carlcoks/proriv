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
              @clicked="CHANGE_BG_MODAL({ bg: true, modal: true })" />
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
              class="statuses"
              @mouseleave="openBlock = false">
              <a
                href="/change"
                class="statuses-now"
                :class="[user_profile.user_free.id == 1 || user_profile.user_free.id == 3 ? 'green' : 'red', user_profile.id == user.user_id ? 'authed' : '']"
                @click.prevent="openBlock = !openBlock">
                {{ user_profile.user_free.name }}
              </a>
              <div
                class="open-block"
                :class="openBlock ? 'active' : ''">
                <div
                  class="open-block__list">
                  <div
                    class="open-block__list-item">
                    <a
                      href="/change"
                      @click.prevent="changeFree(1)"
                      class="open-block__list-item__link green"
                      :class="user_profile.user_free.id == 1 || user_profile.user_free.id == 3 ? 'selected' : '' ">
                      {{ user_profile.user_status.id == 1 ? 'Свободен' : 'Ищу тренера' }}
                    </a>
                  </div>
                  <div
                    class="open-block__list-item">
                    <a
                      href="/change"
                      @click.prevent="changeFree(2)"
                      class="open-block__list-item__link red"
                      :class="user_profile.user_free.id == 2 || user_profile.user_free.id == 4 ? 'selected' : '' ">
                      {{ user_profile.user_status.id == 1 ? 'Занят' : 'Не ищу тренера' }}
                    </a>
                  </div>
                </div>
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
              <router-link
                v-if="user.user_id != user_profile.id"
                :to="`/im?sel=${user_profile.id}`"
                class="infoBtn">
                Написать сообщение
              </router-link>
              <button-block
                v-if="user.auth && user.user_id == user_profile.id"
                :title="`Редактировать профиль`"
                :className="`infoBtn`" />

              <user-info
                :spealist="user_profile.user_status.name"
                :dateCreated="user_profile.date_created" />

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
      <change-bg />
      <change-contacts />
      <change-sport />

    </div>

    <router-view
      v-if="!$route.meta.type" />

  </section>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import modules from '@/modules/user';

import Breadcrumbs from '@/components/Breadcrumbs';
import ButtonBlock from '@/components/ButtonBlock';
import ChangeAvatar from '@/components/Modals/Profile/ChangeAvatar';
import ChangeBg from '@/components/Modals/Profile/ChangeBg';
import ChangeContacts from '@/components/Modals/Profile/ChangeContacts';
import ChangeSport from '@/components/Modals/Profile/ChangeSport';

import UserMain from './components/User/Main';
import UserInfo from './components/User/UserInfo';

export default {
  name: 'user',
  asyncData({ store, route }) {
    store.dispatch('rewards/getRewardsMain', { user_id: route.params.id })
    store.dispatch('photos/getPhotosMain', { user_id: route.params.id })
    store.dispatch('videos/getVideosMain', { user_id: route.params.id })

    return store.dispatch('profile/getUser', { user_id: route.params.id })
  },
  components: {
    Breadcrumbs,
    ButtonBlock,
    ChangeAvatar,
    ChangeBg,
    ChangeContacts,
    ChangeSport,
    UserMain,
    UserInfo,
  },
  data() {
    return {
      openBlock: false,
    }
  },
  computed: {
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
  },
  methods: {
    ...mapActions('profile', ['updateUser']),
    ...mapMutations('profile', ['CHANGE_PROFILE']),
    ...mapMutations('layout', ['CHANGE_AVATAR_MODAL', 'CHANGE_BG_MODAL']),

    getBg() {
      let src, image;
      if (this.user_profile && this.user_profile.user_info) {
        src = this.user_profile.user_info.src;
        image = this.user_profile.user_info.bg_image;
      }
      return modules.getUserBg(src, image);
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

    changeFree(num) {
      const status = this.user_profile.user_status.id;
      let id = 0, name = '';
      if (status == 1) { // Если тренер
        if (num == 1) {
          id = 1;
          name = 'Свободен';
        } else {
          id = 2;
          name = 'Занят';
        }
      } else if (status == 2) { // Если спортсмен
        if (num == 1) {
          id = 3;
          name = 'Ищу тренера';
        } else {
          id = 4;
          name = 'Не ищу тренера';
        }
      }

      this.updateUser({
        user_free_id: id
      });

      this.CHANGE_PROFILE({user_free: { id, name }});
      this.openBlock = false;
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/user.sass'
</style>
