<template>

  <div
    v-if="singleUrok"
    class="videokurs">

    <div
      class="videokurs-head">
      <router-link
        :to="`/user/${$route.params.id}/videouroki`"
        class="btn addNew">
        <img
          src="/img/icons/arrow-back.png">
        Все видеоуроки
      </router-link>
      <!-- <div
        class="videokurs-head__btns">
        <button
          class="btn addNew">
          <img
            src="/img/icons/edit.png">
          Редактировать
        </button>
        <button
          class="btn addNew">
          <img
            src="/img/icons/close_dark.png">
          Удалить
        </button>
      </div> -->
    </div>

    <div
      class="videokurs-item">
      <div
        class="videokurs-item__top">
        <div
          class="item-image">
          <img
            :src="`/api/${singleUrok.src}/cover_${singleUrok.image}`"
            class="img">
        </div>
        <div
          class="item-info">
          <div
            class="item-info__title">
            {{ singleUrok.title }}
          </div>
          <div
            class="item-info__price">
            <div
              class="item-info__price-label">
              Цена курса
            </div>
            <div
              class="item-info__price-text">
              {{ singleUrok.price }} руб.
            </div>
          </div>
        </div>
      </div>
      <div
        class="videokurs-item__desc">{{ singleUrok.description }}</div>
      <div
        class="videokurs-item__files">
        <div
          class="videokurs-item__files-title">
          Прикрепленные файлы:
        </div>
        <div
          class="videokurs-item__files-list">
          <a
            v-for="(item, i) in JSON.parse(singleUrok.files)" :key="i"
            :href="`/api/${singleUrok.src}/${item.name}`"
            download
            class="videokurs-item__files-list__item">
            <img
              src="/img/icons/file.png">
            <span
              class="text">
              {{ item.real_name }}
            </span>
          </a>
        </div>
      </div>
    </div>

  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'user-videourok',
  created() {
    this.getSingleUrok({
      id: this.$route.params.urok,
      user_id: this.$route.params.id,
    })
  },
  computed: {
    ...mapState('videouroki', ['singleUrok']),
  },
  methods: {
    ...mapActions('videouroki', ['getSingleUrok']),
  }
}
</script>

<style lang="css">
</style>
