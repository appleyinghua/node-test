/*实现简单的Apache功能*/
var fs = require('fs');
var http = require('http');
var server = http.createServer();
server.on('request',function (req,res) {
    var main = 'D:/www';
    var url = req.url;
    var fileLoad = '/index.html';
    if (url !== '/') {
        fileLoad = url;
    }
    fs.readFile(main + fileLoad,function (err,data) {
        if(err) {
            res.setHeader('Content-Type','text/plain;charset=utf-8');
            res.end('请刷新重新加载...');
        }else {
            // res.setHeader('Content-Type','text/html;charset=utf-8');
            res.end(data);
        }
    })
});
server.listen(3000,function () {
   console.log('服务器正在运行....');
});