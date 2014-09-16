
if(localStorage.lang) {
  createTranslationMenu(localStorage.lang);
  updateUI(localStorage.lang);
} else {
  createTranslationMenu('ak');
  updateUI('ak');
}
var langdata = getData(localStorage.lang);

