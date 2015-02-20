window.addEventListener('load', function() {

  var options = document.getElementById('options');
  if(options) {
  // Initialize the option controls.
  options.lang.value = localStorage.lang;
  getNotification();

  // Save the display language.
  options.lang.onchange = function() {
    localStorage.lang = options.lang.value;
    createTranslationMenu(localStorage.lang);
    updateUI(localStorage.lang);
    
  };

  }
    

});


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




function getNotification(){

  chrome.runtime.sendMessage({method: "getInspiration"}, function(response) {
      inspiration = response.inspiration;
                $('#by').text(inspiration[1]);
                $('#inspiration').text(inspiration[0]);
                $('#day').text(inspiration[2]);

  });

        


$('#notification').show().fadeIn(1000);
          //return r;
 }
