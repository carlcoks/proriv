<template>

  <div
    class="resume-block">

    <div
      class="resume-block__title">
      <div
        class="resume-block__title-image">
        <img
          src="/img/icons/user-card.png">
        Карточка пользователя
      </div>
      <button
        v-if="admin"
        title="Редактировать"
        class="btn"
        @click.prevent="editCard()">
        <img
          src="/img/icons/edit.png">
      </button>
    </div>

    <div
      class="usercard">

      <div
        class="usercard-block">

        <div
          class="usercard-block__line">
          <div
            class="usercard-block__line-side sideLeft">
            <div
              class="usercard-content">
              <div
                class="label">
                Рост
              </div>
              <div
                v-if="!edit"
                class="value">
                {{ data.height }} см
              </div>
              <div
                v-else>
                <input
                  type="text"
                  class="inpt"
                  v-model.trim="itemEdit.height"
                  @keydown="checkNumber"
                  maxlength="3">
              </div>
            </div>
          </div>
          <div
            class="usercard-block__line-side sideRight">
            <div
              class="usercard-content">
              <div
                class="label">
                Особенности
              </div>
              <div
                v-if="!edit"
                class="value">
                {{ data.props }}
              </div>
              <div
                v-else>
                <input
                  type="text"
                  class="inpt"
                  v-model.trim="itemEdit.props">
              </div>
            </div>
          </div>
        </div>

        <div
          class="usercard-block__line">
          <div
            class="usercard-block__line-side sideLeft">
            <div
              class="usercard-content">
              <div
                class="label">
                Вес
              </div>
              <div
                v-if="!edit"
                class="value">
                {{ data.weight }} кг
              </div>
              <div
                v-else>
                <input
                  type="text"
                  class="inpt"
                  v-model.trim="itemEdit.weight"
                  @keydown="checkNumber"
                  maxlength="3">
              </div>
            </div>
          </div>
          <div
            class="usercard-block__line-side sideRight">
            <div
              class="usercard-content">
              <div
                class="label">
                Заболевания, травмы
              </div>
              <div
                v-if="!edit"
                class="value">
                {{ data.ill }}
              </div>
              <div
                v-else>
                <input
                  type="text"
                  class="inpt"
                  v-model.trim="itemEdit.ill">
              </div>
            </div>
          </div>
        </div>

        <div
          class="usercard-block__line">
          <div
            class="usercard-block__line-side sideLeft">
            <div
              class="usercard-content">
              <div
                class="label">
                Лет
              </div>
              <div
                v-if="!edit"
                class="value">
                {{ data.age }}
              </div>
              <div
                v-else>
                <input
                  type="text"
                  class="inpt"
                  v-model.trim="itemEdit.age"
                  @keydown="checkNumber"
                  maxlength="3">
              </div>
            </div>
          </div>
          <div
            class="usercard-block__line-side sideRight">
            <div
              class="usercard-content">
              <div
                class="label">
                Противопоказания
              </div>
              <div
                v-if="!edit"
                class="value">
                {{ data.contrs }}
              </div>
              <div
                v-else>
                <input
                  type="text"
                  class="inpt"
                  v-model.trim="itemEdit.contrs">
              </div>
            </div>
          </div>
        </div>

      </div>

      <div
        v-if="edit"
        class="save-btns">
        <div>

        </div>
        <div
          class="save-btns__right">
          <button
            class="btn addNew"
            @click="edit = false">
            Отмена
          </button>
          <button
            class="btn infoBtn"
            @click="save()">
            Сохранить
          </button>
        </div>
      </div>

    </div>

  </div>

</template>

<script>
import { mapMutations, mapActions } from 'vuex';
import UsercardModel from '@/models/model-usercard';
import functions from '@/modules/functions';

export default {
  props: ['admin', 'data'],
  data() {
    return {
      itemEdit: {},
      edit: false,
    }
  },
  methods: {
    ...mapActions('resume', ['saveResume']),
    ...mapMutations('resume', ['UPDATE_USERCARD']),

    editCard() {
      if (this.data) {
        this.itemEdit = Object.cloneDeep(this.data);
      } else {
        this.itemEdit = Object.cloneDeep(UsercardModel);
      }
      this.edit = true;
    },

    save() {
      this.saveResume({ name: 'card', data: { value: JSON.stringify(this.itemEdit) } });
      this.UPDATE_USERCARD({ value: this.itemEdit })

      this.edit = false;
      this.itemEdit = {};
    },

    checkNumber(e) {
      return functions.checkNumber(e);
    },
  }
}
</script>

<style lang="css">
</style>
