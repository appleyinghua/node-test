/**
 * 使用node构建一个web服务器
 * 在node中提供了http核心模块，用来构建编写服务器的
 */
//1.加载http核心模块
var http = require('http');
//2使用http.createServer方法创建一个web服务器，返回一个server实例
var server = http.createServer();
//3.服务器做什么：提供服务（对数据的服务）
//发请求；接收请求；处理请求；反馈
//当用户端请求过来，自动触发服务器的request请求事件，然后执行第二个参数：回调处理
server.on('request',function () {
    console.log('收到客户端的请求');
})
//4.绑定端口号，启动服务器
server.listen(3000,function () {
    console.log('服务器启动成功了，可以进行访问');
});