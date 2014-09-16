
window.addEventListener('load', function() {
  show();
  var options = document.getElementById('options');
  if(options) {
  // Initialize the option controls.
  options.lang.value = localStorage.lang;
                                         // The display language

  // Save the display language.
  options.lang.onchange = function() {
    localStorage.lang = options.lang.value;
    createTranslationMenu(localStorage.lang);
    updateUI(localStorage.lang);
  };

  }
});
