/*
 * 浏览器中的JavaScript没有文件操作的能力，node中JavaScript可以操作文件
 * fs是file-system的简写
 * 在node中操作文件1.引入fs核心模块；2.进行文件读取操作【fs模块提供文件操作的API】
 */
//1.使用require方法加载fs核心模块
var fs = require('fs');
//2.读取文件（第一个参数是文件路径，第二个参数是回调函数）
/*
 * 成功   data：数据   error： null
 * 失败   data：undefined   error： 错误对象
 */
fs.readFile('./data/hello.txt',function (error,data) {
    //默认文件中存储的是二进制数据0  1
    //为什么看到的不是0和1，原因是二进制转为十六进制了。
    //通过toString()转化成我们所认识的字符
    if(error) {
        console.log('读取失败！');
    }else {
        console.log(data.toString());
    }
});
//文件写操作，回调函数error形参.成功：文件写入成功，error：null。失败：写入失败，error：错误对象
fs.writeFile('./data/ww.txt','大家好，今天学习node！',function (error) {
    if(error) {
        console.log('写入失败');
    }else {
        console.log('文件写入成功');
    }
});