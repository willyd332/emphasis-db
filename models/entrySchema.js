const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema
(
	{
		author: String,
		title: String,
		link: String,
		origPubYear: Number,
		contentType: String,
		publisher: String,
		text: {body: String, analysis: null}, //later on, analysis will be set to an object from the API
		data:
		{
			engagementScore: Number,
			yellow:
			{
				num: Number,
				percent: Number
			}
			green:
			{
				num: Number,
				percent: Number
			}
			fadedGreen:
			{
				num: Number,
				percent: Number
			}
			blue:
			{
				num: Number,
				percent: Number
			}
			fadedBlue:
			{
				num: Number,
				percent: Number
			}
		}
	}
);



const Entry = mongoose.model('Entry', entrySchema);

module.exports = Entry;