var express = require('express');
var router = express.Router();
var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/my_mongo");
var UserSchema = new mongoose.Schema({
    firstName: String,
 	lastName: String
});
var User = mongoose.model("User", UserSchema);

router.get('/', function(req, res, next) {
  res.render('index', { title: 'Droom' });
  // res.json({ user: 'tobi' });
});
router.post('/addname', function (req, res) {
	var personInfo = req.body;
	var UserSchema = new User({
	    firstName: personInfo.firstname,
	 	lastName: personInfo.firstname
	});
		
      UserSchema.save(function(err, User){
         if(err)
            res.render('show_message', {message: "Database error", type: "error"});
         else
            res.render('show_message', {
               message: "New person added", type: "success", person: personInfo});
      });
})

module.exports = router;
