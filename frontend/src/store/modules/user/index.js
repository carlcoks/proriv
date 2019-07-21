import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  user: {
    auth: false,
    profile: null,
    token: null,
    user_id: null,
  },
  errorAuth: '',
  errorSignup: '',
}

const actions = {
  async getUser ({ commit }, data) {
    try {
      const response = await http.get(`/user`, {
        params: data
      });
      const { success, result } = response.data;
      if (success) {
        commit('SET_USER_PROFILE', result);
      }
    } catch(e) {
      console.log(e);
    }
  },

  async auth ({ commit }, params) { // Вход
    try {
      const response = await http.post(`/auth`, params);
      const data = response.data;
      if (data.success) {
        fetch('/session', {
          method: 'post',
          headers: {
            "Content-type": "application/x-www-form-urlencoded"
          },
          body: `auth=true&name=${data.name}&token=${data.token}&user_id=${data.user_id}`,
        }).then(() => {
          commit('SET_USER', { auth: true, profile: data.profile, token: data.token, user_id: data.user_id });
          commit('SET_ERROR', { errorAuth: '', });
        })
        return data;
      } else
        return data;
    } catch({response}) {
      if (response)
        commit('SET_ERROR', { errorAuth: response.data.message })
    }
  },

  async signup ({ commit }, data) { // Регистрация
    try {
      const response = await http.post(`/signup`, data);
      const result = response.data;
      if (result.success)
        commit('SET_ERROR', { errorSignup: '' })
      return result;
    } catch ({response}) {
      if (response)
        commit('SET_ERROR', { errorSignup: response.data.message })
    }
  },

  async logout ({ commit }, data) {
    try {
      const response = await fetch('/session', {method: 'delete'});
      commit('SIGN_OUT')
    } catch(e) {
      console.log(e);
    }
  }
}

const mutations = {
  [TYPES.SET_USER_PROFILE](state, payload) {
    for (let key in payload) {
      state.user.profile[key] = payload[key];
    }
  },

  [TYPES.SET_USER](state, payload) {
    for (let key in payload) {
      state.user[key] = payload[key];
    }
  },

  [TYPES.SIGN_OUT](state, payload) {
    state.user.profile = {firstname: '', lastname: '', image: ''};
    state.user.token = null;
    state.user.user_id = null;
    state.user.status_a = null;
    state.user.auth = false;
  },

  [TYPES.SET_ERROR](state, payload) {
    for (let key in payload) {
      state[key] = payload[key];
    }
  },

}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
