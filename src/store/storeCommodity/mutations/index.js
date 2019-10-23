import {
  LOGIN, LOGOUT, ADD, SEARCH_INFO, BRAND_INFO, SORT_LIST,
} from '../types.js';

export default {
  [LOGOUT](state, provider) {
    state.hasLogin = true;
    state.userInfo = provider;
    uni.setStorage({ // 缓存用户登陆状态
      key: 'userInfo',
      data: provider,
    });
  },
  [LOGOUT](state) {
    state.hasLogin = false;
    state.userInfo = {};
    uni.removeStorage({
      key: 'userInfo',
    });
  },
  [ADD](state, payload) {
    state.num += payload.b;
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
