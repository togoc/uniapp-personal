## 前端目录结构
+ *注：主要由uniapp自动生成，结合需求构建成目录结构。*
```
┌─components            uni-app组件目录
├─hybrid                存放本地网页的目录
├─platforms             存放各平台专用页面的目录
├─pages                 业务页面文件存放的目录
├─static                存放应用引用静态资源（如图片、视频等）的目录
├─utils                 存放工具与封装函数的目录
├─store                 vuex处理state有关目录
├─wxcomponents          存放小程序组件的目录
├─main.js               Vue初始化入口文件
├─App.vue               应用配置，用来配置App全局样式以及监听 
├─manifest.json         配置应用名称、appid、logo、版本等打包信息
└─pages.json            配置页面路由、导航条、选项卡等页面类信息

```


## 前端页面结构
<pre v-pre="" data-lang="">
    <code class="lang-" style="padding:0">
┌─tabar 
│    ├─index:首页 <a href="docs/index.md">详情</a>
│    ├─editor:写博客页面 <a href="docs/editor.md">详情</a>
│    ├─message:消息页 <a href="docs/message.md">详情</a>
│    └─myhome:我的页 <a href="docs/myhome.md">详情</a>
├─search:搜索页 <a href="docs/search.md">详情</a>
├─myinfo:我的信息 <a href="docs/myinfo.md">详情</a>
└─myblog:我的发布的博文 <a href="docs/myblog.md">详情</a>
    </code>
</pre>


## 后端目录结构
```
┌─bin                    存放运行入口文件
├─db                     数据库连接配置目录
├─models                 数据库模型目录
├─enviroment             获取变量目录(key,url)
├─config                 初始化项目存放配置目录
├─controllers            存放路由控制目录
├─services               存放业务逻辑的目录
├─middleware             中间件目录
├─routers                路由目录
├─public                 静态文件存放的目录
├─views                  存放页面(类似public)
├─utils                  工具目录
└─app.js                 配置页面路由、导航条、选项卡等页面类信息

```