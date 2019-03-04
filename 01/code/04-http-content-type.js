/*
 *1.结合fs发送文件中的内容
 * 2.Content-Type   http://tool.oschina.net/commons
 * 不同的资源对应的Content-Type不同，图片不需要指定编码，只有字符才需要
* */
var http = require('http');
var fs = require('fs');
var server = http.createServer();
server.on('request',function (req,res) {
    var url = req.url;
    if (url === '/'){
        fs.readFile('./resource/index.html',function (err,data) {
            if(err) {
                res.setHeader('Content-Type','text/plain;charset=utf-8');
                res.end('文件读取失败，请稍后重试...');
            }else {
                //data默认是二进制数据，通过.toString转为人能识别的字符串
                //res.end()支持两种数据类型，一种是二进制，一种是字符串
                res.setHeader('Content-Type','text/html;charset=utf-8');
                res.end(data);
            }
        })
    }else if(url === '/baby') {
        fs.readFile('./resource/img.jpg',function (err,data) {
            if(err) {
                res.setHeader('Content-Type','text/plain;charset=utf-8');
                res.end('文件读取失败，请稍后重试...');
            }else {
                res.setHeader('Content-Type','image/jpeg;');
                res.end(data);
            }
        })
    }
});
server.listen(3000,function () {
    console.log('Server is running....');
})