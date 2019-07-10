export default {
  returnAvatarMini(gender, src, image) {
    if (src && image) {
      return `/api/${src}/mini_${image}`;
    }
    return `/api/public/img/icons/${gender}.jpg`;
  },

  returnAvatar(gender, src, image) {
    if (src && image) {
      return `/api/${src}/cover_${image}`;
    }
    return `/api/public/img/icons/${gender}.jpg`;
  },

  getUserBg(src, image, id) {
    if (!src || !image || !id) return `/api/public/img/bg.jpg`;
    return `/api/public/users/${id}/${src}/${image}`;
  },
}
