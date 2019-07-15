<template>

  <div
    class="left-side"
    :class="openMenu ? 'active' : ''">
    <ul
      class="left-menu">
      <li
        class="left-menu__item">
        <a
          href="/toggle"
          class="link"
          @click.prevent="openMenu = !openMenu">
          <div
            class="link-icon">
            <img
              v-show="!openMenu"
              src="/img/icons/menuburger.png">
            <img
              v-show="openMenu"
              src="/img/icons/menuarrow.png">
          </div>
        </a>
      </li>
      <li
        class="left-menu__item"
        v-for="(item, i) in items" :key="i">
        <router-link
          :to="item.href"
          :title="item.text"
          class="link">
          <div
            class="link-icon">
            <img
              :src="`/img/icons/${item.icon}.png`">
          </div>
          <div
            class="link-text">
            {{ item.text }}
          </div>
        </router-link>
      </li>
    </ul>
  </div>

</template>

<script>
export default {
  props: ['userId'],
  data() {
    return {
      openMenu: false,
      items: [
        { href: `/user/${this.userId}/lenta`, icon: 'lenta', text: 'Лента' },
        { href: '/bookmarks', icon: 'favorites', text: 'Избранное' },
        { href: '/im', icon: 'messages', text: 'Сообщения' },
        { href: `/user/${this.userId}/albums`, icon: 'icon-photo', text: 'Фотогалерея' },
        { href: `/user/${this.userId}/videos`, icon: 'icon-video', text: 'Видео' },
        { href: `/user/${this.userId}/rewards`, icon: 'icon-reward', text: 'Награды' },
        { href: `/user/${this.userId}`, icon: 'resume', text: 'Резюме' },
      ]
    }
  }
}
</script>

<style lang="sass">
  @import '@/styles/layout/left-side.sass'
</style>
