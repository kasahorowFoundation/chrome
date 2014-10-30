function ReplaceText(x)
{
   var str = x.textContent;

   var words = str.split(" ");

   var wordsLength = words.length;
   var parent = x.parentNode;
 
   for (var i = 0; i < wordsLength; ++i) {
     dict_url = 'http://' + language + '.kasahorow.org/app/d?kw='+  words[i] + '&fl='+ language +'&tl=en';
     var a = document.createElement('a');
     a.setAttribute('href', dict_url);
     a.innerHTML = words[i] + " ";
     parent.insertBefore(a, x);
    }
 
    parent.removeChild(x);
}



function Replacer(x){
    var kids = x.childNodes;
  
    for ( var j = kids.length - 1; j >= 0; --j )
      {
        if (kids[j].nodeType == 3)
          ReplaceText(kids[j]);
        else if (kids[j].tagName != "a")
          Replacer(kids[j]);
      }
  }
   


var language = "";
chrome.runtime.sendMessage({method: "getLang"}, function(response) {
  alert("I work on this page");
	language= response.lang;
  Replacer(document.body);

});



