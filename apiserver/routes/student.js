const express = require("express");
const router = express.Router();

const StudentModel = require("../models/student");

// 查询
router.get("/student", async (req, res) => {
  let pageNum = parseInt(req.query.pageNum) || 1;
  let pageSize = parseInt(req.query.pageSize) || 10;

  let searchName = req.query.searchName;
  searchName = new RegExp(searchName);

  let num = await StudentModel.find({ name: searchName }).count();
  let totalPage = Math.ceil(num / pageSize);

  let studentList = await StudentModel.find({ name: searchName })
    .skip((pageNum - 1) * pageSize)
    .limit(pageSize);

  res.send({
    code: 0,
    msg: "ok",
    data: {
      list: studentList,
      totalPage
    }
  });
});

// 学生添加
router.post("/addstudent",async (req,res) => {
    let student = new StudentModel(req.body);
    student.save()
    .then(() => {
        res.send({
            code:0,
            msg:"添加成功"
        });
    })
    .catch(error => {
        res.send({
            code:-1,
            msg:error.message
        });
    });
});

// 删除
router.post("/delstu",(req,res) => {
    let studentId = req.body.sid;

    StudentModel.deleteOne({_id:studentId})
    .then(data => {
        res.send({
            code:0,
            msg:"删除成功"
        })
    })
    .catch(error => {
        res.send({
            code:-1,
            msg:error.message
        })
    })

})

// 修改
router.post("/editstu",(req,res) => {
    let studentId = req.body.eid;
    let studentName = req.body.name;
    let studentAge = req.body.age;
    let studentSex = req.body.sex;

    StudentModel.updateOne(
        {_id:studentId},
        {
            name:studentName,
            age:studentAge,
            sex:studentSex
        }
    )
    .then(data => {
        res.send({
            code:0,
            msg:"修改成功"
        })
    })
    .catch(error => {
        res.send({
            code:-1,
            msg:error.message
        })
    })

})



module.exports = router;