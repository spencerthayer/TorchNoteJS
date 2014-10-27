/** REQUIREMENTS **/
var CryptoJS = require("crypto-js");
var AES = require("crypto-js/aes");
var SHA256 = require("crypto-js/sha256");

var casual = require("casual");
var express = require("express");
var app = express();
//var bot = require('./bot');

/** PROPER PORT LISTENING **/
var port = 3700;
/** HACK! TURN ON FOR HEROKU USE ** /
app.listen(3700);
var port = parseInt(process.argv[2]);
/**
	I REALLY NEED SOME HELP FIGURING OUT
	WHY I THE ABOVE IS NEEDED FOR HEROKU!
	IT'S FUCKING BULLSHIT!
	(Though likely entirely my fault.)
**/
app.set('views', __dirname + '/views');
app.engine('html', require('ejs').renderFile);
app.use(express.static(__dirname + '/public')); 

var io = require('socket.io').listen(app.listen(port));

//var randomUsername = '';
var allUsers = [];
io.sockets.on('connection', function (user) {
	function randomColor() {
		var color = (function lol(m, s, c) {
				return s[m.floor(m.random() * s.length)] +
				    (c && lol(m, s, c - 1));
			    })(Math, /*'12345*/'6789ABCDEF', 4);
		return color;
		}
	var randomUsername = '#' + randomColor();
	allUsers.push({id: user.id, color: randomUsername});
	user.emit('assign', {user: randomUsername, message: 'assign'});
	console.log('LINE - ' + JSON.stringify(allUsers));
	io.sockets.emit('LINE - ', JSON.stringify(allUsers));
	io.sockets.emit('message', JSON.stringify(allUsers));
	
	/*
		This is redundant. I think? Seems to be handled by
		io.sockets.on('connection',
		Keep around for a few versions to just makes sure.
	*/
	user.on('notifyConnected', function (data) {
		console.log('CONNECTED - ' + JSON.stringify(allUsers));
	});
	 user.on('disconnect', function (data) {
		var userId = user.id;
		allUsers.splice(allUsers.indexOf(userId), 1);
		console.log('DISCONNECTED -' + JSON.stringify(allUsers));
    });

	// new message: broadcast it to all other users (excluding self)
    user.on('send', function (data) {
		user.broadcast.emit('message', data);
    });	
});

// generate random bots sending random messages on a random interval
var botsJob;

var randomMessage = function () {
	function randomBotString() {
		var chars = "!@#$%^&*|\/?~=-0123456789ABCDEFGHIJKLMNOPQRSTUVWXTZabcdefghiklmnopqrstuvwxyz";
		var string_length = (Math.random() * 1028);
		var randomstring = '';
		for (var i=0; i<string_length; i++) {
			var rnum = Math.floor(Math.random() * chars.length);
			randomstring += chars.substring(rnum,rnum+1);
			}
		return randomstring;
		}
	
	
	/*var botusername = "username";*/
	var sentence = "U2FsdGVkX" /** "Salted," I really need to fix this. **/+ randomBotString();
	var details = {/*user: botusername, */message: sentence };
	var botData = details;
	return botData;
	botAlert();
	/** NEW CODE END **/
	}
	/*
	var botWarning = function() {
		document.getElementById('botWarning');
		function botWarningOff() { botWarning.style.display = 'none'; }
		function botWarningOn() { botWarning.style.visibility = 'visible'; }
	}
	*/
	var randomChat = function () {
		var randomInterval = Math.floor(Math.random() * 25000) + 1;
		io.sockets.emit('message', randomMessage());
		botsJob = setTimeout(randomChat, randomInterval);
	}
	randomChat();

// routes
app.get("/", function(req, res){
    res.render("index.html");
});
app.get("/addBots", function(req, res){
	randomChat();
	res.redirect('/');
	$("#botWarning").show();
});
app.get("/removeBots", function(req, res){
	clearTimeout(botsJob);
	res.redirect('/');
	$("#botWarning").hide();
});

console.log("Listening on port " + port);