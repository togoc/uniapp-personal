(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-a56d6816"],{2532:function(e,t,n){"use strict";var s=n("23e7"),i=n("5a34"),r=n("1d80"),a=n("ab13");s({target:"String",proto:!0,forced:!a("includes")},{includes:function(e){return!!~String(r(this)).indexOf(i(e),arguments.length>1?arguments[1]:void 0)}})},"44e7":function(e,t,n){var s=n("861d"),i=n("c6b6"),r=n("b622"),a=r("match");e.exports=function(e){var t;return s(e)&&(void 0!==(t=e[a])?!!t:"RegExp"==i(e))}},"5a34":function(e,t,n){var s=n("44e7");e.exports=function(e){if(s(e))throw TypeError("The method doesn't accept regular expressions");return e}},"677a":function(e,t,n){"use strict";var s=n("81be"),i=n.n(s);i.a},"81be":function(e,t,n){},ab13:function(e,t,n){var s=n("b622"),i=s("match");e.exports=function(e){var t=/./;try{"/./"[e](t)}catch(n){try{return t[i]=!1,"/./"[e](t)}catch(s){}}return!1}},caad:function(e,t,n){"use strict";var s=n("23e7"),i=n("4d64").includes,r=n("44d2"),a=n("ae40"),o=a("indexOf",{ACCESSORS:!0,1:0});s({target:"Array",proto:!0,forced:!o},{includes:function(e){return i(this,e,arguments.length>1?arguments[1]:void 0)}}),r("includes")},e1ef:function(e,t,n){"use strict";n.r(t);var s=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"blog-show"},[n("HomeHeader",{staticClass:"show-header",attrs:{searchPage:"show-blog",placeholder:"搜索相关文章"}}),n("div",{ref:"article",staticClass:"article"},[n("div",{staticClass:"article-header"},[n("div",{staticClass:"title"},[e._v(" "+e._s(e.blog.title)+" ")]),n("div",{staticClass:"article-author-edit"},[n("div",{staticClass:"article-author"},[n("div",{staticClass:"img"},[n("img",{staticClass:"ueser-head",attrs:{src:e.baseIMGURL+e.userid+"?byuserid=1"}})]),n("div",{staticClass:"user-name-time"},[n("span",{staticClass:"user-name"},[e._v(e._s(e.blog.username))]),n("span",{staticClass:"time"},[e._v(e._s(e._f("date1")(e.blog.createdAt)))])])]),n("div",{staticClass:"article-edit"},[n("span",{staticClass:"views iconfont icon-Icon-guankanliang"},[e._v(e._s(e.blog.views))]),n("span",{class:["like","iconfont",e.liked?"icon-shoucang":"icon-shoucang1"],on:{click:function(t){return t.stopPropagation(),e.handleLiked(t)}}},[e._v(" "+e._s(e.likes.length))]),n("span",{directives:[{name:"show",rawName:"v-show",value:e.user._id===e.blog.userid,expression:"user._id === blog.userid"}],staticClass:"edit",on:{click:function(t){return t.stopPropagation(),e.handleEdit(t)}}},[e._v("编辑")])])])]),n("div",{staticClass:"markdown-body article-detail",domProps:{innerHTML:e._s(e.html)}}),n("div",{directives:[{name:"show",rawName:"v-show",value:e.isLogin,expression:"isLogin"}],staticClass:"comments"},[n("BlogComment",{attrs:{comments:e.blog.comments},on:{handleAddComment:e.handleAddComment,handleDelComment:e.handleDelComment}})],1)])],1)},i=[],r=(n("caad"),n("2532"),n("96cf"),n("1da1")),a={data:function(){return{blog:{html:"",comments:[]},likes:[]}},activated:function(){var e=this.$route.params.id;this.blog._id!==e&&this.getBlogById(e)},computed:{html:function(){return this.blog.html},userid:function(){return this.blog.userid||"default.png"},liked:function(){return this.likes.includes(this.user._id)}},methods:{handleDelComment:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$store.dispatch("delComment",{id:e});case 2:s=n.sent,t.blog.comments=s.comments;case 4:case"end":return n.stop()}}),n)})))()},handleAddComment:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var s,i;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return s=t.blog._id,n.next=3,t.$store.dispatch("addComment",{blogID:s,context:e});case 3:i=n.sent,t.blog.comments=i.comments,t.$nextTick((function(){var e=document.body.clientWidth;if(e>500){var t=document.body.clientHeight;window.scroll({top:t,left:0,behavior:"smooth"})}else{var n=this.$refs.article.scrollHeight;this.$refs.article.scroll({top:n,left:0,behavior:"smooth"})}}));case 6:case"end":return n.stop()}}),n)})))()},getBlogById:function(e){var t=this;return Object(r["a"])(regeneratorRuntime.mark((function n(){var s;return regeneratorRuntime.wrap((function(n){while(1)switch(n.prev=n.next){case 0:return n.next=2,t.$store.dispatch("getBlogById",e);case 2:s=n.sent,t.blog=s,t.likes=s.likes,document.title=s.title;case 6:case"end":return n.stop()}}),n)})))()},handleEdit:function(){this.$router.push({path:"/add-blog?type=edit&id="+this.blog._id})},handleLiked:function(){var e=this;return Object(r["a"])(regeneratorRuntime.mark((function t(){var n;return regeneratorRuntime.wrap((function(t){while(1)switch(t.prev=t.next){case 0:return t.next=2,e.$store.dispatch("toggleLike",{blogID:e.blog._id,userID:e.user._id});case 2:n=t.sent,e.likes=n;case 4:case"end":return t.stop()}}),t)})))()}}},o=a,c=(n("677a"),n("2877")),l=Object(c["a"])(o,s,i,!1,null,"3cc9c7bd",null);t["default"]=l.exports}}]);
//# sourceMappingURL=chunk-a56d6816.db664071.js.map