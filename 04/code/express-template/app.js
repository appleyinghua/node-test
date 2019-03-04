var express = require('express');
var app = express();
var bodyParser = require('body-parser');
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
//引入模板配置，第一个参数表示当渲染以.art结尾的文件的时候，使用art-template模板引擎
//虽然外边不用加载art-template但是必须进行安装，因为express-art-template依赖它。
app.engine('html',require('express-art-template'));
app.use('/public/',express.static('./public/'));

app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());


app.get('/',function (req,res) {
    //express默认会去views文件夹中找404.html文件；res.render('html模板名',{模板数据})
    res.render('index.html',{
        comments:comments
    })
});
app.get('/post.html',function (req, res) {
    res.render('post.html');
});
//使用post请求方法
app.post('/post',function (req,res) {
    var comment = req.body;
    comment.time = '2019-03-02 17:00:00';
    comments.unshift(comment);
    res.redirect('/');
});
app.listen(3000,function () {
    console.log('hello, server is running ..')
});