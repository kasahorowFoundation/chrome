/*
 * kasahorow Web Input Method
 */

var charMaps = {
  "ak": {"q":"ɛ", "Q":"Ɛ", "x":"ɔ", "X":"Ɔ"},
  "ga": {"c":"ŋ", "C":"Ŋ", "q":"ɛ", "Q":"Ɛ", "x":"ɔ", "X":"Ɔ"},
  "ig": {"q":"ị", "Q":"Ị", "x":"ọ", "X":"Ọ"},
  "ki": {"q":"ĩ", "Q":"Ĩ", "x":"ũ", "X":"Ũ"},
  "mo": {"c":"ɩ", "C":"Ɩ", "j":"", "J":"", "q":"ɛ", "Q":"Ɛ", "x":"ʋ", "X":"Ʋ"},
  "sw": {"q":"", "Q":"", "x":"", "X":""},
  "yo": {"q":"ẹ", "Q":"Ẹ", "x":"ọ", "X":"Ọ", "v":"ṣ", "V":"Ṣ"},
  "gbe": {}
};
function getName(lang){
  name = 'kasahorow';
  return name;
}

function getMaps(lang){
  maps = {};
  if(lang in charMaps){
    maps = charMaps[lang];
  } //what about the rest of languages?!!
  return maps;
}

var pl = getLanguage();
var letterSubs = getMaps(pl);

try{
$(document).ready(function(event){
    $(document).delegate("textarea", "keyup", function(event){
        var cleanedValue = $(this).val();
        for(var l in letterSubs){
          cleanedValue = cleanedValue.replace(l, letterSubs[l]) ;
        }
        $(this).val(cleanedValue);
    });


});

} catch(e){
  console.log('Make sure JQuery is loaded before this script is included in your file:' + e );
}