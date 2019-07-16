import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  treners: [],
  sort: null,
  filter: {
    name: '',
    sport: '',
    country: '',
    city: '',
  },
}

const actions = {
  async getTreners ({ commit, rootState }, data) {
    let userId = Auth.getUserId(rootState);
    if (!userId) userId = 0;
    try {
      const response = await http.get('/api/v1/treners', {
        params: {
          user_id: userId
        }
      });

      const { result } = response.data;

      commit(TYPES.SET_TRENERS, result);
      return result;
    } catch (e) {
      console.log(e);
    }
  },

  async addBookmark ({ commit, rootState }, data) {
    try {
      const response = await http.post('/api/v1/bookmarks', data, {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState),
        },
        params: {
          user_id: Auth.getUserId(rootState),
        }
      })

      commit(TYPES.ADD_BOOKMARK, { num: data.num, id: response.data.result });
    } catch(e) {
      console.log(e);
    }
  },

  async deleteBookmark ({ commit, rootState }, data) {
    try {
      const response = await http.delete('/api/v1/bookmarks', {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState),
        },
        params: {
          user_id: Auth.getUserId(rootState),
          ...data
        }
      })

      commit(TYPES.DELETE_BOOKMARK, data);
    } catch(e) {
      console.log(e);
    }
  },
}

const mutations = {
  [TYPES.SET_FILTER](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.filter[key] = payload[key];
      }
    }
  },

  [TYPES.SET_SORT](state, payload) {
    state.sort = payload;
  },

  [TYPES.SET_TRENERS](state, payload) {
    state.treners = payload;
  },

  [TYPES.ADD_BOOKMARK](state, payload) {
    state.treners[payload.num].user_bookmark = { id: payload.id };
  },

  [TYPES.DELETE_BOOKMARK](state, payload) {
    state.treners[payload.num].user_bookmark = null;
  },
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
