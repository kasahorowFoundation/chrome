function ReplaceText(x)
{
   var str = x.textContent;

   var words = str.split(" ");

   var wordsLength = words.length;
   var parent = x.parentNode;
 
   for (var i = 0; i < wordsLength; ++i) {
     dict_url = 'http://lang.kasahorow.org/app/d?kw='+  words[i] + '&fl=lang&tl=en';
     var a = document.createElement('a');
     a.setAttribute('href', dict_url);
     a.innerHTML = words[i];
     parent.insertBefore(a, x);
     parent.insertBefore(document.createTextNode(' '), x);
    }
 
    parent.removeChild(x);
}

function Replacer(x){
    var kids = x.childNodes;
  
    for ( var j = kids.length - 1; j >= 0; --j )
      {

        if (kids[j].nodeType == 3)
          ReplaceText(kids[j]);
        else if(typeof kids[j].tagName === 'undefined')
            Replacer(kids[j]);        
        else if (kids[j].tagName.toLowerCase() != "a")
          Replacer(kids[j]);
      }
  }
   



var language = "";
chrome.runtime.sendMessage({method: "getLang"}, function(response) {
	language= response.lang;
  Replacer(document.body);

});



