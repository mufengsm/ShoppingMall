import Vue from 'vue';
import UniLoadMore from './UniLoadMore/UniLoadMore.vue';
import SortList from './SortList/SortList.vue';
import BigSwiper from './BigSwiper/BigSwiper.vue';
import Share from './Share/Share.vue';

const Components = {
  SortList,
  BigSwiper,
  Share,
  UniLoadMore,
}

//自动注册组件;这种写法等待修复
Object.keys(Components).forEach(name => {
  Vue.component(name, Components[name])
})