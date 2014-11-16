/*
 * kasahorow Cloud Keyboard
 */

var charMaps = {
  "ak": {"q":"ɛ", "Q":"Ɛ", "x":"ɔ", "X":"Ɔ"},
  "ga": {"c":"ŋ", "C":"Ŋ", "q":"ɛ", "Q":"Ɛ", "x":"ɔ", "X":"Ɔ"},
  "ig": {"q":"ị", "Q":"Ị", "x":"ọ", "X":"Ọ"},
  "ki": {"q":"ĩ", "Q":"Ĩ", "x":"ũ", "X":"Ũ"},
  "mo": {"c":"ɩ", "C":"Ɩ", "j":"", "J":"", "q":"ɛ", "Q":"Ɛ", "x":"ʋ", "X":"Ʋ"},
  "sw": {"q":"", "Q":"", "x":"", "X":""},
  "yo": {"q":"ẹ", "Q":"Ẹ", "x":"ọ", "X":"Ọ", "v":"ṣ", "V":"Ṣ"},
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

//https://github.com/accursoft/caret
(function($) {
  $.fn.caret = function(pos) {
    var target = this[0];
	var isContentEditable = target.contentEditable === 'true';
    //get
    if (arguments.length == 0) {
      //HTML5
      if (window.getSelection) {
        //contenteditable
        if (isContentEditable) {
          target.focus();
          var range1 = window.getSelection().getRangeAt(0),
              range2 = range1.cloneRange();
          range2.selectNodeContents(target);
          range2.setEnd(range1.endContainer, range1.endOffset);
          return range2.toString().length;
        }
        //textarea
        return target.selectionStart;
      }
      //IE<9
      if (document.selection) {
        target.focus();
        //contenteditable
        if (isContentEditable) {
            var range1 = document.selection.createRange(),
                range2 = document.body.createTextRange();
            range2.moveToElementText(target);
            range2.setEndPoint('EndToEnd', range1);
            return range2.text.length;
        }
        //textarea
        var pos = 0,
            range = target.createTextRange(),
            range2 = document.selection.createRange().duplicate(),
            bookmark = range2.getBookmark();
        range.moveToBookmark(bookmark);
        while (range.moveStart('character', -1) !== 0) pos++;
        return pos;
      }
      // Addition for jsdom support
      if (target.selectionStart)
        return target.selectionStart;
      //not supported
      return 0;
    }
    //set
    if (pos == -1)
      pos = this[isContentEditable? 'text' : 'val']().length;
    //HTML5
    if (window.getSelection) {
      //contenteditable
      if (isContentEditable) {
        target.focus();
        window.getSelection().collapse(target.firstChild, pos);
      }
      //textarea
      else
        target.setSelectionRange(pos, pos);
    }
    //IE<9
    else if (document.body.createTextRange) {
      if (isContentEditable) {
        var range = document.body.createTextRange();
        range.moveToElementText(target);
        range.moveStart('character', pos);
        range.collapse(true);
        range.select();
      } else {
        var range = target.createTextRange();
        range.move('character', pos);
        range.select();
      }
    }
    if (!isContentEditable)
      target.focus();
    return pos;
  }
})(jQuery);




var pl = getLanguage();
var letterSubs = getMaps(pl);

try{
$(document).ready(function(event){
    $(document).delegate("input, textarea", "keyup", function(event){
        var cleanedValue = $(this).val();
        var caretPos =  $(this).caret();
console.log(caretPos);
        for(var l in letterSubs){
          cleanedValue = cleanedValue.replace(l, letterSubs[l]) ;
        }
        $(this).val(cleanedValue);
        $(this).caret(caretPos);
    });


});

} catch(e){
  console.log('Make sure JQuery is loaded before this script is included in your file:' + e );
}
