import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  bookmarks: [],
}

const actions = {
  async getBookmarks ({ commit, rootState }, data) {
    try {
      const response = await http.get('/api/v1/bookmarks', {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState),
        },
        params: {
          user_id: Auth.getUserId(rootState)
        }
      });

      const { result } = response.data;

      commit(TYPES.SET_BOOKMARKS, result);
      return result;
    } catch (e) {
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
  [TYPES.SET_BOOKMARKS](state, payload) {
    state.bookmarks = payload;
  },

  [TYPES.DELETE_BOOKMARK](state, payload) {
    state.bookmarks.splice(payload.num, 1);
  },
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
