if(localStorage.lang) {
  createTranslationMenu(localStorage.lang);
  updateUIonly(localStorage.lang);
} else {
  createTranslationMenu('ak');
  updateUIonly('ak');
}
var langdata = getData(localStorage.lang);


