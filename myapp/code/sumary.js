/*知识总结
1、each,forEach
* 在art-template渲染引擎中使用{{each hobbies}} {{$value.属性名}}{{/each}}
* jQuery中使用each来遍历jQuery选择器选择的伪数组对象，同时each也可以代替低版本浏览器中无法使用的forEach。
* var arr = [1,2,3,4];
* $.each(arr,function(index,item){console.log(item); });
* forEach是ES5 的JavaScript原生遍历方式
* arr.forEach(function(item,index){ console.log(item); });
* 2、模块系统：模块作用域
*  模块作用域+require加载模块+exports接口来导出对象或字符串等
*  如a.js和b.js，在a.js中可以加载b.js，也可以使用b.js中的接口对象
*  输出多个属性值 exports.a = 2; exports.b = 3;..以此类推
*  输出字符串 module.exports = “hello”；
*  在a.js中接收，var Exports = require（"./b.js"）;
*  3、模块加载进制
*  优先从缓存中加载
*  核心模块 + 第三方模块 + 路径模块
*  注意第三方模块加载步骤以art-template为例：node_modules-art-template-package.json-- main---main属性值
*  如果没有package.json或者main属性没有值，则优先查找index.js 文件，如果没有从node_modules中查找，以此类推
*  4、建议每个模块都要有package.json文件，它相当于模块的说明书，其中的dependencies包含第三方包的依赖信息。
*  packages.json通过npm init -y;实现；如果有包丢失情况可以通过npm install来安装。
*  5、命令行工具
*  npm --version 查看版本号
*  npm install --global npm 升级它本身
*  npm init -y; 初始化
*  npm install 包名  --save 下载第三方包并且保存依赖在dependencies中
*  npm uninstall 包名 删除第三方包，但是保留依赖
*  npm uninstall 包名 --save 同时删除
*  6、解决npm被墙的问题--通过安装淘宝镜像
*  npm install --global cnpm
*  7、web开发框架express
*  首先进行安装，然后引入加载，然后构建服务器，监听之类的e
*  var express = require("express");
*  创建服务器
*  var app = express();
*  app.get('/',function(req,res){
*       res.end("hello world!");
*  })
*  开放静态资源
*  app.use('/public/',express.static('./public/'));
*
*  app.listen(3000,function(){console.log('server is running。。。')});
* */