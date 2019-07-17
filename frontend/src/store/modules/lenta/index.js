import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  lenta: [],
}

const actions = {
  async getLenta ({ commit }, data) {
    try {
      const response = await http.get('/api/v1/lenta', {
        params: data
      });

      const { result } = response.data;

      commit(TYPES.SET_LENTA, result);
    } catch(e) {
      console.log(e);
    }
  },

  async addItem ({ commit, rootState }, data) {
    try {
      const response = await http.post('/api/v1/lenta', data, {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState),
          'Content-Type': 'multipart/form-data',
        },
        params: {
          user_id: Auth.getUserId(rootState),
        },
      });

      const { result } = response.data;

      if (result)
        commit(TYPES.ADD_ITEM, result);
    } catch(e) {
      console.log(e);
    }
  },

  async deleteInLenta ({ commit, rootState }, data) {
    try {
      const response = await http.delete('/api/v1/lenta', {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState)
        },
        params: {
          user_id: Auth.getUserId(rootState),
          ...data
        },
      })

      commit(TYPES.DELETE_IN_LENTA, data);
    } catch(e) {
      console.log(e);
    }
  },
}

const mutations = {
  [TYPES.RESET_LENTA](state, payload) {
    state.lenta = [];
  },

  [TYPES.SET_LENTA](state, payload) {
    state.lenta = payload;
  },

  [TYPES.ADD_ITEM](state, payload) {
    state.lenta.unshift(payload);
  },

  [TYPES.DELETE_IN_LENTA](state, payload) {
    state.lenta.map((item, i) => {
      if (item.id == payload.id)
        state.lenta.splice(i, 1);
    })
  }
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
