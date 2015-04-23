


function getLanguage() {
  if (localStorage.lang) {
    return localStorage.lang;
  }else {
    return 'ak';
  }
}



function startTime() 
{
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('currentTime').innerHTML = h+":"+m+":"+s;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) 
{
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}


function getNotification(){
 // chrome.runtime.sendMessage({method: "getInspiration"}, function(response) {
    language = getLanguage();
    inspiration = getInspiration();

    $('#inspiration').text(inspiration[0]);
    $('#day').text(inspiration[2]);

    $('#by').html("<a style=' color: #fff; font-weight: lighter; text-decoration:none; ' href='http://" + language + ".kasahorow.org?utm_campaign=newtab&utm_source=chrome&utm_medium=" + language + "'>kasahorow</a>");

    $('#notification').show().fadeIn(1000);
 // });
}

function backgroundRandom(){
    var bgArray = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'];
    // If you have defined a path for the images
    var path = 'images/';
    var bg = "url('"+path+bgArray[Math.floor(Math.random() * bgArray.length)]+"')";

    // then you can put it right before the variable 'bg'
    $('body').css('background-image', bg);
}



$('.share').click(function(event) {
  var txt = $('#inputText').val();
  var url = $(this).attr('service');
  chrome.runtime.sendMessage({method: "getData"}, function(response) {
   var data = response.data_info;
    window.open(url+encodeURIComponent(txt)+ " %23"+(data["language"]).replace(" ","_") +" %23kasahorow @kasahorow");

  });
  //var data = getData(localStorage.lang);
});


$('.translate').click(function(event) {

  var txt = $('#inputText').val();
  var url = $(this).attr('service');
  var languageSymbol = localStorage.lang;
  window.open(url+encodeURIComponent(txt)+ "&fl=en&tl="+languageSymbol);
});



//inspiration



//to update inspiration locally instead of multiple json calls.
function updateInspiration() {
  var by ;
  var day ;
  var inspiration ;
  var language = getLanguage();

  var xhr = new XMLHttpRequest();
    //gets the JSON feed
  url = 'http://' + language + '.kasahorow.org/app/m?format=json&source=chrome';
  //notification_url = 'http://' + language + '.kasahorow.org/app/b' +'?utm_campaign=read&utm_medium='+ language + '&utm_source=chrome';

  //synchronization true, as not to show tab or pop up before changing the notification.
  xhr.open("GET", url, true);
  xhr.onreadystatechange=function() {
          //Works after getting the feed
            if (xhr.readyState == 4 && this.status == 200) {
                var res = JSON.parse(xhr.response);
                by = res["by"];
                day = res["day"];
                inspiration = res["inspiration"];
                
                localStorage.by = by;
                localStorage.day = day;
                localStorage.inspiration = inspiration;
                localStorage.updateDate = (new Date()).toDateString();
                localStorage.inspiration_language = language;
                

            }
    };
    xhr.send();

  return 0;
}

if (!localStorage.updateDate){
  updateInspiration();
}

function getInspiration(){
  var today = (new Date()).toDateString();

  if (!localStorage.updateDate){

    return updateInspiration();
  }
  else if (localStorage.updateDate !== today){
    return updateInspiration();

  }else if(localStorage.inspiration_language != getLanguage()){
    
    return updateInspiration();
  }
  else{
    return [localStorage.inspiration, localStorage.by,localStorage.day];
  }

}






//called on page load
window.addEventListener('load', startTime);
window.addEventListener('load', getNotification);
window.addEventListener('load', backgroundRandom);



