const express = require('express');
const router = express.Router();

const userController = require('./userController');
const authController = require('./authController');
const homeController = require('./homeController');
const entryController = require('./entryController');

router.use(express.static('public'));



//Special route for home page:
router.get('/', function(req, res)
{
	res.redirect('/home');
});


router.use('/users', function(req, res, next)
{
	//Here put things we want to send to the controller
	next();
}, userController);

router.use('/auth', function(req, res, next)
{
	//Here put things we want to send to the controller
	next();
}, authController);

router.use('/home', function(req, res, next)
{
	//Here put things we want to send to the controller
	next();
}, homeController);

router.use('/entries', function(req, res, next)
{
	//Here put things we want to send to the controller
	next();
}, entryController)


module.exports = router;
