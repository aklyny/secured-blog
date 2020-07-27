var express =  require("express");

var router = express.Router();

var campground = require("../models/campground");


router.get("/",function(req,res){
	campground.find({},function(err,AllCampGround){
		if(err)
		{
			console.log("DB DISCONNECTED");
		}else{
	             res.render("index",{campVal : AllCampGround });		
		}

	});
   
    
});
router.post("/",isLoggedIn ,function(req,res){
	var name = req.body.name;
	var img = req.body.img;
	var description = req.body.description;
	var author = {
		id: req.user._id,
		username: req.user.username
	}
	var fullData = {name: name , img : img , description :description, author : author};
	campground.create(fullData ,function(err,newDat){
		if(err){
			console.log("NEW DATA ADDED");
		}else{
			 res.redirect("/campGround",{message:req.flash("error")});
		}
	});
	
});


router.get("/newCamp", isLoggedIn,function(req,res){
      res.render("campground/addNew");
});

router.get("/:id",isLoggedIn, function(req,res){ 
	campground.findById(req.params.id).populate("comments").exec(function(err,found){
		if (err) {
			console.log("ERROR");
		}else{
			
			res.render("campground/show", {campground : found });
		}
	});
        
});

router.get("/:id/edit", checkCampground, function(req,res){
          campground.findById(req.params.id, function(err,found){

             res.render("campground/edit", {campground : found});
     })
});
router.put("/:id",checkCampground, function(req,res){
    campground.findByIdAndUpdate(req.params.id,req.body.campground,function(err,found){
    	if (err) {
    		res.redirect("/campGround");
    	}else{
              res.redirect("/campGround/"+req.params.id);
    	}
    })
});

router.delete("/:id", checkCampground,function(req,res){
     campground.findByIdAndDelete(req.params.id,function(err,found){
     	if (err) {
     		res.redirect("/campGround");
     	}else{
          res.redirect("/campGround");
     	}
     });
});

function isLoggedIn(req,res,next){
      if (req.isAuthenticated()) {
      	return next();
      }

      req.flash("error","Please login first");
      res.redirect("/");
}
 //isloggedin middleware
 function checkCampground(req,res,next){
 	if (req.isAuthenticated()){
         campground.findById(req.params.id, function(err,found){
     	if(err){
     		res.redirect("back"); 
     	}
     	else
     	    {
     		if(found.author.id.equals(req.user._id)) {
                next();
     		}
     		else
     		{
     			res.redirect("back");
     		}
    }
         });
	}
	else
	{
           res.redirect("back");
	}
 }

module.exports = router;