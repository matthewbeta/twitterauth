var express = require('express');
var app = express();
var port = process.env.PORT || 8080;

app.configure(function () {
	app.use(express.logger('dev'));
	app.use(express.cookieParser());
	app.use(express.bodyParser());
	app.set('view engine', 'jade');

	require("./app/routes.js")(app); 

	app.listen(port);

	console.log("Shift your arse to port" + port);
});