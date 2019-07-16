import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  videos: [], // Видеозаписи на главной
  single: null, // 1 видео пользователя
  videosmain: [], //
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

  async getVideosMain({ commit }, data) {
    try {
      const response = await http.get('/api/v1/user-videos', {
        params: data
      });
      const { result } = response.data;
      commit(TYPES.SET_VIDEOS_MAIN, result);
    } catch(e) {
      console.log(e);
    }
  },

  async getVideo({ commit }, data) {
    try {
      const response = await http.get('/api/v1/video', {
        params: data
      });
      commit(TYPES.SET_SINGLE, response.data.result);
      return response.data.result;
    } catch(e) {
      console.log(e);
    }
  },

  async updateVideo({ commit, rootState }, {data, id}) {
    try {
      const response = await http.put('/api/v1/video', {
        user_id: Auth.getUserId(rootState),
        id: id,
        data,
      }, {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState),
        }
      })

      if (response.data.success)
        commit(TYPES.CHANGE_SINGLE_ABOUT, data);

      return response.data;
    } catch(e) {
      console.log(e);
    }
  },
}

const mutations = {
  [TYPES.SET_SINGLE](state, payload) {
    state.single = payload;
  },

  [TYPES.CHANGE_SINGLE_ABOUT](state, payload) {
    for (let key in payload) {
      state.single[key] = payload[key];
    }
  },

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

  [TYPES.SET_VIDEOS_MAIN](state, payload) {
    state.videosmain = payload;
  },

  // [TYPES.ADD_PHOTO_COMMENT](state, payload) {
  //   state.photo.comments.push(payload);
  // },
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
