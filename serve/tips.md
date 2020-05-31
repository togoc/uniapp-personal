> 分词已经关闭, 在model blog.save里.
# 安装问题:
## window:
 需要安装jdk 然后 `npm install --global --production windows-build-tools` 失败的话尝试先安装python(有时候先装express可以直接下载sharp, 不用配置地址).
## linux:
linux 注意依赖 : gcc安装:`apt-get install build-essential`
  + npm 权限不足
    + `npm config set user 0`
    + `npm config set unsafe-perm true`
  + sharp:地址修改`https://sharp.pixelplumbing.com/install#custom-prebuilt-binaries`
        + utils里面的sharp是写好的地址, 直接运行`sharp:linux`可以开启服务(先安装express), 下载地址写` npm config set sharp_dist_base_url "http://192.168.3.3:8787/download-sharp/" `.
