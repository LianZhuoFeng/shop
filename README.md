# shop
商铺后台管理系统 登录账号admin 密码123456
## 接口
下载serve文件后打开db文件夹，将mydb.sql文件导入mysql数据库中,导入完成打开终端  
在serve目录输入命令npm i下载依赖包，下载后就可以输入node app.js运行接口了
## 源码
下载shop文件在shop目录输入命令npm i下载依赖包后，下载后输入npm run serve就可以运行项目了
## 项目介绍
项目主要由vue3加elementUi制作完成  
有登录功能，查找功能，添加用户功能，分页导航，编辑功能，删除功能...
项目封装了axios请求，对请求和响应的数据拦截并做做统一的处理。
登录后将登录返回的数据保存在localStorage里，并赋值到vuex中，由路由守卫进行判断数据是否存在然后跳转到主页中
