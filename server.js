// server.js

// set up ======================================================================
// get all the tools we need Bog Test2
var express  = require('express');
var app      = express();
var server = require('http').Server(app);
var io = require('socket.io').listen(server);
var port     = process.env.PORT || 8080;

var mongoose = require('mongoose');
var passport = require('passport');
var flash    = require('connect-flash');

var morgan       = require('morgan');
var cookieParser = require('cookie-parser')
var bodyParser   = require('body-parser');
var session      = require('express-session');

var configDB = require('./config/database.js');
var socketManager = require('./app/socketsManager');
var scheduleManager = require('./app/scheduler')

var debug = require('debug')('Muri')  

// configuration ===============================================================
mongoose.connect(configDB.url); // connect to our database

require('./config/passport')(passport); // pass passport for configuration

socketManager.start(io);
scheduleManager.init();

// set up our express application
app.use(morgan('dev')); // log every request to the console
app.use(cookieParser()); // read cookies (needed for auth)
app.use(bodyParser()); // get information from html forms
app.use('/public', express.static('public'));
app.use('/js', express.static('js'));
app.use('/style', express.static('style'));
app.use('/img', express.static('img'));

app.set('view engine', 'ejs'); // set up ejs for templating

// required for passport
app.use(session({ secret: 'eatcake' })); // session secret
app.use(passport.initialize());
app.use(passport.session()); // persistent login sessions
app.use(flash()); // use connect-flash for flash messages stored in session

// routes ======================================================================
require('./app/routes.js')(app, passport); // load our routes and pass in our app and fully configured passport

io.sockets.on('connection', function(socket) {
	console.log("Client has connected on ip: " + socket.handshake.address);


	socket.on('debug', function() {
		socket.emit('debug', 'Message Received in app.js');
	})

	socket.on('disconnect', function() {
		console.log("Client has disconnected on ip: " + socket.handshake.address);
	})
});


server.listen(port);

// launch ======================================================================
//app.listen(port);
console.log('The magic happens on port ' + port);
