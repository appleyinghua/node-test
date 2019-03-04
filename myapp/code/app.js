//0 安装 1 引包
var express = require('express');
//2 创建服务器应用程序
//相当http.createServer
var app  = express();
//当服务器收到get请求的时候，执行回调处理函数
app.get('/',function (req, res) {
    res.end('hello world');
});
//开放资源在express中是一个API的事
//公开指定目录，只要这样做了，就可以直接通过/public/XX的方式访问public目录中的所有资源了
app.use('/public/',express.static('./public/'));
//模板引擎也是一个API的事

//相当于server.listen
app.listen(3000,function () {
    console.log('server is running....')
});