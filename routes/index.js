var express =  require("express");

var router = express.Router();

var passport= require("passport");

var user = require("../models/user");

//creating routes for Register

router.get("/register", function(req,res){
     res.render("register");
});

router.post("/register",function(req,res){
	var newUser = new user({username : req.body.username});
     user.register(newUser,req.body.password, function(err,user){
     	if (err) {
     		console.log(err);
     		return res.redirect("/register");
     	}
     	passport.authenticate("local")(req,res,function(){
           res.redirect("/")
     	});
     });
});
//creating login routes and logic
router.get("/login", function(req,res){
       res.render("login",{message:req.flash("error")});
});

router.post("/login",passport.authenticate("local",{
	successRedirect :"/",
	failureRedirect :"/login"
}),function(req,res){

});

router.get("/logout",function(req,res){
     req.logout();
     res.redirect("/login");
});

function isLoggedIn(req,res,next){
      if (req.isAuthenticated()) {
        return next();
      }
      req.flash("error","Please login first");
      res.redirect("/login");
}

module.exports = router;