<template>

  <div
    v-if="user"
    class="messages-user">
    <a
      :href="`/user/${user.id}`"
      target="_blank">
      <div
        class="messages-user__name">
        {{ user.firstname }} {{ user.lastname }}
      </div>
    </a>
    <a
      :href="`/user/${user.id}`"
      <div
        class="messages-user__avatar">
        <img
          class="image"
          :src="returnAvatar(user)">
      </div>
    </a>
  </div>

</template>

<script>
import modules from '@/modules/user';

export default {
  props: ['user'],
  methods: {
    returnAvatar(profile) {
      let gender, src, image;
      if (profile) {
        gender = profile.gender;
        if (profile.user_info) {
          src = profile.user_info.src;
          image = profile.user_info.image;
        }
      }
      return modules.returnAvatarMini(gender, src, image);
    }
  }
}
</script>

<style lang="css">
</style>
