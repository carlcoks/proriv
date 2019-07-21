import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
}

const actions = {
  async uploadForm ({ commit, rootState }, data) {
    try {
      const response = await http.post(`/upload`, data, {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState),
          'Content-Type': 'multipart/form-data',
        },
        params: {
          user_id: Auth.getUserId(rootState),
        },
      });
      return response.data;
    } catch(e) {
      console.log(e);
    }
  },
}

const mutations = {
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
