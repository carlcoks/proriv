import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  data: null
}

const actions = {
  async getStatic ({ commit, rootState }, data) {
    try {
      const response = await http.get(`/analitics/` + data.id, {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState),
        },
        params: data.id,
      });
      commit(TYPES.SET_STATIC, response.data.result);
      return response.data.result;
    } catch(e) {
      console.log(e);
    }
  },
}

const mutations = {
  [TYPES.SET_STATIC](state, payload) {
    state.data = payload;
  }
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
