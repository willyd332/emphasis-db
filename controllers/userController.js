const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/userSchema');

router.get('/', function(req, res)
{
	User.find({}, function(err, foundUsers)
	{
		if (err) {console.log(err);}
		else
		{
			console.log("GET /users");
			res.render('user/index.ejs', {users: foundUsers});
		}
	});
});

router.get('/new', function(req, res)
{
	if (req.session.username)
	{
		res.send("You must log off before trying to create a new user!");
	}
	else
	{
		console.log("GET /users/new");
		res.render('user/new.ejs');
	}
});

router.post('/', function(req, res) //POST route to create a new user!!
{
	
	if (req.body.password !== req.body.password2)
	{
		//Uh oh, the passwords don't match!! We gotta get out of here...
		res.send(`Passwords did not match! Try again...<br><a href="/users/new">Back to registration page</a>`);
	}
	else
	{
		
		const password = req.body.password;
		const passwordHash = bcrypt.hashSync(password, bcrypt.genSaltSync(10));

		const lcusername = req.body.username.toLowerCase(); //make sure the username is all lower case!!

		const userDbEntry =
		{
			username: lcusername,
			usertype: null, //Standard users have a user type of null!!
			email: req.body.email,
			password: passwordHash,
			displayname: req.body.displayname,
			entries: []
		};

		User.findOne({username: lcusername}, function(err, foundUser)
		{
			if (err) {console.log(err);}
			else
			{
				if (!foundUser) //username doesn't already exist! We are good to create a new user:
				{
					User.create(userDbEntry, function(err, createdUser)
					{
						if (err) {console.log(err);}
						else
						{
							console.log("Created a new user");
							res.send(`Congratulations ${req.body.username}, you have now registered as a user! Be sure to log in now!<br><a href="/auth/login">Go to login page</a>`);
						}
					});
				}
				else
				{
					console.log("User create failed: username already exists");
					res.send("This username is taken! Try a different one.");
				}
			}
		});
	}//end of password matching if statement

});

router.get('/:id', function(req, res)
{
	User.findById(req.params.id, function(err, foundUser)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`GET /users/${req.params.id}`);
			res.render('user/show.ejs', {user: foundUser})
		}
	});
});


router.get('/:id/edit', function(req, res)
{

	User.findById(req.params.id, function(err, userToEdit)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`GET /users/${req.params.id}/edit`);
			res.render('user/edit.ejs', {user: userToEdit});
		}
	});
});

router.put('/:id', function(req, res)
{
	User.findByIdAndUpdate(req.params.id, req.body, function(err, userEdited)
	{
		if (err) {console.log(err);}
		else
		{
			console.log(`PUT /users/${req.params.id}`);
			res.redirect('/users');
		}
	});
});


module.exports = router;