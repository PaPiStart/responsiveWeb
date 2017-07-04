播助手官网平台http://www.bozhushou.com
====

## 概述

bozhushou 为播助手官网。
前端环境：
	代码管理：git
	开发环境：nodejs,npm,bower,gulp
	开发框架：bootstrap,jquery,swiper

## 开发

```
git clone git@192.168.18.18:meixing/bozhushou.git
npm install -g bower
npm install -g gulp
npm install
bower install
gulp -ws
```
运行`gulp -ws`命令，会监听`src`目录下所有文件的变更，并且默认会在`8080`端口启动服务器，然后在浏览器打开 `http://localhost:8080`。
运行`gulp -ws`命令，会启用后台代理转发。

## 添加第三方工具包

```
npm install angular(工具包名) -save
-save 保存到本地(package.json)
```

## 添加第三方js库

```
bower install jQuery(工具包名) -save
-save 保存到本地(bower.json)

(https://segmentfault.com/a/1190000002971135) bower入门教程

```

## 打包发布生产

```
gulp -wm
-m 压缩文件(img、css、less、js)
-w 启动编译
```
运行`gulp -wm`命令，编译`src`下的文件，生成编译后的文件`dist`,

