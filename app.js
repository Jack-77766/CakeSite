var express         = require('express'),
    app             = express(),
    mongoose        = require('mongoose'),
    bodyParser      = require('body-parser'),
    methodOverride  = require('method-override'),
    passport        = require('passport'),
    LocalStrategy   = require('passport-local'),
    flash           = require('connect-flash');

//import models
var Cake    = require('./models/cake'),
    Comment = require('./models/comment'),
    User    = require('./models/user');
    
//import routes
var cakeRoutes    = require('./routes/cakes'),
    commentRoutes = require('./routes/comments'),
    indexRoutes   = require('./routes/index'); 



//APP CONFIG
var DATABASEURL  = process.env.DATABASEURL;
mongoose.connect(DATABASEURL);

app.set('view engine', 'ejs');
app.use(express.static(__dirname + '/public'));
app.use(bodyParser.urlencoded({extended:true}));
app.use(methodOverride('_method'));
app.use(flash());

//AUTHENTICATION CONFIG
app.use(require('express-session')({
    secret: 'himalayas himalayas',
    resave: false,
    saveUninitialized: false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new LocalStrategy(User.authenticate()));
passport.serializeUser(User.serializeUser());
passport.deserializeUser(User.deserializeUser());


//Declare app-wide variables
app.use(function(req, res, next){
   res.locals.currentUser = req.user;
   res.locals.error       = req.flash('error');
   res.locals.success     = req.flash('success');
   next();
});

//tell app where to get routes from
app.use(cakeRoutes);
app.use(commentRoutes);
app.use(indexRoutes);





app.listen(process.env.PORT, process.env.IP, function(){
   console.log("Cake App started!!!") ;
});




