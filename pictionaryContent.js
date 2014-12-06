function ReplaceText(x, lang)
{
   var str = x.textContent;

   var words = str.split(" ");

   var wordsLength = words.length;
   var parent = x.parentNode;
 
   for (var i = 0; i < wordsLength; ++i) {
     dict_url = 'http://' + lang + '.kasahorow.org/app/d?kw=' +  words[i] + '&fl=' + lang + '&tl=en&utm_source=chrome&utm_campaign=lit&utm_medium=book';
     var a = document.createElement('a');
     a.setAttribute('href', dict_url);
     a.setAttribute('target', 'woaka');
     a.innerHTML = words[i];
     parent.insertBefore(a, x);
     parent.insertBefore(document.createTextNode(' '), x);
    }
 
    parent.removeChild(x);
}

function Replacer(x, language){
    var kids = x.childNodes;
  
    for ( var j = kids.length - 1; j >= 0; --j )
      {
        if (kids[j].nodeType == 3)
          ReplaceText(kids[j], language);
        
        else if(typeof kids[j].tagName != 'undefined')
        { 
            if (kids[j].tagName.toLowerCase() != "a")
              if (kids[j].tagName.toLowerCase() != "textarea"){
                if (kids[j].tagName.toLowerCase() != "input"){
              Replacer(kids[j], language);
            }
            }
        }
      }
  }
   

var language = "";
chrome.runtime.sendMessage({method: "getLang"}, function(response) {
	language= response.lang;
  Replacer(document.body, language);

});



