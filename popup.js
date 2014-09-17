
window.addEventListener('load', function() {
  var options = document.getElementById('options');
  if(options) {
  // Initialize the option controls.
  options.lang.value = localStorage.lang;

  //Calls show notification from inspiration.js, tht shows a notification from json feed
  show();
  

  // The display language

  // Save the display language.
  options.lang.onchange = function() {
    localStorage.lang = options.lang.value;
    createTranslationMenu(localStorage.lang);
    updateUI(localStorage.lang);
  };

  }
});