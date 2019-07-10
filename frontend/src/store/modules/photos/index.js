import * as TYPES from './types';
import http from '@/utils/api';

const namespaced = true;

const state = {
  photos: [], // Фотографии на главной
  photo: null, // 1 фото пользователя
}

const actions = {
  async getPhotosMain({ commit }, data) {
    try {
      const response = await http.get('/api/v1/user-photos', {
        params: data
      });
      const { result } = response.data;
      commit(TYPES.SET_PHOTOS_MAIN, result);
    } catch(e) {
      const { response } = e;
      console.log(e);
      if (response)
        console.log('Err: ', response);
    }
  },

  async getPhoto({ commit }, data) {
    try {
      const response = await http.get('/api/v1/photo', {
        params: data
      });
      commit(TYPES.SET_PHOTO, response.data.result);
      return response.data.result;
    } catch(e) {
      const { response } = e;
      console.log(e);
      if (response)
        console.log('Err: ', response);
    }
  },
}

const mutations = {
  [TYPES.SET_PHOTOS_MAIN](state, payload) {
    if (payload) {
      let key = 0, index = 0, array = [];

      payload.map((item, i) => {
        if (key % 2 == 0) {
          array.push([]);
          if (i != 0) {
            index++;
            key = 0;
          }
        }
        array[index].push(item);
        key++;
      })

      state.photos = array;
    }
  },

  [TYPES.SET_PHOTO](state, payload) {
    state.photo = payload;
  },

  [TYPES.CHANGE_PHOTO](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.photo[key] = payload[key];
      }
    }
  },

  [TYPES.ADD_PHOTO_COMMENT](state, payload) {
    state.photo.comments.push(payload);
  },
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
