import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  dialogs: null,
  activeDialog: null,
  messages: null, // сообщения
  forwho: null, // кому пишем
}

const actions = {
  async getDialogs({ commit, rootState }, data) {
    commit(TYPES.RESET_DIALOGS);
    try {
      const response = await http.get('/api/v1/dialogs', {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState)
        },
        params: {
          user_id: Auth.getUserId(rootState),
        },
      });

      commit(TYPES.SET_DIALOGS, response.data.result);

    } catch(e) {
      console.log(e);
    }
  },

  async getMessages ({ commit, rootState }, data) {
    commit(TYPES.RESET_MESSAGES);
    try {
      const response = await http.get('/api/v1/messages', {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState)
        },
        params: {
          user_id: Auth.getUserId(rootState),
          dialog_id: data.dialog_id,
          sel: data.sel,
        },
      })

      commit(TYPES.SET_MESSAGES, response.data.result);

    } catch(e) {
      console.log(e);
    }
  }
}

const mutations = {
  [TYPES.RESET_MESSAGES](state, payload) {
    state.messages = null;
  },

  [TYPES.RESET_DIALOGS](state, payload) {
    state.dialogs = null;
  },

  [TYPES.SET_DIALOGS](state, payload) {
    state.dialogs = payload;
  },

  [TYPES.SET_MESSAGES](state, payload) {
    if (payload) {
      state.messages = payload.messages ? payload.messages : [];
      state.forwho = payload.user ? payload.user : null;
    }
  },

  [TYPES.SET_ACTIVE_DIALOG](state, payload) {
    if (state.dialogs && payload) {
      for (let key in state.dialogs) {
        if (parseInt(state.dialogs[key].user.id) == parseInt(payload.sel)) {
          state.activeDialog = state.dialogs[key].id;
        }
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
