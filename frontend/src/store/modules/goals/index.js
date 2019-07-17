import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  single: null,
  goals: [],
  addGoal: {
    bg: false,
    modal: false,
  }
}

const actions = {
  async deleteGoal ({ commit, rootState }, data) {
    try {
      const response = await http.delete('/api/v1/goal', {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState)
        },
        params: {
          user_id: Auth.getUserId(rootState),
          id: data.id,
        },
      })

      return response.data;
    } catch (e) {
      const { response } = e;
      if (response) {
        const result = { success: false, message: response.data.message }
        return result;
      }
    }
  },

  async getGoal ({ commit }, data) {
    try {
      const response = await http.get('/api/v1/goal', {
        params: data,
      })

      commit(TYPES.SET_SINGLE, response.data.result);
      return response.data.result;
    } catch(e) {
      console.log(e);
    }
  },

  async getGoals ({ commit }, data) {
    try {
      const response = await http.get('/api/v1/goals', {
        params: data,
      })

      commit(TYPES.SET_GOALS, response.data.result);
      return response.data.result;
    } catch(e) {
      console.log(e);
    }
  },

  async addItemGoal ({ commit, rootState }, {data, onProgress}) {
    try {
      const response = await http.post('/api/v1/goals', data, {
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

      commit(TYPES.ADD_ITEM_GOAL, response.data.result);
      return response.data;
    } catch(e) {
      const { response } = e;
      if (response) {
        let result = { success: false, message: response.data.message };
        return result;
      }
    }
  },
}

const mutations = {
  [TYPES.RESET_GOALS](state, payload) {
    state.goals = [];
  },

  [TYPES.RESET_SINGLE](state, payload) {
    state.single = null;
  },

  [TYPES.SET_SINGLE](state, payload) {
    state.single = payload;
  },

  [TYPES.SET_GOALS](state, payload) {
    state.goals = payload;
  },

  [TYPES.ADD_ITEM_GOAL](state, payload) {
    state.goals.unshift(payload);
  },

  [TYPES.CHANGE_ADD_GOAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.addGoal[key] = payload[key];
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
