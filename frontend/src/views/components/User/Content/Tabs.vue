<template>

  <div
    class="tabs">
    <ul
      class="tabs-ul"
      ref="tabs">
      <li
        class="tabs-ul__item"
        v-for="(item, i) in tabs" :key="i"
        :id="item.hash">
        <router-link
          :to="`/user/${$route.params.id}/${item.hash}`"
          class="link">
          {{ item.name }}
        </router-link>
      </li>
    </ul>
    <div
      ref="tabsLine"
      class="tabs-line"></div>
  </div>

</template>

<script>
export default {
  props: ['tabs'],
  mounted() {
    this.setLine();
  },
  watch: {
    $route (to, from) {
      this.setLine();
    }
  },
  methods: {
    setLine() {
      if (this.$route.meta.type == 'tabs') {
        const hash = this.$route.path.split('/')[3];
        const { tabs, tabsLine } = this.$refs;
        if (hash) {
          const items = tabs.children;
          for (let key in items) {
            let item = items[key].id;
            if (item == hash) {
              tabsLine.style.left = items[key].offsetLeft+'px';
              tabsLine.style.width = items[key].offsetWidth+'px';
              return false;
            }
          }
          this.$router.push(`/user/${this.$route.params.id}`)
        } else {
          const item = tabs.children[0];
          tabsLine.style.left = item.offsetLeft+'px';
          tabsLine.style.width = item.offsetWidth+'px';
        }
      }
    },
  }
}
</script>

<style lang="css">
</style>
