var express     = require('express');
var router      = express.Router();
var Cake        = require('../models/cake');
var middleware  = require('../middleware');

//NEW CAKE ROUTE
router.get('/cakes/new', middleware.isLoggedIn, function(req, res) {
   res.render('cakes/new'); 
});



//CREATE ROUTE
router.post('/cakes', middleware.isLoggedIn, function(req,res) {
    var name        = req.body.cake.name;
    var image       = req.body.cake.image;
    var category    = req.body.cake.category;
    var description = req.body.cake.description;
    var recipe      = req.body.cake.recipe;
    var user = {
        id:       req.user.id, 
        username: req.user.username
        };
    var newCake = {name: name, image: image, category: category, description: description, recipe: recipe, user: user};
    Cake.create(newCake, function(err,cake){
      if(err) {
          console.log("Error creating new cake in CREATE ROUTE" + err);
          res.redirect('/');
      } 
      else {
          console.log("Cake created succesfuly: " + cake);
          res.redirect('/' + req.body.cake.category);
      }
    });
});


//SHOW ROUTE
router.get('/cakes/:id', function(req, res) {
    Cake.findById(req.params.id).populate('comments').exec(function(err, populatedCake) {
        if(err) {
            console.log(err);
        }
        else {
            // console.log(populatedCake);
            res.render('cakes/show', {cake:populatedCake});
        }
    });
});



//EDIT ROUTE
router.get('/cakes/:id/edit', middleware.isCakeAuthor, function(req,res){
    Cake.findById(req.params.id, function(err,cake){
        if(err){
            console.log("Error finding Cake in EDIT ROUTE");
            res.redirect('/');
        }
        else {
            res.render('cakes/edit', {cake:cake}); 
        }
    });
   
});



//UPDATE ROUTE
router.put('/cakes/:id', middleware.isCakeAuthor, function(req,res){
   Cake.findByIdAndUpdate(req.params.id, req.body.cake, function(err, cake){
      if(err){
          console.log("Error updating cake in UPDATE ROUTE");
          res.redirect("/");
      } 
      else{
          res.redirect('/cakes/' + req.params.id);
      }
   }); 
});



//DELETE ROUTE
router.delete('/cakes/:id', middleware.isCakeAuthor, function(req,res) {
   Cake.findByIdAndRemove(req.params.id, function(err, cake) {
       if(err){
           console.log("Error deleting item in DELETE ROUTE");
           res.redirect('/');
       }
       else{
           res.redirect('/');
       }
   }) ;
});





module.exports = router;
