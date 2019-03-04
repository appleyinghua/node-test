/*数据操作文件模块，专门对数据进行增删改查
*只处理数据，不关心业务*/
var fs = require('fs');
var dbPath = './db.json';
//获取所有学生信息
exports.find = function (callback) {
    //如果需要获取函数中异步操作的结果，必须通过回调函数获取
    //callback中的参数，第一个是err，第二个是结果
    //第二个参数utf8表示以utf8编码的方式读取，JSON.parse(data).students数组
    fs.readFile(dbPath,'utf8',function (err,data) {
        if(err) {
            callback(err);
        }
        callback(null,JSON.parse(data).students);
    })
};
//根据学生id查询学生信息
exports.findById = function (id,callback) {
    //如果需要获取函数中异步操作的结果，必须通过回调函数获取
    //callback中的参数，第一个是err，第二个是结果
    fs.readFile(dbPath,'utf8',function (err,data) {
        if(err) {
            callback(err);
        }
        var students = JSON.parse(data).students;
        //find方法是数组遍历的方法是ES6的语法，用于返回相等id的那组数据
        var ret = students.find(function (item) {
            return item.id = parseInt(id);
        });
        callback(null,ret);
    })
};
//添加学生
exports.save = function (student,callback) {
    fs.readFile(dbPath,function (err, data) {
        if(err) {
            return res.send('Server error')
        }
        var students = JSON.parse(data).students;
        student.id = students[students.length -1].id + 1;
        students.push(student);
        //重新把数据放入文件中，首先需要对象转为字符串，注意students是一个数组，需要外加{}
        var fileData = JSON.stringify({
            students:students
        });
        // console.log(fileData);
        //写入对应的文件中
        fs.writeFile(dbPath,fileData,function (err) {
            if(err) {
                return res.send('出错了')
            }
            callback(null);
        })
    })
};
//更新学生
exports.update = function (student,callback) {
    fs.readFile(dbPath,'utf8',function (err, data) {
        if(err) {
            return callback(err);
        }
        var students = JSON.parse(data).students;
        //注意，这里记得把id统一转换为数字类型
        student.id = parseInt(student.id)
        var stu = students.find(function (item) {
            return item.id === student.id;
        })
        for(var key in student) {
            stu[key] = student[key];
        }
        //把对象数据转化为字符串
        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function (err) {
            if(err) {
                return callback(err)
            }
            callback(null)
        })
    })
};
//删除学生
exports.delete = function (id,callback) {
    fs.readFile(dbPath,'utf8',function (err,data) {
        if(err) {
            callback(err);
        }
        var students = JSON.parse(data).students; //查询到所有学生信息
        //ES6语法findIndex，遍历数组，查找并返回id相同的数组下标
        var deleteId = students.findIndex(function (item) {
            return item.id === parseInt(id);
        });  //返回被删除id的学生信息
        students.splice(deleteId,1);
        //重新写入文件---把对象数据转化为字符串
        var fileData = JSON.stringify({
            students:students
        })
        fs.writeFile(dbPath,fileData,function (err) {
            if(err) {
                return callback(err)
            }
            callback(null)
        })
    })
};