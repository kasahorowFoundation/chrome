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

function getNotification()
{
    url_link = 'http://' + localStorage.lang + '.kasahorow.org/app/m?format=json&source=chrome';

    $.ajax({
            url:url_link, 
            dataType:"JSON",
            async:false,
            success:function(r)
            { 
              $('#by').text(r["by"]);
              $('#inspiration').text(r["inspiration"]);
              $('#day').text( r["day"]);
            }
          });

    $('#notification').show().fadeIn(1000);
}


//called on page load
window.addEventListener('load', startTime);
window.addEventListener('load', getNotification);