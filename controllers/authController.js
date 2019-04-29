const express = require('express');
const bcrypt = require('bcryptjs');
const router = express.Router();

const User = require('../models/userSchema');

router.get('/login', function(req, res)
{
	console.log(`GET /login`);

	if (req.session.username)
	{
		console.log("No login page sent because client already logged in!");
		res.send("You are already logged in!");
	}
	else
	{
		res.render('auth/login.ejs');
	}
});

router.post('/login', function(req, res)
{
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
			console.log(`${req.body.username} does not exist`);
			res.send(`${req.body.username} does not exist! Try registering as a new user.`);			
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
				res.redirect('/auth/login/success');
			}
			else
			{
				//Passwords do NOT MATCH!
				console.log(`${req.body.username} login attempt: invalid password`);
				res.send(`${req.body.username}, your user exists, but you entered an incorrect password!`);
			}
		}
	});
});

router.get('/login/success', function(req, res)
{
	console.log(`GET /login/success`);
	res.send(`Hello ${req.session.username}, you are now logged in!<br><a href="/">Back to home</a>`);
	console.log(`${req.session.username} is now logged in`);
});





router.get('/logout', function(req, res)
{
	if (!req.session.username)
	{
		res.send("You can't log out because you aren't even logged in!");
	}
	else
	{
		//END the session:
		const tempusername = req.session.username;
		req.session.logged = false;
		req.session.usertype = null;
		req.session.messages.userwelcome = "You are not logged in";
		req.session.curuserid = null;
		req.session.destroy();
		console.log(`${tempusername} is now logged out`)
		res.send(`${tempusername}, you are now logged out!<br><a href="/">Back to home</a>`);
	}
});

router.get('/delete', function(req, res)
{
	if (!req.session.username)
	{
		res.send("You can't delete your user account because you are not logged in.");
	}
	else
	{
		User.findOne({username: req.session.username}, function(err, foundUser)
		{
			res.render('user/delete.ejs', {user: foundUser});
		});
	}
});

router.delete('/delete', function(req, res)
{
	//delete the user!!

	//Perform some checks to make sure we want to do this:

	if (!req.session.username)
	{
		res.send("You can't delete your user account because you are not logged in.");
	}
	else //User is logged in
	{
		let userToDeleteId;
		User.findOne({username: req.session.username}, function(err, foundUser)
		{
			if (err) {console.log(err);}
			else
			{
				//Gotta make sure they entered their password in the confirmation form:
				if (bcrypt.compareSync(req.body.password, foundUser.password))
				{
					userToDeleteId = foundUser._id;
					User.findByIdAndDelete(foundUser._id, function(err, deletedUser)
					{
						req.session.destroy();
						res.send("Successfully deleted your user account!");
					});
				}
				else
				{
					console.log("Delete user failed; incorrect password!");
					res.send("Incorrect password - your user account was NOT deleted");
				}
			}
		});

	}
})


module.exports = router;