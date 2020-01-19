var express = require('express');
var router = express.Router();
var Post=require('../model/Post');
var User=require('../model/User');

/* GET home page. */
router.get('/', function(req, res, next) {
  res.send('I am post');
});

router.get('/postadd',function (req,res,next) {
  User.find(function (err,rtn) {
    if(err) throw err;
    res.render('post/postadd',{users:rtn});
  });
});

router.post('/postadd',function (req,res,next) {
  var poster =new Post();
  poster.title=req.body.title;
  poster.contant=req.body.contant;
  poster.author=req.body.author;
  poster.save(function (err,rtn) {
  if (err) throw err;
  console.log(rtn);
  res.redirect('/post/postlist');




});
});

// router.get('/postlist',function (req,res,next) {
//   res.render('post/postlist');
// });

router.get('/postlist',function (req,res,next) {
  Post.find({}).populate('author').exec(function (err,rtn) {
  if(err) throw err;
  console.log(rtn);
  res.render('post/postlist',{post:rtn});
});
});

router.get('/postdetail/:id',function (req,res,next) {
  console.log(req.params.id);
  Post.findById(req.params.id).populate('author').exec(function (err,rtn) {
    if(err) throw err;
    console.log(rtn);

    res.render('post/postdetail',{post:rtn});
});
});

router.get('/postupdate/:uid',function (req,res,next) {
  Post.findById(req.params.uid,function (err,rtn) {
      if(err) throw err;
    User.find(function (err2,rtn2) {
      if(err2) throw err2  ;
      console.log(rtn);
      res.render('post/postupdate',{post:rtn,users:rtn2});
    })

  });
});

router.post('/postupdate',function (req,res,next) {
  var update={
    title:req.body.title,
    contant:req.body.contant,
    author:req.body.author
  };
  Post.findByIdAndUpdate(req.body.id,{$set:update},function (err,rtn) {
    if(err) throw err;
    console.log(rtn);
    res.redirect('/post/postlist');
  });
});

router.get('/postdelete/:id',function (req,res,next) {
  Post.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err) throw err;
    res.redirect('/post/postlist');
  });
});




module.exports = router;
