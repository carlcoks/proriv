<template>

  <header
    class="header"
    @mouseleave="showMenu = false">
    <div
      class="wr">
      <div
        class="header-block">
        <div
          class="logo">
          <router-link
            to="/"
            class="link">
            СпортТут
          </router-link>
        </div>
        <div
          class="menu">
          <ul
            class="menu-ul">
            <li
              class="menu-ul__item"
              v-for="(item, i) in menu" :key="i">
              <router-link
                :to="item.link"
                class="link">
                {{ item.name }}
              </router-link>
            </li>
          </ul>
        </div>

        <div
          v-if="!user.auth"
          class="btns">
          <div
            class="btns-search">
            <a
              href="/search"
              @click.prevent="">
              <img
                src="/img/icons/search.png"
                alt="">
            </a>
          </div>
          <div
            class="btns-user">
            <a
              href="/auth"
              :class="loginModal.modal ? 'active' : ''"
              @click.prevent="toggleLogin()">
              <img
                src="/img/icons/user.png"
                alt="">
            </a>

            <login-form />

          </div>
        </div>
        <div
          v-else
          class="user">
          <router-link
            :to="`/user/${user.user_id}`"
            class="user-link">
            <div
              class="user-link__name">
              {{ user.profile.firstname }}
            </div>
            <div
              class="user-link__image">
              <img
                class="img"
                :src="returnImg(user.profile)"
                alt="">
            </div>
          </router-link>
          <a
            href=""
            @click.prevent="showMenu = !showMenu">
            <div
              class="user-arrow">
              <img
                src="/img/icons/arrow.png"
                alt="">
            </div>
          </a>

          <transition
            name="slideTop">
            <div
              v-if="showMenu"
              class="user-menu">
              <ul
                class="user-menu__ul">
                <li
                  class="user-menu__item">
                  <router-link
                    :to="`/user/${user.user_id}`"
                    class="user-menu__link">
                    Профиль
                  </router-link>
                </li>
                <li
                  class="user-menu__item">
                  <router-link
                    :to="`/settings`"
                    class="user-menu__link">
                    Настройки
                  </router-link>
                </li>
                <li
                  class="user-menu__item">
                  <a
                    href="/exit"
                    class="user-menu__link"
                    @click.prevent="logout()">
                    Выход
                  </a>
                </li>
              </ul>
            </div>
          </transition>

        </div>

      </div>
    </div>
  </header>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import modules from '@/modules/user';

import LoginForm from '@/components/Modals/LoginForm';

export default {
  components: {
    LoginForm,
  },
  data() {
    return {
      menu: [
        { name: 'Каталог тренеров', link: '/treners', },
      ],
      showMenu: false,
    }
  },
  computed: {
    ...mapState('user', ['user']),
    ...mapState('layout', ['loginModal']),
  },
  methods: {
    ...mapMutations('layout', ['CHANGE_LOGIN_MODAL']),
    ...mapActions('user', ['logout']),

    toggleLogin() {
      this.CHANGE_LOGIN_MODAL({ bg: !this.loginModal.bg, modal: !this.loginModal.modal })
    },

    returnImg(profile) {
      let gender, src, image;
      if (profile) {
        gender = profile.gender;
        if (profile.user_info) {
          src = profile.user_info.src;
          image = profile.user_info.image;
        }
      }
      return modules.returnAvatarMini(gender, src, image);
    }

  },
}
</script>

<style lang="css">
</style>
