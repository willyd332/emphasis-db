const mongoose = require('mongoose');
const Schema   = mongoose.Schema

const userSchema = new Schema
(
	{
	  username: {
	    type: String,
	    required: true,
	    unique: true
	  },
	  usertype:	{
	  	type: String,
	  	required: true
	  },
	  email: {
	    type: String,
	    required: true
	  },
	  password: {
	    type: String,
	    required: true
	  },
		userType: String,
	  displayname: {
	    type: String,
	    required: true
	  },
	  entries: [{
	    type: Schema.Types.ObjectId,
	    ref: 'Entry'
	  }]
	});



const User = mongoose.model('User', userSchema);

module.exports = User;
