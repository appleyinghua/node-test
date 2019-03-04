var express = require('express');
//express获取post表单数据
var bodyParser = require('body-parser');


//加载路由模块
var router = require('./router');
var app = express();
//配置body-parser
app.use(bodyParser.urlencoded({ extended:false }));
app.use(bodyParser.json());

app.engine('html',require('express-art-template'));
app.use('/public/',express.static('./public/'));
//使用路由
app.use(router);
app.listen(3000,function () {
    console.log('Server is running...');
});