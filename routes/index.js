var express = require('express');
const url = require('url');
var router = express.Router();

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
router.get('/showData', function (req, res) {
	var query = User.find({'lastName':'Coffee'}, 'firstName lastName').sort({ firstName: 1 });
	query.exec( function(err, User){
	    if(err)
	        res.render('show_message', {message: "Database error", type: "error"});
	    else
	        res.render('show_message', {message: "New person added", type: "success", person: User});
      });
})

module.exports = router;
