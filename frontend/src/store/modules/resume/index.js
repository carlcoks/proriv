import * as TYPES from './types';
import http from '@/utils/api';
import Auth from '@/utils/auth';

const namespaced = true;

const state = {
  resume: null,
  education: [],
  job: [],
  card: {},
}

const actions = {
  async getResume ({ commit }, data) {
    try {
      const response = await http.get('/api/v1/resume', {
        params: {
          user_id: data.user_id,
        }
      });

      const { result } = response.data;
      commit('SET_STATE', result);
    } catch(e) {
      console.log(e);
    }
  },

  async saveResume ({ commit, rootState }, data) {
    try {
      const response = await http.put('/api/v1/resume', {
        user_id: Auth.getUserId(rootState),
        ...data,
      }, {
        headers: {
          'Authorization': Auth.getAuthenticationHeader(rootState)
        }
      })
    } catch(e) {
      console.log(e);
    }
  },
}

const mutations = {
  [TYPES.UPDATE_USERCARD](state, payload) {
    state.card = payload.value;
  },

  [TYPES.UPDATE_RESUME](state, payload) {
    state.resume = payload.value;
  },

  [TYPES.SET_STATE](state, payload) {
    if (payload) {
      for (let key in payload) {
        state[key] = payload[key];
      }
    }
  },

  [TYPES.ADD_EDUCATION](state, payload) {
    state.education.unshift(payload);
  },

  [TYPES.UPDATE_EDUCATION](state, payload) {
    state.education[payload.id].childs = payload.item;
    state.education[payload.id].edit = false;
  },

  [TYPES.CANCEL_EDIT_EDUCATION](state, payload) {
    let next = true;
    const childs = state.education[payload.id].childs;
    childs.map(item => {
      for (let key in item)
        if (item[key] == '') next = false;
    })

    if (next)
      state.education[payload.id].edit = false;
    else
      state.education.splice(payload.id, 1);
  },

  [TYPES.DELETE_EDUCATION](state, payload) {
    state.education.splice(payload.id, 1);
  },

  [TYPES.EDIT_EDUCATION](state, payload) {
    state.education[payload.id].edit = true;
  },

  [TYPES.CHANGE_EDUCATION_ORDER](state, payload) {
    const type = payload.type;
    const id = payload.id;
    let nextId = -1;

    if (type == 'top') {
      nextId = id - 1;
    } else if (type == 'bot') {
      nextId = id + 1;
    }

    if (state.education[nextId]) {
      const newItem = state.education.splice(nextId, 1)[0];
      state.education.splice(id, 0, newItem);
    }
  },

  [TYPES.ADD_JOB](state, payload) {
    state.job.unshift(payload);
  },

  [TYPES.UPDATE_JOB](state, payload) {
    state.job[payload.id].childs = payload.item;
    state.job[payload.id].edit = false;
  },

  [TYPES.CANCEL_EDIT_JOB](state, payload) {
    let next = true;
    const childs = state.job[payload.id].childs;
    childs.map(item => {
      for (let key in item)
        if (item[key] == '') next = false;
    })

    if (next)
      state.job[payload.id].edit = false;
    else
      state.job.splice(payload.id, 1);
  },

  [TYPES.DELETE_JOB](state, payload) {
    state.job.splice(payload.id, 1);
  },

  [TYPES.EDIT_JOB](state, payload) {
    state.job[payload.id].edit = true;
  },

  [TYPES.CHANGE_JOB_ORDER](state, payload) {
    const type = payload.type;
    const id = payload.id;
    let nextId = -1;

    if (type == 'top') {
      nextId = id - 1;
    } else if (type == 'bot') {
      nextId = id + 1;
    }

    if (state.job[nextId]) {
      const newItem = state.job.splice(nextId, 1)[0];
      state.job.splice(id, 0, newItem);
    }
  },
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
