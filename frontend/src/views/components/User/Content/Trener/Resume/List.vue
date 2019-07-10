<template>

  <div
    class="education-item"
    :class="item.edit ? 'itemEdit' : ''">

    <div
      v-if="!item.edit"
      class="left-point">
      <div class="circle"></div>
      <div class="line"></div>
    </div>
    <div
      v-else
      class="left-point">
      <button
        class="btn"
        @click.prevent="$emit('changeOrder', { type: 'top' })">
        <img
          src="/img/icons/order-top.png">
      </button>
      <button
        class="btn"
        @click.prevent="$emit('changeOrder', { type: 'bot' })">
        <img
          src="/img/icons/order-bottom.png">
      </button>
    </div>
    <div
      class="education-item__block"
      :class="item.edit ? 'noPadBot' : ''">
      <div
        v-if="!item.edit"
        class="block-line"
        v-for="(child, c) in item.childs" :key="c">
        <div
          class="date">
          {{ child.date }}
        </div>
        <div
          class="title">
          {{ child.name }}
        </div>
      </div>
      <div
        v-if="item.edit"
        class="block-line"
        v-for="(edit, e) in newItem.childs" :key="e">
        <div
          class="block-line__date">
          <label
            :for="`date${e}`">
            {{ type == 'job' ? e == 0 ? 'Конец работы' : 'Начало работы' : type == 'edu' ? e == 0 ? 'Конец обучения' : 'Начало обучения' : '' }}
          </label>
          <input
            type="text"
            class="inpt"
            :id="`date${e}`"
            v-model.trim="edit.date"
            @keydown="checkNumber($event)"
            @input="inputWatch"
            :ref="`inputDate${e}`"
            maxlength="4"
            placeholder="2019" />
            <span
              v-if="errors.date[e]"
              class="error-mess">
              {{ errors.date[e] }}
            </span>
        </div>
        <div
          class="block-line__name">
          <label
            :for="`mesto${e}`">
            {{ type == 'job' ? e == 0 ? 'Место работы' : 'Должность' : type == 'edu' ? e == 0 ? 'Место обучения' : 'Специальность' : '' }}
          </label>
          <input
            type="text"
            class="inpt"
            :id="`mesto${e}`"
            v-model.trim="edit.name"
            @input="inputWatch"
            placeholder="" />
        </div>
      </div>
    </div>
    <div
      v-if="admin && !item.edit"
      class="education-item__edit">
      <button
        class="btn"
        @click.prevent="$emit('edit')">
        <img
          src="/img/icons/edit.png">
      </button>
    </div>

    <div
      v-if="admin && item.edit"
      class="save-btns">
      <button
        class="btn addNew"
        title="Удалить"
        @click.prevent="$emit('delete')">
        <img
          src="/img/icons/close_dark.png">
        Удалить
      </button>
      <div
        class="save-btns__right">
        <button
          class="btn addNew"
          title="Отмена"
          @click.prevent="$emit('cancel')">
          Отмена
        </button>
        <button
          class="btn send"
          title="Сохранить"
          @click.prevent="save()">
          Сохранить
        </button>
      </div>
    </div>

  </div>

</template>

<script>
import educationModel from '@/models/model-education';

export default {
  props: ['item', 'admin', 'edit', 'type'],
  data() {
    return {
      newItem: Object.cloneDeep(educationModel),
      errors: {
        date: {
          0: '',
          1: '',
        }
      },
    }
  },
  watch: {
    edit(data) {
      if (data) {
        this.newItem = Object.cloneDeep(this.item);
        this.errors = { date: { 0: '', 1: '' } };
      }
    },
  },
  methods: {
    save() {
      const end = parseInt(this.$refs.inputDate0[0].value);
      const start = parseInt(this.$refs.inputDate1[0].value);

      if (end < start) {
        this.errors.date[1] = 'Начало работы не может быть позже конца работы';
        return false;
      }

      let next = true;
      const childs = this.newItem.childs;
      childs.map(item => {
        for (let key in item) {
          if (item[key] == '') {
            this.errors.date[1] = 'Все поля обязательны для заполнения!';
            next = false;
          }
        }
      })

      if (next) {
        this.$emit('saveItem', {
          item: childs,
        })
        this.newItem = Object.cloneDeep(educationModel);
      }
    },

    inputWatch() {
      this.errors = { date: { 0: '', 1: '' } };
    },

    checkNumber(e) {
      if ( (((e.keyCode > 47) && (e.keyCode < 58)) || ((e.keyCode > 95) && (e.keyCode < 106))) || (e.keyCode == 8) || (e.keyCode == 46) || (e.keyCode == 37) || (e.keyCode == 39)) {
        return true;
      } else {
        e.preventDefault();
        return false
      }
    },
  },
}
</script>

<style lang="css">
</style>
