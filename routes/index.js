var express = require('express');
const url = require('url');
var mongoose = require('mongoose');
var router = express.Router();
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/my_mongo");

//Defining schemas
var UserSchema = new mongoose.Schema({
    firstName: String,
    userData : [{ type: mongoose.Schema.Types.ObjectId, ref: 'Customer' }]
});
var CustomerSchema = new mongoose.Schema({
    name: String,
    address: String
});
// Compile model from schema
var User = mongoose.model("User", UserSchema);
var Customer = mongoose.model("Customer", CustomerSchema);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Droom' });
  // res.json({ user: 'tobi' });
});
router.get('/showData', function (req, res) {
	var CustomerSchema = new Customer({
		name: 'CustomerUser9',
		address: 'CustomerUser Address8'
	});
	CustomerSchema.save(function(err, Customer){
	    if(err)
	        res.render('show_message', {message: "Database error", type: "error"});
	    else{
	    	var UserSchema = new User({
	    		firstName: "CustomerUser9",
	    		userData: CustomerSchema._id
	    	});
	    	UserSchema.save(function(err, data){
	    		if(err)
			        res.render('show_message', {message: "Database error", type: "error"});
			    else{
			    	User.find({ firstName: "CustomerUser9" })
					.populate('userData')
					.exec(function (err, data) {
						console.log(data[0].userData);
						if(err)
			        		res.render('show_message', {message: "Database error", type: "error"});
					  console.log('The address is %s', data[0].userData[0].address);
					});
			    	res.render('show_message', {message: "New person added", type: "success"});			    	
			    }
	    	});
	    }
	});
});

module.exports = router;
