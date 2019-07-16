export default {
  returnAvatarMini(gender, src, image) {
    if (src && image)
      return `/api/${src}/avatar/mini_${image}`;
    return `/api/public/img/icons/${gender}.jpg`;
  },

  returnAvatar(gender, src, image) {
    if (src && image)
      return `/api/${src}/avatar/cover_${image}`;
    return `/api/public/img/icons/${gender}.jpg`;
  },

  getUserBg(src, image) {
    if (src && image)
      return `/api/${src}/bg/crop_${image}`;
    return `/api/public/img/bg.jpg`;
  },
}
