const mongoose = require('mongoose');

const entrySchema = new mongoose.Schema
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
			lightGreen:
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
