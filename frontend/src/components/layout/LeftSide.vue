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
        // { href: '', icon: 'lenta', text: 'Лента' },
        // { href: '', icon: 'favorites', text: 'Избранное' },
        { href: '/im', icon: 'messages', text: 'Сообщения' },
        { href: `/user/${this.userId}#resume`, icon: 'resume', text: 'Резюме' },
      ]
    }
  }
}
</script>

<style lang="sass">
  @import '@/styles/layout/left-side.sass'
</style>
