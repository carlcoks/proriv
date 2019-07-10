import * as TYPES from './types';
import http from '@/utils/api';

const namespaced = true;

const state = {
  albums: null, // Все альбомы пользователя
  single: null, // Один альбом пользователя
  addAlbum: {
    bg: false,
    modal: false,
  }
}

const actions = {
  async getAlbums({ commit }, data) {
    try {
      const response = await http.get('/api/v1/user-albums', {
        params: data
      });
      commit(TYPES.SET_ALBUMS, response.data.result);
      return response.data.result;
    } catch(e) {
      const { response } = e;
      console.log(e);
      if (response)
        console.log('Err: ', response);
    }
  },

  async getAlbum({ commit }, data) {
    try {
      const response = await http.get('/api/v1/user-album', {
        params: data
      });
      const { result } = response.data;
      commit(TYPES.SET_ALBUM, result);
      return result;
    } catch(e) {
      const { response } = e;
      console.log('e: ', e);
      if (response)
        console.log('Err: ', response);
    }
  },
}

const mutations = {
  [TYPES.SET_ALBUMS](state, payload) {
    state.albums = payload;
  },

  [TYPES.SET_ALBUM](state, payload) {
    state.single = payload;
  },

  [TYPES.CHANGE_ADD_ALBUM_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.addAlbum[key] = payload[key];
      }
    }
  },
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
