<template>

  <section
    class="im-page pt-80">

    <div
      class="wr">

      <breadcrumbs
        :breads="[{ name: 'Сообщения' }]" />

      <div
        class="im-page__block">

        <div
          class="dialogs">
          <div
            v-if="dialogs && dialogs.length > 0"
            class="dialogs-list">

            <dialog-item
              v-for="(item, i) in dialogs" :key="i"
              :item="item"
              :activeId="activeDialog"
              :userId="user.user_id" />

          </div>

          <div
            v-else
            class="dialogs-empty">
            У вас нет диалогов
          </div>
        </div>

        <div
          class="messages">

          <forwho-block
            :user="forwho" />

          <div
            v-if="messages && messages.length > 0"
            class="messages-list">

            <message-item
              v-for="(item, i) in messages" :key="i"
              :item="item"
              :userId="user.user_id" />

          </div>
          <div
            v-else
            class="messages-empty">
            Здесь будут показаны сообщения выбранного диалога
          </div>

          <div
            v-if="activeDialog"
            class="form-send">
            <div class="form-send__input">
              <div
                class="inpt"
                contenteditable="true"
                ref="textArea"
                @click="placeholder = false"
                @blur="placeholder = true, getPlaceholder()"
              ></div>
              <div
                v-show="placeholder"
                class="placeholder">
                <p class="text">
                  Напишите сообщение
                </p>
              </div>
              <a
                href="#"
                class="emoji-btn"
                @click.prevent="openEmoji = !openEmoji"
                @mouseleave="openEmoji = false"
              >
                <emoji-block
                  class="emoji-btn__img"
                  v-show="openEmoji"
                  @setSmile="setSmile"
                />
              </a>
            </div>

            <button
              class="btn"
              @click="send()">
              <img
                src="/img/icons/send.png">
            </button>
          </div>

        </div>

      </div>

    </div>

  </section>

</template>

<script>
import { mapState, mapMutations, mapActions } from 'vuex';
import modules from '@/modules/smiles';

import Breadcrumbs from '@/components/Breadcrumbs';
import DialogItem from './components/Iam/DialogItem';
import MessageItem from './components/Iam/MessageItem';
import ForwhoBlock from './components/Iam/ForwhoBlock';
import EmojiBlock from '@/components/EmojiBlock';

export default {
  name: 'messages',
  asyncData ({ store, route }) {
    return store.dispatch('messages/getDialogs');
  },
  components: {
    Breadcrumbs,
    DialogItem,
    MessageItem,
    ForwhoBlock,
    EmojiBlock,
  },
  data() {
    return {
      placeholder: true,
      openEmoji: false,
    }
  },
  computed: {
    ...mapState('messages', ['dialogs', 'messages', 'activeDialog', 'forwho']),
    ...mapState('user', ['user']),
  },
  watch: {
    $route (to, from) {
      const { sel } = this.$route.query;
      if (!isNaN(parseFloat(sel)) && isFinite(sel) && sel > 0) {
        this.SET_ACTIVE_DIALOG({sel});
      }
      if (this.activeDialog)
        this.getMessages({dialog_id: this.activeDialog, sel: this.$route.query.sel})
    },
  },
  mounted() {
    const { sel } = this.$route.query;
    if (!isNaN(parseFloat(sel)) && isFinite(sel) && sel > 0) {
      this.SET_ACTIVE_DIALOG({sel});
    }
    if (this.activeDialog)
      this.getMessages({dialog_id: this.activeDialog, sel: this.$route.query.sel})
  },
  methods: {
    ...mapActions('messages', ['getMessages']),
    ...mapMutations('messages', ['SET_ACTIVE_DIALOG']),

    getPlaceholder() {
      const text = this.$refs.textArea.innerHTML;

      if ((text.length == 4 && text.substr(0, 4) == '<br>') || text.length == 0) {
        this.placeholder = true;
      } else {
        this.placeholder = false;
      }
    },

    setSmile(e) {
      modules.setSmile(this, this.$refs.textArea, e)
      this.getPlaceholder();
    },

    async send() {
      const text = this.$refs.textArea.innerHTML;
      if (text != '') {
        const value = text.replace(/<!--[\s\S]*?--!?>/g, "").replace(/<(?!img)\/?[a-z][^>]*(>|$)/gi, "");

        try {
          const response = await http.post('/api/v1/messages', {
            user_id: this.user.user_id,
          }, {
            headers: {
              'Authorization': `Bearer ${this.user.token}`,
            },
          })


        } catch(e) {
          console.log(e);
        }

        this.$refs.textArea.innerHTML = '';
        this.placeholder = true;
      }
    },
  }
}
</script>

<style lang="sass">
  @import '@/styles/pages/im.sass'
</style>
