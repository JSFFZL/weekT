var express = require('express');
var router = express.Router();
var Mong = require("mongodb-curd");

var db = "record";

var col = "pay"

/* GET home page. */
router.post('/api/getfind', function(req, res, next) {
  Mong.find(db,col,{},function(result){
    if(!result){
      res.json({code:0,msg:"失败"})
    }else{
      res.json({code:1,msg:"成功",data:result})
    }
  })


});


router.post('/api/add', function(req, res, next) {
  var obj = req.body;
  Mong.insert(db,col,obj,function(result){
    if(!result){
      res.json({code:0,msg:"添加失败"})
    }else{
      res.json({code:1,msg:"添加成功",data:result})
    }
  })
});


module.exports = router;
