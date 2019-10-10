import Vue from 'vue';
import Vuex from 'vuex';
import createLogger from 'vuex/dist/logger';
import storeCommodity from './storeCommodity';

Vue.use(Vuex);
// plugins: [createLogger()]
export default new Vuex.Store({
  modules: { // 放入modules
    storeCommodity,
  },
});
