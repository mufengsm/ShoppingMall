(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/mys/orderInfo/orderInfo"],{1785:function(e,t,n){},"1c97":function(e,t,n){"use strict";n.r(t);var r=n("930f"),i=n("3911");for(var o in i)"default"!==o&&function(e){n.d(t,e,function(){return i[e]})}(o);n("a9c4");var a=n("2877"),s=Object(a["a"])(i["default"],r["a"],r["b"],!1,null,null,null);t["default"]=s.exports},3911:function(e,t,n){"use strict";n.r(t);var r=n("da99"),i=n.n(r);for(var o in r)"default"!==o&&function(e){n.d(t,e,function(){return r[e]})}(o);t["default"]=i.a},"930f":function(e,t,n){"use strict";var r=function(){var e=this,t=e.$createElement;e._self._c},i=[];n.d(t,"a",function(){return r}),n.d(t,"b",function(){return i})},9388:function(e,t,n){"use strict";(function(e){n("6cdc");r(n("66fd"));var t=r(n("1c97"));function r(e){return e&&e.__esModule?e:{default:e}}e(t.default)}).call(this,n("543d")["createPage"])},a9c4:function(e,t,n){"use strict";var r=n("1785"),i=n.n(r);i.a},da99:function(e,t,n){"use strict";(function(e){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var r=function(){return n.e("components/ExpireTime/ExpireTime").then(n.bind(null,"f094"))},i={data:function(){return{expireTime:0,isShow:!1,address:{},goods:[],totalPrice:0,freight:0,orderInfo:{add_time:"",message:"",order_sn:"",order_status:""},isOvertime:!1,someObject:{info:""}}},components:{ExpireTime:r},onLoad:function(e){var t=this;this.$request.GET({url:this.$api.apiUrl.GET_ORDER_FIND+"/"+e.id}).then(function(e){if(200!==e.code)return t.$api.msg(e.msg),!1;var n=e.data;t.expireTime=n.expire_time?n.expire_time:null,t.address=n.address,t.orderInfo=n.order,t.goods=n.goods;var r=!0,i=!1,o=void 0;try{for(var a,s=t.goods[Symbol.iterator]();!(r=(a=s.next()).done);r=!0){var c=a.value;t.totalPrice+=Number(c.goods_price)*c.goods_num,t.freight=t.totalPrice>300?0:6}}catch(u){i=!0,o=u}finally{try{r||null==s.return||s.return()}finally{if(i)throw o}}t.isShow=!0})},methods:{callback:function(e){this.$set(this.someObject,"info",e)},payment:function(){var t=this;this.isOvertime=!0,e.login({provider:"weixin",success:function(n){t.$request.POST({url:t.$api.apiUrl.POST_PAY_INDEX,data:{order_sn:t.orderInfo.order_sn,code:n.code}}).then(function(n){e.requestPayment({provider:"wxpay",timeStamp:String(n.data.timeStamp),nonceStr:n.data.nonceStr,package:n.data.package,signType:"MD5",paySign:n.data.paySign,success:function(t){e.showToast({title:"支付成功",success:function(){e.navigateTo({url:"/pages/mys/order/order?state=2"})}})},fail:function(e){t.$api.msg("支付失败"),t.isOvertime=!1}})})}})},searchLogistics:function(t){this.$request.POST({url:this.$api.apiUrl.POST_ORDER_LOGISTICS,data:{order_id:t}}).then(function(t){var n=t.errMsg;e.showModal({content:n.shipping_code+" : "+n.shipping_name,showCancel:!1,confirmText:"确定"})})}}};t.default=i}).call(this,n("543d")["default"])}},[["9388","common/runtime","common/vendor"]]]);