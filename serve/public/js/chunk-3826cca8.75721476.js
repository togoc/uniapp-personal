(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-3826cca8"],{2426:function(t,e,i){"use strict";i.r(e);var s=function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"dashboard container-fluid no-gutters"},[t._m(0),t._m(1),t._m(2),t.portForm.length?i("div",{staticClass:"row net-table"},[i("table",{staticClass:"table"},[t._m(3),i("tbody",t._l(t.portForm,(function(e,s){return i("tr",{key:s},[i("th",{attrs:{scope:"row"}},[t._v(t._s(e[0]))]),i("td",[t._v(t._s(e[1]))]),i("td",[t._v(t._s(e[3]))]),i("td",[t._v(t._s(e[4]))])])})),0)])]):i("div",{staticClass:"row emty"},[i("svg",{staticClass:"bi bi-cloud-slash",attrs:{width:"1em",height:"1em",viewBox:"0 0 16 16",fill:"currentColor",xmlns:"http://www.w3.org/2000/svg"}},[i("path",{attrs:{d:"M3.901 6.023A3.5 3.5 0 1 0 3.5 13h7.379l-1-1H3.5a2.5 2.5 0 1 1 .423-4.965l.964.164.031-.16-1.017-1.016zm10.125 5.882a1.5 1.5 0 0 0-.289-2.886L12.7 8.854l.216-1.028a4 4 0 0 0-6.682-3.714l-.707-.708a5 5 0 0 1 8.368 4.626 2.501 2.501 0 0 1 .88 4.621l-.748-.746z"}}),i("path",{attrs:{"fill-rule":"evenodd",d:"M13.646 14.354l-12-12 .708-.708 12 12-.707.707z"}})])])])},n=[function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"row shadow-sm sticky-top sticky-auto"},[i("h5",{staticClass:"col title-item"},[t._v("性能信息")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"row mt-2"},[i("div",{staticClass:"col-md-6",attrs:{id:"cpu"}}),i("div",{staticClass:"col-md-6",attrs:{id:"mem"}})])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("div",{staticClass:"row shadow-sm sticky-top sticky-auto"},[i("h5",{staticClass:"col title-item"},[t._v("端口信息")])])},function(){var t=this,e=t.$createElement,i=t._self._c||e;return i("thead",{staticClass:"thead-light"},[i("tr",[i("th",{attrs:{scope:"col"}},[t._v("协议")]),i("th",{attrs:{scope:"col"}},[t._v("地址")]),i("th",{attrs:{scope:"col"}},[t._v("状态")]),i("th",{attrs:{scope:"col"}},[t._v("pid/进程")])])])}],a={data:function(){return{cpu:0,MenPercent:0,portForm:[],timer:{cpu:null,mem:null}}},methods:{createCpu:function(){var t=this,e=this.$echarts.init(document.getElementById("cpu"));0===e.getWidth()&&e.resize(),e.showLoading(),window.onresize=e.resize;var i=[],s=Date.now()+18e3,n=Date.now()+1e3,a={title:{text:"cpu % 利用率"},tooltip:{show:!0,trigger:"axis"},xAxis:{type:"time",interval:6e3,max:s,min:n,splitLine:{show:!0}},yAxis:{type:"value",max:100,splitLine:{show:!0}},series:[{name:"% ",type:"line",showSymbol:!1,hoverAnimation:!1,data:i}]},o=0;Date.now();return setInterval((function(){o++,o>18&&(a.xAxis.max=a.xAxis.max+1e3,a.xAxis.min=a.xAxis.min+1e3),e.hideLoading(),i.push([Date.now(),t.cpu]),e.setOption(a)}),1e3)},createMem:function(){var t=this,e=this.$echarts.init(document.getElementById("mem"));window.addEventListener("resize",(function(){e.resize()})),0===e.getWidth()&&e.resize(),e.showLoading();var i=[],s=[],n=Date.now()+18e3,a=Date.now()+1e3,o=null,c={title:{text:"进程内存 MB 使用率"},tooltip:{show:!0,trigger:"axis"},xAxis:{type:"time",interval:6e3,max:n,min:a,splitLine:{show:!0}},yAxis:[{type:"value",max:o,splitLine:{show:!0}},{type:"value",max:o,splitLine:{show:!0}}],series:[{name:"MB 总大小",type:"line",showSymbol:!1,hoverAnimation:!1,data:i},{name:"MB 已使用",type:"line",showSymbol:!1,hoverAnimation:!1,data:s}]},r=0;Date.now();return setInterval((function(){r++,r>18&&(c.xAxis.max=c.xAxis.max+1e3,c.xAxis.min=c.xAxis.min+1e3),c.yAxis[0].max=Math.ceil(t.MenPercent[0]),c.yAxis[1].max=Math.ceil(t.MenPercent[0]),e.hideLoading(),i.push([Date.now(),t.MenPercent[0]]),s.push([Date.now(),t.MenPercent[1]]),e.setOption(c)}),1e3)},addListenSocket:function(){var t=this;if(this.$socket.id)this.$socket.emit("cpu",{id:this.$socket.id}),this.$socket.on(this.$socket.id+"_nets",(function(e){t.portForm=e,t.$socket.removeListener(t.$socket.id+"_nets")})),this.$socket.emit("nets",{id:this.$socket.id+"_nets"}),this.$socket.on(this.$socket.id+"_cpu",(function(e){t.cpu=e.CpuPercent,t.MenPercent=e.MenPercent}));else var e=setTimeout((function(){t.addListenSocket(),clearTimeout(e)}),500)},addListenEchar:function(){this.timer.cpu=this.createCpu(),this.timer.mem=this.createMem()},removeListent:function(){this.$socket.emit(this.$socket.id+"_cpu_remove",{id:this.$socket.id+"_cpu"}),this.$socket.removeListener(this.$socket.id+"_cpu"),clearInterval(this.timer.cpu),clearInterval(this.timer.mem)}},activated:function(){this.addListenSocket(),this.addListenEchar()},deactivated:function(){this.removeListent()}},o=a,c=(i("32a8"),i("2877")),r=Object(c["a"])(o,s,n,!1,null,"5c13da46",null);e["default"]=r.exports},3097:function(t,e,i){},"32a8":function(t,e,i){"use strict";var s=i("3097"),n=i.n(s);n.a}}]);
//# sourceMappingURL=chunk-3826cca8.75721476.js.map