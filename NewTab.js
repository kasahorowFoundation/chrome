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


function updateNewTabPage(){
 // chrome.runtime.sendMessage({method: "getInspiration"}, function(response) {
    language = getLanguage();
    $(".lang-name").text(getlanguageName(language))
    inspiration = getInspiration();

    $('#inspiration').text(inspiration[0]);
    $('#day').text(inspiration[2]);

    $('#by').html("<a style='color: #fff; font-weight: lighter; text-decoration:none;' target='_blank' href='http://" + language + ".kasahorow.org?utm_campaign=newtab&utm_source=chrome&utm_medium=" + language + "'>kasahorow</a>");

    $('#notification').show().fadeIn(1000);
 // });
}

function backgroundRandom(){
    var bgArray = ['1.webp','2.webp','3.webp', '4.webp', '5.webp', '6.webp'];
    var path = '../images/';
    var background = path+bgArray[Math.floor(Math.random() * bgArray.length)];
    var bg = "linear-gradient(rgba(0, 0, 0, 0.5),rgba(0, 0, 0, 0.5)), url('"+background+"')";

    $('html').css('background-image', bg);
}


$('.repeat-btn').click(function(event) {
  backgroundRandom();
});
$('.share').click(function(event) {
  var txt = $('#inputText').val();
  var url = $(this).attr('service');
  chrome.runtime.sendMessage({method: "getData"}, function(response) {
   var data = response.data_info;
    window.open(url+encodeURIComponent(txt)+ " %23"+(data["language"]).replace(" ","_") +" %23kasahorow @kasahorow");

  });
});


$('.translate').click(function(event) {
  var txt = $('#inputText').val();
  var url = $(this).attr('service');
  var languageSymbol = getLanguage();
  window.open(url+encodeURIComponent(txt)+ "&fl=en&tl="+languageSymbol);
});


$('.dictionary').click(function(e) {
  var select_text = $('#dict_text').val();
  var languageSymbol = getLanguage();
  var url = "http://" + languageSymbol + ".kasahorow.org/app/d?kw=";
  window.open(url+encodeURIComponent(select_text) + "&tl=en&fl="+languageSymbol+"&utm_source="+e.type+"&utm_campaign=k&utm_medium="+languageSymbol);
});



$('.watch').click(function(event) {
  var languageSymbol = getLanguage();
  url = "http://"+ languageSymbol +".kasahorow.org/tv"
  window.open(url);
});


//to update inspiration locally instead of multiple json calls.
function updateInspiration() {
  var by;
  var day;
  var inspiration ;
  var language = getLanguage();
  var xhr = new XMLHttpRequest();
  var now = new Date();
  var da = ('0' +(now.getMonth()+1)).slice(-2)+('0' +now.getDate()).slice(-2);
  url = 'http://' + language + '.kasahorow.org/app/m?format=json&source=chrome&da='+da;

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
  return [getlanguageName(language) + ' kasahorow', 'kasahorow', now.getFullYear() + '-' + da.slice(0, 2) + '-' + da.slice(-2)];
}

function getInspiration(){
  var today = (new Date()).toDateString();
  if (!localStorage.updateDate){
    return updateInspiration();
  }else if (localStorage.updateDate !== today){
    return updateInspiration();
  }else if(localStorage.inspiration_language != getLanguage()){
    return updateInspiration();
  }else{
    return [localStorage.inspiration, localStorage.by,localStorage.day];
  }
}



/** Open Chrome Internal URLS **/

function openNetInternals() { 
  chrome.tabs.create({url: 'chrome://net-internals/'});
}

//called on page load
window.addEventListener('load', startTime);
window.addEventListener('load', updateNewTabPage);
window.addEventListener('load', backgroundRandom);

if (!localStorage.updateDate){
  updateInspiration();
  updateNewTabPage();
}
