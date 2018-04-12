var express = require('express');
const url = require('url');
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/my_mongo");

//Defining schemas
var UserSchema = new mongoose.Schema({
    firstName: {
    	type: String,
        min: [6, 'Too few eggs'],
        max: 12,
        required: [true, 'Please enter first name']
    },
 	lastName: {
 		type: String,
 		enum: ['Coffee', 'Tea', 'Water',],
        required: true
    }
});
// Compile model from schema
var User = mongoose.model("User", UserSchema);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Droom' });
  // res.json({ user: 'tobi' });
});
router.post('/addname', function (req, res) {
	var personInfo = req.body;
	var UserSchema = new User({
	    firstName: personInfo.firstName,
	    lastName: personInfo.lastName
	});
	var error = UserSchema.validateSync();
	if(typeof error !== 'undefined'){
		res.render('show_message', {error: error.errors, type: "error"});
	}
	UserSchema.save(function(err, User){
	    if(err)
	        res.render('show_message', {message: "Database error", type: "error"});
	    else
	        res.render('show_message', {message: "New person added", type: "success", person: personInfo});
        /*res.redirect('/');
        res.redirect(url.format({
        	pathname:"/local_library",
        	query:req.query,
        }));*/
      });

	/*to define model and save at the same time use
	User.create({
		firstName: personInfo.firstname,
		lastName: personInfo.lastname
	}, function (err, awesome_instance) {
		if (err)
			res.render('show_message', {message: "Database error", type: "error"});
		else
	        res.render('show_message', {message: "New person added", type: "success", person: personInfo});
	});*/
})

module.exports = router;
