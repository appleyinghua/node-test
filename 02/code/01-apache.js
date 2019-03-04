/*实现简单的Apache功能*/
var fs = require('fs');
var http = require('http');
var server = http.createServer();
server.on('request',function (req,res) {
    var wwwDir = 'D:/www';
    var url = req.url;
    fs.readFile('./template.html',function (err,data) {
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
                //2.1生成需要替换的内容
                var content = '';
                files.forEach(function (item) {
                    //在ES6的``字符串中，可以使用${}来引用变量
                    content += `
                        <tr>
                            <td data-value="a.txt"><a class="icon file" draggable="true" href="/D:/www/a.txt">${item}</a></td>
                            <td class="detailsColumn" data-value="22"></td>
                            <td class="detailsColumn" data-value="1551168443">2019/2/26 下午4:07:23</td>
                        </tr>
                        `

                });
                //2.2进行字符串的替换
                data = data.toString();
                data = data.replace('*_*',content);

                res.end(data);
            });
        }
    })
});
server.listen(3000,function () {
    console.log('服务器正在运行....');
});