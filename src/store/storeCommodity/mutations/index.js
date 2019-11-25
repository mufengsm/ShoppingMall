import {
  LOGIN, LOGOUT, SEARCH_INFO, BRAND_INFO, SORT_LIST,
} from '../types.js';

export default {

  [LOGOUT](state) {
    state.hasLogin = false;
    state.userInfo = {};
    uni.removeStorage({
      key: 'userInfo',
    });
  },

  [SEARCH_INFO](state, payload) {
    state.search_info = payload.data;
  },
  [BRAND_INFO](state, payload) {
    state.brand_info = payload.data;
  },
  [SORT_LIST](state, payload) {
    state.sort_info = payload.data;
  },
  [LOGIN](state, payload) {
    state.isLogin = payload.isLogin;
  }
};
