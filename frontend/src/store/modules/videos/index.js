import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  videos: [], // Видеозаписи на главной
  single: null, // 1 видео пользователя
  addVideo: {
    bg: false,
    modal: false,
  }
}

const actions = {
  async addNewVideo ({ commit, rootState }, { data, onProgress }) {
    try {
      const response = await http.post('/api/v1/video', data, {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState),
          'Content-Type': 'multipart/form-data',
        },
        params: {
          user_id: Auth.getUserId(rootState),
        },
        onUploadProgress: function( progressEvent ) {
          let percentCompleted = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
          if (onProgress) onProgress(percentCompleted);
        }
      })

      commit(TYPES.ADD_NEW_VIDEO, response.data.result);
      return response.data;
    } catch(e) {
      console.log(e);
      const { response } = e;
      let result = { success: false, message: 'Произошла ошибка, попробуйте позже' };
      if (response)
        result.message = response.data.message;

      return result;
    }
  },

  async getVideos ({ commit }, data) {
    try {
      const response = await http.get('/api/v1/videos', {
        params: data
      })

      commit(TYPES.SET_VIDEOS, response.data.result);
      return response.data.result;
    } catch(e) {
      console.log(e);
    }
  },

  // async getPhotosMain({ commit }, data) {
  //   try {
  //     const response = await http.get('/api/v1/user-photos', {
  //       params: data
  //     });
  //     const { result } = response.data;
  //     commit(TYPES.SET_PHOTOS_MAIN, result);
  //   } catch(e) {
  //     const { response } = e;
  //     console.log(e);
  //     if (response)
  //       console.log('Err: ', response);
  //   }
  // },
  //
  // async getPhoto({ commit }, data) {
  //   try {
  //     const response = await http.get('/api/v1/photo', {
  //       params: data
  //     });
  //     commit(TYPES.SET_PHOTO, response.data.result);
  //     return response.data.result;
  //   } catch(e) {
  //     const { response } = e;
  //     console.log(e);
  //     if (response)
  //       console.log('Err: ', response);
  //   }
  // },
}

const mutations = {
  [TYPES.SET_VIDEOS](state, payload) {
    state.videos = payload;
  },

  [TYPES.ADD_NEW_VIDEO](state, payload) {
    state.videos.unshift(payload);
  },

  [TYPES.CHANGE_ADD_VIDEO_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.addVideo[key] = payload[key];
      }
    }
  },

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
