<template>

  <div
    class="info-user__bot-list">
    <div
      class="info-item">
      <div
        class="info-item__label">
        Специальность
      </div>
      <div
        class="info-item__name">
        {{ spealist }}
      </div>
    </div>
    <div
      class="info-item">
      <div
        class="info-item__label">
        На сайте
      </div>
      <div
        class="info-item__name">
        {{ returnDate(dateCreated) }}
      </div>
    </div>
  </div>

</template>

<script>
export default {
  props: ['spealist', 'dateCreated'],
  methods: {
    returnDate(date) {
      const titles = ['день','дня','дней'];
      const d0 = new Date(date);
      const d1 = new Date();
      const dt = Math.round((d1.getTime() - d0.getTime()) / (1000*60*60*24));

      const cases = [2, 0, 1, 1, 1, 2];
      const dayname = titles[ (dt%100 > 4 && dt%100 < 20) ? 2 : cases[(dt%10 < 5) ? dt%10 : 5] ];
      return dt + ' ' + dayname;
    }
  }
}
</script>

<style lang="css">
</style>
