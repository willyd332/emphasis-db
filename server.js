const express = require('express');
const methodOverride = require('method-override');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const session = require('express-session');


const app = express();

require('./db/db');

const normalRouter = require('./controllers/normalRouter');

app.use(methodOverride('_method'));
app.use(bodyParser.urlencoded({extended: false}));


app.use(session(
{
	//TODO: what should this secret string be?
	secret: process.env.sessionSecret,
	resave: false, //only save if there has been a change
	saveUninitialized: false, //only save if we have mutated the session - this is what should be done for logins
	logged: false,
}));


//The following function acts as middleware on ALL requests,
//and is intended to monitor the session object in order
//to make sure it's being made available to the ejs views,
//and also to make sure the user login information is being
//kept up to date!
app.use(function(req, res, next)
{
	if (req.session.loginAttempt){
		req.session.loginmessage = null
	} else {
		req.session.loginmessage = "Incorrect Username or Password"
	}
	if (!req.session.logged)
	{
		req.session.messages =
		{
			userwelcome: "You are not logged in"
		}
		req.session.curuserid = null;
		req.session.username = null;
		req.session.usertype = null;
	}
	res.locals.session = req.session;
	next();
});



app.use('/', normalRouter);



let port = process.env.PORT;
if (!process.env.PORT) {port = 3000;}

app.listen(port, function()
{
	console.log(`Server is listening on port ${port}`);
});
