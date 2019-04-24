const mongoose = require('mongoose');

const userSchema = new mongoose.Schema
(
	{
		username: {type: String, required: true, unique: true},
		email: {type: String, required: true},
		password: {type: String, required: true},
		displayname: {type: String, required: true},
		entries: [{type: mongoose.Schema.Types.ObjectId, ref: 'Entry'}]
	}
);



const User = mongoose.model('User', userSchema);

module.exports = User;