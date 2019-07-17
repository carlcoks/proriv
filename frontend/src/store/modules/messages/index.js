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
      return true;
    } catch(e) {
      console.log(e);
    }
  },

  async sendMessage ({ commit, rootState }, data) {
    try {
      const response = await http.post('/api/v1/messages', data, {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState),
        },
        params: {
          user_id: Auth.getUserId(rootState),
        }
      })

      const { result } = response.data;
      commit(TYPES.ADD_MESSAGE, result);
    } catch(e) {
      console.log(e);
    }
  },
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

  [TYPES.ADD_MESSAGE](state, payload) {
    if (payload) {
      state.messages.unshift(payload.message);

      state.dialogs.map((item, i) => {
        if (item.user_dialog.id == payload.dialog.user_dialog.id) {
          state.dialogs.splice(i, 1);
        }
      })

      state.dialogs.unshift(payload.dialog);
    }
  },

  [TYPES.ADD_NEW_MESSAGE](state, payload) {
    let newItem = payload.dialog;
    if (state.activeDialog == payload.dialog.user_dialog.id) {
      state.messages.unshift(payload.message);
    }
    state.dialogs.map((item, i) => {
      if (parseInt(item.user_dialog.id) == parseInt(payload.dialog.user_dialog.id)) {
        state.dialogs.splice(i, 1);
      }
    })
    state.dialogs.unshift(newItem);
  },

  [TYPES.SET_ACTIVE_DIALOG](state, payload) {
    if (state.dialogs && payload) {
      for (let key in state.dialogs) {
        if (parseInt(state.dialogs[key].user.id) == parseInt(payload.sel)) {
          state.activeDialog = state.dialogs[key].user_dialog.id;
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
