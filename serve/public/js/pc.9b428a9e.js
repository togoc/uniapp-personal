(function(e){function t(t){for(var r,c,u=t[0],i=t[1],s=t[2],f=0,l=[];f<u.length;f++)c=u[f],Object.prototype.hasOwnProperty.call(a,c)&&a[c]&&l.push(a[c][0]),a[c]=0;for(r in i)Object.prototype.hasOwnProperty.call(i,r)&&(e[r]=i[r]);h&&h(t);while(l.length)l.shift()();return o.push.apply(o,s||[]),n()}function n(){for(var e,t=0;t<o.length;t++){for(var n=o[t],r=!0,c=1;c<n.length;c++){var u=n[c];0!==a[u]&&(r=!1)}r&&(o.splice(t--,1),e=i(i.s=n[0]))}return e}var r={},c={pc:0},a={pc:0},o=[];function u(e){return i.p+"js/"+({}[e]||e)+"."+{"chunk-169ebe1c":"c6362e34","chunk-32c5ddee":"7af9315e","chunk-3d601a0e":"91383457","chunk-3e4297e3":"cfb0e8fc","chunk-3ee92c6f":"ac2a9856","chunk-5a9f0808":"536fcd5f","chunk-5b898acf":"8c982f57","chunk-65e7100a":"f7c30f02","chunk-74d27042":"b21d5ae2","chunk-bad0a7a0":"8343a2f8","chunk-d2f4692e":"e88304ca"}[e]+".js"}function i(t){if(r[t])return r[t].exports;var n=r[t]={i:t,l:!1,exports:{}};return e[t].call(n.exports,n,n.exports,i),n.l=!0,n.exports}i.e=function(e){var t=[],n={"chunk-169ebe1c":1,"chunk-32c5ddee":1,"chunk-3d601a0e":1,"chunk-3e4297e3":1,"chunk-3ee92c6f":1,"chunk-5a9f0808":1,"chunk-5b898acf":1,"chunk-65e7100a":1,"chunk-74d27042":1,"chunk-bad0a7a0":1,"chunk-d2f4692e":1};c[e]?t.push(c[e]):0!==c[e]&&n[e]&&t.push(c[e]=new Promise((function(t,n){for(var r="css/"+({}[e]||e)+"."+{"chunk-169ebe1c":"3b3b597b","chunk-32c5ddee":"dbc72590","chunk-3d601a0e":"000ae820","chunk-3e4297e3":"9131e02c","chunk-3ee92c6f":"d251a327","chunk-5a9f0808":"7cdc4fef","chunk-5b898acf":"500804ae","chunk-65e7100a":"c461d070","chunk-74d27042":"a39e0181","chunk-bad0a7a0":"592e6f34","chunk-d2f4692e":"e41cb176"}[e]+".css",a=i.p+r,o=document.getElementsByTagName("link"),u=0;u<o.length;u++){var s=o[u],f=s.getAttribute("data-href")||s.getAttribute("href");if("stylesheet"===s.rel&&(f===r||f===a))return t()}var l=document.getElementsByTagName("style");for(u=0;u<l.length;u++){s=l[u],f=s.getAttribute("data-href");if(f===r||f===a)return t()}var h=document.createElement("link");h.rel="stylesheet",h.type="text/css",h.onload=t,h.onerror=function(t){var r=t&&t.target&&t.target.src||a,o=new Error("Loading CSS chunk "+e+" failed.\n("+r+")");o.code="CSS_CHUNK_LOAD_FAILED",o.request=r,delete c[e],h.parentNode.removeChild(h),n(o)},h.href=a;var d=document.getElementsByTagName("head")[0];d.appendChild(h)})).then((function(){c[e]=0})));var r=a[e];if(0!==r)if(r)t.push(r[2]);else{var o=new Promise((function(t,n){r=a[e]=[t,n]}));t.push(r[2]=o);var s,f=document.createElement("script");f.charset="utf-8",f.timeout=120,i.nc&&f.setAttribute("nonce",i.nc),f.src=u(e);var l=new Error;s=function(t){f.onerror=f.onload=null,clearTimeout(h);var n=a[e];if(0!==n){if(n){var r=t&&("load"===t.type?"missing":t.type),c=t&&t.target&&t.target.src;l.message="Loading chunk "+e+" failed.\n("+r+": "+c+")",l.name="ChunkLoadError",l.type=r,l.request=c,n[1](l)}a[e]=void 0}};var h=setTimeout((function(){s({type:"timeout",target:f})}),12e4);f.onerror=f.onload=s,document.head.appendChild(f)}return Promise.all(t)},i.m=e,i.c=r,i.d=function(e,t,n){i.o(e,t)||Object.defineProperty(e,t,{enumerable:!0,get:n})},i.r=function(e){"undefined"!==typeof Symbol&&Symbol.toStringTag&&Object.defineProperty(e,Symbol.toStringTag,{value:"Module"}),Object.defineProperty(e,"__esModule",{value:!0})},i.t=function(e,t){if(1&t&&(e=i(e)),8&t)return e;if(4&t&&"object"===typeof e&&e&&e.__esModule)return e;var n=Object.create(null);if(i.r(n),Object.defineProperty(n,"default",{enumerable:!0,value:e}),2&t&&"string"!=typeof e)for(var r in e)i.d(n,r,function(t){return e[t]}.bind(null,r));return n},i.n=function(e){var t=e&&e.__esModule?function(){return e["default"]}:function(){return e};return i.d(t,"a",t),t},i.o=function(e,t){return Object.prototype.hasOwnProperty.call(e,t)},i.p="/public/",i.oe=function(e){throw console.error(e),e};var s=window["webpackJsonp"]=window["webpackJsonp"]||[],f=s.push.bind(s);s.push=t,s=s.slice();for(var l=0;l<s.length;l++)t(s[l]);var h=f;o.push([0,"chunk-vendors","chunk-common"]),n()})({0:function(e,t,n){e.exports=n("56d7")},"56d7":function(e,t,n){"use strict";n.r(t);n("d3b7"),n("25f0"),n("e260"),n("e6cf"),n("cca6"),n("a79d");var r=n("8bbf"),c=n.n(r),a=function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{attrs:{id:"app"},on:{touchstart:function(t){return t.stopPropagation(),e.handleTap(t)}}},[n("transition",{attrs:{name:"slide"}},[n("router-view")],1),e.showH5Tips?[n("div",{staticClass:"user-h5-tips"},[n("div",{staticClass:"inner"},[n("div",{staticClass:"close"},[n("span",{staticClass:"iconfont icon-xianshi_quxiaotianchong",on:{click:function(t){t.stopPropagation(),e.showH5Tips=!1}}})]),e._m(0),e._m(1)])])]:e._e()],2)},o=[function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"detail-h5"},[n("p",[e._v("推荐使用h5页面")]),n("p",[e._v("您的设备屏幕尺寸过小.")])])},function(){var e=this,t=e.$createElement,n=e._self._c||t;return n("div",{staticClass:"btn"},[n("a",{attrs:{href:"/public/h5.html"}},[e._v("打开")])])}],u={data:function(){return{showH5Tips:!0}},mounted:function(){this.$store.dispatch("getUser")},methods:{handleTap:function(e){"header-img"===e.target.dataset.type?this.$store.commit("HIDENAV",!1):this.$store.commit("HIDENAV",!0)}}},i=u,s=(n("5c0b"),n("2877")),f=Object(s["a"])(i,a,o,!1,null,null,null),l=f.exports,h=n("a18c"),d=n("4360"),p=n("b2d8"),b=n.n(p),m=(n("64e1"),n("6c76"),n("bcee")),v=n("4a30"),k=n("d4ec"),g=n("bee2"),y=n("2af9"),w=function(){function e(){Object(k["a"])(this,e)}return Object(g["a"])(e,[{key:"install",value:function(e,t){for(var n in y)e.component(n,y[n])}}]),e}(),_=new w,x=function(){function e(){Object(k["a"])(this,e)}return Object(g["a"])(e,[{key:"install",value:function(e,t){e.directive("user",{bind:function(e,t){}})}}]),e}(),O=new x;c.a.config.productionTip=!1,c.a.use(O),c.a.use(b.a),c.a.use(m["a"]),c.a.use(v["a"]),c.a.use(_);try{try{throw new Error("错误1")}catch(j){console.log("error1"+j.toString())}}catch(j){console.log("error2"+j.toString())}new c.a({router:h["a"],store:d["a"],render:function(e){return e(l)}}).$mount("#app")},5880:function(e,t){e.exports=Vuex},"5c0b":function(e,t,n){"use strict";var r=n("9c0c"),c=n.n(r);c.a},6389:function(e,t){e.exports=VueRouter},"8bbf":function(e,t){e.exports=Vue},"9c0c":function(e,t,n){},c32d:function(e,t){e.exports=moment},cebe:function(e,t){e.exports=axios}});
//# sourceMappingURL=pc.9b428a9e.js.map