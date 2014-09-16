/*
  Displays a notification with json feed daily at 6 am from kasahorow
*/

function show() {
  var by ;
  var day ;
  var inspiration ;
  var language = getLanguage()
  var data = getData(language); 
  console.log(data['name'] + " notifications");

  var xhr = new XMLHttpRequest();
    //gets the JSON feed
  url = 'http://' + language + '.kasahorow.org/app/m?format=json&source=chrome';
  console.log('Getting JSON from ' + url);  
  xhr.open("GET", url, true);
  xhr.onreadystatechange=function() {
          //Works after getting the feed
            if (xhr.readyState == 4) {
                var res = JSON.parse(xhr.response);
                 by = res["by"];
                 day = res["day"];
                 inspiration = res["inspiration"];
                                console.log(inspiration + "\n by:" + by + " ," + day);

                                //gets current time
                                var time = /(..)(:..)/.exec(new Date());     // The prettyprinted time.
                                var hour = time[1] % 12 || 12;               // The prettyprinted hour.
                                var period = time[1] < 12 ? 'a.m.' : 'p.m.'; // The period of the day.
                                //display the notification
                                new Notification(by + ". "+ hour + time[2] + ' ' + period, {
                                  icon: 'icon48.png',
                                  body: inspiration + "\n\n" +  day
                                });
            }
    };
    xhr.send();
    
  
}


// Test for notification support.
if (window.Notification) {
  

  //gets current time
  var now = new Date();

  //see the difference between current time and 6 am.
  var millisTill10 = new Date(now.getFullYear(), now.getMonth(), now.getDate(), 6, 0, 0, 0) - now;
  
  if (millisTill10 < 0) {
     millisTill10 += 86400000; // it's after 6am, try 6am tomorrow.
  }
  
  //psuh the desktop notification
  setTimeout(function(){show()}, millisTill10);

} 
else{

  console.log("your window doesn't support notifications")
}


