import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import storeOne from './store_one';

Vue.use(Vuex);
// plugins: [createLogger()]
export default new Vuex.Store({
  modules: { // 放入modules
    storeOne,
  },
});
