import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  albums: null, // Все альбомы пользователя
  single: null, // Один альбом пользователя
  addAlbum: {
    bg: false,
    modal: false,
  },
  addPhoto: {
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

  async addSinglePhoto({ commit, rootState }, { data, id, onProgress }) {
    try {
      const response = await http.post('/api/v1/photo', data, {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState)
        },
        params: {
          user_id: Auth.getUserId(rootState),
          album_id: id,
        },
        onUploadProgress: function( progressEvent ) {
          let percentCompleted = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
          if (onProgress) onProgress(percentCompleted);
        }
      })

      commit(TYPES.ADD_PHOTO, response.data.result);
      return response.data;
    } catch(e) {
      const { response } = e;
      let result = { success: false, message: 'Произошла ошибка' };
      if (response)
        result.message = response.data.message;
      return result;
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

  [TYPES.ADD_PHOTO](state, payload) {
    state.single.photos.unshift(payload);
  },

  [TYPES.CHANGE_ADD_ALBUM_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.addAlbum[key] = payload[key];
      }
    }
  },

  [TYPES.CHANGE_ADD_PHOTO_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.addPhoto[key] = payload[key];
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
