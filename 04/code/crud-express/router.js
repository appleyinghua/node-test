/*在这里做路由配置，各司其职*/
var express = require('express');
var fs = require('fs');

var Student = require('./students');

//express有专门用来包装路由的
//1.创建一个路由容器
var router = express.Router();
//2.把路由都挂载到router路由容器中
router.get('/',function (req, res) {
    // fs.readFile('./db.json','utf-8',function (err, data) {
    //     if(err) {
    //         return res.send("数据读取失败！");
    //     }
    //     // console.log(data);
    //     //从文件中读取到的数据都是字符串，需要手动转成对象。
    //     var students = JSON.parse(data).students;
    //     res.render('index.html',{
    //         fruits:['苹果','香蕉','鸭梨'],
    //         students: students
    //     })
    // });
    Student.find(function (err, students) {
        if(err) {
            return res.send('Server error');
        }
        res.render('index.html',{
            fruits:['苹果','香蕉','鸭梨'],
            students: students
        })
    })
});
router.get('/students/new',function (req, res) {
    res.render('new.html');
});
router.post('/students/new',function (req, res) {
//1.获取表单数据
// 2.处理 --- 将数据保存到db.json中，用于数据持久化
// 先读取出来，转成对象，然后往对象中push数据，然后把对象转成字符串，再把字符串写入文件
// 3.发送响应
//     console.log(req.body);
    Student.save(req.body,function (err) {
        if(err) {
            return res.send('Server error')
        }
        res.redirect('/');
    })
});
router.get('/students/edit',function (req, res) {
    //1.在客户端的列表页中处理链接问题（需要有id参数）2.获取要编辑的学生id
    // 3.渲染编辑页面【根据id把学生信息查出来，使用模板引擎渲染】
    // console.log(req.query.id)
    Student.findById(parseInt(req.query.id),function (err, student) {
        if(err) {
            return res.send('Server error')
        }
        res.render('edit.html',{
            student:student
        })
    })

});
router.post('/students/edit',function (req, res) {
    Student.update(req.body,function (err) {
        if(err) {
            return res.send('Server error')
        }
        res.redirect('/');
    })
});
router.get('/students/delete',function (req, res) {
    //1.获取要删除的id 2.根据id执行删除操作 3.根据操作结果发送响应数据
    Student.delete(req.query.id,function (err) {
        if(err) {
            return res.send('Error');
        }
        res.redirect('/');
    })
});
//3.导出路由
module.exports = router;