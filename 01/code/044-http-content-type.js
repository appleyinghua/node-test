/*
* 实现根据不同的url连接向客户端返回不同的数据内容
* 加载http模块，加载fs模块（服务器，文件系统）
* data数据是二进制形式的 因为服务器返回的数据默认是utf-8编码的
* 浏览器不知道服务端返回的是什么编码形式的，所以会出现中文乱码的情况
* 解决方法是Content-Type res.setHeader()
* res.write()--必须添加结束标志res.end()/或者res.end('')
*/
var fs = require('fs');
//1.加载模块
var http = require('http');
//2.创建服务器
var server = http.createServer();
//3.自动触发请求事件，然后进行回调事件处理
server.on('request',function (req, res) {
    var url = req.url;
    if (url === '/') {
        res.setHeader('Content-Type','text/plain;charset=utf-8');
        res.end('hello 米奇老鼠！');
    }else if(url==='/source') {
        fs.readFile('./resource/index.html',function (err,data) {
            if(err) {
                res.setHeader('Content-Type','text/plain;charset=utf-8');
                res.end('加载失败，请刷新后重试！');
            }else {
                res.setHeader('Content-Type','text/html;charset=utf-8');
                res.end(data);
            }
        })
    }
});
//4.监听端口号
server.listen(3000,function () {
    console.log('服务器已经启动了.....');
});