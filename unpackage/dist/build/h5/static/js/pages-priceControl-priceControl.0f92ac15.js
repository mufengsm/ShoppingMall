(window.webpackJsonp = window.webpackJsonp || []).push([['pages-priceControl-priceControl'], {
  '38b7': function (t, e, i) { let a = i('cf99'); typeof a === 'string' && (a = [[t.i, a, '']]), a.locals && (t.exports = a.locals); const n = i('4f06').default; n('3fd4fcfc', a, !0, { sourceMap: !1, shadowMode: !1 }); },
  4248(t, e, i) {
    const a = function () { const t = this; const e = t.$createElement; const i = t._self._c || e; return i('v-uni-view', [i('v-uni-view', { staticClass: 'top_wraper' }, [i('v-uni-image', { staticClass: 'head_img', attrs: { src: '../../static/logo/controlled_prices_banner.jpg', mode: 'widthFix' } }), i('v-uni-swiper', { staticClass: 'swiper', staticStyle: { fontSize: '15px', color: 'rgb(236, 99, 80)' }, attrs: { autoplay: 'ture', vertical: 'true' } }, [i('v-uni-swiper-item', [i('v-uni-view', { staticClass: 'swiper-item uni-bg-red' }, [t._v('【秋季护肤】肌肤为什么干燥、过敏、脆弱？看了吓一跳')])], 1), i('v-uni-swiper-item', [i('v-uni-view', { staticClass: 'swiper-item uni-bg-red' }, [t._v('【秋季护肤】肌肤为什么干燥、过敏、脆弱？看了吓一跳')])], 1)], 1)], 1), i('v-uni-view', { staticClass: 'bottom_wraper' }, [i('v-uni-view', { staticClass: 'head_info' }, [i('v-uni-image', { staticClass: 'head_info_img', attrs: { src: 'http://meizi.oss.manogue.com.cn/e02ea5457989657d/e5f61a84d14f5c8a.jpg', mode: 'aspectFit' } }), i('v-uni-view', { staticClass: 'head_info_text' }, [i('v-uni-text', { staticClass: 'title' }, [t._v('彩虹来菲儿')]), i('v-uni-text', { staticClass: 'series' }, [t._v('面膜系列')]), i('v-uni-view', { staticClass: 'text' }, [t._v('乐享生活 - 边玩边美')])], 1)], 1)], 1)], 1); }; const n = []; i.d(e, 'a', () => a), i.d(e, 'b', () => n);
  },
  8349(t, e, i) {
    i.r(e); const a = i('eac6'); const n = i.n(a); for (const r in a)r !== 'default' && (function (t) { i.d(e, t, () => a[t]); }(r)); e.default = n.a;
  },
  b7a5(t, e, i) {
    i.r(e); const a = i('4248'); const n = i('8349'); for (const r in n)r !== 'default' && (function (t) { i.d(e, t, () => n[t]); }(r)); i('c1f8'); const o = i('2877'); const s = Object(o.a)(n.default, a.a, a.b, !1, null, '9db09b6c', null); e.default = s.exports;
  },
  c1f8(t, e, i) {
    const a = i('38b7'); const n = i.n(a); n.a;
  },
  cf99(t, e, i) { e = t.exports = i('2350')(!1), e.push([t.i, '@charset "UTF-8";\n/* 页面左右间距 */\n/* 文字尺寸 */\n/*文字颜色*/\n/* 边框颜色 */\n/* 图片加载中颜色 */\n/* 行为相关颜色 */.top_wraper .head_img[data-v-9db09b6c]{width:%?730?%;margin:%?10?%}.top_wraper .swiper[data-v-9db09b6c]{height:%?70?%}.bottom_wraper[data-v-9db09b6c]{background-color:pink}.bottom_wraper .head_info[data-v-9db09b6c]{display:-webkit-box;display:-webkit-flex;display:-ms-flexbox;display:flex}.bottom_wraper .head_info .head_info_img[data-v-9db09b6c]{width:%?200?%;height:%?180?%}.bottom_wraper .head_info .head_info_text .title[data-v-9db09b6c]{font-size:.44rem;color:#fff;margin-bottom:.2rem;margin-top:.1rem}', '']); },
  eac6(t, e, i) {
    Object.defineProperty(e, '__esModule', { value: !0 }), e.default = void 0; const a = i('2f62'); function n(t) { for (let e = 1; e < arguments.length; e++) { var i = arguments[e] != null ? arguments[e] : {}; let a = Object.keys(i); typeof Object.getOwnPropertySymbols === 'function' && (a = a.concat(Object.getOwnPropertySymbols(i).filter((t) => Object.getOwnPropertyDescriptor(i, t).enumerable))), a.forEach((e) => { r(t, e, i[e]); }); } return t; } function r(t, e, i) {
      return e in t ? Object.defineProperty(t, e, {
        value: i, enumerable: !0, configurable: !0, writable: !0,
      }) : t[e] = i, t;
    } const o = (0, a.createNamespacedHelpers)('storeOne'); const s = (o.mapState, o.mapActions); const c = { data() { return { private_price_control_info: {} }; }, onLoad() { const t = this; this.PRICE_CONTROL_INFO({ url: '/v4/Brands/index', data: { page: 1, num: 10 } }).then((e) => { t.private_price_control_info = e.msg; }); }, methods: n({}, s(['PRICE_CONTROL_INFO'])) }; e.default = c;
  },
}]);
