(function(t){function e(e){for(var a,i,o=e[0],c=e[1],l=e[2],u=0,d=[];u<o.length;u++)i=o[u],Object.prototype.hasOwnProperty.call(r,i)&&r[i]&&d.push(r[i][0]),r[i]=0;for(a in c)Object.prototype.hasOwnProperty.call(c,a)&&(t[a]=c[a]);h&&h(e);while(d.length)d.shift()();return s.push.apply(s,l||[]),n()}function n(){for(var t,e=0;e<s.length;e++){for(var n=s[e],a=!0,i=1;i<n.length;i++){var o=n[i];0!==r[o]&&(a=!1)}a&&(s.splice(e--,1),t=c(c.s=n[0]))}return t}var a={},i={h5:0},r={h5:0},s=[];function o(t){return c.p+"js/"+({}[t]||t)+"."+{"chunk-00ab39b0":"2f59286b","chunk-0d61cd78":"a0f63caa","chunk-27ada303":"6e6823af","chunk-29a15917":"cb4b7a46","chunk-3247ea10":"7817df15","chunk-4270f6a2":"1a6255d7","chunk-478aa9bc":"b3bcd354","chunk-4af1bf50":"f900b87d","chunk-527973b1":"55b19a53","chunk-530eace3":"20fd5d3f","chunk-65c9ae0c":"b1e07b60","chunk-682b1e32":"c8f2eff6","chunk-7bd38076":"c0ec55df","chunk-a065e442":"09332e92"}[t]+".js"}function c(e){if(a[e])return a[e].exports;var n=a[e]={i:e,l:!1,exports:{}};return t[e].call(n.exports,n,n.exports,c),n.l=!0,n.exports}c.e=function(t){var e=[],n={"chunk-00ab39b0":1,"chunk-0d61cd78":1,"chunk-27ada303":1,"chunk-29a15917":1,"chunk-3247ea10":1,"chunk-4270f6a2":1,"chunk-478aa9bc":1,"chunk-4af1bf50":1,"chunk-527973b1":1,"chunk-530eace3":1,"chunk-65c9ae0c":1,"chunk-682b1e32":1,"chunk-7bd38076":1,"chunk-a065e442":1};i[t]?e.push(i[t]):0!==i[t]&&n[t]&&e.push(i[t]=new Promise((function(e,n){for(var a="css/"+({}[t]||t)+"."+{"chunk-00ab39b0":"f8e33815","chunk-0d61cd78":"d4dbdc6d","chunk-27ada303":"71d4eec5","chunk-29a15917":"166fb669","chunk-3247ea10":"974c2020","chunk-4270f6a2":"9fec66c0","chunk-478aa9bc":"8549b47d","chunk-4af1bf50":"33099143","chunk-527973b1":"1473943a","chunk-530eace3":"42086b8d","chunk-65c9ae0c":"7db42c41","chunk-682b1e32":"454dd48a","chunk-7bd38076":"3b9ba0ae","chunk-a065e442":"3b05c952"}[t]+".css",r=c.p+a,s=document.getElementsByTagName("link"),o=0;o<s.length;o++){var l=s[o],u=l.getAttribute("data-href")||l.getAttribute("href");if("stylesheet"===l.rel&&(u===a||u===r))return e()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){l=d[o],u=l.getAttribute("data-href");if(u===a||u===r)return e()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=e,h.onerror=function(e){var a=e&&e.target&&e.target.src||r,s=new Error("Loading CSS chunk "+t+" failed.\n("+a+")");s.code="CSS_CHUNK_LOAD_FAILED",s.request=a,delete i[t],h.parentNode.removeChild(h),n(s)},h.href=r;var f=document.getElementsByTagName("head")[0];f.appendChild(h)})).then((function(){i[t]=0})));var a=r[t];if(0!==a)if(a)e.push(a[2]);else{var s=new Promise((function(e,n){a=r[t]=[e,n]}));e.push(a[2]=s);var l,u=document.createElement("script");u.charset="utf-8",u.timeout=120,c.nc&&u.setAttribute("nonce",c.nc),u.src=o(t);var d=new Error;l=function(e){u.onerror=u.onload=null,clearTimeout(h);var n=r[t];if(0!==n){if(n){var a=e&&("load"===e.type?"missing":e.type),i=e&&e.target&&e.target.src;d.message="Loading chunk "+t+" failed.\n("+a+": "+i+")",d.name="ChunkLoadError",d.type=a,d.request=i,n[1](d)}r[t]=void 0}};var h=setTimeout((function(){l({type:"timeout",target:u})}),12e4);u.onerror=u.onload=l,document.head.appendChild(u)}return Promise.all(e)},c.m=t,c.c=a,c.d=function(t,e,n){c.o(t,e)||Object.defineProperty(t,e,{enumerable:!0,get:n})},c.r=function(t){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(t,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(t,"__esModule",{value:!0})},c.t=function(t,e){if(1&e&&(t=c(t)),8&e)return t;if(4&e&&"object"===typeof t&&t&&t.__esModule)return t;var n=Object.create(null);if(c.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:t}),2&e&&"string"!=typeof t)for(var a in t)c.d(n,a,function(e){return t[e]}.bind(null,a));return n},c.n=function(t){var e=t&&t.__esModule?function(){return t["default"]}:function(){return t};return c.d(e,"a",e),e},c.o=function(t,e){return Object.prototype.hasOwnProperty.call(t,e)},c.p="/public/",c.oe=function(t){throw console.error(t),t};var l=window["webpackJsonp"]=window["webpackJsonp"]||[],u=l.push.bind(l);l.push=e,l=l.slice();for(var d=0;d<l.length;d++)e(l[d]);var h=u;s.push([1,"chunk-vendors","chunk-common"]),n()})({1:function(t,e,n){t.exports=n("98b3")},"138b":function(t,e,n){},"1cbd":function(t,e,n){},3089:function(t,e){t.exports=vant},"55d8":function(t,e,n){},5880:function(t,e){t.exports=Vuex},6389:function(t,e){t.exports=VueRouter},"64b2":function(t,e,n){},"6c76":function(t,e,n){},7383:function(t,e,n){},"8bbf":function(t,e){t.exports=Vue},"90a9":function(t,e,n){},9747:function(t,e,n){"use strict";var a=n("138b"),i=n.n(a);i.a},"98b3":function(t,e,n){"use strict";n.r(e);var a={};n.r(a),n.d(a,"IndexNavHome",(function(){return V})),n.d(a,"IndexNavSearch",(function(){return U})),n.d(a,"IndexNavSetting",(function(){return Q})),n.d(a,"IndexBlogItem",(function(){return nt}));n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("99af"),n("b0c0"),n("d3b7");var i=n("8bbf"),r=n.n(i),s=n("6389"),o=n.n(s),c=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"index"},[n("div",{staticClass:"container"},[n("transition",{attrs:{name:"slide"}},[n("keep-alive",[n(t.component,{tag:"component",attrs:{active:t.active}})],1)],1)],1),n("van-tabbar",{attrs:{"active-color":"#07c160","inactive-color":"#000"},on:{change:t.onChange},model:{value:t.component,callback:function(e){t.component=e},expression:"component"}},[n("van-tabbar-item",{attrs:{name:"IndexNavHome",replace:"",to:"/index?key=IndexNavHome",icon:"home-o"}},[t._v("首页")]),n("van-tabbar-item",{attrs:{name:"IndexNavSearch",replace:"",to:"/index?key=IndexNavSearch",icon:"search"}},[t._v("搜索")]),n("van-tabbar-item",{attrs:{name:"IndexNavSetting",replace:"",to:"/index?key=IndexNavSetting",icon:"setting-o"}},[t._v("设置")])],1)],1)},l=[],u={data:function(){return{component:"IndexNavHome",active:""}},watch:{$route:{handler:function(t,e){if(t){var n=t.query,a=n.key,i=n.tab;this.component=a||"IndexNavHome",this.active=i||""}},immediate:!0}},methods:{}},d=u,h=(n("993d"),n("2877")),f=Object(h["a"])(d,c,l,!1,null,"3f5a61ac",null),m=f.exports;r.a.use(o.a);var p=[{path:"/",redirect:"/index"},{path:"/show-blog/:id",name:"show-blog",component:function(){return n.e("chunk-0d61cd78").then(n.bind(null,"5ac1"))}},{path:"/my-blog",name:"my-blog",component:function(){return n.e("chunk-4270f6a2").then(n.bind(null,"7713"))}},{path:"/my-like",name:"my-like",component:function(){return n.e("chunk-682b1e32").then(n.bind(null,"08ce"))}},{path:"*",component:function(){return n.e("chunk-00ab39b0").then(n.bind(null,"9703"))}}],v=[{path:"/index",component:m,value:"首页",name:"index"}],b=new o.a({routes:[].concat(p,v),scrollBehavior:function(t,e,n){if(n){var a=n.x,i=n.y;if(a||i)return n}return{x:0,y:0}}});b.beforeEach((function(t,e,n){var a=!!localStorage.getItem("BLOG_TOKEN");"/login"===t.path||"/register"===t.path||"show-blog"===t.name||"/my-page"!==t.path&&"/edit"!==t.path||a?n():n("/login")}));var g=b,k=n("4360"),y=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{attrs:{id:"h5"}},[n("keep-alive",[t.$route.meta.keepAlive?n("router-view"):t._e()],1),n("transition",{attrs:{name:"slide"}},[t.$route.meta.keepAlive?t._e():n("router-view")],1)],1)},_=[],x={mounted:function(){this.$store.dispatch("getUser")}},w=x,C=(n("a9b3"),Object(h["a"])(w,y,_,!1,null,null,null)),S=C.exports,$=n("b2d8"),I=n.n($),O=(n("64e1"),n("6c76"),n("bcee")),T=n("4a30"),N=n("d4ec"),j=n("bee2"),E=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"index-home"},[n("van-search",{attrs:{shape:"round",background:"#4fc08d",disabled:"",placeholder:"请输入搜索关键词"},on:{click:function(e){return e.stopPropagation(),t.handleSearchTab(e)}}}),n("van-tabs",{attrs:{swipeable:"",animated:"",background:"#4fc08d",border:!1,"line-width":"16px",color:"#fff","title-active-color":"#fff"},on:{change:t.setTabData},model:{value:t.active1,callback:function(e){t.active1=e},expression:"active1"}},t._l(t.$store.state.tab.indexTab,(function(e,a){return n("van-tab",{key:a,attrs:{title:e.title,name:e.name,"title-style":{fontWeight:"bold",fontSize:"16px"}}},[n("div",{ref:e.name,refInFor:!0,class:["swiper-item",e.name],on:{scroll:t.scroll}},[0===a?[n("div",{staticClass:"index-swiper-container"},[n("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:3e3,"indicator-color":"#4fc08d"}},t._l(t.$store.state.blog.swiperList,(function(e,a){return n("van-swipe-item",{key:a},[n("div",{staticClass:"swipr-inner"},[n("a",{attrs:{href:e.path}},[n("span",[t._v(t._s(e.tips))]),n("div",{staticClass:"img-container"},[n("img",{staticClass:"img",attrs:{src:e.img_url}})])])])])})),1)],1)]:t._e(),n("IndexBlogItem",{staticClass:"blogs",attrs:{middleBlogList:t.$store.state.blog.indexBlogs,handleView:t.handleView}})],2)])})),1)],1)},L=[],P=(n("13d5"),n("96cf"),n("1da1")),B={props:{active:{type:String}},inheritAttrs:!1,data:function(){return{}},mounted:function(){this.$store.dispatch("getIndexPageBlog",{}),this.setScroll()},computed:{active1:function(){return""===this.active?this.$store.state.tab.indexTab.reduce((function(t,e){return t.isActive?t.name:e.name})):this.active}},methods:{handleView:function(t){this.$router.push("/show-blog/"+t)},handleSearchTab:function(){this.$router.push("/index?key=IndexNavSearch")},setTabData:function(t){this.$router.push("/index?tab="+t),this.$store.dispatch("setIndexTab",t)},scroll:function(t){var e=this;return Object(P["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,e.$store.dispatch("setIndexTabScroll",{name:e.active,scrollHeight:t.target.scrollTop});case 2:case"end":return n.stop()}}),n)})))()},setScroll:function(){this.$nextTick((function(){var t=this,e=function(e){var n=t.$store.state.tab.indexTab.reduce((function(t,n){return t.name===e?t.oldScroll:n.oldScroll}));t.$refs[e][0].scrollTo(0,n)};for(var n in this.$refs)e(n)}))}}},A=B,H=(n("c4b1"),Object(h["a"])(A,E,L,!1,null,"5b3fa45f",null)),V=H.exports,M=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"index-search"},[n("van-search",{attrs:{shape:"round","show-action":"",background:"#4fc08d",placeholder:"请输入搜索关键词"},on:{search:t.onSearch,cancel:t.onCancel},model:{value:t.value,callback:function(e){t.value="string"===typeof e?e.trim():e},expression:"value"}}),n("div",{staticClass:"blogs-container"},[n("transition-group",{attrs:{tag:"ul",name:"fade"}},t._l(t.$store.state.blog.homeSearchList,(function(t){return n("li",{key:t._id},[n("MyPageBlogItem",{attrs:{blog:t}})],1)})),0),n("EmtyTips",{directives:[{name:"show",rawName:"v-show",value:!t.$store.state.blog.homeSearchList.length,expression:"!$store.state.blog.homeSearchList.length"}]})],1)],1)},q=[],D=(n("498a"),{data:function(){return{value:"vue"}},methods:{onSearch:function(t){this.$store.dispatch("homeSearch",t.trim())},onCancel:function(){this.$router.go(-1)}}}),R=D,F=(n("bb1a"),Object(h["a"])(R,M,q,!1,null,"3b8741c6",null)),U=F.exports,G=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"index-setting"},[n("div",{staticClass:"setting-msg"},[n("div",{staticClass:"setting-msg-inner"},[n("van-icon",{attrs:{name:"setting"},on:{click:function(e){e.stopPropagation(),t.show=!t.show}}}),n("van-icon",{attrs:{name:"bell"},on:{click:function(e){return e.stopPropagation(),t.$notify({type:"warning",message:"敬请期待!"})}}})],1)]),n("div",{staticClass:"login-register-container"},[n("div",{staticClass:"inner-card"},[this.isLogin?[n("div",{staticClass:"is-login-bg"},[n("div",{staticClass:"user-head"},[n("div",{staticClass:"img"},[n("img",{attrs:{src:t.user.avatar?t.user.avatar:"/public/images/default.png"}})]),n("div",{staticClass:"user-name"},[n("p",{staticClass:"username"},[t._v(t._s(t.user.name))]),n("p",{staticClass:"email"},[t._v(t._s(t.user.name))])])]),n("div",{staticClass:"user-hot-msg"},t._l(t.userHot,(function(e,a){return n("p",{key:a,staticClass:"user-dongtai"},[n("router-link",{staticClass:"user-top-nav-link",attrs:{to:e.link}},[n("span",{staticClass:"num"},[t._v(t._s(e.count))]),n("span",{staticClass:"num-name"},[t._v(t._s(e.title))])])],1)})),0)])]:[n("p",{staticClass:"login-tips"},[n("span",[n("a",{attrs:{href:"/public/pc.html#/login?redirect=1"}},[t._v("立即登录, 玩转博客"),n("van-icon",{attrs:{name:"arrow"}}),n("van-icon",{attrs:{name:"arrow"}}),n("van-icon",{attrs:{name:"arrow"}})],1)])]),n("p",{staticClass:"other-login"},[n("van-button",{attrs:{square:"",icon:"phone-o"}},[t._v("号码登录")]),n("van-button",{attrs:{square:"",icon:"chat-o"}},[t._v("社交账号")])],1),t._m(0)]],2)]),n("ul",{staticClass:"my-link"},t._l(t.myLink,(function(e,a){return n("li",{key:a},[n("router-link",{staticClass:"link-item",attrs:{to:e.link}},[n("van-icon",{attrs:{name:e.icon}}),n("span",[t._v(t._s(e.title))])],1)],1)})),0),n("van-action-sheet",{attrs:{actions:t.actions,"cancel-text":"取消"},on:{select:t.onSelect},model:{value:t.show,callback:function(e){t.show=e},expression:"show"}})],1)},J=[function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("p",{staticClass:"register-tips"},[t._v(" 还没有账号?"),n("span",[n("a",{attrs:{href:"/public/pc.html#/register?redirect=1"}},[t._v("快速注册")])])])}],K={data:function(){return{show:!1,actions:[{name:"切换账户",subname:"登录"}],userHot:[{title:"动态",count:10,link:"/my-blog"},{title:"关注",count:3,link:"/my-like-user"},{title:"粉丝",count:0,link:"/my-fans"}],myLink:[{title:"我的关注",icon:"like",link:"/my-focus"},{title:"我的收藏",icon:"star",link:"/my-like"},{title:"我的博客",icon:"todo-list",link:"/my-blog"},{title:"我的关注",icon:"like-o",link:"/my-focus"},{title:"我的关注",icon:"like-o",link:"/my-focus"},{title:"我的关注",icon:"like-o",link:"/my-focus"},{title:"我的关注",icon:"like-o",link:"/my-focus"},{title:"更多",icon:"weapp-nav",link:"/my-focus"}]}},methods:{onSelect:function(t){switch(t.name){case"切换账户":location.href="/public/pc.html#/login?redirect=1";break;default:break}}}},z=K,W=(n("9747"),Object(h["a"])(z,G,J,!1,null,"3b5cd04a",null)),Q=W.exports,X=function(){var t=this,e=t.$createElement,n=t._self._c||e;return n("div",{staticClass:"main"},[n("transition-group",{attrs:{tag:"ul",name:"fade"}},t._l(t.middleBlogList,(function(e){return n("li",{key:e._id,staticClass:"blog-item",on:{click:function(n){return t.handleView(e._id)}}},[n("h3",{staticClass:"blog-title"},[t._v(" "+t._s(e.title)+" ")]),n("div",{staticClass:"blog-detail"},[n("span",[t._v(" "+t._s(t._f("MarkdownCode")(e.markdown)))]),n("div",{directives:[{name:"show",rawName:"v-show",value:e.thumbnails.length,expression:"item.thumbnails.length"}],staticClass:"blog-thumbnails"},[n("img",{attrs:{src:e.thumbnails.length?e.thumbnails[0].src:""}})])]),n("div",{staticClass:"blog-user-views"},[n("div",{staticClass:"anthor"},[n("a",{attrs:{href:"#"}},[n("img",{attrs:{src:t.baseIMGURL+e.userid+"?byuserid=1"}}),n("span",[t._v(t._s(e.username))])])]),n("div",{staticClass:"views-like"},[n("span",[t._v("收藏"),n("span",[t._v(t._s(e.likes.length))])]),n("span",[t._v("阅读"),n("span",[t._v(t._s(e.views))])]),n("span",[t._v("评论"),n("span",[t._v(t._s(e.comments.length))])])])])])})),0),t.middleBlogList.length?t._e():n("li",[n("EmtyTips")],1)],1)},Y=[],Z={props:{middleBlogList:Array,handleView:Function}},tt=Z,et=(n("b1d9"),Object(h["a"])(tt,X,Y,!1,null,"5b3436dc",null)),nt=et.exports,at=n("2af9"),it=function(){function t(){Object(N["a"])(this,t)}return Object(j["a"])(t,[{key:"install",value:function(t,e){for(var n in a)t.component(n,a[n]);for(var i in at)t.component(i,at[i])}}]),t}(),rt=new it,st=n("3089");r.a.prototype.$dialog=st["Dialog"],r.a.prototype.$notify=st["Notify"],r.a.use(I.a),r.a.use(rt),r.a.use(O["a"]),r.a.use(T["a"]),new r.a({router:g,store:k["a"],render:function(t){return t(S)}}).$mount("#h5")},"993d":function(t,e,n){"use strict";var a=n("1cbd"),i=n.n(a);i.a},a9b3:function(t,e,n){"use strict";var a=n("7383"),i=n.n(a);i.a},b1d9:function(t,e,n){"use strict";var a=n("90a9"),i=n.n(a);i.a},bb1a:function(t,e,n){"use strict";var a=n("55d8"),i=n.n(a);i.a},c32d:function(t,e){t.exports=moment},c4b1:function(t,e,n){"use strict";var a=n("64b2"),i=n.n(a);i.a},cebe:function(t,e){t.exports=axios}});
//# sourceMappingURL=h5.7f152d29.js.map