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
});


$('#btn').click(function(event) {
  //action on clicking on showing notification button .
  show();
});

$('.share').click(function(event) {
  var txt = $('#inputText').val();
  var url = $(this).attr('service');
  //console.log('Share ' + txt + ' on ' + $(this).attr('service'));
  window.open(url+encodeURIComponent(txt)+ " @kasahorow");
});

