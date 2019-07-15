import * as TYPES from './types';

export default {
  [TYPES.SET_ALL_SPORT](state, payload) {
    state.allsport = payload;
  },
  
  [TYPES.SET_COUNTRIES](state, payload) {
    state.countries = payload.countries;
    state.cities = payload.cities;
  }
};
