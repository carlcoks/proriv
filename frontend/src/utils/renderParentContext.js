import router from '@/router';
// import EmptyView from '@/views/EmptyView';

let parentComponent = null;

export default {
  functional: true,
  render(createElement, context) {
    return createElement(
      parentComponent || '', //EmptyView
      context.data,
      context.children,
    );
  },
  beforeRouteEnter(to, from, next) {
    /* eslint prefer-destructuring: 0 */
    parentComponent = router.getMatchedComponents()[1];
    next();
  },
};
