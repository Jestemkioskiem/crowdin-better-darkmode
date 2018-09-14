
/*  All of the <style> elements, since you can't access your local .css file with an extension.
It's an array for clarity & easier edits.*/
htmlObjects = [
".dark-theme.md .crowdin_phrase_translated, .dark-theme.md .crowdin_phrase_translated em\
   {color: #ffe5e5 !important; background: #a77fa5 !important;} ",
".dark-theme.md .crowdin_phrase_untranslated, .dark-theme.md .crowdin_phrase_untranslated em\
   {color: #ffe5e5 !important; background: #6ababb !important;} ",
".dark-theme.md .crowdin_phrase_approved, .dark-theme.md .crowdin_phrase_approved em\
   {color: #ffe5e5 !important; background: #ba93cc !important;} ",

".dark-theme.md .crowdin_phrase_translated *,.dark-theme.md .crowdin_phrase_untranslated *,\
   .dark-theme.md .crowdin_phrase_approved * {color: #efefef !important; background: #adadad !important;} "
];


// Converting the htmlObjects array into a string & adding a linebreak for good dev tools looks.
var htmlString = "";
for(var i = 0; i < htmlObjects.length; i++){
   htmlString += htmlObjects[i] + "\n";
}

$(document).ready(function(){
   var iframe = $("iframe#html_frame"); //Finding crowdin's translation iframe.

   $(iframe).ready(function(){
      var frameHead = $(iframe).contents().find("head");
      var frameBody = $(iframe).contents().find("body");
      if($(frameBody).hasClass("dark-theme")){ // Check if the Dark Theme is enabled in crowdin settings.
         frameHead.append('<style>'+ htmlString + '</style>'); //Setting the CSS to the htmlString.
      }
      else{
         console.log("'Better Crowdin Darkmode:' Enable Dark Theme and refresh the page for the extension to take effect.");
      }
   })
});
