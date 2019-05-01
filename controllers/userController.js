const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/userSchema');
const Entry = require('../models/entrySchema');

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
	if (req.session.username && req.session.usertype !== 'admin')
	{
		res.send("You must log off before trying to create a new user!");
	}
	else //if logged out, or an administrator user!
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
		if (req.body.usertype == null) {req.body.usertype = 'std';}

		const userDbEntry =
		{
			username: lcusername,
			usertype: req.body.usertype,
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






							//NOW LOG THIS USER IN!
							//NOTE: THIS WAS COPIED FROM THE LOGIN POST ROUTE IN authController
							//IF authController CHANGES, THIS WILL ALSO NEED TO BE CHANGED!!!

							//Change username to lowercase:
							req.body.username = req.body.username.toLowerCase();
							console.log(`POST /login: trying to login for ${req.body.username}`);
							//Find the user and take note of the password hash:
							User.findOne({username: req.body.username}, function(err, foundUser)
							{
								if (err) //If there was an error of some sort
								{
									console.log(err);
									res.send("There was an error while logging in. Send this to the website developers: " + err);
								}
								else if (!foundUser) //User does not exist!
								{
									req.session.loginAttempt = false;
									res.redirect('/auth/login')
								}
								else //User DOES exist. Try the password now!!
								{
									//Compare password hash to entered password using bcrypt:
									console.log(`Comparing bcrypt password hash.....`);
									if (bcrypt.compareSync(req.body.password, foundUser.password))
									{
										//Passwords MATCH!
										req.session.username = req.body.username;
										req.session.logged = true;
										req.session.usertype = foundUser.usertype;
										console.log(`${req.body.username} login attempt: passwords match`);
										req.session.messages.userwelcome = `Welcome, ${req.session.username}!`;
										req.session.curuserid = foundUser._id;
										res.redirect('/home');
										req.session.loginAttempt = true;
									}
									else
									{
										//Passwords do NOT MATCH!
										req.session.loginAttempt = false;
										res.redirect('/auth/login')
									}
								}
							});

							//DONE LOGGING IN!



							//res.send(`Congratulations ${req.body.username}, you have now registered as a user! Be sure to log in now!<br><a href="/auth/login">Go to login page</a>`);
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
			Entry.find({userId: foundUser._id}, (err,foundEntries)=>{
				if (err) {
						console.log(err);
				} else {
				res.render('user/show.ejs', {
					user: foundUser,
					entries: foundEntries
					})
				}
			})
		}
	});
});


router.get('/:id/edit', function(req, res)
{
	if (req.session.curuserid == req.params.id || req.session.usertype == 'admin')
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
	}
	else
	{
		res.send(`You can't edit the settings for a user you're not logged in as!<br><a href="/">Back to home</a>`);
	}
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
