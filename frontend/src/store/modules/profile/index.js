import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  user_profile: null,
}

const actions = {
  async updateUser ({ commit, rootState }, data) {
    try {
      const response = await http.put('/api/v1/user', {
        user_id: Auth.getUserId(rootState),
        data,
      }, {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState)
        }
      })
    } catch(e) {
      console.log(e);
    }
  },

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

      if (payload.user_info) {
        for (let key in payload.user_info) {
          state.user_profile.user_info[key] = payload.user_info[key];
        }
      } else {
        for (let key in payload) {
          state.user_profile[key] = payload[key];
        }
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
