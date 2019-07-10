<template>
  <div
    class="emoji"
    unselectable="on"
    onselectstart="return false;"
    onmousedown="return false;">
    <ul class="emoji-controller">
      <li
        v-for="(pannel,index) in pannels"
        @click="changeActive(index)"
        :class="{'active': index === activeIndex}">{{ pannel.title }}</li>
    </ul>
    <ul class="emoji-container">
      <li
        v-for="(emojiGroup, index) in emojis"
        style="padding: 0"
        :key="index"
        v-if="index === activeIndex">
        <a
          v-for="(emoji, index) in emojiGroup"
          :key="index"
          @click.prevent="setSmile(emoji.name)">
           <span
              class="emoji-item"
              :title="emoji.name"
              :class="'sprite-' + getPureName(emoji.name)"></span>
        </a>
      </li>
    </ul>
  </div>
</template>

<script>
import data from '@/utils/emoji-data'

export default {
  data() {
    return {
      emojiData: data,
      pannels: [
        { name: 'emotions', title: 'Эмоции', },
        { name: 'nature', title: 'Природа', },
        { name: 'items', title: 'Предметы', },
        { name: 'place', title: 'Места', },
        { name: 'symbol', title: 'Символы', }
      ],
      activeIndex: 0
    }
  },
  methods: {
    changeActive (index) {
      this.activeIndex = index
    },

    getPureName (name) {
      return name.replace(/:/g, '')
    },

    setSmile(emoji) {
      this.$emit('setSmile', emoji);
    }
  },
  computed: {
    emojis () {
      return this.pannels.map(item => {
        let array = [];
        let arrayEmj = this.emojiData[item.name];
        for (let emj in arrayEmj) {
          array.push({name: emj, img: arrayEmj[emj]})
        }
        return array;
      })
    }
  },
}
</script>

<style lang="sass">
  @import '@/styles/components/emoji-block.sass'
</style>
