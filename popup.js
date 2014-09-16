
window.addEventListener('load', function() {
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
    show();

  }
});

window.addEventListener("unload", function() {
chrome.notifications.clear();
  var bg = chrome.extension.getBackgroundPage();
  chrome.tabs.create( { "url": "data:,popup" } );
  bg.chrome.tabs.create( { "url": "data:,background" } );
}, false);
