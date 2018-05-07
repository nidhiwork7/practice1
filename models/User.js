var mongoose = require('mongoose');
mongoose.Promise = global.Promise;
mongoose.connect("mongodb://127.0.0.1/my_mongo");

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
module.exports = mongoose.model('User', UserSchema );