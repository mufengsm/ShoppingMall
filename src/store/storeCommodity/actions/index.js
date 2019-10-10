import Vue from 'vue';
import {
  LOGIN, LOGOUT, ADD, SEARCH_INFO, BRAND_INFO, SORT_LIST, PRICE_CONTROL_INFO,
} from '../types.js';

const $api = Vue.prototype;
export default {
  async [SEARCH_INFO]({ commit }, payload) {
    const result = await $api.$request.POST(payload);
    commit(SEARCH_INFO, result);
    return result;
  },
  async [BRAND_INFO]({ commit }, payload) {
    const result = await $api.$request.POST(payload);
    commit(BRAND_INFO, result);
    return result;
  },
  async [SORT_LIST]({ commit }, payload) {
    const result = await $api.$request.POST(payload);
    commit(SORT_LIST, result);
    return result;
  },
  async [PRICE_CONTROL_INFO]({ commit }, payload) {
    const result = await $api.$request.POST(payload);
    return result;
  },
};
