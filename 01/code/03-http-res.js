/**
 * 使用node构建一个web服务器
 * 在node中提供了http核心模块，用来构建编写服务器的
 */
var http = require('http');
var server = http.createServer();
/*
 *request请求事件处理函数，接收两个参数Request
 * 【请求对象用来获取客户端的一些请求信息，如请求路径】
 * Response【响应对象给客户端发送响应消息】
 */
server.on('request',function (request,response) {
    /*response有一个方法write用于给客户端发送响应数据，
    write可以多次使用，但是最后一定要使用end来结束响应*/
    //或者直接res.end('hello')在结束的同时，发送响应。
    // response.end('hello');
    //思考：根据不同的路径响应不同的结果--
    // -通过判断request.url来响应不同的结果。
    var url = request.url;
    if(url === '/') {
        /*在服务端默认发送的是utf-8编码的内容，但是浏览器不知道是utf-8编码的。
        * 解决方法：告诉浏览器发送的是什么编码方式的内容*/
        //响应内容类型Content-Type
        //如果发送内容是html格式的字符串-> text/html
        response.setHeader('Content-Type','text/plain;charset=utf-8');
        response.end('default 页面');
    }else if (url === '/login') {
        response.end('login page');
    }else {
        response.end('404 not found');
    }
});
server.listen(3000,function () {
    console.log('服务器启动成功了，可以进行访问');
});