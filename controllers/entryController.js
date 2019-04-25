const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();
const User = require('../models/userSchema');
const Entry = require('../models/entrySchema');
const stringParser = require('../js/stringParser')
const extractData = require('../js/extractData')
const compileData = require('../js/compileData')
const sentenceArrayMaker = require('../js/sentences')
const engagementScoreCalc = require('../js/engagementScoreCalc')
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


router.get('/new', function(req, res) {
  res.render('entry/new.ejs')
});

router.get('/', function(req, res) {
  //Index route for ALL entries
  Entry.find({}, function(err, foundEntries) {
    if (err) {
      console.log(err);
    } else {
      console.log(`GET /entries`);
      res.render('entry/index.ejs', {
        entries: foundEntries
      });
    }
  });
});

router.post('/', async function(req, res) {

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
      const text = sentenceArrayMaker(foundEntry.text)
			res.render('entry/show.ejs', {
        entry: foundEntry,
        text: text
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
			console.log(`GET /entries/${req.params.id}/edit`);
			res.render('entry/edit.ejs', {entry: foundEntry});
		}
	});
});

router.put('/:id', function(req, res)
{
	//PUT route for modifying an entry
	//Also checks session to make sure the current user
	//has the authority to edit the entry

	Entry.findByIdAndUpdate(req.params.id, function(err, updatedEntry)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`PUT /entries/${req.params.id}`);
			res.redirect('/entries');
		}
	});
});





module.exports = router;
