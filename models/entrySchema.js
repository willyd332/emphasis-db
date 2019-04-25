const mongoose = require('mongoose');
const Schema   = mongoose.Schema

const entrySchema = new Schema
(
	{
		userId: String,
		author: String,
		title: String,
		link: String,
		string: String,
		publicationYear: Number,
		contentType: String,
		publisher: String,
		text: [{
		  text: String,
		  analysis: Schema.Types.Mixed,
		  data: Schema.Types.Mixed
		}],
		data: Schema.Types.Mixed,
		engagementScore: Number,
	}
);



const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;
