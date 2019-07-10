export default {
  getAuthenticationHeader (context) {
    return `Bearer ${context.user.user.token}`;
  },

  getUserId(context) {
    return context.user.user.user_id;
  }
}
