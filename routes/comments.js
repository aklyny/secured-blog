var express =  require("express");

var router = express.Router({mergeParams:true});

var campground = require("../models/campground");

var comments = require("../models/comment"); 


router.get("/new", isLoggedIn,function(req,res){
	campground.findById(req.params.id,function(err,campground){
		if (err) {
			console.log(err);
		}else{
			res.render("comments/new", {campground : campground});
		}
	})
       
});
router.post("/",isLoggedIn, function(req,res){
     campground.findById(req.params.id, function(err,campground){
          if (err) {
          	console.log(err);
          	res.redirect("/campGround");
          } else{
          	comments.create(req.body.comments, function(err,comment){
              if (err) {
              	console.log(err);
              }
              else{
                comment.author.id = req.user._id;
                comment.author.username=req.user.username;
                comment.save();
              	campground.comments.push(comment);
              	campground.save();
              	res.redirect("/campGround/" +campground._id);
              }
          	});
          }
     });
});
//Addind Edit comment 
router.get("/:comment_id/edit", checkComment,function(req,res){
  comment.findById(req.params.comment_id,function(err,comment){
             if (err) {
              console.log(err);
             }else
             {
                 res.render("./comments/edit", {campground_id : req.params.id, comments : comment});         
             }
  });
     
});
//comment update
router.put("/:comment_id",checkComment ,function(req,res){
         comment.findByIdAndUpdate(req.params.comment_id,req.body.comments, function(err,comment){
            if (err) {
              res.redirect("back");
            }else
            {
              res.redirect("/campGround/" +req.params.id);
            }
         });
});

router.delete("/:comment_id", checkComment,function(req,res){
         comment.findByIdAndRemove(req.params.comment_id, function(err){
             if (err) {
              res.redirect("back");
             } else{
              res.redirect("/campGround/"+req.params.id);
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

function checkComment(req,res,next){
    if (req.isAuthenticated()){
         comment.findById(req.params.comment_id, function(err,comment){
      if(err){
        res.redirect("back"); 
      }
      else
          {
        if(comment.author.id.equals(req.user._id)) {
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