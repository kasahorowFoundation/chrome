/*
  Displays a notification with json feed daily at 6 am from kasahorow
*/

function show() {
  var by ;
  var day ;
  var inspiration ;
  var language = getLanguage();
  var data = getData(language); 

  var xhr = new XMLHttpRequest();
    //gets the JSON feed
  url = 'http://' + language + '.kasahorow.org/app/m?format=json&source=chrome';
  notification_url = 'http://' + language + '.kasahorow.org/app/b' +'?utm_campaign=read&utm_medium='+ language + '&utm_source=chrome';

  xhr.open("GET", url, true);
  xhr.onreadystatechange=function() {
          //Works after getting the feed
            if (xhr.readyState == 4) {
                var res = JSON.parse(xhr.response);
                 by = res["by"];
                 day = res["day"];
                 inspiration = res["inspiration"];

                                //gets current time
                                var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
                                var hour = time[1] % 12 || 12;               // The prettyprinted hour.
                                var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
                                //display the notification
                               var notification =  new Notification(by + ". "+ hour + time[2] + ' ' + period, {
                                  icon: 'icon48.png',
                                  body: inspiration + "\n\n" +  day
                                });

                                notification.onclick = function () {
                                  window.open(notification_url);
                                  notification.close();
                                }

            }
    };
    xhr.send();
    
  
}

/*

// Test for notification support.
if (window.Notification) {
  

  //gets current time
  var now = new Date();

  //see the difference between current time and 6 am.
  var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), localStorage.displayTime, 0, 0, 0) - now;
  
  if (millisTill10 < 0) {
     millisTill10 += 86400000; // it's after 6am, try 6am tomorrow.
  }
  
  //push the desktop notification
  setTimeout(function(){  if(localStorage.isActivated){ show() }  }, millisTill10);

} 
else
{
  //if window.notification is not working properly this will run. 
  console.log("your window doesn't support notifications")
}
*/


//Inspiration notification is not used at all now.




//to update inspiration locally instead of multiple json calls.
function updateInspiration() {
  var by ;
  var day ;
  var inspiration ;
  var language = getLanguage();

  var xhr = new XMLHttpRequest();
    //gets the JSON feed
  url = 'http://' + language + '.kasahorow.org/app/m?format=json&source=chrome';
  notification_url = 'http://' + language + '.kasahorow.org/app/b' +'?utm_campaign=read&utm_medium='+ language + '&utm_source=chrome';

  xhr.open("GET", url, true);
  xhr.onreadystatechange=function() {
          //Works after getting the feed
            if (xhr.readyState == 4) {
                var res = JSON.parse(xhr.response);
                by = res["by"];
                day = res["day"];
                inspiration = res["inspiration"];
                
                localStorage.by = by;
                localStorage.day = day;
                localStorage.inspiration = inspiration;
                localStorage.updateDate = (new Date()).toDateString();
                

            }
    };
    xhr.send();
    
  
}

if (!localStorage.updateDate){
  updateInspiration();
}

function getInspiration(){
  var today = (new Date()).toDateString();
  if (!localStorage.updateDate){
    updateInspiration();
  }
  else if (localStorage.updateDate == today){
    updateInspiration();
  }
  return [localStorage.inspiration, localStorage.by,localStorage.day];
}

chrome.runtime.onMessage.addListener(function(request, sender, sendResponse) {
    if (request.method == "getInspiration")
      sendResponse({inspiration: getInspiration()});
    else
      sendResponse({}); // snub them.
});

