import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  videokursi: [],
  videouroki: [],
  singleKurs: null,
  singleUrok: null,
  addKurs: {
    bg: false,
    modal: false,
  }
}

const actions = {
  async getSingleKurs ({ commit }, data) {
    try {
      const response = await http.get('/api/v1/videokurs', {
        params: data
      });

      commit(TYPES.SET_SINGLE_KURS, response.data.result);
    } catch(e) {
      console.log(e);
    }
  },

  async getVideokursi ({ commit }, data) {
    try {
      const response = await http.get('/api/v1/videokursi', {
        params: data
      });

      commit(TYPES.SET_VIDEOKURS, response.data.result);
    } catch(e) {
      console.log(e);
    }
  },

  async addVideokurs ({ commit, rootState }, {data, onProgress}) {
    try {
      const response = await http.post('/api/v1/videokursi', data, {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState)
        },
        params: {
          user_id: Auth.getUserId(rootState),
        },
        onUploadProgress: function( progressEvent ) {
          let percentCompleted = parseInt( Math.round( ( progressEvent.loaded * 100 ) / progressEvent.total ) );
          if (onProgress) onProgress(percentCompleted);
        }
      })

      commit(TYPES.ADD_VIDEOKURS, response.data.result);
      return response.data;
    } catch(e) {
      // console.log(e);
      let result = { success: false, message: 'Произошла ошибка' };
      const { response } = e;
      if (response)
        result.message = response.data.message;

      return result;
    }
  },
}

const mutations = {
  [TYPES.SET_SINGLE_KURS](state, payload) {
    state.singleKurs = payload;
  },

  [TYPES.SET_VIDEOKURS](state, payload) {
    state.videokursi = payload;
  },

  [TYPES.ADD_VIDEOKURS](state, payload) {
    state.videokursi.unshift(payload);
  },

  [TYPES.CHANGE_ADD_KURS](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.addKurs[key] = payload[key];
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
