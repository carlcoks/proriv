import * as TYPES from './types';
import http from '@/utils/api';

const namespaced = true;

const state = {
  user_profile: null,
}

const actions = {
  async getUser({ commit }, data) {
    try {
      const response = await http.get('/api/v1/user', {
        params: data
      })
      const { result } = response.data;
      commit(TYPES.SET_PROFILE, result);
      return result;
    } catch ({response}) {
      if (response)
        console.log(response)
    }
  }
}

const mutations = {
  [TYPES.SET_PROFILE](state, payload) {
    state.user_profile = payload;
  },

  [TYPES.CHANGE_PROFILE](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.user_profile[key] = payload[key];
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
