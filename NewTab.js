function startTime() 
{
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

function checkTime(i) 
{
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
}

/*
function backgroundRandom(){
    var bgArray = ['http://goo.gl/Ir6y9D','http://goo.gl/jZsq5N','http://goo.gl/ZtTu3k','http://goo.gl/UEZF6m','http://goo.gl/Id0ak9','http://goo.gl/PaFNLs','http://goo.gl/hTvKpR','http://goo.gl/53bnNL','http://goo.gl/GkMbgt','http://goo.gl/U0OCiy','http://goo.gl/8XLCoq'];
    var bg = "url('"+bgArray[Math.floor(Math.random() * bgArray.length)]+"')";
    // If you have defined a path for the images
                var path = 'images/bg/';

                // then you can put it right before the variable 'bg'
                $('body').css('background', path+bg);

                $('body').css('background-image', bg);
}
*/
//called on page load
window.addEventListener('load', startTime);
window.addEventListener('load', getNotification);
//window.addEventListener('load', backgroundRandom);

