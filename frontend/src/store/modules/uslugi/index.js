import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  addUsluga: {
    bg: false,
    modal: false,
  }
}

const actions = {
}

const mutations = {
  [TYPES.CHANGE_ADD_USLUGA](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.addUsluga[key] = payload[key];
      }
    }
  }
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
