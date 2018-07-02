var express = require('express');
var router  = express.Router();
var Cake    = require('../models/cake');
var Comment = require('../models/comment');
var middleware = require('../middleware');



//NEW COMMENT ROUTE
router.get('/cakes/:id/comments/new', middleware.isLoggedIn, function(req,res){
    Cake.findById(req.params.id, function(err, foundCake){
        if(err)
            console.log(err);
        else {
            res.render('comments/new', {cake:foundCake});
        }
    });
});


//CREATE COMMENT ROUTE
router.post('/cakes/:id/comments', middleware.isLoggedIn, function(req,res) {
    Cake.findById(req.params.id, function(err, cake) {
        if(err) 
            console.log(err);
        else {
            Comment.create(req.body.comment, function(err, newComment){
                if(err)
                    console.log(err);
                else {
                    var author = {
                        id:       req.user.id,
                        username: req.user.username
                    };
                    newComment.author = author;
                    newComment.save();
                    cake.comments.push(newComment);
                    cake.save();
                    res.redirect('/cakes/' + req.params.id);
                }
            });
        }
    });
});



//EDIT COMMENT
router.get('/cakes/:id/comments/:comment_id/edit', middleware.isCommentAuthor, function(req,res) {
    Cake.findById(req.params.id, function(err, foundCake){
        if(err){
            console.log(err); 
            res.redirect('back');
        }
        else {
            Comment.findById(req.params.comment_id, function(err, foundComment){
                if (err) {
                    console.log(err);
                    res.redirect('back');
                }
                else {
                    res.render('comments/edit', {cake: foundCake, comment: foundComment});             
                }
            });
        }
    });
});


//UPDATE ROUTE
router.put('/cakes/:id/comments/:comment_id', middleware.isCommentAuthor, function(req,res) {
    console.log('req.body.comment: ' + req.body.comment );
    Comment.findByIdAndUpdate(req.params.comment_id, req.body.comment, function(err){
        if(err) {
            console.log(err);
        }
        else {
            res.redirect('/cakes/' + req.params.id);
        }
    });
});


//DELETE COMMENT
router.delete('/cakes/:id/comments/:comment_id', middleware.isCommentAuthor, function(req, res){
   Comment.findByIdAndRemove(req.params.comment_id, function(err){
       if(err) console.log(err);
       else res.redirect('/cakes/' + req.params.id);
   });
});




module.exports = router;
