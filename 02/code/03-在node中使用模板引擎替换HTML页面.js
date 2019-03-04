/*实现简单的Apache功能*/
var fs = require('fs');
var http = require('http');
var template = require('art-template');

var server = http.createServer();
server.on('request',function (req,res) {
    var wwwDir = 'D:/www';
    fs.readFile('./template-apache.html',function (err,data) {
        if(err) {
            //return有两个作用：1.返回值  2.阻止代码继续执行
            return res.end('404 not found');
        }else {
            /*1.如何得到wwwDir目录列表中的文件名和目录名
            * fs.readdir
            * 2.如何将得到的文件名和目录名替换到template.html中
            * 模板引擎
            */
            fs.readdir(wwwDir,function (err, files) {
                if(err) {
                    return res.end('can not find www dir');
                }
                //这里只需要使用模板引擎解析替换data中的模板字符串就可以了
                //数据就是files
                //然后在HTML文件中编写模板语法就可以了。
                var htmlStr = template.render(data.toString(),{
                    title:"哈哈",
                    files:files
                });

                res.end(htmlStr);
            });
        }
    })
});
server.listen(3000,function () {
    console.log('服务器正在运行....');
});