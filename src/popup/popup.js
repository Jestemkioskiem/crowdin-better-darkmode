var open = false; //Global variable that determines if the GUI is collapsed or not.

let defaultColors = { // Default HEX colors.
      text : "#001A1A",
      translated : "#58805A",
      untranslated : "#954544",
      approved : "#456C33",
      special : "#525252",
      special_text : "#101010"
};


$(document).ready(function() { // Sets up the colorpicker from third_party/colorpicker.js
	$('#colorpicker').farbtastic('#hexValue');
});

$('#top_bar').click(function(){ // Opens up and collapses the GUI when it's clicked.
	if(!open){
		open = openGUI()
	}
	else{
		open = closeGUI()
	}
});

$('#submitHex').click(function(){ // Sends information to script.js to update the colors.
	notifyContent('colorUpdate');
});

$('#resetHex').click(function(){ // Resets the HEX value to default.
	setToDefault();
});


function notifyContent(messageText){ // Function for sending colors and other messages to script.js.
	let params = {
		active: true,
		currentWindow: true
	}
	chrome.tabs.query(params, tabReceived);
	function tabReceived(tabs) {
	
		let msg = {
		  txt: messageText,
		  colors: newColors()
		}

		chrome.tabs.sendMessage(tabs[0].id, msg)
	}
};

function newColors(){ // Uses the color picker to determine new colors - only works with `text` for now.
	let colors = {
		text : $('#hexValue').val(),
		untranslated: "#954544", //Placeholder values
		translated : "#58805A", 
	    approved : "#456C33",
	    special : "#525252",
	    special_text : "#101010"
	}

	return colors
};

function openGUI(){ // Animations & CSS for opening up the GUI.
	$('body').animate({
		'height': "300px"
	}, 500, function(){

		$('#top_bar').animate({
		'opacity': 0.9,
		"border-bottom-width": "0.5px",
		"padding-bottom": "30px",
		"margin-bottom": "10px"
		});

		$('#opened').show()
		$('#opened').animate({
			'opacity': 0.9,
		});

	});

	return true;
};

function closeGUI(){ // Animations & CSS for collapsing the GUI.
	$('body').animate({
		'height': "80px"
	}, 500);

	$('#top_bar').animate({
		'opacity': 0.5,
		"border-bottom-width": "0px",
		"padding-bottom": "0px",
		"margin-bottom": "0px"
	});

	$('#opened').fadeOut();

	return false;
};

function setToDefault(){ // Called when #resetHex is clicked.
   $.farbtastic('#colorpicker').setColor('#001A1A')
};