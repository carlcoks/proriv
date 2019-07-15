import * as TYPES from './types';
import http from '@/utils/api';

export function setErrorResponse({ commit }, error) {
  if (error)
    console.log(error)
}

export async function getAllSport({ commit }) {
  try {
    const response = await http.get('/api/v1/sport');
    const { result } = response.data;
    commit(TYPES.SET_ALL_SPORT, result);
  } catch(e) {
    console.log('Err: ', e);
  }
}

export async function getCountries({ commit }) {
  try {
    const response = await http.get('/api/v1/countries');
    const { result } = response.data;
    commit(TYPES.SET_COUNTRIES, result);
  } catch(e) {
    console.log(e);
  }
}
