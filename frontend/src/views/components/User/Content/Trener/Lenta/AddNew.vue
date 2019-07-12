<template>

  <div
    v-if="user.user_id == user_profile.id"
    class="lenta-add">

    <div
      class="lenta-add__form">
      <div
        class="user">
        <img
          :src="returnAvatar()"
          class="user-img">
      </div>
      <div
        class="form">
        <div
          class="form-input">
          <textarea
            type="text"
            class="inpt"
            v-model.trim="text"
            placeholder="Введите ваше сообщение" />
          <label
            class="btn addfile">
            <input
              type="file"
              multiple
              @change="uploadFiles"
              accept="image/*">
              <!-- .mpg, .mpeg, .mp4, .mov, .avi -->
            <img
              src="/img/icons/skrepka.png">
          </label>
        </div>
      </div>
      <div
        class="btns">
        <button
          class="btn"
          @click.prevent="send()">
          <img
            src="/img/icons/send.png">
        </button>
      </div>
    </div>

    <div
      class="lenta-add__previews">
      <div
        class="lenta-add__previews-item"
        v-for="(item, i) in previews" :key="i">
        <a
          href="/delete"
          title="Удалить"
          class="delete"
          @click.prevent="deletePreview(i)">
          <img
            src="/img/icons/closedel.png">
        </a>
        <div
          v-if="item.type == 'image'"
          :style="`background-image: url(${item.src})`"
          class="lenta-add__previews-item__img"></div>
        <div
          v-else
          class="lenta-add__previews-item__img">
          <video
            :src="`${item.src}`"></video>
        </div>
      </div>
      <span
        v-if="resp.status != null"
        class="error-mess"
        :class="resp.status == true ? 'success' : 'error'">
        {{ resp.mess }}
      </span>
    </div>

  </div>

</template>

<script>
import { mapState, mapActions } from 'vuex';
import modules from '@/modules/user';

export default {
  data() {
    return {
      text: '',
      previews: [],
      resp: {
        status: null,
        mess: '',
      },
    }
  },
  watch: {
    text() {
      this.resp.status = null;
      this.resp.mess = '';
    },
    previews() {
      this.resp.status = null;
      this.resp.mess = '';
    },
  },
  computed: {
    ...mapState('profile', ['user_profile']),
    ...mapState('user', ['user']),
  },
  methods: {
    ...mapActions('lenta', ['addItem']),

    returnAvatar() {
      const profile = this.user_profile;
      let src = '', image = '';
      if (profile.user_profile) {
        src = profile.user_profile.src;
        image = profile.user_profile.image;
      }
      
      return modules.returnAvatarMini(profile.gender, src, image);
    },

    uploadFiles(e) {
      const videosType = ['mpg', 'mpeg', 'mp4', 'mov', 'avi'];
      const files = e.target.files;

      if (this.previews.length + files.length > 8) {
        this.resp.status = false;
        this.resp.mess = 'Не более 8 фотографий';
        return false;
      }

      for (let key = 0; key < files.length; key++) {
        let file = files[key];
        let ext = file.name.split('.').pop();
        let type = 'image';

        if (videosType.indexOf(ext) > -1)
          type = 'video';

        this.previews.push({ file: file, type: type, src: URL.createObjectURL(file) });
      }
    },

    deletePreview(i) {
      this.previews.splice(i, 1);
    },

    send() {
      if (this.text == '' && this.previews.length == 0) {
        this.resp.status = false;
        this.resp.mess = '';
        return false;
      }

      const form = new FormData();

      form.append('text', this.text);
      form.append('length', this.previews.length);

      this.previews.map((item, i) => {
        form.append('img'+i+'_'+item.type, item.file);
      })

      this.addItem(form);

      this.text = '';
      this.previews = [];
    },
  },
}
</script>

<style lang="css">
</style>
