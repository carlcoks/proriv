import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  treners: [],
}

const actions = {
  async getTreners ({ commit }, data) {
    try {
      const response = await http.get('/api/v1/treners');

      const { result } = response.data;

      commit(TYPES.SET_TRENERS, result);
      return result;
    } catch (e) {
      console.log(e);
    }
  },
}

const mutations = {
  [TYPES.SET_TRENERS](state, payload) {
    state.treners = payload;
  }
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
