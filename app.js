var express = require('express');
var app = express();
var port = process.env.PORT || 8080;
var mongoose = require('mongoose');
var passport = require('passport');
var configDB = require('./config/database.js');

mongoose.connect(configDB.url);
require("./config/passport")(passport);

app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.set('view engine', 'jade');

	// required for passport
	app.use(express.session({ secret: 'busta rhymes island'})); //session secret
	app.use(passport.initialize()); 
	app.use(passport.session()); //prrsistent logns

	require("./app/routes.js")(app, passport); 

	app.listen(port);

	console.log("Shift your arse to port" + port);
});