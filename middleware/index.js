var Cake    = require('../models/cake'),
    Comment = require('../models/comment');
    

var middlewareObject = {}


//CHECK IF THE CURRENT USER IS THE AUTHOR OF THE CAKE
middlewareObject.isCakeAuthor = function(req, res, next) {
    if(req.isAuthenticated()) {
        Cake.findById(req.params.id, function(err, foundCake) {
           if(err) 
                res.redirect('back');
           else {
            //   console.log('foundCake: ' + foundCake);
            //   console.log('foundCake.user: ' + foundCake.user); 
            //   console.log('req.user.id: ' + req.user.id);
                if(foundCake.user.id.equals(req.user.id)){
                    return next();       
                }
                else {
                    req.flash('error', "Only the author of the cake can do that.");
                    res.redirect('back');
                }
           }
        });
    }
    else {
        res.redirect('back');
    }
};




//CHECK IF THE CURRENT USER IS THE AUTHOR OF THE COMMENT
middlewareObject.isCommentAuthor = function(req, res, next) {
    if(req.isAuthenticated()) {
        Comment.findById(req.params.comment_id, function(err, foundComment){
           if(err){
               console.log(err);
           }
           else{
               if(foundComment.author.id.equals(req.user.id)){
                   return next();
               }
               else {
                   req.flash('error', "Only the Comments Author can do this");
                   res.redirect('back');
               }
           }
        });
    }
    else {
        req.flash('error', "You need to be logged in as the author of this comment to do that");
        res.redirect('back');
    }
};





//CHECK IF USER IS LOGGED IN
middlewareObject.isLoggedIn = function(req, res, next) {
   if(req.isAuthenticated()){
        return next();
   } 
   console.log('isLoggedIn is false');
   req.flash('error', "Please Login to do that");
   res.redirect('/login');
};


module.exports = middlewareObject;