(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-d4e1b5b4"],{"4a83":function(t,e,i){"use strict";var n=i("742a"),a=i.n(n);a.a},"742a":function(t,e,i){},e317:function(t,e,i){"use strict";i.r(e);var n=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"home-index"},[i("div",{staticClass:"left-container"},[i("HomeIndexLeftNav",{attrs:{leftNavList:t.leftNavList,handleItem:t.handleItem}})],1),i("div",{staticClass:"middle-container"},[i("transition",{attrs:{name:"slide"}},[i("keep-alive",[i(t.component,{tag:"component",attrs:{handleView:t.handleView}})],1)],1)],1)])},a=[],o=(i("4160"),i("159b"),{data:function(){return{component:"MyPageBlog",leftNavList:[{id:1,title:"个人中心",component:"MyPageInfo",isActive:!1},{id:2,title:"我的收藏",component:"MyPageLiked",isActive:!1},{id:3,title:"我的博客",component:"MyPageBlog",isActive:!0},{title:"我的关注",id:4,component:"MyPageFocusPeople",isActive:!1}]}},created:function(){},watch:{$route:{handler:function(t,e){var i=this;if(t){var n=t.query.key;if(!n)return;this.leftNavList.forEach((function(t){return t.title===n?(t.isActive=!0,i.component=t.component):t.isActive=!1}))}else e.query.key},immediate:!0}},methods:{handleItem:function(t){var e=this,i=t.target.dataset.key;this.leftNavList.forEach((function(t){if(t.id==i){if(!0===t.isActive)return;t.isActive=!0,e.$router.push("/my-page?key="+t.title)}else t.isActive=!1}))},handleView:function(t){this.$router.push("/show-blog/"+t)}}}),s=o,c=(i("4a83"),i("2877")),r=Object(c["a"])(s,n,a,!1,null,"bb190faa",null);e["default"]=r.exports}}]);
//# sourceMappingURL=chunk-d4e1b5b4.d1548556.js.map