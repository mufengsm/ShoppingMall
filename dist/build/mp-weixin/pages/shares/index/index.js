(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/shares/index/index"],{"080d":function(n,t,e){"use strict";(function(n){Object.defineProperty(t,"__esModule",{value:!0}),t.default=void 0;var e={data:function(){return{userId:null,invitationCode:null}},onLoad:function(){var t=this;this.$request.GET({url:this.$api.apiUrl.GET_USER_INFO}).then(function(n){t.userId=n.data.id});var e=n.getStorageSync("storage_salesman");e&&this.$request.GET({url:this.$api.apiUrl.GET_V6_SHARE_INDEX}).then(function(n){"SECCUSS"==n.code&&(t.invitationCode=n.data)})},onShareAppMessage:function(n){return{title:"选进囗品就上多多美",path:"/pages/shares/bindmobile/bindmobile?id=".concat(this.userId,"&invitationCode=").concat(this.invitationCode),success:function(n){console.log(n)},fail:function(n){console.log(n)}}}};t.default=e}).call(this,e("543d")["default"])},"2b87":function(n,t,e){"use strict";var i=function(){var n=this,t=n.$createElement;n._self._c},a=[];e.d(t,"a",function(){return i}),e.d(t,"b",function(){return a})},7848:function(n,t,e){"use strict";e.r(t);var i=e("080d"),a=e.n(i);for(var u in i)"default"!==u&&function(n){e.d(t,n,function(){return i[n]})}(u);t["default"]=a.a},"79d0":function(n,t,e){},d811:function(n,t,e){"use strict";(function(n){e("6cdc");i(e("66fd"));var t=i(e("df56"));function i(n){return n&&n.__esModule?n:{default:n}}n(t.default)}).call(this,e("543d")["createPage"])},df56:function(n,t,e){"use strict";e.r(t);var i=e("2b87"),a=e("7848");for(var u in a)"default"!==u&&function(n){e.d(t,n,function(){return a[n]})}(u);e("ee63");var o=e("2877"),r=Object(o["a"])(a["default"],i["a"],i["b"],!1,null,null,null);t["default"]=r.exports},ee63:function(n,t,e){"use strict";var i=e("79d0"),a=e.n(i);a.a}},[["d811","common/runtime","common/vendor"]]]);