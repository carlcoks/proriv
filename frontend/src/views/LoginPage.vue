<template>

  <section
    class="login-page">
    <div
      class="wr">

      <div
        class="login-page__block">

        <form
          class="login-form">

          <div
            class="left-side">
            <div
              class="left-side__tabs">
              <div
                class="tab"
                v-for="(item, i) in tabs" :key="i"
                :class="item.active ? 'active' : ''"
                @click="changeActive(i)">
                {{ item.name }}
              </div>
            </div>

            <transition
              name="slideLeft" mode="out-in">

              <signin-form
                v-if="tabs[0].active" />

              <signup-form
                v-if="tabs[1].active" />

            </transition>

          </div>
          <div
            class="right-side">
            <h1
              class="right-side__title">
              <b>DOLINGER</b> ANALYTICS
            </h1>
            <div
              class="right-side__img">
              <img
                src="/img/login-analytics.png">
            </div>
          </div>

        </form>

      </div>

    </div>
  </section>

</template>

<script>
import SigninForm from './components/LoginPage/SigninForm';
import SignupForm from './components/LoginPage/SignupForm';

export default {
  components: {
    SigninForm,
    SignupForm,
  },
  data() {
    return {
      tabs: [
        {
          name: 'Вход', active: true,
        },
        {
          name: 'Регистрация', active: false,
        },
      ]
    }
  },
  methods: {
    changeActive(id) {
      this.tabs.map((item, i) => {
        item.active = false;
        if (i == id) item.active = true;
      })
    }
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/login.sass'
</style>
