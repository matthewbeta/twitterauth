var TwitterStrategy = require('passport-twitter').Strategy;

var User = require('../app/models/user');

var configAuth = require('./auth');

module.exports = function (passport) {
	
	// SESSIONS http://passportjs.org/guide/configure/
	passport.serializeUser(function (user, done) {
		done(null, user.id);
	});

	passport.deserializeUser(function (id, done) {
		User.findById(id, function (err, user) {
			done(err, user);
		});
	});

	// TWIITER STRATEGY http://passportjs.org/guide/twitter/

	// set up the user
	passport.use(new TwitterStrategy({
		consumerKey     : configAuth.twitterAuth.consumerKey,
    consumerSecret  : configAuth.twitterAuth.consumerSecret,
    callbackURL     : configAuth.twitterAuth.callbackURL
	},

	function(token, tokenSecret, profile, done) {
		User.findOne({ 'twitter.id' : profile.id }, function(err, user) {
			if (err) {
				return done(err); 
			}
			if (user) {
				return done(null, user);
			} else {
				var newUser									= new User();

				newUser.twitter.id          = profile.id;
        newUser.twitter.token       = token;
        newUser.twitter.username    = profile.username;
        newUser.twitter.displayName = profile.displayName;

        // save our user into the database
        newUser.save(function(err) {
            if (err)
                throw err;
            return done(null, newUser);
        });				
			}
		});
	}
));

};