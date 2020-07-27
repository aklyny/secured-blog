var mongoose = require("mongoose");
var mongooseLocal = require("passport-local-mongoose");

var userSchema = new mongoose.Schema({
	username:String,
	password:String
});

userSchema.plugin(mongooseLocal);

module.exports = mongoose.model("user", userSchema);