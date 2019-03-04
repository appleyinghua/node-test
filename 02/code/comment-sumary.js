/*实现留言本功能
* 第一步加载模块http，fs，url，art-template【创建服务器，读取文件，url解析请求路径获得？之前的内容，true表示转换成对象】
* */

var http = require('http');
var fs = require('fs');
var urlmodel = require('url');
var template = require('art-template');
var comments = [
    {name:'John',message:'今天天气适合出游，可是小锦鲤还没睡醒',time:'2019-02-27 10:00'},
    {name:'Apple',message:'嗨，John！小锦鲤起床了！！',time:'2019-02-27 12:00'},
    {name:'Orange',message:'John,Apple! 我想和你们一起去找小锦鲤！',time:'2019-02-27-13:00'}
]

http
    .createServer(function (req,res) {
        var parseObj = urlmodel.parse(req.url,true);

        //将路径解析成方便操作的对象，true表示？之后的内容转换成对象形式
        var pathname = parseObj.pathname;  //？之前的部分

        if(pathname === '/') {
            fs.readFile('./views/index.html',function (err,data) {
                if (err) {
                    return res.end('404 not found!');
                }
                var ret = template.render(data.toString(),{
                    comments:comments
                });
                res.end(ret);
            })
        }else if(pathname.indexOf('/public/') === 0){
            fs.readFile('.'+ pathname,function (err,data) {
                if(err) {
                    return res.end('404 not found!');
                }
                res.end(data);
            })
        }else if (pathname === '/post.html') {
            fs.readFile('./views/post.html',function (err, data) {
                if(err) {
                    return res.end('404 not found!');
                }
                res.end(data);
            })
        }else if (pathname === '/pinglun') {
            var comment = parseObj.query;
            console.log(comment);
            comment.time = '2019-02-27 14:00';
            comments.push(comment);

            res.statusCode = 302;
            res.setHeader('Location','/');
            res.end();
        }else {
            fs.readFile('./views/404.html',function (err,data) {
                if(err) {
                    return res.end('您请求的网页不存在！！');
                }
                res.end(data);
            })
        }
    }).listen(3000,function () {
    console.log('server is running....')
});