声明：
部分代码为网上开源代码或参考他人博客的实例代码。

项目结构：
- node_modules:    该项目node.js用到的模块，框架，插件
- public:    该文件夹下的文件均可通过url直接访问，完全公开
	- edit:    前端可编辑版本
		- css
			* btns.css:    页面上各种按钮的样式
			* detail.css:    页面中间“知识树”部分，点击蓝色块后出现弹窗，这个弹窗的样式
			* folder.css:    页面左下角“文件管理”部分的样式
			* layout.css:    整个页面的布局
			* layui.css:    别人的东西，不用改
			* mind-map.css:    页面中间“知识树”部分的样式
			* mission_popup.css:    页面右上角任务部分点击后的弹窗，弹窗的样式
			* mission.css:    页面右上角任务部分的样式
			* profile.css:    页面左上角个人信息部分的样式
			* urls.css:    页面右下角“友情链接”部分的样式
		- js
			* detail.js:    页面中间“知识树”部分，点击蓝色块后出现弹窗，这个弹窗中各种功能的实现
			* folder.js:    页面左下角“文件管理”部分的功能实现
			* mind-map.js:    页面中间“知识树”部分的功能实现
			* mission.js:    页面右上角任务部分的功能实现
			* profile.js:    页面左上角个人信息部分的功能实现
			* urls.js:    页面右下角“友情链接”部分的功能实现
			* jquery-3.2.1.min.js
		* index.html:    前端展示页面
	- view:    前端仅阅览版本
	- files:    用户“文件管理”上传的文件均保存在这里
	- images:    目前仅存放背景图片
	* login.html:    登录页面
* CODEFORCES_worker.js:    node.js实现的爬虫，用于爬codeforces上特定用户特定题目的状态
* SDUT_worker.js:    node.js实现的爬虫，用于爬sdut oj上特定用户特定题目的状态
* data.js:    用于操作mysql的文件，导出为专用于操作数据库的模块，用来增删改查用户信息
* refresh_mission.js:    用于操作mysql的文件，导出为专用于刷新用户mission部分信息的模块（实现：对于数据库所有用户逐个启动一次爬虫，把该用户对应账号下的题目状态做一次更新）
* handle.js:    专用于处理上传文件的模块，用到formidable
* server.js:    项目的主要服务器文件，用户各部分信息的增删改查（跨域问题，express框架，cookie-parser, express-session）
* manager.html:    管理员专用的前端页面，用于注册新账号，发布新任务，启动爬虫
* manager.js:    管理员专用的服务器页面，在另一个端口接受访问，用于注册新账号，发布新任务，启动爬虫
* Dump20190812.sql:    数据库导出文件，保存用户信息的方式主要是把页面中各个信息模块的节点序列化，然后按json格式存进数据库


提示：
1. node.js环境，npm install 项目所需模块
2. 安装mysql，导入数据库文件，并且需要对项目中与数据库交互的文件中的数据库账号密码做修改（data.js line 3-6，refresh_mission.js line 5-8）
3. 在线阅览文件调用的是微软的api，仅当项目部署在有域名的服务器上时才可以正常使用
4. 在server.js文件中，line 12 需要自己设定密钥secret
5. 部分代码url为	http://www.stuacm.club/	按需修改