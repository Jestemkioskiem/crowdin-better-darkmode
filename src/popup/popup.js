let open = false; //Global variable that determines if the GUI is collapsed or not.
let currColorType;

let hexColors = { // Default HEX colors.
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
	notifyContent('colorUpdate', hexColors);
});

$('#resetHex').click(function(){ // Resets the HEX value to default.
	setToDefault();
});

$('#colorChoices button').click(function(){ // Resets the HEX value to default.
	openColorPicker(this)
});

$('#saveColor').click(function(){
	updateColor(currColorType)
	closeColorPicker()
})

function updateColor(colorType){
	let hexVal = $('#hexValue').val()
	if(colorType === "Text"){
		hexColors.text = hexVal
	}
	else if(colorType === "Translated"){
		hexColors.translated = hexVal
	}
	else if(colorType === "Untranslated"){
		hexColors.untranslated = hexVal
	}
	else if(colorType === "Approved"){
		hexColors.approved = hexVal
	}
}

function notifyContent(messageText, colors){ // Function for sending colors and other messages to script.js.
	let params = {
		active: true,
		currentWindow: true
	}
	chrome.tabs.query(params, tabReceived);
	function tabReceived(tabs) {
		let msg = {
		  txt: messageText,
		  colors: colors
		}

		chrome.tabs.sendMessage(tabs[0].id, msg)
	}
};

function openGUI(){ // Animations & CSS for opening up the GUI.
	let params = {
		active: true,
		currentWindow: true
	}
	
	chrome.tabs.query(params, tabReceived);
	function tabReceived(tabs) {

		let tab = tabs[0]
		if(!tab.url.startsWith('https://crowdin.com/')){
			return false;
		}
	}

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

function openColorPicker(button){
	currColorType = button.textContent;

	$('#colorType').text(currColorType)
	$('#colorClosed').hide()
	$('#colorOpened').show()
}

function closeColorPicker(){
	currColorType = null;

	$('#colorClosed').show()
	$('#colorOpened').hide()
}

function setToDefault(){ // Called when #resetHex is clicked.
   $.farbtastic('#colorpicker').setColor('#001A1A');
   let defaultColors = { // Default HEX colors.
      text : "#001A1A",
      translated : "#58805A",
      untranslated : "#954544",
      approved : "#456C33",
      special : "#525252",
      special_text : "#101010"
	};

	notifyContent('colorUpdate', defaultColors);
};