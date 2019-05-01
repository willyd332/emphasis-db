const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();
const axios = require('axios');
const Article = require('newspaperjs').Article;
const mongoose = require('mongoose');
const User = require('../models/userSchema');
const Entry = require('../models/entrySchema');
const stringParser = require('../js/stringParser')
const extractData = require('../js/extractData')
const compileData = require('../js/compileData')
const sentenceArrayMaker = require('../js/sentences')
const engagementScoreCalc = require('../js/engagementScoreCalc')
const stringSanitizer = require('../js/stringSanitizer');


const CronJob = require('cron').CronJob;

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
const getYear = (string) => {
	let newString = ''
	for (let i = 0; i < 4; i++){
		newString += string[i]
	}
	const number = parseInt(newString)
	return number
}





async function getNewsApi ()
{

	try {
		const response = await axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=b6ae8688af7b4d5aae22e0dc8c4fa6f3')

		const topHeadlines = await response.data.articles;

		const arrayCreated = [];

		for (let i = 0; i < topHeadlines.length; i++){

			let testEntry = await Entry.findOne({title: topHeadlines[i].title, author: topHeadlines[i].author});

			
			if (!testEntry && topHeadlines[i].source.name !== "Newsweek" && topHeadlines[i].source.name !== "CNN") { //(BLACKLIST)
				let result = await Article(topHeadlines[i].url)
				let publicationYear = getYear(topHeadlines[i].publishedAt)
				let sanitizedString = stringSanitizer(result.text)

				//Find the bot user:

				const botUser = await User.findOne({username: "bot-newsapi"});

				if (!botUser)
				{
					//Uh-oh, the bot user does not exist!
					console.log(`ERROR: Cannot find bot user with username 'bot-newsapi'`);
					//console.log(`(got ${botUser._id} for the id)`);
					return false;
				}

				if (botUser.usertype != 'bot')
				{
					console.log(`ERROR: Bot 'bot-newsapi' is making entry, but usertype is not 'bot'`);
					return false;
				}

				// THIS IS THE SCHEMA, DONT CHANGE THE STRUCTURE

				const newEntry = await Entry.create({
					userId: botUser._id,
					author: topHeadlines[i].author,
					title: topHeadlines[i].title,
					link: topHeadlines[i].url,
					string: sanitizedString,
					publicationYear: publicationYear,
					contentType: 'news',
					publisher: topHeadlines[i].source.name,
					text: [],
					data: {},
					sentences: [],
					engagementScore: null
				});

				//console.log(newEntry);
				botUser.entries.push(newEntry);

				// THE STUFF BELOW THIS LINE IS DATABASE STUFF, YOU DO NOT NEED TO TOUCH IT

				let sectionsArray = stringParser(newEntry.string);
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

				arrayCreated.push(updatedEntry);
				console.log("bot-newsapi: added new entry");
			} //end if for checking topheadlines.source.name blacklist
			else
			{
				if (testEntry)
				{
					await console.log("bot-newsapi: duplicate skipped");
				}
				else
				{
					await console.log("bot-newsapi: BLACKLISTED");
				}
				continue;
			}
		}

		//res.render('bots/index.ejs', {entries: arrayCreated});

		return arrayCreated;

	} catch (err) {
		console.log(err);
		return false;
	}

}






router.get('/', function(req, res)
{
	if (!req.session.logged || req.session.usertype !== 'admin')
	{
		//Permission denied!!!
		res.send(`You do not have the authority to do this!!<br><a href="/">Back to home</a>`)
	}
	else
	{	
		User.find({usertype: 'bot'}, function(err, foundUsers)
		{
			if (err) {console.log(err);}
			else
			{
				console.log("GET /bot");
				//NOTE: The bot index is the same in principle as the user index; except
				//we're sending it only the bots instead of all the users
				
				//Construct an array of bot statuses:
				let botstatus = [];
				for (let i = 0; i < foundUsers.length; i++)
				{
					switch (foundUsers[i].username)
					{
						case 'bot-newsapi':
							if (jobNewsApi.running)
							{
								botstatus[i] = "Active";
							}
							else
							{
								botstatus[i] = "Inactive";
							}
							break;
						default:
							botstatus[i] = "Not Associated";
					}
				}
				res.render('bots/index.ejs', {users: foundUsers, botstatus: botstatus});
			}
		});
	}
});





router.get('/bot-newsapi', function(req, res)
{

	if (!req.session.logged || req.session.usertype !== 'admin')
	{
		//Permission denied!!!
		res.send(`You do not have the authority to do this!!<br><a href="/">Back to home</a>`)
	}
	else
	{
		console.log('GET bot/bot-newsapi');
		getNewsApi();
		res.send("Success");
	}
});


router.get('/bot-newsapi/start', function(req, res)
{

	if (!req.session.logged || req.session.usertype !== 'admin')
	{
		//Permission denied!!!
		res.send(`You do not have the authority to do this!!<br><a href="/">Back to home</a>`)
	}
	else
	{
		console.log('GET bot/bot-newsapi/start');
		jobNewsApi.start();
		//console.log(jobNewsApi);
		//console.log(jobNewsApiStatus);
		res.send("Success");
	}
});


router.get('/bot-newsapi/stop', function(req, res)
{

	if (!req.session.logged || req.session.usertype !== 'admin')
	{
		//Permission denied!!!
		res.send(`You do not have the authority to do this!!<br><a href="/">Back to home</a>`)
	}
	else
	{
		console.log('GET bot/bot-newsapi/stop');
		jobNewsApi.stop();
		//console.log(jobNewsApi);
		//console.log(jobNewsApiStatus);
		res.send("Success");
	}
});







//CRON JOBS FOR THE BOTS!!!!



//NewsAPI bot runs every 15 minutes
const jobNewsApi = new CronJob('* */15 * * * *', function() {
  console.log("CRON: getNewsApi");
  getNewsApi();
}, null, true, 'America/Denver');
//jobNewsApi.start();




module.exports = router;



/*
const express = require('express');
const axios = require('axios');
const Article = require('newspaperjs').Article;

class Entry {
	constructor(publication, title, author, link, content, year) {
		this.publication = publication;
		this.title = title;
		this.author = author;
		this.link = link;
		this.content = content;
		this.year = year
	}
}

let topHeadlines;
let targetUrl;
const newsCall = () => {
	axios.get('https://newsapi.org/v2/top-headlines?country=us&apiKey=b6ae8688af7b4d5aae22e0dc8c4fa6f3')
		.then(function(response) {
			topHeadlines = response.data.articles;
			const scrapeArticle = (index = 0) => {
				if (index < topHeadlines.length) {
					if (topHeadlines[index].source.name !== "Newsweek") {
						targetUrl = topHeadlines[index].url;
						Article(targetUrl)
							.then(result => {
								const newEntry = new Entry(
									publication = topHeadlines[index].source.name,
									title = topHeadlines[index].title,
									author = topHeadlines[index].author,
									link = topHeadlines[index].url,
									content = result.text,
									year = topHeadlines[index].publishedAt
								)
								console.log(newEntry);
								index++;
								scrapeArticle(index);
							}).catch(reason => {
								console.log(reason);
							})
					} else {
						index++;
						scrapeArticle(index);
					}
				} else {
					console.log("End of articles");
					return
				}
			}
			scrapeArticle();
		})
		.catch(function(error) {
			console.log(error);
		})
}

newsCall();
*/


/*
try {
	const newEntry = await Entry.create({
		userId: req.session.currUserId,
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
*/
