<template>

  <header
    class="header">
    <div
      class="wr">

      <div
        class="header-block">
        <router-link
          to="/"
          class="logo">
          <b>DOLINGER</b> ANALYTICS
        </router-link>
        <div
          class="menu">
          <div
            class="menu-item"
            v-for="(item, i) in menu" :key="i">
            <router-link
              :to="`${item.link}`"
              class="link">
              {{ item.name }}
            </router-link>
          </div>
          <div
            class="menu-user">
            <img
              src="/img/icons/user.svg">
          </div>
        </div>
      </div>

    </div>
  </header>

</template>

<script>
export default {
  data() {
    return {
      menu: [
        {
          name: 'Загрузить данные', link: '/download',
        },
        {
          name: 'Аналитика', link: '/analytics',
        },
      ]
    }
  }
}
</script>

<style lang="css">
</style>
