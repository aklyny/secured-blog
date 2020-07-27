var mongoose = require("mongoose"),
    campground = require("./models/campground");
    comment = require("./models/comment");

    insertData= [{
    	name: "MARINA",
    	img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    	description:"CAMPING LIFE AWESOME"
    },
    {
    	name: "MUNNAR",
    	img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    	description:"CAMPING LIFE AWESOME"
    },
    {
    	name: "MADURAI",
    	img: "https://images.unsplash.com/photo-1475483768296-6163e08872a1?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=400&q=60",
    	description:"CAMPING LIFE AWESOME"
    }
    ];

function seedDB(){
     campground.remove({},function(err){
         // if (err) {
         // 	console.log(err)
         // }else
         // console.log("DB IS DELETED")
         // insertData.forEach(function(data){
         //       campground.create(data,function(err,val){
         //       	if (err) {
         //       		console.log(err);
         //       	}else{
         //       		console.log("campground is added");

         //       		//creating comments
         //       		comment.create({
         //       			text:"THAT WAS NICE A PLACE",
         //       			author:"AK LYNY"
         //       		},function(err,msg){
         //       			if (err) {
         //       				console.log(err);
         //       			}else{
         //       				val.comments.push(msg);
         //       			    val.save();
         //       			    console.log("PUSHIMG")
         //       			}
               			
         //       		});
         //       	}
         //       });
         // });

    });	
}

module.exports = seedDB ;