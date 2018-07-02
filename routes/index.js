var express  = require('express');
var router   = express.Router();
var passport = require('passport');
var Cake     = require('../models/cake');
var User     = require('../models/user');
var middleware = require('../middleware');



//HOME ROUTE
router.get('/', function(req, res) {
    Cake.find({}, function(err, cakes){
       if(err) {
           console.log("Error in Home Route finding cakes");
       } 
       else {
           res.render('index', {cakes:cakes});
       }
    });
    
});

//BIRTHDAY CAKE ROUTE
router.get('/birthday-cakes', function(req, res) {
    Cake.find({category:'birthday-cakes'}, function(err, cakes) {
        if(err) {
            console.log(err);
        }
        else {
            
            res.render('birthday-cakes',{cakes:cakes});
        }
    })});


//FANCY CAKE ROUTE
router.get('/fancy-cakes', function(req, res) {
    Cake.find({category:'fancy-cakes'}, function(err, cakes) {
        if(err) {
            console.log(err);
        }
        else {
            res.render('fancy-cakes',{cakes:cakes});
        }
    });
});


//CUPCAKE ROUTE
router.get('/cupcakes', function(req, res) {
    Cake.find({category:'cupcakes'}, function(err, cakes) {
        if(err) {
            console.log(err);
        }
        else {
            res.render('cupcakes',{cakes:cakes});
        }
    })});



//AUTHENTICATION ROUTES

//REGISTER FORM ROUTE
router.get('/register', function(req,res) {
   res.render('register'); 
});


//REGISTRATION ROUTE
router.post('/register', function(req,res) {
    var newUser  = new User({username: req.body.username});
    var password = req.body.password;
    User.register(newUser, password, function(err, user){
        if(err){
            console.log(err);
            return res.redirect('/register');
        }
        passport.authenticate('local')(req, res, function(){
           res.redirect('/'); 
        });
    });
});



//LOGIN FORM
router.get('/login', function(req, res) {
   res.render('login'); 
});


//LOGIN ROUTE
router.post('/login', 
            passport.authenticate('local',
                                        {
                                            successRedirect: '/',
                                            failureRedirect: '/login'
                                        }),
                                        function(req, res) {}
);


//LOGOUT ROUTE
router.get('/logout', function(req, res) {
    req.logout();
    res.redirect('/');
});


//TEST ROUTE
router.get('/test', function(req, res) {
   middleware.isCakeAuthor(); 
});


module.exports = router;

