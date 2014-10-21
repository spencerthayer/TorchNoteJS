module.exports = {
  randomMessage: function () {
    var botUsernames = ['#bot']
	var botChats = ['#bot01','#bot02','#bot03','#bot04','#bot05','#bot06'];
	var randomUsername = botUsernames[Math.floor(Math.random() * botUsernames.length)];
	var randomSentence = botChats[Math.floor(Math.random() * botChats.length)];
	var data = {user: randomUsername, message: randomSentence};
	
	return data;
  }
};