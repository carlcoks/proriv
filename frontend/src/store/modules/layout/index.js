import * as TYPES from './types';

const namespaced = true;

const state = {
  loginModal: {
    bg: false,
    modal: false,
    active: 'signin',
  },
  afterSignup: {
    bg: false,
    modal: false,
  },
  recoveryPass: {
    bg: false,
    modal: false,
  },
  afterAccept: {
    bg: false,
    modal: false,
  },
  changeAvatar: {
    bg: false,
    modal: false,
  },
  changeBg: {
    bg: false,
    modal: false,
  },
  changeContacts: {
    bg: false,
    modal: false,
  },
  changeSport: {
    bg: false,
    modal: false,
  },
}

const actions = {
}

const mutations = {
  [TYPES.CHANGE_LOGIN_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.loginModal[key] = payload[key];
      }
    }
  },

  [TYPES.CHANGE_AFTER_SIGNUP_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.afterSignup[key] = payload[key];
      }
    }
  },

  [TYPES.CHANGE_RECOVERY_PASS_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.recoveryPass[key] = payload[key];
      }
    }
  },

  [TYPES.CHANGE_AFTER_ACCEPT_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.afterAccept[key] = payload[key];
      }
    }
  },

  [TYPES.CHANGE_AVATAR_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.changeAvatar[key] = payload[key];
      }
    }
  },

  [TYPES.CHANGE_BG_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.changeBg[key] = payload[key];
      }
    }
  },

  [TYPES.CHANGE_CONTACTS_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.changeContacts[key] = payload[key];
      }
    }
  },

  [TYPES.CHANGE_SPORT_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.changeSport[key] = payload[key];
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
