(global["webpackJsonp"]=global["webpackJsonp"]||[]).push([["pages/index/index"],{"0a48":function(t,e,n){"use strict";var a=n("e8fc"),i=n.n(a);i.a},"22f2":function(t,e,n){"use strict";var a;n.d(e,"b",(function(){return i})),n.d(e,"c",(function(){return o})),n.d(e,"a",(function(){return a}));var i=function(){var t=this,e=t.$createElement;t._self._c},o=[]},"2e1e":function(t,e,n){"use strict";n.r(e);var a=n("22f2"),i=n("d981");for(var o in i)"default"!==o&&function(t){n.d(e,t,(function(){return i[t]}))}(o);n("0a48");var r,u=n("f0c5"),c=Object(u["a"])(i["default"],a["b"],a["c"],!1,null,"24bf7da8",null,!1,a["a"],r);e["default"]=c.exports},"73f9":function(t,e,n){"use strict";(function(t,n){Object.defineProperty(e,"__esModule",{value:!0}),e.default=void 0;var a={data:function(){return{state:"",avtor:{img:"/static/autor.jpg",title:"加载中....",number:"加载中...."},navgatList:[{title:"收到的卷",url:"/pages/index/card?data=isTrue"},{title:"送出的卷",url:"/pages/index/card?data=isFalse"},{title:"关于 TA",url:"/pages/index/about"},{title:"解除关系",url:"/pages/index/site"},{title:"关系绑定",url:"/pages/index/bind"}]}},onLoad:function(){this.begin1()},methods:{paste:function(){t.setClipboardData({data:this.avtor.number}),t.showToast({title:"复制成功！",icon:"none"})},test:function(e,n){""==this.state?"关系绑定"==e?t.navigateTo({url:n}):t.showModal({content:"请先绑定关系",showCancel:!1}):"关系绑定"!=e?t.navigateTo({url:n}):t.showModal({content:"你已绑定了关系",showCancel:!1})},begin1:function(){var e=this;try{this.avtor.number=t.getStorageSync("_id"),this.avtor.title=t.getStorageSync("username"),t.getStorageSync("pic")&&(this.avtor.img=t.getStorageSync("pic")),n.callFunction({name:"getu",data:{_id:this.avtor.number}}).then((function(n){e.state=n.result.data["0"].lover_id,n.result.data["0"].pic&&(e.avtor.img=n.result.data["0"].pic),e.avtor.number=t.getStorageSync("_id")}))}catch(a){}},out:function(){t.showModal({title:"退出登录",content:"确定退出登录吗?再想想吧",success:function(e){console.log(e),1==e.confirm&&(t.clearStorageSync(),t.reLaunch({url:"/pages/test/test"}))}})}}};e.default=a}).call(this,n("543d")["default"],n("a9ff")["default"])},d981:function(t,e,n){"use strict";n.r(e);var a=n("73f9"),i=n.n(a);for(var o in a)"default"!==o&&function(t){n.d(e,t,(function(){return a[t]}))}(o);e["default"]=i.a},e8fc:function(t,e,n){},f07b:function(t,e,n){"use strict";(function(t){n("ad33");a(n("66fd"));var e=a(n("2e1e"));function a(t){return t&&t.__esModule?t:{default:t}}t(e.default)}).call(this,n("543d")["createPage"])}},[["f07b","common/runtime","common/vendor"]]]);