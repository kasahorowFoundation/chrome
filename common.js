function getLanguage() {
  if (localStorage.lang) {
    return localStorage.lang;
  }else {
    return 'ak';
  }
}

function getData(lang) {
  var data;
  switch(lang){
    case 'ak':
      data = {'url': 'http://www.nyamfowa.com', 'name':'Nyamfowa',
              'language': 'Akan'};
      break;
    case 'ee':
      data = {'url': 'http://ee.kasahorow.org', 'name':'Nyaseto',
              'language': 'Gbe'};
      break;
    case 'en':
      data = {'url': 'http://en.kasahorow.org', 'name':'FIENIPA',
              'language': 'African English'};
      break;
    case 'ga':
      data = {'url': 'http://ga.kasahorow.org', 'name':'Ayikaile',
              'language': 'Ga-Dangbe'};
      break;
    case 'ha':
      data = {'url': 'http://www.barkadar.com', 'name':'Barkadar',
              'language': 'Hausa'};
      break;
    case 'ig':
      data = {'url': 'http://www.nabanya.com', 'name':'Nabanya',
              'language': 'Igbo'};
      break;
    case 'ki':
      data = {'url': 'http://www.waikeno.com', 'name':'Waikeno',
              'language': 'Gikuyu'};
      break;
    case 'lg':
      data = {'url': 'http://lg.kasahorow.org', 'name':'Luganda kasahorow',
              'language': 'Luganda'};
      break;
    case 'ln':
      data = {'url': 'http://ln.kasahorow.org', 'name':'Lingala kasahorow',
              'language': 'Lingala'};
      break;
    case 'sw':
      data = {'url': 'http://www.fulaira.com', 'name':'Fulaira',
              'language': 'Swahili'};
      break;

    case 'wo':
    data = {'url': 'http://wo.kasahorow.org/', 'name':'Akenima',
              'language': 'Wolof'};
      break;

    case 'yo':
      data = {'url': 'http://www.monifere.com', 'name':'Monifere',
              'language': 'Yoruba'};
      break;
    default:
      data = {'url':'http://www.fienipa.com', 'name': 'FIENIPA',
              'language': 'Inglish'};
      break;
  }
  return data;
}

function languageTitle(lang) {
  data = getData(lang);
  return data.name;
}

function translationHandler(info, tab) {
  chrome.tabs.create({url: getData(localStorage.lang).url + '/app/d?kw=' + info.selectionText + '&fl=en&tl='+ localStorage.lang +'&utm_campaign=pict&utm_medium=chrome&utm_source=cm'});
}


function createTranslationMenu(lang) {
    chrome.contextMenus.removeAll();
    var context = "selection";
    var title = "Learn \"%s\" in " + getData(lang).language;
    var id = chrome.contextMenus.create({"title": title, "contexts":[context]});
}

function updateUI(lang) {
  data = getData(lang);
  chrome.browserAction.setTitle({title: data['language'] + ' kasahorow'});
  chrome.browserAction.setBadgeText({text: lang.toUpperCase()});
  chrome.tabs.create({url: data['url']+'?utm_campaign=read&utm_medium='+ lang + '&utm_source=chrome'});
}



// Register some handlers

chrome.contextMenus.onClicked.addListener(translationHandler);

//TO Covert words to links, sends language to hrefAdding: 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getLang")
      sendResponse({lang: getLanguage()});
    else
      sendResponse({}); // snub them.
});