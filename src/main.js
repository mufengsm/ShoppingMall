import Vue from 'vue';
import store from './store';
import App from './App';
// 封装uniRqeuest请求
import request from './utils/request.js';
// 封装全局函数助手
import functionHelper from './utils/functionHelper.js';
// 引入自定义工具函数
import { msg, json, prePage, apiUrl, imgUrl, woliveUrl } from './utils';

/*********全局组件注册 */
// 首页轮播图和商品详情轮播图
import BigSwiper from '@/components/BigSwiper/BigSwiper';
Vue.component('BigSwiper', BigSwiper);
// 加载更多数据时显示正在加载
import UniLoadMore from '@/components/UniLoadMore/UniLoadMore';
Vue.component('UniLoadMore', UniLoadMore);
// 认证组件
import Authentication from '@/components/Authentication/Authentication';
Vue.component('Authentication', Authentication);
/*********全局组件注册 */

// 关闭vue默认提示
Vue.config.productionTip = false;
// 全局store仓库
Vue.prototype.$store = store;
// 公共方法
Vue.prototype.$api = { msg, json, prePage, apiUrl };
// 图片地址
Vue.prototype.$imgUrl = imgUrl;
// 客服地址
Vue.prototype.$woliveUrl = woliveUrl;


// 挂在全局请求方式
Vue.prototype.$request = request;
Vue.prototype.$fnHelper = functionHelper;
App.mpType = 'app';

const app = new Vue({
  ...App,
  store,
});
app.$mount();
