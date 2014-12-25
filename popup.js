window.addEventListener('load', function() {

  var options = document.getElementById('options');
  if(options) {
  // Initialize the option controls.
  options.lang.value = localStorage.lang;

  // Save the display language.
  options.lang.onchange = function() {
    localStorage.lang = options.lang.value;
    createTranslationMenu(localStorage.lang);
    updateUI(localStorage.lang);
  };

  }
    getNotification();

});


$('#btn').click(function(event) {
  //action on clicking on showing notification button .
  show();
});

$('.share').click(function(event) {
  var txt = $('#inputText').val();
  var url = $(this).attr('service');
  var data = getData(localStorage.lang);
  window.open(url+encodeURIComponent(txt)+ " %23"+data["language"]+" %23kasahorow @kasahorow");
});



function getNotification(){
  url_link = 'http://' + localStorage.lang + '.kasahorow.org/app/m?format=json&source=chrome';

          $.ajax({
              url:url_link, 
              dataType:"JSON",
              async:false,
              success:function(r){ 
          

          $('#by').text("by: " + r["by"]);
          $('#inspiration').text("inspiration: " + r["inspiration"]);
          $('#day').text("day: "+ r["day"]);

            

              }


          });

          //return r;
 }
