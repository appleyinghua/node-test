//art-template （js模板引擎）
//不仅可以在浏览器使用，也可以在node中使用
//安装 npm install art-template --save
//默认下载到node_modules目录中，不支持更改目录
//模板引擎最早诞生于服务器领域，后来才发展到前端

/* 1.安装npm install art-template
*  2.在需要使用的文件模板中加载art-template【require】
*  3.查文档，使用模板引擎的API
*  */
var template = require('art-template');

var fs = require('fs');
fs.readFile('./tmp.html',function (err,data) {
    if(err) {
        return console.log('读取失败');
    }
    //默认读取到的data是二进制数据
    //而模板引擎的render方法需要接收的是字符串
    //因此需要给data加toString转为字符串
    //模板引擎不关心内容，只关心{{}}这个字符
    var ret = template.render(data.toString(),{
        name:'Jack',
        age:20,
        hobbies:[
            '唱歌',
            '跳舞',
            '打游戏'
        ],
        title:'个人信息'
    })
    console.log(ret);
});