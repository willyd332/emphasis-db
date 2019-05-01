const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/userSchema');
const Entry = require('../models/entrySchema');
const stringParser = require('../js/stringParser');
const extractData = require('../js/extractData');
const compileData = require('../js/compileData');
const sentenceArrayMaker = require('../js/sentences');
const engagementScoreCalc = require('../js/engagementScoreCalc');
const stringSanitizer = require('../js/stringSanitizer');
const axios = require('axios');
const url = 'https://emphasis.ai/api/analysis_1/';
axios.defaults.headers.post['Content-Type'] = 'application/json';
const apiCall = async (array) => {
	for (let i = 0; i < array.length; i++) {
		await axios
			.post(url, {
				input: array[i].text
			})
			.then((analysis) => {
				array[i].analysis = analysis.data;
			})
	}
	return array
}
const splitEntries = (num,array) => {
	const number = (num * 16);
	const newArray = [];
	for (let i = (number - 16); i < number; i++){
		if (array[i]){
		newArray.push(array[i])
	}
	}
	return newArray
}



function comparePercentages(p1, p2)
{
	//p1 and p2 are objects containing the following:
	//	{
	//		y: %yellow,
	//		g: %green,
	//		b: %blue,
	//		lg: %lightgreen,
	//		fb: %fadedblue,
	//	}

	//First, compare the percentages of the various colors and
	//determine the average deviation thereof:

	let totalDev = Math.abs(p1.y-p2.y) + Math.abs(p1.g-p2.g) + Math.abs(p1.b-p2.b) + Math.abs(p1.lg-p2.lg) + Math.abs(p1.fb-p2.fb);
	let avgDev = totalDev / 5;

	//Note that the maximum possible deviation is 100
	//To give a comparision score from 1 to 100, we have only to subtract the average deviation from 100:
	//console.log("comparePercentages is returning " + (100-avgDev));
	return (100 - avgDev);
}

function bubbleSortSimilarity(arr)
{
	//Bubble sort for the similarity function
	//Recurses until it's done

	let changed = false;
	let temp = arr[0];

	for (let i = 0; i < arr.length - 1; i++)
	{
		if (arr[i].similarity < arr[i + 1].similarity)
		{
			temp = arr[i];
			arr[i] = arr[i + 1];
			arr[i + 1] = temp;
			changed = true;
			//console.log("Bubble sort made a switch");
		}
	}
	if (changed) {return bubbleSortSimilarity(arr);}
	else {return arr;}
}

function sortBySimilarity(entriesArray, compareYellow, compareGreen, compareBlue, compareLightGreen, compareFadedBlue)
{
	//Sorts all the entries in entriesArray based on their similarity
	//to the given percentages of colors

	//First, get all the similarities:
	for (let i = 0; i < entriesArray.length; i++)
	{
		entriesArray[i].similarity = comparePercentages(
			{
				y: compareYellow,
				g: compareGreen,
				b: compareBlue,
				lg: compareLightGreen,
				fb: compareFadedBlue
			},
			{
				y: entriesArray[i].data.yellow.percentage,
				g: entriesArray[i].data.green.percentage,
				b: entriesArray[i].data.blue.percentage,
				lg: entriesArray[i].data.lightGreen.percentage,
				fb: entriesArray[i].data.fadedBlue.percentage
			}
		);
		//console.log(`data.yellow.percentage: ${entriesArray[i].data.yellow.percentage}`);
		//console.log(`compareYellow: ${compareYellow}`);
		//console.log(`Similarity: ${entriesArray[i].similarity}`);
	}

	//Now sort everything:
	return bubbleSortSimilarity(entriesArray);
}





router.get('/insights', async function(req, res)
{
	let categories =
	[//====================
		'all',
		'news',
		'opinion',
		'fiction',
		'marketing',
		'business',
		'legal',
		'technical',
		'academic',
		'oratory',
		'other'
	];//===================

	let insights =
	await {
		all:
			{
				quantity: 0,
				avgEng: 0
			},
		news:
			{
				quantity: 0,
				avgEng: 0
			},
		opinion:
			{
				quantity: 0,
				avgEng: 0
			},
		fiction:
			{
				quantity: 0,
				avgEng: 0
			},
		marketing:
			{
				quantity: 0,
				avgEng: 0
			},
		business:
			{
				quantity: 0,
				avgEng: 0
			},
		legal:
			{
				quantity: 0,
				avgEng: 0
			},
		technical:
			{
				quantity: 0,
				avgEng: 0
			},
		academic:
			{
				quantity: 0,
				avgEng: 0
			},
		oratory:
			{
				quantity: 0,
				avgEng: 0
			},
		other:
			{
				quantity: 0,
				avgEng: 0
			}
	};
	await Entry.find({}, function(err, foundEntries)
	{
		//dump in raw data:
		for (let i = 0; i < foundEntries.length; i++)
		{
			if (foundEntries[i].contentType == 'non-fiction') {foundEntries[i].contentType = 'other';}
			//console.log(`contentType: ${foundEntries[i].contentType}`);
			insights[foundEntries[i].contentType].quantity++;
			insights[foundEntries[i].contentType].avgEng = insights[foundEntries[i].contentType].avgEng + foundEntries[i].engagementScore;
		}
		//Transform the data:
		for (let i = 0; i < categories.length; i++)
		{
			insights[categories[i]].avgEng = insights[categories[i]].avgEng / insights[categories[i]].quantity;
		}
		console.log(insights);
		res.render('entry/insights.ejs', {insights: insights});
	});
});


router.get('/:id/compare', function(req, res)
{
	//id is the id of the entry we are comparing
	//We'll display a list of the entries that are
	//closest to it in terms of reader engagement
	//(not just the engagement score, but the average
	//deviation for each color as well)

	Entry.findById(req.params.id, function(err, foundEntry)
	{
		if (err) {console.log(err);}
		else
		{
			let y = foundEntry.data.yellow.percentage;
			let g = foundEntry.data.green.percentage;
			let b = foundEntry.data.blue.percentage;
			let lg = foundEntry.data.lightGreen.percentage;
			let fb = foundEntry.data.fadedBlue.percentage;

			res.redirect(`/entries/?comparing=true&compareYellow=${y}&compareGreen=${g}&compareBlue=${b}&compareLightGreen=${lg}&compareFadedBlue=${fb}`);
		}
	});

});



router.get('/new', function(req, res) {
	res.render('entry/new.ejs')
});

router.get('/', function(req, res) {
	//Index route for ALL entries
	
	let comparing = false;
	let compareYellow;
	let compareGreen;
	let compareBlue;
	let compareLightGreen;
	let compareFadedBlue;
	if (req.query.comparing)
	{
		comparing = true;
		compareYellow = req.query.compareYellow;
		compareGreen = req.query.compareGreen;
		compareBlue = req.query.compareBlue;
		compareLightGreen = req.query.compareLightGreen;
		compareFadedBlue = req.query.compareFadedBlue;
	}

	if (req.query.contentType){
		let contentType;
		let authorName;
		let publicationYear;
		let pbYear;
		let publisherName;
		let engagement;
		let engagementScore;
		let engagementNumber;
		let content;
		let author;
		let publisher;
		if (req.query.contentType === 'ALL'){
			contentType = {$exists: true};
			content     = "ALL"
		} else {
			contentType = req.query.contentType;
			content     = req.query.contentType;
		}
		if (req.query.authorName === 'ALL' || req.query.authorName === ''){
			authorName = {$exists: true};
			author     = "ALL"
		} else {
			authorName = req.query.authorName;
			author     = req.query.authorName;
		}
		if (req.query.publisher === 'ALL' || req.query.publisher === ''){
			publisherName = {$exists: true};
			publisher     = "ALL"
		} else {
			publisherName = req.query.publisher;
			publisher  = req.query.publisher;
		}
		if (!req.query.publicationYear){
			publicationYear = {$exists: true};
			pbYear = null;
		} else {
			publicationYear = req.query.publicationYear;
			pbYear = req.query.publicationYear;
		}
		if  (req.query.engagementScore === 'ALL' || !req.query.engagementScore){
			engagementScore = [{'engagementScore':{$exists: true}}];
			engagement = 'ALL';
		} else {
			console.log(req.query.engagementScore + "THIS IS THE SCORE");
			engagementNumber = parseInt(req.query.engagementScore)
			engagementScore = [{'engagementScore':{$gte: engagementNumber}},{'engagementScore':{$lte: engagementNumber + 10}}]
			engagement = req.query.engagementScore;
		}
		console.log(engagementScore);
		Entry.find({
			'contentType': contentType,
			'author': authorName,
			'publisher': publisherName,
			'publicationYear': publicationYear,
			$and: engagementScore
		}, function(err, foundEntries) {
			if (err) {
				console.log(err);
			} else {
				let pageNumber;
				if (req.query.number){
					pageNumber = req.query.number;
				} else {
					pageNumber = 1;
				}
				pageNumber = parseInt(pageNumber)
				let entriesArray = splitEntries(pageNumber, foundEntries);

				//If comparing, change entriesArray to be sorted by
				//similarity to the entry we're comparing to:

				if (comparing)
				{
					entriesArray = sortBySimilarity(entriesArray, compareYellow, compareGreen, compareBlue, compareLightGreen, compareLightBlue, compareFadedBlue);
				}

				res.render('entry/index.ejs', {
					pageNum: pageNumber,
					entries: entriesArray,
					totalEnt: foundEntries,
					content: content,
					author: author,
					publisher: publisher,
					pbYear: pbYear,
					engagement: engagement,
					comparing: comparing
				});
			}
		});
	} else {
	Entry.find({}, function(err, foundEntries) {
		if (err) {
			console.log(err);
		} else {
			let pageNumber;
			if (req.query.number){
				pageNumber = req.query.number;
			} else {
				pageNumber = 1;
			}
			let entriesArray = splitEntries(pageNumber, foundEntries);
			
			//If comparing, change entriesArray to be sorted by
			//similarity to the entry we're comparing to:

			if (comparing)
			{
				entriesArray = sortBySimilarity(entriesArray, compareYellow, compareGreen, compareBlue, compareLightGreen, compareFadedBlue);
			}
			
			res.render('entry/index.ejs', {
				entries: entriesArray,
				pageNum: pageNumber,
				totalEnt: foundEntries,
				content: 'ALL',
				author: 'ALL',
				publisher: 'ALL',
				pbYear: null,
				engagement: 'ALL',
				comparing: comparing
			});
		}
	});
}
});

router.post('/', async function(req, res) {

	try {
		const newEntry = await Entry.create({
			userId: req.session.curuserid,
			author: req.body.author,
			title: req.body.title,
			link: req.body.link,
			string: req.body.string,
			publicationYear: req.body.publicationYear,
			contentType: req.body.contentType,
			publisher: req.body.publisher,
			text: [],
			data: {},
			sentences: [],
			engagementScore: null
		});

		let sectionsArray = stringParser(req.body.string);
		sectionsArray = await apiCall(sectionsArray);
		sectionsArray.forEach((section) => {
			section.data = extractData(section);
		})
		const entryData = compileData(sectionsArray)

		const engagementScore = engagementScoreCalc(entryData)

		const updatedEntry = await Entry.findByIdAndUpdate(newEntry._id, {
			text: sectionsArray,
			data: entryData,
			engagementScore: engagementScore
		}, {
			new: true
		})
		const id = updatedEntry._id;
		res.redirect(`entries/${id}`)

	} catch (err) {
		console.log(err);
		res.send(err);
	}
})
router.get('/:id', function(req, res)
{
	//Show route for a particular entry
	//The show.ejs file will have some if statements
	//that will show different information based
	//on whether or not the current user is the
	//one who created the entry

	Entry.findById(req.params.id, function(err, foundEntry)
	{
		if (err) {console.log(err);}
		else
		{
			User.findById(foundEntry.userId, function(err, foundUser)
			{
				if (err) {console.log(err);}
				else
				{
					console.log(`GET /entries/${req.params.id}`);
					const text = sentenceArrayMaker(foundEntry.text)
					res.render('entry/show.ejs', {
						entry: foundEntry,
						text: text,
						username: foundUser.displayname
					});//end of res.render
				}
			});
			
		}
	});
});

router.get('/:id/edit', function(req, res)
{
	//Edit route for an entry.
	//Checks the session object to make sure that
	//the user is the original creator for the entry, and
	//thus has the authority to edit it
	//The user's MongoDB id will be in the entry
	//object as <entry.userId>

	Entry.findById(req.params.id, function(err, foundEntry)
	{
		if (err) {console.log(err);}
		else
		{
			if (req.session.curuserid === foundEntry.userId || req.session.usertype === 'admin')
			{
				res.render('entry/edit.ejs', {entry: foundEntry});
			}
			else
			{
				res.send(`You don't have the authority to do this!!<br><a href="/">Back to home</a>`);
			}
		}
	});
});

router.put('/:id', async function(req, res)
{
	//PUT route for modifying an entry
	//Also checks session to make sure the current user
	//has the authority to edit the entry

	try {
		//Update the entry:
		console.log("Trying to update entry");
		const newEntry = await Entry.findByIdAndUpdate(req.params.id, {
			userId: req.session.curuserid,
			author: req.body.author,
			title: req.body.title,
			link: req.body.link,
			string: req.body.string,
			publicationYear: req.body.publicationYear,
			contentType: req.body.contentType,
			publisher: req.body.publisher,
			text: [],
			data: {},
			sentences: [],
			engagementScore: null
		});
		//console.log("newEntry: " + newEntry);
		//console.log("req.body.string: " + req.body.string);
		let sectionsArray = stringParser(req.body.string);
		//console.log("sectionsArray: " + sectionsArray);
		
		sectionsArray = await apiCall(sectionsArray);
		//console.log("sectionsArray: " + sectionsArray);
		
		sectionsArray.forEach((section) => {
			section.data = extractData(section);
		})
		
		const entryData = compileData(sectionsArray)
		//console.log("entryData: " + entryData);
		
		const engagementScore = engagementScoreCalc(entryData)
		//console.log("engagementScore: " + engagementScore);
		
		const updatedEntry = await Entry.findByIdAndUpdate(newEntry._id, {
			text: sectionsArray,
			data: entryData,
			engagementScore: engagementScore
		}, {
			new: true
		})
		//console.log("updatedEntry: " + updatedEntry);
		
		const id = updatedEntry._id;
		res.redirect(`/entries/${id}`)
	}
	catch (err)
	{
		console.log(err);
	}
});

router.get('/:id/delete', function(req, res)
{
	Entry.findById(req.params.id, function(err, foundEntry)
	{
		if (err) {console.log(err);}
		else
		{
			if (req.session.curuserid === foundEntry.userId || req.session.usertype === 'admin')
			{
				res.render('entry/delete.ejs', {entry: foundEntry});
			}
			else
			{
				res.send(`You don't have the authority to do this!!<br><a href="/">Back to home</a>`);
			}
		}
	});
});

router.delete('/:id', function(req, res)
{
	//DELETE route for deleting an entry
	//Checks session to make sure the current user
	//has the authority to delete the entry

	Entry.findById(req.params.id, function(err, foundEntry)
	{
		if (err) {console.log(err);}
		else
		{
			if (req.session.curuserid === foundEntry.userId || req.session.usertype === 'admin')
			{
				//Now we know the user is either the one who created this entry,
				//or is an administrator!

				//Delete the entry:
				Entry.findByIdAndDelete(req.params.id, function(err, deletedEntry)
				{
					if (err) {console.log(err);}
					else
					{
						//The entry has now been deleted
						res.redirect('/entries');
					}
				});
			}
			else
			{
				res.send(`You don't have the authority to do this!!<br><a href="/">Back to home</a>`);
			}
		}
	});
});










module.exports = router;
