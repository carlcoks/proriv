import Vue from 'vue';
import Vuex from 'vuex';

// import state from './state';
// import mutations from './mutations';
import * as actions from './actions';
// import * as TYPES from './types';
import * as modules from './modules';

Vue.use(Vuex);

export function createStore(context) {
  const store = new Vuex.Store({
    strict: process.env.NODE_ENV !== 'production',
    modules,
    // state,
    actions,
    // mutations,
  });

  if (process.browser && context.state) {
    const { user } = context.state;
    store.replaceState({ ...store.state, ...context.state, user });
  }

  return store;
}

// export { TYPES };
