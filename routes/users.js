var express = require('express');
var router = express.Router();
var User =require('../model/User');
var bcrypt =require('bcryptjs');
var Post =require('../model/Post');


/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.get('/useradd',function (req,res,next) {
  res.render('user/useradd');
});

router.post('/useradd',function (req,res,next) {
  var user =new User();
  user.name=req.body.name;
  user.email=req.body.email;
  user.password=req.body.pwd;
  user.save(function (err,rtn) {
  if (err) throw err;
  console.log(rtn);
  res.redirect('/users/userlist');
});
});

router.get('/userlist',function (req,res,next) {
  User.find(function (err,rtn) {
  if(err) throw err;
  console.log(rtn);
  res.render('user/user-list',{phyo:rtn});
});
});

router.get('/userdetail/:id',function (req,res,next) {
  console.log(req.params.id);
  User.findById(req.params.id,function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    Post.find({author:req.params.id},function (err2,rtn2) {
      if(err2)throw err;
      console.log(err2);
      res.render('user/user_detail',{user:rtn,posts:rtn2});
        });
  });
});

router.get('/userupdate/:uid',function (req,res,next) {
  User.findById(req.params.uid,function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.render('user/userupdate',{user:rtn})
  });
});

router.post('/userupdate',function (req,res,next) {
  var update={
    name:req.body.name,
    email:req.body.email,
    password:bcrypt.hashSync(req.body.pwd,bcrypt.genSaltSync(8),null)
  };
  User.findByIdAndUpdate(req.body.id,{$set:update},function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.redirect('/users/userlist');
  });
});

router.get('/userdelete/:id',function (req,res,next) {
  User.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err) throw err;
    res.redirect('/users/userlist');
  });
});

router.post('/duemail',function (req,res) {
  User.findOne({email:req.body.email2},function (err,rtn) {
    if(err)throw err;
    (rtn != null)? res.json({status:true}):res.json({status:false});
    })
})

module.exports = router;
