
//returns xpath content:
function select_by_xpath(xpath_selector){ 
  var xpath = document.evaluate(xpath_selector, document, null, XPathResult.FIRST_ORDERED_NODE_TYPE, null);
  if (xpath.singleNodeValue)
    return xpath.singleNodeValue.textContent;
  else
    return "Error";
}

//jquery xpath selector
function _x(STR_XPATH) {
    var xresult = document.evaluate(STR_XPATH, document, null, XPathResult.ANY_TYPE, null);
    var xnodes = [];
    var xres;
    while (xres = xresult.iterateNext()) {
        xnodes.push(xres);
    }

    return xnodes;
}

//xpathes to change: 
//1. //*[@id="header"]/div[2]/text()
//2. //*[@id="header"]/div[3]/text()
//3. /html/body/nav/div

//Wrapper

function Replacer(x){
	 var str = $(x).text();

    var words = str.split(" ");

    var inner = " ";
    var wordsLength = words.length;
	for (var i = 0; i < wordsLength; i++) {
		    dict_url = 'http://' + language + '.kasahorow.org/app/d?kw='+  words[i] + '&fl='+ language +'&tl=en';
		    final_line = '<a href="' + dict_url+ '" >' + words[i] + " </a>";
		    inner = inner + final_line

	}

    $(x).replaceWith(inner);
}

function Wrapper(){
  $(_x('//*[@id="header"]/div[3]/text()')).each(function(){

   Replacer(this);

  });




  $(_x('/html/body/nav/div')).each(function(){

      Replacer(this);

  });

}
var language = "";
chrome.runtime.sendMessage({method: "getLang"}, function(response) {
	language= response.lang;
	Wrapper();
});




