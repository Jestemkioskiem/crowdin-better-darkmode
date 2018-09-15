var htmlObject;
var iframe = $("iframe#html_frame"); //Finding crowdin's translation iframe.

let defaultColors = { // Set the default HEX colors for all the elements.
      text : "#001A1A",
      translated : "#58805A",
      untranslated : "#954544",
      approved : "#456C33",
      special : "#525252",
      special_text : "#101010"

$(document).ready(function(){ // Update the CSS when the document & iframe fully load.
   $(iframe.ready(function(){
      updateCss(defaultColors);
   }))
})

chrome.runtime.onMessage.addListener(unpackColors); // Receive messages from popup.js & use them to update colors.
function unpackColors(message, sender, sendResponse){
   updateCss(message.colors);
}

function updateHtmlString(colors){ // Returns the htmlString with new colors.

   htmlObjects = [
      '.dark-theme.md .crowdin_phrase_translated, .dark-theme.md .crowdin_phrase_translated em\
         {color: $c !important; background: $b !important;} '.replace('$b', colors.translated),
      '.dark-theme.md .crowdin_phrase_untranslated, .dark-theme.md .crowdin_phrase_untranslated em\
         {color: $c !important; background: $b !important;} '.replace('$b', colors.untranslated),
      '.dark-theme.md .crowdin_phrase_approved, .dark-theme.md .crowdin_phrase_approved em\
         {color: $c !important; background: $b !important;} '.replace('$b', colors.approved),

      '.dark-theme.md .crowdin_phrase_translated *,.dark-theme.md .crowdin_phrase_untranslated *,\
         .dark-theme.md .crowdin_phrase_approved * {color: $c !important; background: $b !important;\
         filter: invert(0%)!important; }'.replace('$b', colors.special).replace('$c', colors.special_text),
      '.dark-theme.md>* {filter: invert(0%)!important}'
   ];

   // Converting the htmlObjects array into a string & adding a linebreak for good dev tools looks.
   var htmlString = "";
   for(var i = 0; i < htmlObjects.length; i++){
      htmlString += htmlObjects[i].replace('$c', colors.text) + "\n";
   };

   return htmlString;
};


function updateCss(colors){ // Adds `htmlString` to the style element of the page.
   htmlString = updateHtmlString(colors)
   var frameHead = $(iframe).contents().find("head");
   var frameBody = $(iframe).contents().find("body");
   if($(frameBody).hasClass("dark-theme")){ // Check if the Dark Theme is enabled in crowdin settings.
      frameHead.append('<style>'+ htmlString + '</style>'); //Setting the CSS to the htmlString.
      console.log("Updated CSS")
   }
   else{
      console.log("'Better Crowdin Darkmode:' Enable Dark Theme and refresh the page for the extension to take effect.");
   }
};


