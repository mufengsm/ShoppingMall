(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["components/ExpireTime/ExpireTime"],{"1f2e":function(t,n,e){"use strict";Object.defineProperty(n,"__esModule",{value:!0}),n.default=void 0;var c={data:function(){return{content:""}},props:{endTime:{type:Number,default:""},endText:{type:String,default:"已结束"},callback:{type:Function,default:""}},mounted:function(){this.countdowm(this.endTime)},methods:{countdowm:function(t){var n=this,e=setInterval(function(){var c=new Date,a=new Date(1e3*t),o=a.getTime()-c.getTime();if(o>0){var u=Math.floor(o/864e5),r=Math.floor(o/36e5%24),i=Math.floor(o/6e4%60),l=Math.floor(o/1e3%60);r=r<10?"0"+r:r,i=i<10?"0"+i:i,l=l<10?"0"+l:l;var f="";u>0&&(f="".concat(u,"天").concat(r,"小时").concat(i,"分").concat(l,"秒自动关闭")),u<=0&&r>0&&(f="".concat(r,"小时").concat(i,"分").concat(l,"秒自动关闭")),u<=0&&r<=0&&(f="".concat(i,"分").concat(l,"秒自动关闭")),n.content=f}else clearInterval(e),n.content=n.endText,n._callback()},1e3)},_callback:function(){this.callback&&this.callback instanceof Function&&this.$emit("done","订单已超时")}}};n.default=c},"7fb3":function(t,n,e){"use strict";var c=function(){var t=this,n=t.$createElement;t._self._c},a=[];e.d(n,"a",function(){return c}),e.d(n,"b",function(){return a})},c350:function(t,n,e){"use strict";e.r(n);var c=e("1f2e"),a=e.n(c);for(var o in c)"default"!==o&&function(t){e.d(n,t,function(){return c[t]})}(o);n["default"]=a.a},f094:function(t,n,e){"use strict";e.r(n);var c=e("7fb3"),a=e("c350");for(var o in a)"default"!==o&&function(t){e.d(n,t,function(){return a[t]})}(o);var u=e("2877"),r=Object(u["a"])(a["default"],c["a"],c["b"],!1,null,null,null);n["default"]=r.exports}}]);
;(global["webpackJsonp"] = global["webpackJsonp"] || []).push([
    'components/ExpireTime/ExpireTime-create-component',
    {
        'components/ExpireTime/ExpireTime-create-component':(function(module, exports, __webpack_require__){
            __webpack_require__('543d')['createComponent'](__webpack_require__("f094"))
        })
    },
    [['components/ExpireTime/ExpireTime-create-component']]
]);                
