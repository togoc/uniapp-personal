(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-6e26cce3"],{"2b5f":function(e,t,s){},"4e24":function(e,t,s){"use strict";var n=s("2b5f"),r=s.n(n);r.a},e317:function(e,t,s){"use strict";s.r(t);var n=function(){var e=this,t=e.$createElement,s=e._self._c||t;return s("div",{staticClass:"home-index"},[s("HomeIndexLeftNav",{staticClass:"my-page-left",attrs:{leftNavList:e.$store.state.user.MyPageLeftNavList,handleRefresh:e.handleRefresh,handleItem:e.handleItem,isRefresh:e.isRefresh}}),s("div",{staticClass:"middle-container"},[s("transition",{attrs:{name:"slide"}},[s("keep-alive",[s(e.component,{tag:"component"})],1)],1)],1)],1)},r=[],a=(s("4de4"),s("96cf"),s("1da1")),i={data:function(){return{isRefresh:!1}},watch:{$route:{handler:function(e,t){if(e){var s=e.query.key;if(!s)return;if(s)return this.$store.dispatch("setMyPageLeft",s)}},immediate:!0}},computed:{component:function(){return this.$store.state.user.MyPageLeftNavList.length?this.$store.state.user.MyPageLeftNavList.filter((function(e){return e.isActive}))[0].component:"MyPageBlog"}},methods:{handleItem:function(e){var t=e.target.dataset.key;t&&this.$router.push("/my-page?key="+t)},handleRefresh:function(){var e=this;return Object(a["a"])(regeneratorRuntime.mark((function t(){var s;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:if(!e.isRefresh){t.next=2;break}return t.abrupt("return");case 2:return e.isRefresh=!0,t.next=5,e.$store.commit("RESETMYNAV");case 5:e.$message({showClose:!0,message:"刷新成功",type:"success"}),s=setTimeout((function(){e.isRefresh=!1,clearTimeout(s)}),2500);case 7:case"end":return t.stop()}}),t)})))()}}},c=i,o=(s("4e24"),s("2877")),u=Object(o["a"])(c,n,r,!1,null,"37cc3816",null);t["default"]=u.exports}}]);
//# sourceMappingURL=chunk-6e26cce3.a21305ab.js.map