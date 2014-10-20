module.exports = {
  randomMessage: function () {
    var botUsernames = ['chatter']
	var botChats = ['chatter'];
	var randomUsername = botUsernames[Math.floor(Math.random() * botUsernames.length)];
	var randomSentence = botChats[Math.floor(Math.random() * botChats.length)];
	var data = {user: randomUsername, message: randomSentence};
	
	return data;
  }
};