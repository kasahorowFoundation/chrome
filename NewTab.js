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
  chrome.runtime.sendMessage({method: "getInspiration"}, function(response) {
    language = getLanguage();
    inspiration = response.inspiration;
    $('#inspiration').text(inspiration[0]);
    $('#day').text(inspiration[2]);

    $('#by').html("<a style=' color: #fff; font-weight: lighter; text-decoration:none; ' href='http://" + language + ".kasahorow.org?utm_campaign=newtab&utm_source=chrome&utm_medium=" + language + "'>kasahorow</a>");

    $('#notification').show().fadeIn(1000);
  });
}

function backgroundRandom(){
    console.log('setting background');
    var bgArray = ['1.jpg','2.jpg','3.jpg','4.jpg','5.jpg'];
    // If you have defined a path for the images
    var path = 'images/';
    var bg = "url('"+path+bgArray[Math.floor(Math.random() * bgArray.length)]+"')";

    // then you can put it right before the variable 'bg'
    $('body').css('background-image', bg);
    console.log(path+bg);

    //$('body').css('background-image', bg);
}



$('.share').click(function(event) {
  var txt = $('#inputText').val();
  var url = $(this).attr('service');
  var data = getData(localStorage.lang);
  window.open(url+encodeURIComponent(txt)+ " %23"+data["language"]+" %23kasahorow @kasahorow");
});


$('.translate').click(function(event) {

  var txt = $('#inputText').val();
  var url = $(this).attr('service');
  var languageSymbol = localStorage.lang;
  window.open(url+encodeURIComponent(txt)+ "&fl=en&tl="+languageSymbol);
});




//called on page load
window.addEventListener('load', startTime);
window.addEventListener('load', getNotification);
window.addEventListener('load', backgroundRandom);



