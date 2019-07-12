<template>

  <div
    class="treners-filter">
    <div
      class="treners-filter__title">
      Настройки поиска
    </div>
    <div
      class="treners-filter__block">
      <div
        class="treners-filter__block-line">
        <label
          for="name"
          class="label">
          Имя и фамилия тренера
        </label>
        <input
          type="text"
          id="name"
          v-model.trim="name"
          class="inpt">
      </div>
      <div
        class="treners-filter__block-line">
        <label
          for="sport"
          class="label">
          Вид спорта
        </label>
        <input
          type="text"
          id="sport"
          v-model.trim="sport"
          class="inpt">
      </div>
    </div>
    <div
      class="treners-filter__block">
      <div
        class="treners-filter__block-line">
        <label
          for="country"
          class="label">
          Страна
        </label>
        <input
          type="text"
          id="country"
          v-model.trim="country"
          class="inpt">
      </div>
      <div
        class="treners-filter__block-line">
        <label
          for="city"
          class="label">
          Город
        </label>
        <input
          type="text"
          id="city"
          v-model.trim="city"
          class="inpt">
      </div>
    </div>
  </div>

</template>

<script>
export default {
  data() {
    return {
      name: '',
      sport: '',
      country: '',
      city: '',
    }
  }
}
</script>

<style lang="css">
</style>
