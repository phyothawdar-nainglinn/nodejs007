var express = require('express');
var router = express.Router();
var User =require('../../model/User');
var bcrypt =require('bcryptjs');
var Post =require('../../model/Post');
var checkAuth = require('../middleware/check-auth.js')

router.get('/list',checkAuth,function (req,res) {
  Post.find(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error ",
        error:err
      })
    }else {
      res.status(200).json({
        post:rtn
      });
    }
  })
})

router.post('/postadd',checkAuth,function (req,res) {
  var post =new Post();
  post.title=req.body.title;
  post.contant=req.body.contant;
  post.author=req.body.author;
  post.save(function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error ",
        error:err
      })
    }else {
      res.status(201).json({
        message:"Post Created!!",
        post:rtn
      });
    }
  })
  })

  router.get('/:id',checkAuth,function (req,res) {
  Post.findById(req.params.id,function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error ",
        error:err
    })
  }else{
      res.status(201).json({
        post:rtn
      })
    }
  })
})

router.patch('/:id',checkAuth,function (req,res) {
  var update ={};
  for (var opt of req.body) {
    update[opt.proName]=opt.proValue
      }
  Post.findByIdAndUpdate(req.params.id,{$set:update},function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error ",
        error:err
    })
  }else{
      res.status(200).json({
        message:"Post Account Updated"
      })
    }
  })
})


router.delete('/:id',checkAuth,function (req,res) {
  Post.findByIdAndRemove(req.params.id,function (err,rtn) {
    if(err){
      res.status(500).json({
        message:"Internal Server Error ",
        error:err
    })
  }else{
      res.status(200).json({
        message:"Post Account Deleted"
      })
    }
  })
})

module.exports = router;
