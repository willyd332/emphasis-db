const express = require('express');
const mongoose = require('mongoose');
const router = express.Router();

const User = require('../models/userSchema');
const Entry = require('../models/entrySchema');


router.get('/', function(req, res)
{
	//Index route for ALL entries
	Entry.find({}, function(err, foundEntries)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`GET /entries`);
			res.render('entry/index.ejs', {entries: foundEntries});
		}
	});
});

router.post('/', function(req, res)
{
	//POST route for /entries; creates a new entry
	//Checks the session object to figure out who the author is
});

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
			console.log(`GET /entries/${req.params.id}`);
			res.render('entry/show.ejs', {entry: foundEntry});
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