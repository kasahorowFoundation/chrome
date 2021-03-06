function getLanguage() {
  if (localStorage.lang) {
    return localStorage.lang;
  }else {
    return 'ak';
  }
}

// Conditionally initialize the options.
if (!localStorage.isInitialized) {
  localStorage.isActivated = true;   // The display activation.
  localStorage.displayTime = 6;        // The display localStorage.displayTime.
  localStorage.isInitialized = true; // The option initialization.
}


function getData(lang) {
  var data;
  switch(lang){
    case 'ak':
      data = {'url': 'http://ak.kasahorow.org', 'name':'Nyamfowa',
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
    case 'ge':
      data = {'url': 'http://ge.kasahorow.org', 'name':'Ayikaile',
              'language': 'GaDangme'};
      break;
    case 'ha':
      data = {'url': 'http://ha.kasahorow.org', 'name':'Barkadar',
              'language': 'Hausa'};
      break;
    case 'ig':
      data = {'url': 'http://ig.kasahorow.org', 'name':'Nabanya',
              'language': 'Igbo'};
      break;
    case 'ki':
      data = {'url': 'http://ki.kasahorow.org', 'name':'Waikeno',
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
    case 'lw':
      data = {'url': 'http://lw.kasahorow.org', 'name':'Luwo kasahorow',
              'language': 'Luwo'};
      break;
    case 'mg':
      data = {'url': 'http://mg.kasahorow.org', 'name':'Malagasy kasahorow',
              'language': 'Malagasy'};
      break;
    case 'ny':
      data = {'url': 'http://ny.kasahorow.org', 'name':'Chewa kasahorow',
              'language': 'Chewa'};
      break;
    case 'om':
      data = {'url': 'http://om.kasahorow.org', 'name':'Oromo kasahorow',
              'language': 'Oromo'};
      break;

    case 'rw':
      data = {'url': 'http://rw.kasahorow.org', 'name':'Ururimi',
              'language': 'Ururimi'};
      break;


    case 'sn':
      data = {'url': 'http://sn.kasahorow.org', 'name':'Shona kasahorow',
              'language': 'Shona'};
      break;


    case 'sw':
      data = {'url': 'http://sw.kasahorow.org', 'name':'Fulaira',
              'language': 'Swahili'};
      break;

    case 'wo':
      data = {'url': 'http://wo.kasahorow.org', 'name':'Akenima',
              'language': 'Wolof'};
      break;

  

    case 'yo':
      data = {'url': 'http://yo.kasahorow.org', 'name':'Monifere',
              'language': 'Yoruba'};
      break;
    case 'zu':
      data = {'url': 'http://zu.kasahorow.org', 'name':'Zulu kasahorow',
              'language': 'Zulu'};
      break;

    default:
      data = {'url':'http://en.kasahorow.org', 'name': 'FIENIPA',
              'language': 'Inglish'};
      break;
  }
  return data;
}

function languageTitle(lang) {
  data = getData(lang);
  return data.name;
}

function getlanguageName(lang) {
  data = getData(lang);
  return data.language;
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

  //chrome.browserAction.setTitle({title: data['language'] + ' kasahorow'});
  chrome.browserAction.setBadgeText({text: lang.toUpperCase()});   
  chrome.tabs.create({url: data['url']+'/app/b?utm_campaign=read&utm_medium='+ lang + '&utm_source=chrome'});


}

function updateUIonly(lang) {
  
  data = getData(lang);


  //chrome.browserAction.setTitle({title: data['language'] + ' kasahorow'});
  //chrome.browserAction.setBadgeText({text: lang.toUpperCase()});
  //chrome.tabs.create({url: data['url']+'/app/b?utm_campaign=read&utm_medium='+ lang + '&utm_source=chrome'});
}




// Register some handlers

chrome.contextMenus.onClicked.addListener(translationHandler);

//TO Covert words to links, sends language to hrefAdding: 
chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if(request.method == "updateInspiration"){
      updateInspiration();
    }
    else if (request.method == "getLang")
      sendResponse({lang: getLanguage()});
    else if (request.method == "getData"){
      sendResponse({data_info: getData(getLanguage())});

    }
    else
      sendResponse({}); // snub them.
});



function changeBadgeText()
{
  var now = new Date();
  var today= now.getDate()+"";
  chrome.browserAction.setBadgeText({text: today});
}
  


// Change date daily

//gets current time
var now = new Date();

//see the difference between current time and 12 (0) am.
var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 0, 0, 0, 0) - now;
  
if (millisTill10 < 0) {
    millisTill10 += 86400000; // it's after 6am, try 6am tomorrow.
}
  
//change UI
setTimeout(function(){  if(localStorage.isActivated){ changeBadgeText() }  }, millisTill10);
changeBadgeText();

