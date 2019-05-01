const express = require('express');
const router = express.Router();
const mongoose = require('mongoose');




router.get('/', function(req, res)
{
	if (req.session.username){
	res.render('home/index.ejs');
} else {
	req.session.loginAttempt = true
	res.redirect('/auth/login');
}
});

router.get('/about/:topic', (req,res)=>{
	res.render(`info/${req.params.topic}.ejs`)
})


module.exports = router;
