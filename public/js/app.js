$(document).ready(function() {
	var socket = io.connect(document.URL);
	
	//var username = '';
	//socket.emit('notifyConnected', { user: username, message: 'is joining the chat'});
	
	var input = []; // decrypted textarea
	var output = []; // encrypted textarea
	$("#in").html(input.join("\n"));
	
	var defaultPassphrase = window.location.hostname;
	$('#key').val('')
	//$('#key').val(defaultPassphrase) // default passphrase
	var passphrase = $('#key').val();

	// press enter in chat box: add plain text to input box, add encrypted text to output box
	$('#chatInput').keypress(function(e) {
		var keyCode = (e.which ? e.which : e.keyCode); 
		var message = $('#chatInput').val();
		var nickname = $('#nickInput').val();
		if ((keyCode == 10 || keyCode == 13) && e.ctrlKey) { // press ctrl + enter: line break
			$('#chatInput').val($('#chatInput').val() + '');
		}
		if(keyCode == 13 && message != "") { // press enter: send message
			passphrase = $('#key').val();
			
			var encryptedMessage = CryptoJS.AES.encrypt(nickname + ' : ' + message, passphrase);
			var decryptedMessage = CryptoJS.AES.decrypt(encryptedMessage, passphrase).toString(CryptoJS.enc.Latin1);
						
			socket.emit('send', { user: username, message: encryptedMessage.toString()});
						
			output.push(encryptedMessage);
			$("#out").html(output.join("\n"));	
			input.push(username + ' - ' + decryptedMessage);
			$("#in").html(input.join("\n"));
			
			$('#chatInput').val('')
			
			scrollToBottom();
		}
	});
	
	// change the passphrase: rework all input box messages
	$('#key').keyup(function(){
		passphrase = $('#key').val();
		$("#in").html("");
		for(var i=0; i<output.length; i++) {
			input[i] = input[i].split(' - ')[0] + ' - ' + CryptoJS.AES.decrypt(output[i].toString(), passphrase).toString(CryptoJS.enc.Latin1);
		}
		
		$("#in").html(input.join("\n"));
		$("#out").html(output.join("\n"));
		
	});
	
	// receive a message
	socket.on('message', function (data) {
		console.log(data);
		output.push(data.message);
		$("#out").html(output.join("\n"));
		
		input.push(data.user + ' - ' + CryptoJS.AES.decrypt(data.message, passphrase).toString(CryptoJS.enc.Latin1));
		$("#in").html(input.join("\n"));
		
		scrollToBottom();
    });
	
	
	socket.on('assign', function (data) {
		console.log('assigned userId: ' + data.user);
		username = data.user;
		$("#username").html(data.user);
	});
	
	// when a new user joins the chat
	socket.on('connected', function (data) {
		console.log(data.user + ' - ' + data.message + ' - ' + data.users);
		//var isYou = data.user == username;
		//output.push(data.user + ' ' + data.message);
		//$("#out").html(output.join("\n"));	
		input.push('*** ' + data.user + ' ' + (isYou ? '(you)' : '') + ' ' + data.message + ' ****');
		$("#in").html(input.join("\n"));
	});
	
	// when a new user leaves the chat
	socket.on('notifyDisconnected', function (data) {
		console.log(data.user + ' - ' + data.message + ' - ' + data.users);
		//output.push(data.user + ' ' + data.message);
		//$("#out").html(output.join("\n"));	
		input.push('*** ' + data.user + ' ' + data.message + ' ****');
		$("#in").html(input.join("\n"));
	});
	
	scrollToBottom = function() {
		$("#in").scrollTop($("#in")[0].scrollHeight - $("#in").height());
		$("#out").scrollTop($("#out")[0].scrollHeight - $("#out").height());
	}
});