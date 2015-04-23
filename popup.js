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
    chrome.runtime.sendMessage({method: "updateInspiration"}, function(response) {});
    
  };

  }
    

});



