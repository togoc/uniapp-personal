(window["webpackJsonp"]=window["webpackJsonp"]||[]).push([["chunk-7fafd8da"],{"0c74":function(t,e,a){},"325b":function(t,e,a){"use strict";var s=a("0c74"),r=a.n(s);r.a},a55b:function(t,e,a){"use strict";a.r(e);var s=function(){var t=this,e=t.$createElement,a=t._self._c||e;return a("div",{staticClass:"login"},[a("form",{staticClass:"login-form",attrs:{action:"/api/user-service/login",method:"post"}},[a("h2",[t._v("登录")]),a("div",{staticClass:"user-name"},[a("label",{attrs:{for:""}},[t._v("邮箱")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.email,expression:"email"}],staticClass:"input",attrs:{type:"text",placeholder:"请输入邮箱"},domProps:{value:t.email},on:{input:function(e){e.target.composing||(t.email=e.target.value)}}})]),a("div",{staticClass:"password"},[a("label",{attrs:{for:""}},[t._v("密码")]),a("input",{directives:[{name:"model",rawName:"v-model",value:t.password,expression:"password"}],staticClass:"input",attrs:{type:"password",placeholder:"请输入用户名"},domProps:{value:t.password},on:{input:function(e){e.target.composing||(t.password=e.target.value)}}})]),a("h2",[a("input",{attrs:{type:"button",value:"提交"},on:{click:function(e){return e.stopPropagation(),t.handleLogin(e)}}}),a("router-link",{attrs:{to:"/register"}},[t._v("注册")])],1)])])},r=[],n=(a("96cf"),a("1da1")),o={data:function(){return{email:"309128090@qq.com",password:"123456"}},created:function(){this.$store.commit("RESETUSER")},methods:{handleLogin:function(){var t=this;return Object(n["a"])(regeneratorRuntime.mark((function e(){var a;return regeneratorRuntime.wrap((function(e){while(1)switch(e.prev=e.next){case 0:return e.next=2,t.$store.dispatch("Login",{email:t.email,password:t.password});case 2:a=e.sent,a&&(t.$router.push("/"),t.$message({message:"登录成功!",type:"success"}));case 4:case"end":return e.stop()}}),e)})))()}}},i=o,c=(a("325b"),a("2877")),u=Object(c["a"])(i,s,r,!1,null,"610b45ee",null);e["default"]=u.exports}}]);
//# sourceMappingURL=chunk-7fafd8da.21176def.js.map