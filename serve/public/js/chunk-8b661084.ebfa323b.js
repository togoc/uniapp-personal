(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-8b661084"],{"4b64":function(t,e,a){"use strict";var r=a("a7d1"),s=a.n(r);s.a},"73cf":function(t,e,a){"use strict";a.r(e);var r=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login"},[a("form",{staticClass:"login-form",attrs:{action:"#"}},[a("h2",[t._v("注册")]),a("div",{staticClass:"user-name"},[a("label",{attrs:{for:""}},[t._v("邮箱")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.email,expression:"email",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"text",placeholder:"请输入邮箱"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),a("div",{staticClass:"password"},[a("label",{attrs:{for:""}},[t._v("密码")]),a("input",{directives:[{name:"model",rawName:"v-model.trim",value:t.password,expression:"password",modifiers:{trim:!0}}],staticClass:"input",attrs:{type:"password",placeholder:"请输入用户名"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value.trim())},blur:function(e){return t.$forceUpdate()}}})]),a("h2",[a("input",{attrs:{type:"button",value:"提交"},on:{click:t.handleRegister}}),a("router-link",{attrs:{to:"/login"}},[t._v("登录")])],1)])])},s=[],i=(a("96cf"),a("1da1")),n={data:function(){return{email:"309128090@qq.com",password:"123456"}},created:function(){this.$store.commit("RESETUSER")},methods:{handleRegister:function(){var t=this;return Object(i["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("Register",{email:t.email,password:t.password});case 2:a=e.sent,a&&(t.$router.push("/"),t.$message({message:"注册成功!",showClose:!0,type:"success"}));case 4:case"end":return e.stop()}}),e)})))()}}},o=n,c=(a("4b64"),a("2877")),u=Object(c["a"])(o,r,s,!1,null,"5a218e5c",null);e["default"]=u.exports},a7d1:function(t,e,a){}}]);
//# sourceMappingURL=chunk-8b661084.ebfa323b.js.map