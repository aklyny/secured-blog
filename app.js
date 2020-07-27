var express = require("express");
var methodOverride = require("method-override"); 
var ejs = require("ejs");
var bodyParser= require("body-parser");
var flash= require("connect-flash");
var mongoose = require("mongoose");
var passport = require("passport");
var passportLocal = require("passport-local");
var mongooseLocal = require("passport-local-mongoose");
var app = express();
app.use(express.static("public"));
app.use(bodyParser.urlencoded({extended : true}));
app.set("view engine","ejs");
app.use(methodOverride("_method"));
app.use(flash());
var campground = require("./models/campground");
var user = require("./models/user");
var seedDB = require("./seed");
var comments = require("./models/comment")
app.use(require("express-session")({
	secret:"HELLO",
	resave:false,
	saveUninitialized:false
}));
app.use(passport.initialize());
app.use(passport.session());
passport.use(new passportLocal(user.authenticate()));
passport.serializeUser(user.serializeUser());
passport.deserializeUser(user.deserializeUser());
;
// C:\Program Files\MongoDB\Server\4.2\bin

// seedDB();

var commentRoutes = require("./routes/comments"),
    campgroundRoutes    = require("./routes/campground"),
    indexRoutes   = require("./routes/index");

mongoose.connect("mongodb://localhost:27017/yelp_v11" ,{useUnifiedTopology: true,useNewUrlParser: true});

app.get("/", function(req,res){
	res.render("campground/camp", {currentUser:req.user});
});

app.use(function(req,res,next){
    res.locals.currentUser = req.user;
     next();
})
app.use("/campGround/:id/comments",commentRoutes);
app.use("/campGround",campgroundRoutes);
app.use(indexRoutes);


app.listen(3000, function(){
	console.log("YELP CAMP SERVER")
});