(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/goodss/search/search"],{3587:function(t,r,n){"use strict";var i=function(){var t=this,r=t.$createElement;t._self._c},e=[];n.d(r,"a",function(){return i}),n.d(r,"b",function(){return e})},4446:function(t,r,n){"use strict";(function(t){n("6cdc");i(n("66fd"));var r=i(n("e253"));function i(t){return t&&t.__esModule?t:{default:t}}t(r.default)}).call(this,n("543d")["createPage"])},"719f":function(t,r,n){},a645:function(t,r,n){"use strict";(function(t){Object.defineProperty(r,"__esModule",{value:!0}),r.default=void 0;var i=n("2f62");function e(t,r){var n=Object.keys(t);if(Object.getOwnPropertySymbols){var i=Object.getOwnPropertySymbols(t);r&&(i=i.filter(function(r){return Object.getOwnPropertyDescriptor(t,r).enumerable})),n.push.apply(n,i)}return n}function a(t){for(var r=1;r<arguments.length;r++){var n=null!=arguments[r]?arguments[r]:{};r%2?e(n,!0).forEach(function(r){s(t,r,n[r])}):Object.getOwnPropertyDescriptors?Object.defineProperties(t,Object.getOwnPropertyDescriptors(n)):e(n).forEach(function(r){Object.defineProperty(t,r,Object.getOwnPropertyDescriptor(n,r))})}return t}function s(t,r,n){return r in t?Object.defineProperty(t,r,{value:n,enumerable:!0,configurable:!0,writable:!0}):t[r]=n,t}var o=function(){return n.e("components/SortList/SortList").then(n.bind(null,"c1fa"))},_=(0,i.createNamespacedHelpers)("storeCommodity"),c=_.mapState,d=_.mapActions,u={data:function(){return a({},c(["brand_info","sort_info"]),{private_info:{private_brand_info:[],private_sort_info:[]},brand:{is_brand_open:!1,current:null,brand:0},tags_id:0,sort:{is_sort_open:!1,sort_current:null,sort_brand_id:0},private_search_info:[],req_search_info_page:1,no_data:!0,search_input:"",isImg:!1})},components:{SortList:o},onLoad:function(r){var n=this;this.tags_id=r.tags_id?Number(r.tags_id):0,this.req_search_info(),this.BRAND_INFO({url:this.$api.apiUrl.POST_QUERY_BRAND,data:{tags_id:this.tags_id,num:200}}).then(function(t){n.private_info.private_brand_info=t.data.slice(0,8)}),this.sort_list(),t.showShareMenu({withShareTicket:!0})},onReachBottom:function(){if(!this.no_data)return!1;this.req_search_info_page++,this.req_search_info()},onNavigationBarSearchInputChanged:function(t){this.search_button(t)},onNavigationBarButtonTap:function(){this.search_dataInfo()},methods:a({},d(["SEARCH_INFO","BRAND_INFO","SORT_LIST"]),{search_dataInfo:function(){var t=this;this.$request.POST({url:this.$api.apiUrl.POST_BRAND_LIBRARY_QUERY,data:{tags_id:this.tags_id,brand_id:this.brand.brand_id,cate_id:this.sort.sort_brand_id,goods_name:this.search_input,page:1,num:10}}).then(function(r){t.private_search_info=r.data})},search_button:function(t){this.search_input=t.text},open:function(t){switch(t._name){case"品牌":!1===this.brand.is_brand_open?this.private_info.private_brand_info=this.brand_info():this.private_info.private_brand_info=this.brand_info().slice(0,8),this.brand.is_brand_open=!this.brand.is_brand_open;break;case"分类":!1===this.sort.is_sort_open?this.private_info.private_sort_info=this.sort_info():this.private_info.private_sort_info=this.sort_info().slice(0,8),this.sort.is_sort_open=!this.sort.is_sort_open;break;default:return!1}},brand_choice:function(t){var r=t.index,n=t.event,i=t.title;if("品牌"===i)this.brand.current===r?(this.brand.current=null,this.brand.brand_id=0):(this.brand.current=r,this.brand.brand_id=parseInt(n.currentTarget.dataset.id)),this.sort.sort_current=null,this.sort.sort_brand_id=0,this.sort_list();else{if("分类"!==i)return!1;this.sort.sort_current===r?(this.sort.sort_current=null,this.sort.sort_brand_id=0):(this.sort.sort_current=r,this.sort.sort_brand_id=parseInt(n.currentTarget.dataset.id))}this.req_search_info_page=1,this.private_search_info=[],this.no_data=!0,this.req_search_info()},req_search_info:function(){var t=this;this.SEARCH_INFO({url:this.$api.apiUrl.POST_BRAND_LIBRARY_QUERY,data:{tags_id:this.tags_id,brand_id:this.brand.brand_id,cate_id:this.sort.sort_brand_id,num:10,page:this.req_search_info_page,goods_name:this.search_input}}).then(function(r){r?(r.data.length<10&&(t.no_data=!1),t.private_search_info=t.private_search_info.concat(r.data),t.isImg=!1):t.isImg=!0})},sort_list:function(){var t=this;this.SORT_LIST({url:this.$api.apiUrl.POST_QUERY_CLASSIFICATION,data:{tags_id:this.tags_id,brand_id:this.brand.brand_id,num:200}}).then(function(r){t.private_info.private_sort_info=r.data.slice(0,8)})},goodsInfo:function(r){t.navigateTo({url:"/pages/goodss/product/product?id=".concat(r)})},search_btn:function(){this.private_search_info.splice(0,this.private_search_info.length),this.req_search_info()}})};r.default=u}).call(this,n("543d")["default"])},cc73:function(t,r,n){"use strict";var i=n("719f"),e=n.n(i);e.a},e253:function(t,r,n){"use strict";n.r(r);var i=n("3587"),e=n("ed62");for(var a in e)"default"!==a&&function(t){n.d(r,t,function(){return e[t]})}(a);n("cc73");var s=n("2877"),o=Object(s["a"])(e["default"],i["a"],i["b"],!1,null,null,null);r["default"]=o.exports},ed62:function(t,r,n){"use strict";n.r(r);var i=n("a645"),e=n.n(i);for(var a in i)"default"!==a&&function(t){n.d(r,t,function(){return i[t]})}(a);r["default"]=e.a}},[["4446","common/runtime","common/vendor"]]]);