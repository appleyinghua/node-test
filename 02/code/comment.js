var fs = require('fs');
var http = require('http');
var template = require('art-template');
var urll = require('url');
var comments = [
    {name:'张三1',
        message:'Today is rain.',
        time:'2015-03-04'
    },
    {name:'张三2',
        message:'Today is rain.',
        time:'2015-03-04'
    },
    {name:'张三3',
        message:'Today is rain.',
        time:'2015-03-04'
    },
    {name:'张三4',
        message:'Today is rain.',
        time:'2015-03-04'
    },
];

http.createServer(function (req, res) {
    //使用url.parse方法将路径解析为一个方便操作的对象，第二个参数为true=>直接得到一个对象
    var parseObj = urll.parse(req.url,true);
    //单独获取不包含查询字符串的路径部分（不包含？之后的那些字符串）
    var pathname = parseObj.pathname;

    // var url = req.url

    if (pathname === '/') {
        fs.readFile('./views/index.html',function (err,data) {
            if(err) {
                return res.end('404 NOT FOUND');
            }
            var ret = template.render(data.toString(),{
                comments:comments
            });
            res.end(ret);
        })
    }else if (pathname.indexOf('/public/') === 0){
        fs.readFile('.'+ pathname,function (err,data) {
            if(err) {
                return res.end('404 not found!');
            }
            res.end(data);
        })
    }else if (pathname === '/post.html') {
        fs.readFile('./views/post.html',function (err, data) {
            if(err) {
                return res.end('404 not found');
            }
            res.end(data);
        })
    }else if(pathname === '/pinglun'){
        //使用url模块的parse方法把请求路径中的查询字符串解析成一个对象
        //接下来：1.获取表单提交的数据parseObj.query【被转成对象的查询字符串】
        //2.生成日期到数据对象中，然后存储到数组中
        //3.让用户重定向跳转到首页,此时数组中的数据已经发生变化
        // res.end(JSON.stringify(parseObj.query));
        var comment = parseObj.query;
        comment.time = "2017-22-2 17:11:22";
        comments.push(comment);
        //服务器端将数据存储好了，接下来请求首页，可看到最新内容
        //如何通过服务器让客户端重定向--1.状态码（302--临时重定向，301--永久重定向）
        //   statusCode
        // 2.响应头中通过location告诉客户端往哪重定向
        //   setHeader
        //如果客户端发现收到的服务端状态码是302就会自动去响应头中找location，自动跳转
        res.statusCode = 302;
        res.setHeader('Location','/');
        res.end();
    }else {
        fs.readFile('./views/404.html',function (err,data) {
            if(err) {
                return res.end('404 not found');
            }
            res.end(data);
        })
    }
}).listen(3000,function () {
    console.log('服务器已经启动...');
});