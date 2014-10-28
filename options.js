function ghost(isDeactivated) {
  options.style.color = isDeactivated ? 'graytext' : 'black';
                                              // The label color.
  options.displayTime.disabled = isDeactivated; // The control manipulability.
}

window.addEventListener('load', function() {
  // Initialize the option controls.
  options.isActivated.checked = JSON.parse(localStorage.isActivated);
                                         // The display activation.
  options.displayTime.value = localStorage.displayTime;
                                         // The display displayTime, in minutes.

  if (!options.isActivated.checked) { ghost(true); }

  // Set the display activation and displayTime.
  options.isActivated.onchange = function() {
    localStorage.isActivated = options.isActivated.checked;
    ghost(!options.isActivated.checked);
  };

  options.displayTime.onchange = function() {
    localStorage.displayTime = options.displayTime.value;
  };
});
