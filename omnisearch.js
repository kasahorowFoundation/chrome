
var omnidata = getData(localStorage.lang);
chrome.omnibox.onInputEntered.addListener(
  function(text) {
    //console.log('inputEntered: ' + text);
    chrome.tabs.create({url: omnidata.url + '/app/d?kw=' + text + '&fl=en&tl='+ localStorage.lang +'&utm_campaign=pict&utm_medium=chrome&utm_source=omni'});
  }
);

chrome.omnibox.onInputChanged.addListener(
  function(text, suggest) {
    //console.log('inputChanged: ' + text);
    suggest([
      //{content: text, description: 'Translate "' + text + '" from English to ' + omnidata.language + ' on ' + omnidata.name },
      {content: "a " + text, description: 'Learn "a ' + text + '" in ' + omnidata.language },
      {content: "the " + text, description: 'Learn "the ' + text + '" in ' + omnidata.language },
      {content: "my " + text, description: 'Learn "my ' + text + '" in ' + omnidata.language },
    ]);
  });

