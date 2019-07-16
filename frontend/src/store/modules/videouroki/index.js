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
  },
  addUrok: {
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

  async addVideourok ({ commit, rootState }, {data, onProgress}) {
    try {
      const response = await http.post('/api/v1/videourok', data, {
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

      commit(TYPES.ADD_VIDEOUROK, response.data.result);
      return response.data;
    } catch(e) {
      let result = { success: false, message: 'Произошла ошибка' };
      const { response } = e;
      if (response)
        result.message = response.data.message;

      return result;
    }
  },

  async getSingleUrok ({ commit }, data) {
    try {
      const response = await http.get('/api/v1/videourok', {
        params: data
      });

      commit(TYPES.SET_SINGLE_UROK, response.data.result);
      return response.data.result;
    } catch(e) {
      console.log(e);
    }
  },

  async getVideouroki ({ commit }, data) {
    try {
      const response = await http.get('/api/v1/videouroki', {
        params: data
      });

      commit(TYPES.SET_VIDEOUROKI, response.data.result);
    } catch(e) {
      console.log(e);
    }
  }
}

const mutations = {
  //Видеокурсы
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
  },

  // Видеоуроки
  [TYPES.CHANGE_ADD_UROK](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.addUrok[key] = payload[key];
      }
    }
  },

  [TYPES.ADD_VIDEOUROK](state, payload) {
    state.videouroki.unshift(payload);
  },

  [TYPES.SET_SINGLE_UROK](state, payload) {
    state.singleUrok = payload;
  },

  [TYPES.SET_VIDEOUROKI](state, payload) {
    state.videouroki = payload;
  },
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
