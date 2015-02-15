function startTime() {
    var today=new Date();
    var h=today.getHours();
    var m=today.getMinutes();
    var s=today.getSeconds();
    if(h > 12) {
      $("body").addClass('afternoon');
    }else {
      $("body").removeClass('afternoon');
    }
    m = checkTime(m);
    s = checkTime(s);
    document.getElementById('currentTime').innerHTML = h+":"+m+":"+s;
    var t = setTimeout(function(){startTime()},500);
}

function checkTime(i) {
    if (i<10) {i = "0" + i};  // add zero in front of numbers < 10
    return i;
}

function getNotification(){
  language = getLanguage();
  url_link = 'http://' + language + '.kasahorow.org/app/m?format=json&source=chrome';

          $.ajax({
              url:url_link, 
              dataType:"JSON",
              async:false,
              success:function(r){ 
          
          $('#inspiration').text(r["inspiration"]);
          $('#day').text( r["day"]);


              }


          });
          $('#by').html("<a style=' color: #fff; font-weight: lighter; text-decoration:none; ' href='http://" + language + ".kasahorow.org'>kasahorow</a>");

$('#notification').show().fadeIn(1000);
          //return r;
 }


//called on page load
window.addEventListener('load', startTime);
window.addEventListener('load', getNotification);
