(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["pages-index-index"],{"1b68":function(e,t,a){var i=a("d06f");"string"===typeof i&&(i=[[e.i,i,""]]),i.locals&&(e.exports=i.locals);var s=a("4f06").default;s("1114a1c8",i,!0,{sourceMap:!1,shadowMode:!1})},"775c":function(e,t,a){"use strict";var i=a("288e");Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0,a("96cf");var s=i(a("3b8d")),n=i(a("cebc")),l=a("2f62"),r=(0,l.createNamespacedHelpers)("storeOne"),o=r.mapState,c=r.mapActions,d={data:function(){return(0,n.default)({titleNViewBackground:"",swiperCurrent:0,swiperLength:0,carouselList:[],goodsList:[],huadongs:[{img:"/static/temp/c3.png",mag:"123546854"},{img:"/static/temp/c5.png",mag:"123546854"},{img:"/static/temp/c6.png",mag:"123546854"},{img:"/static/temp/c7.png",mag:"123546854"},{img:"/static/temp/c3.png",mag:"123546854"},{img:"/static/temp/c5.png",mag:"123546854"},{img:"/static/temp/c6.png",mag:"123546854"},{img:"/static/temp/c7.png",mag:"123546854"}],huadongs1:[{img:"/static/temp/c3.png",mag:"123546854"},{img:"/static/temp/c5.png",mag:"123546854"},{img:"/static/temp/c6.png",mag:"123546854"}]},o(["num"]))},onLoad:function(){var e=this;this.loadData(),this.$request.GET({url:"/v1/goods/recommend",data:{page:1}}).then(function(t){e.goodsList=t})},methods:(0,n.default)({},c(["ADD","GOODS_RECOMMEND"]),{scroll:function(e){this.old.scrollTop=e.detail.scrollTop},loadData:function(){var e=(0,s.default)(regeneratorRuntime.mark(function e(){var t;return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,this.$api.json("carouselList");case 2:t=e.sent,this.titleNViewBackground=t[0].background,this.swiperLength=t.length,this.carouselList=t;case 6:case"end":return e.stop()}},e,this)}));function t(){return e.apply(this,arguments)}return t}(),navToDetailPage:function(e){var t=e.title;uni.navigateTo({url:"/pages/product/product?id=".concat(t)})}}),onNavigationBarSearchInputClicked:function(){var e=(0,s.default)(regeneratorRuntime.mark(function e(t){return regeneratorRuntime.wrap(function(e){while(1)switch(e.prev=e.next){case 0:uni.navigateTo({url:"/pages/search/search"});case 1:case"end":return e.stop()}},e,this)}));function t(t){return e.apply(this,arguments)}return t}(),onNavigationBarButtonTap:function(e){var t=e.index;0===t?this.$api.msg("点击了扫描"):1===t&&uni.navigateTo({url:"/pages/notice/notice"})}};t.default=d},"9a1f":function(e,t,a){"use strict";var i=function(){var e=this,t=e.$createElement,a=e._self._c||t;return a("v-uni-view",{staticClass:"container"},[a("v-uni-view",{staticClass:"carousel-section"},[a("BigSwiper",{attrs:{carouselList:e.carouselList},on:{swiper_navToDetailPage:function(t){t=e.$handleEvent(t),e.navToDetailPage(t)}}})],1),a("v-uni-view",{staticClass:"cate-section"},[a("v-uni-view",{staticClass:"cate-item",on:{click:function(t){t=e.$handleEvent(t),e.btn(t)}}},[a("v-uni-image",{attrs:{src:"/static/temp/c3.png"}}),a("v-uni-text",[e._v("环球美食")])],1),a("v-uni-view",{staticClass:"cate-item"},[a("v-uni-image",{attrs:{src:"/static/temp/c5.png"}}),a("v-uni-text",[e._v("个护美妆")])],1),a("v-uni-view",{staticClass:"cate-item"},[a("v-uni-image",{attrs:{src:"/static/temp/c6.png"}}),a("v-uni-text",[e._v("营养保健")])],1),a("v-uni-view",{staticClass:"cate-item"},[a("v-uni-image",{attrs:{src:"/static/temp/c7.png"}}),a("v-uni-text",[e._v("家居厨卫")])],1)],1),a("v-uni-view",{staticClass:"seckill-section seckill"},[a("v-uni-view",{staticClass:"s-header"},[a("v-uni-text",{staticClass:"Assemble_text"},[e._v("本周拼团")]),a("v-uni-text",{staticClass:"Assemble_time"},[a("v-uni-text",[e._v("00")]),e._v(":"),a("v-uni-text",[e._v("00")]),e._v(":"),a("v-uni-text",[e._v("00")]),e._v(":"),a("v-uni-text",[e._v("00")])],1),a("v-uni-text",{staticClass:"Assemble_text_2"},[e._v("更多")])],1),a("v-uni-scroll-view",{staticClass:"floor-list",attrs:{"scroll-x":""}},[a("v-uni-view",{staticClass:"scoll-wrapper"},e._l(e.goodsList,function(t,i){return a("v-uni-view",{key:i,staticClass:"floor-item",on:{click:function(a){a=e.$handleEvent(a),e.navToDetailPage(t)}}},[a("v-uni-image",{attrs:{src:t.logo_img,mode:"aspectFill"}}),a("v-uni-text",{staticClass:"title clamp"},[e._v(e._s(t.title))]),a("v-uni-text",{staticClass:"price"},[e._v("￥"+e._s(t.sales_price))])],1)}),1)],1)],1),e._l(e.huadongs1,function(t,i){return a("v-uni-view",{key:i},[a("v-uni-view",{staticClass:"f-header seckill"},[a("v-uni-view",{staticClass:"scroll_title"},[e._v("爆品馆")]),a("v-uni-text",{staticClass:"Assemble_text_2"},[e._v("更多")])],1),a("v-uni-view",{staticClass:"group-section"},[a("BigSwiper",{attrs:{carouselList:e.carouselList,height:"ai",msg:"自定义"},on:{swiper_navToDetailPage:function(t){t=e.$handleEvent(t),e.navToDetailPage(t)}}})],1),a("v-uni-view",{staticClass:"f-header f-header_warp"},e._l(e.huadongs1,function(t,i){return a("v-uni-view",{key:i,staticClass:"warp"},[a("v-uni-image",{attrs:{src:t.img,mode:""}}),a("v-uni-text",[e._v(e._s(t.mag))])],1)}),1)],1)}),a("v-uni-view",{staticClass:"f-header seckill"},[a("v-uni-view",{staticClass:"scroll_title"},[e._v("为您推荐")]),a("v-uni-text",{staticClass:"Assemble_text_2"},[e._v("更多")])],1),a("v-uni-view",{staticClass:"guess-section"},e._l(e.goodsList,function(t,i){return a("v-uni-view",{key:i,staticClass:"guess-item",on:{click:function(a){a=e.$handleEvent(a),e.navToDetailPage(t)}}},[a("v-uni-view",{staticClass:"image-wrapper"},[a("v-uni-image",{attrs:{src:t.logo_img,mode:"aspectFill"}})],1),a("v-uni-text",{staticClass:"title clamp"},[e._v(e._s(t.title))]),a("v-uni-view",{staticClass:"price"},[e._v("￥"+e._s(t.sales_price)),a("v-uni-view",{staticClass:"find"},[e._v("发现")])],1)],1)}),1)],2)},s=[];a.d(t,"a",function(){return i}),a.d(t,"b",function(){return s})},"9b6c":function(e,t,a){"use strict";a.r(t);var i=a("9a1f"),s=a("fe1a");for(var n in s)"default"!==n&&function(e){a.d(t,e,function(){return s[e]})}(n);a("a6b2");var l=a("2877"),r=Object(l["a"])(s["default"],i["a"],i["b"],!1,null,"ae58779a",null);t["default"]=r.exports},a6b2:function(e,t,a){"use strict";var i=a("1b68"),s=a.n(i);s.a},d06f:function(e,t,a){t=e.exports=a("2350")(!1),t.push([e.i,'@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */\nuni-page-body[data-v-ae58779a]{background:#f5f5f5}.seckill[data-v-ae58779a]{margin-top:%?16?%}\n/* 头部 轮播图 */.carousel-section[data-v-ae58779a]{position:relative}\n/* 分类 */.cate-section[data-v-ae58779a]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-justify-content:space-around;-ms-flex-pack:distribute;justify-content:space-around;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:%?30?% %?22?%;background:#fff\n  /* 原图标颜色太深,不想改图了,所以加了透明度 */}.cate-section .cate-item[data-v-ae58779a]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;font-size:%?26?%;color:#303133}.cate-section uni-image[data-v-ae58779a]{width:%?88?%;height:%?88?%;margin-bottom:%?14?%;border-radius:50%;-webkit-box-shadow:%?4?% %?4?% %?20?% rgba(250,67,106,.3);box-shadow:%?4?% %?4?% %?20?% rgba(250,67,106,.3)}\n/* 秒杀专区 */.seckill-section[data-v-ae58779a]{padding:%?4?% %?30?% %?24?%;background:#fff}.seckill-section .s-header[data-v-ae58779a]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:%?92?%;line-height:1}.seckill-section .s-header .Assemble_text[data-v-ae58779a]{font-weight:700;text-align:left;margin-left:%?10?%;color:#ec6350;width:33%}.seckill-section .s-header .Assemble_time uni-text[data-v-ae58779a]{background-color:#ec6350;color:#fff;border-radius:%?10?%;margin-left:%?10?%}.seckill-section .floor-list[data-v-ae58779a]{white-space:nowrap}.seckill-section .scoll-wrapper[data-v-ae58779a]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.seckill-section .floor-item[data-v-ae58779a]{width:%?150?%;margin-right:%?20?%;font-size:%?26?%;color:#303133;line-height:1.8}.seckill-section .floor-item uni-image[data-v-ae58779a]{width:%?150?%;height:%?150?%;border-radius:%?6?%}.seckill-section .floor-item .price[data-v-ae58779a]{color:#fa436a}\n/* 所有更多都使用这个样式 */.Assemble_text_2[data-v-ae58779a]{font-size:16px;text-align:right;margin-right:%?10?%;width:33%;color:#ec6350}.f-header[data-v-ae58779a]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:center;-webkit-align-items:center;-ms-flex-align:center;align-items:center;height:%?110?%;padding:%?0?% %?30?% %?8?%;background:#fff}.f-header uni-image[data-v-ae58779a]{-webkit-flex-shrink:0;-ms-flex-negative:0;flex-shrink:0;width:%?80?%;height:%?80?%;margin-right:%?20?%}.f-header .tit[data-v-ae58779a]{font-size:%?34?%;color:#font-color-dark;line-height:1.3}.f-header .scroll_title[data-v-ae58779a]{margin-left:%?180?%;width:%?350?%;text-align:center;height:%?80?%;border-bottom:3px solid #ec6350;color:#ec6350;font-weight:700}.f-header_warp[data-v-ae58779a]{height:%?200?%}.f-header_warp .warp[data-v-ae58779a]{width:33%}.f-header_warp .warp uni-image[data-v-ae58779a]{margin-left:25%}\n/* 分类推荐楼层 */.hot-floor .floor-list[data-v-ae58779a]{white-space:nowrap;padding:%?20?%;padding-right:%?50?%;border-radius:%?6?%;margin-top:%?-140?%;margin-left:%?30?%;background:#fff;-webkit-box-shadow:1px 1px 5px rgba(0,0,0,.2);box-shadow:1px 1px 5px rgba(0,0,0,.2);position:relative;z-index:1}.hot-floor .scoll-wrapper[data-v-ae58779a]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-align:start;-webkit-align-items:flex-start;-ms-flex-align:start;align-items:flex-start}.hot-floor .floor-item[data-v-ae58779a]{width:%?180?%;margin-right:%?20?%;font-size:%?26?%;color:#303133;line-height:1.8}.hot-floor .floor-item uni-image[data-v-ae58779a]{width:%?180?%;height:%?180?%;border-radius:%?6?%}.hot-floor .floor-item .price[data-v-ae58779a]{color:#fa436a}\n/* 猜你喜欢 */.guess-section[data-v-ae58779a]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-flex-wrap:wrap;-ms-flex-wrap:wrap;flex-wrap:wrap;padding:0 %?30?%;background:#fff}.guess-section .guess-item[data-v-ae58779a]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex;-webkit-box-orient:vertical;-webkit-box-direction:normal;-webkit-flex-direction:column;-ms-flex-direction:column;flex-direction:column;width:48%;padding-bottom:%?40?%}.guess-section .guess-item[data-v-ae58779a]:nth-child(odd){margin-right:4%}.guess-section .image-wrapper[data-v-ae58779a]{width:100%;height:%?330?%;border-radius:3px;overflow:hidden}.guess-section .image-wrapper uni-image[data-v-ae58779a]{width:100%;height:100%;opacity:1}.guess-section .title[data-v-ae58779a]{font-size:%?32?%;color:#303133;line-height:%?80?%}.guess-section .price[data-v-ae58779a]{font-size:%?32?%;color:#fa436a;line-height:1}.guess-section .find[data-v-ae58779a]{font-size:14px;float:right;background-color:#ec6350;color:#fff;width:%?70?%;height:%?35?%;text-align:center;line-height:%?35?%;border-radius:20px}body.?%PAGE?%[data-v-ae58779a]{background:#f5f5f5}',""])},fe1a:function(e,t,a){"use strict";a.r(t);var i=a("775c"),s=a.n(i);for(var n in i)"default"!==n&&function(e){a.d(t,e,function(){return i[e]})}(n);t["default"]=s.a}}]);