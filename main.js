import Vue from 'vue';
import store from './store';
import App from './App';
import request from './tool/request.js';// 封装uniRqeuest请求;
import { msg, json, prePage } from './tool';// 引入自定义工具函数
import { BigSwiper, UniLoadMore } from '@/components/index.js';

Vue.component('BigSwiper', BigSwiper);
Vue.component('UniLoadMore', UniLoadMore);
Vue.config.productionTip = false;
Vue.prototype.$store = store;
Vue.prototype.$api = { msg, json, prePage };
Vue.prototype.$request = request;
App.mpType = 'app';

const app = new Vue({
  ...App,
  store,
});
app.$mount();
