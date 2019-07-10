import * as TYPES from './types';
import http from '@/utils/api';

const namespaced = true;

const state = {
  rewardsmain: [],
  rewards: [],
  addReward: {
    bg: false,
    modal: false,
  }
}

const actions = {
  async getRewardsMain ({ commit }, data) {
    try {
      const response = await http.get('/api/v1/rewards-main', {
        params: data
      })
      commit(TYPES.SET_REWARDS_MAIN, response.data.result);
      return response.data.result;
    } catch (e) {
      console.log(e);
    }
  },

  async getRewards ({ commit }, data) {
    try {
      const response = await http.get('/api/v1/rewards', {
        params: data
      })
      commit(TYPES.SET_REWARDS, response.data.result);
      return response.data.result;
    } catch (e) {
      console.log(e);
    }
  }
}

const mutations = {
  [TYPES.SET_REWARDS](state, payload) {
    state.rewards = payload;
  },

  [TYPES.CHANGE_ADD_REWARD_MODAL](state, payload) {
    if (payload) {
      for (let key in payload) {
        state.addReward[key] = payload[key];
      }
    }
  },

  [TYPES.SET_REWARDS_MAIN](state, payload) {
    state.rewardsmain = payload;
  }
}

export default {
  namespaced,
  actions,
  state,
  mutations,
};
