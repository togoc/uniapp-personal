(function(e){function t(t){for(var a,r,o=t[0],s=t[1],u=t[2],l=0,d=[];l<o.length;l++)r=o[l],Object.prototype.hasOwnProperty.call(c,r)&&c[r]&&d.push(c[r][0]),c[r]=0;for(a in s)Object.prototype.hasOwnProperty.call(s,a)&&(e[a]=s[a]);f&&f(t);while(d.length)d.shift()();return i.push.apply(i,u||[]),n()}function n(){for(var e,t=0;t<i.length;t++){for(var n=i[t],a=!0,r=1;r<n.length;r++){var o=n[r];0!==c[o]&&(a=!1)}a&&(i.splice(t--,1),e=s(s.s=n[0]))}return e}var a={},r={h5:0},c={h5:0},i=[];function o(e){return s.p+"js/"+({}[e]||e)+"."+{"chunk-169ebe1c":"c6362e34","chunk-32c5ddee":"7af9315e","chunk-3d601a0e":"91383457","chunk-3e4297e3":"cfb0e8fc","chunk-3ee92c6f":"ac2a9856","chunk-480140be":"1296b99f","chunk-5a9f0808":"536fcd5f","chunk-5b898acf":"8c982f57","chunk-65e7100a":"f7c30f02","chunk-74d27042":"b21d5ae2","chunk-bad0a7a0":"8343a2f8","chunk-d2f4692e":"e88304ca"}[e]+".js"}function s(t){if(a[t])return a[t].exports;var n=a[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,s),n.l=!0,n.exports}s.e=function(e){var t=[],n={"chunk-169ebe1c":1,"chunk-32c5ddee":1,"chunk-3d601a0e":1,"chunk-3e4297e3":1,"chunk-3ee92c6f":1,"chunk-480140be":1,"chunk-5a9f0808":1,"chunk-5b898acf":1,"chunk-65e7100a":1,"chunk-74d27042":1,"chunk-bad0a7a0":1,"chunk-d2f4692e":1};r[e]?t.push(r[e]):0!==r[e]&&n[e]&&t.push(r[e]=new Promise((function(t,n){for(var a="css/"+({}[e]||e)+"."+{"chunk-169ebe1c":"3b3b597b","chunk-32c5ddee":"dbc72590","chunk-3d601a0e":"000ae820","chunk-3e4297e3":"9131e02c","chunk-3ee92c6f":"d251a327","chunk-480140be":"f876d266","chunk-5a9f0808":"7cdc4fef","chunk-5b898acf":"500804ae","chunk-65e7100a":"c461d070","chunk-74d27042":"a39e0181","chunk-bad0a7a0":"592e6f34","chunk-d2f4692e":"e41cb176"}[e]+".css",c=s.p+a,i=document.getElementsByTagName("link"),o=0;o<i.length;o++){var u=i[o],l=u.getAttribute("data-href")||u.getAttribute("href");if("stylesheet"===u.rel&&(l===a||l===c))return t()}var d=document.getElementsByTagName("style");for(o=0;o<d.length;o++){u=d[o],l=u.getAttribute("data-href");if(l===a||l===c)return t()}var f=document.createElement("link");f.rel="stylesheet",f.type="text/css",f.onload=t,f.onerror=function(t){var a=t&&t.target&&t.target.src||c,i=new Error("Loading CSS chunk "+e+" failed.\n("+a+")");i.code="CSS_CHUNK_LOAD_FAILED",i.request=a,delete r[e],f.parentNode.removeChild(f),n(i)},f.href=c;var h=document.getElementsByTagName("head")[0];h.appendChild(f)})).then((function(){r[e]=0})));var a=c[e];if(0!==a)if(a)t.push(a[2]);else{var i=new Promise((function(t,n){a=c[e]=[t,n]}));t.push(a[2]=i);var u,l=document.createElement("script");l.charset="utf-8",l.timeout=120,s.nc&&l.setAttribute("nonce",s.nc),l.src=o(e);var d=new Error;u=function(t){l.onerror=l.onload=null,clearTimeout(f);var n=c[e];if(0!==n){if(n){var a=t&&("load"===t.type?"missing":t.type),r=t&&t.target&&t.target.src;d.message="Loading chunk "+e+" failed.\n("+a+": "+r+")",d.name="ChunkLoadError",d.type=a,d.request=r,n[1](d)}c[e]=void 0}};var f=setTimeout((function(){u({type:"timeout",target:l})}),12e4);l.onerror=l.onload=u,document.head.appendChild(l)}return Promise.all(t)},s.m=e,s.c=a,s.d=function(e,t,n){s.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},s.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},s.t=function(e,t){if(1&t&&(e=s(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(s.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var a in e)s.d(n,a,function(t){return e[t]}.bind(null,a));return n},s.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return s.d(t,"a",t),t},s.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},s.p="/public/",s.oe=function(e){throw console.error(e),e};var u=window["webpackJsonp"]=window["webpackJsonp"]||[],l=u.push.bind(u);u.push=t,u=u.slice();for(var d=0;d<u.length;d++)t(u[d]);var f=l;i.push([1,"chunk-vendors","chunk-common"]),n()})({1:function(e,t,n){e.exports=n("98b3")},"1cbd":function(e,t,n){},"42ec":function(e,t,n){"use strict";var a=n("8a62"),r=n.n(a);r.a},5880:function(e,t){e.exports=Vuex},6389:function(e,t){e.exports=VueRouter},7383:function(e,t,n){},"8a62":function(e,t,n){},"8bbf":function(e,t){e.exports=Vue},"94b9":function(e,t,n){},"98b3":function(e,t,n){"use strict";n.r(t);var a={};n.r(a),n.d(a,"IndexNavHome",(function(){return H})),n.d(a,"IndexNavSearch",(function(){return U})),n.d(a,"IndexNavSetting",(function(){return Q})),n.d(a,"IndexBlogItem",(function(){return ne}));n("e260"),n("e6cf"),n("cca6"),n("a79d"),n("99af"),n("b0c0"),n("d3b7");var r=n("8bbf"),c=n.n(r),i=n("6389"),o=n.n(i),s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"index"},[n("div",{staticClass:"container"},[n("transition",{attrs:{name:"slide"}},[n("keep-alive",[n(e.component,{tag:"component",attrs:{active:e.active}})],1)],1)],1),n("van-tabbar",{attrs:{"active-color":"#07c160","inactive-color":"#000"},on:{change:e.onChange},model:{value:e.component,callback:function(t){e.component=t},expression:"component"}},[n("van-tabbar-item",{attrs:{name:"IndexNavHome",replace:"",to:"/index?key=IndexNavHome",icon:"home-o"}},[e._v("首页")]),n("van-tabbar-item",{attrs:{name:"IndexNavSearch",replace:"",to:"/index?key=IndexNavSearch",icon:"search"}},[e._v("搜索")]),n("van-tabbar-item",{attrs:{name:"IndexNavSetting",replace:"",to:"/index?key=IndexNavSetting",icon:"setting-o"}},[e._v("设置")])],1)],1)},u=[],l={data:function(){return{component:"IndexNavHome",active:""}},watch:{$route:{handler:function(e,t){if(e){var n=e.query,a=n.key,r=n.tab;this.component=a||"IndexNavHome",this.active=r||""}},immediate:!0}},methods:{}},d=l,f=(n("993d"),n("2877")),h=Object(f["a"])(d,s,u,!1,null,"3f5a61ac",null),v=h.exports;c.a.use(o.a);var p=[{path:"/",redirect:"/index"},{path:"/show-blog/:id",name:"/show-blog",component:function(){return n.e("chunk-480140be").then(n.bind(null,"5ac1"))}}],m=[{path:"/index",component:v,value:"首页",name:"index"}],b=new o.a({routes:[].concat(p,m),scrollBehavior:function(e,t,n){if(n){var a=n.x,r=n.y;if(a||r)return n}return{x:0,y:0}}});b.beforeEach((function(e,t,n){var a=!!localStorage.getItem("BLOG_TOKEN");"/login"===e.path||"/register"===e.path||"show-blog"===e.name||"/my-page"!==e.path&&"/edit"!==e.path||a?n():n("/login")}));var g=b,k=n("4360"),x=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"h5"}},[n("keep-alive",[e.$route.meta.keepAlive?n("router-view"):e._e()],1),n("transition",{attrs:{name:"slide"}},[e.$route.meta.keepAlive?e._e():n("router-view")],1)],1)},_=[],w={mounted:function(){this.$store.dispatch("getUser")}},y=w,S=(n("a9b3"),Object(f["a"])(y,x,_,!1,null,null,null)),$=S.exports,C=n("b2d8"),I=n.n(C),O=(n("64e1"),n("6c76"),n("bcee")),T=n("4a30"),j=n("d4ec"),E=n("bee2"),N=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"index-home"},[n("van-search",{attrs:{shape:"round",background:"#4fc08d",disabled:"",placeholder:"请输入搜索关键词"},on:{click:function(t){return t.stopPropagation(),e.handleSearchTab(t)}}}),n("van-tabs",{attrs:{swipeable:"",animated:"",background:"#4fc08d",border:!1,"line-width":"16px",color:"#fff","title-active-color":"#fff"},on:{change:e.setTabData},model:{value:e.active1,callback:function(t){e.active1=t},expression:"active1"}},e._l(e.$store.state.tab.indexTab,(function(t,a){return n("van-tab",{key:a,attrs:{title:t.title,name:t.name,"title-style":{fontWeight:"bold",fontSize:"16px"}}},[n("div",{ref:t.name,refInFor:!0,class:["swiper-item",t.name],on:{scroll:e.scroll}},[0===a?[n("div",{staticClass:"index-swiper-container"},[n("van-swipe",{staticClass:"my-swipe",attrs:{autoplay:3e3,"indicator-color":"#4fc08d"}},e._l(e.$store.state.blog.swiperList,(function(t,a){return n("van-swipe-item",{key:a},[n("div",[n("span",[e._v(e._s(t.tips))]),n("img",{staticClass:"img",attrs:{src:t.img_url}})])])})),1)],1)]:e._e(),n("IndexBlogItem",{attrs:{middleBlogList:e.$store.state.blog.indexBlogs,handleView:e.handleView}})],2)])})),1)],1)},B=[],L=(n("13d5"),n("96cf"),n("1da1")),P={props:{active:{type:String}},inheritAttrs:!1,data:function(){return{}},mounted:function(){this.$store.dispatch("getIndexPageBlog",{}),this.setScroll()},computed:{active1:function(){return""===this.active?this.$store.state.tab.indexTab.reduce((function(e,t){return e.isActive?e.name:t.name})):this.active}},methods:{handleView:function(e){this.$router.push("/show-blog/"+e)},handleSearchTab:function(){this.$router.push("/index?key=IndexNavSearch")},setTabData:function(e){console.log(e),this.$router.push("/index?tab="+e),this.$store.dispatch("setIndexTab",e)},scroll:function(e){var t=this;return Object(L["a"])(regeneratorRuntime.mark((function n(){return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$store.dispatch("setIndexTabScroll",{name:t.active,scrollHeight:e.target.scrollTop});case 2:case"end":return n.stop()}}),n)})))()},setScroll:function(){this.$nextTick((function(){var e=this,t=function(t){var n=e.$store.state.tab.indexTab.reduce((function(e,n){return e.name===t?e.oldScroll:n.oldScroll}));e.$refs[t][0].scrollTo(0,n)};for(var n in this.$refs)t(n)}))}}},A=P,V=(n("42ec"),Object(f["a"])(A,N,B,!1,null,"a525373a",null)),H=V.exports,M=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"index-search"},[e._v(" search ")])},D=[],R={},q=R,F=(n("c6b8"),Object(f["a"])(q,M,D,!1,null,"5d82f356",null)),U=F.exports,G=function(){var e=this,t=e.$createElement;e._self._c;return e._m(0)},J=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"index-setting"},[n("a",{attrs:{href:"/public/pc.html#/login"}},[e._v("登录")]),n("a",{attrs:{href:"/public/pc.html#/register"}},[e._v("注册")])])}],K={},z=K,W=(n("edbf"),Object(f["a"])(z,G,J,!1,null,"56f023a6",null)),Q=W.exports,X=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"main"},[n("transition-group",{attrs:{tag:"ul",name:"fade"}},e._l(e.middleBlogList,(function(t){return n("li",{key:t._id,staticClass:"blog-item",on:{click:function(n){return e.handleView(t._id)}}},[n("h3",{staticClass:"blog-title column-item"},[e._v(" "+e._s(t.title)+" ")]),n("div",{staticClass:"blog-detail column-item"},[n("span",[e._v(" "+e._s(e._f("MarkdownCode")(t.markdown)))]),n("div",{directives:[{name:"show",rawName:"v-show",value:t.thumbnails.length,expression:"item.thumbnails.length"}],staticClass:"blog-thumbnails"},[n("img",{attrs:{src:t.thumbnails.length?t.thumbnails[0].src:""}})])]),n("div",{staticClass:"blog-user-views"},[n("div",{staticClass:"anthor"},[n("a",{attrs:{href:"#"}},[n("img",{attrs:{src:e.baseIMGURL+t.userid+"?byuserid=1"}}),n("span",[e._v(e._s(t.username))])])]),n("div",{staticClass:"views-like"},[n("span",[e._v("收藏"),n("span",[e._v(e._s(t.likes.length))])]),n("span",[e._v("阅读"),n("span",[e._v(e._s(t.views))])]),n("span",[e._v("评论"),n("span",[e._v(e._s(t.comments.length))])])])])])})),0),e.middleBlogList.length?e._e():n("li",[n("EmtyTips")],1)],1)},Y=[],Z={props:{middleBlogList:Array,handleView:Function}},ee=Z,te=(n("ad2f"),Object(f["a"])(ee,X,Y,!1,null,"ce7960be",null)),ne=te.exports,ae=n("2af9"),re=function(){function e(){Object(j["a"])(this,e)}return Object(E["a"])(e,[{key:"install",value:function(e,t){for(var n in a)e.component(n,a[n]);for(var r in ae)e.component(r,ae[r])}}]),e}(),ce=new re;c.a.use(I.a),c.a.use(ce),c.a.use(O["a"]),c.a.use(T["a"]),new c.a({router:g,store:k["a"],render:function(e){return e($)}}).$mount("#h5")},"993d":function(e,t,n){"use strict";var a=n("1cbd"),r=n.n(a);r.a},a9b3:function(e,t,n){"use strict";var a=n("7383"),r=n.n(a);r.a},ad2f:function(e,t,n){"use strict";var a=n("d112"),r=n.n(a);r.a},c32d:function(e,t){e.exports=moment},c6b8:function(e,t,n){"use strict";var a=n("94b9"),r=n.n(a);r.a},ce28:function(e,t,n){},cebe:function(e,t){e.exports=axios},d112:function(e,t,n){},edbf:function(e,t,n){"use strict";var a=n("ce28"),r=n.n(a);r.a}});
//# sourceMappingURL=h5.3e662866.js.map