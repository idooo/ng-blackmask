!function(a,b){"use strict";b.module("blackMask",[]).directive("bmNumbersMask",function(){return{restrict:"A",replace:!1,scope:{maxLength:"=",placeholder:"@"},require:"?ngModel",link:function(a,b,c,d){if(d){var e="_";"undefined"!=typeof a.placeholder&&(e=a.placeholder);for(var f=function(a){for(var b=0;b<a.length;b++)if(a[b]===e)return b;return-1},g=function(a,b){if("undefined"==typeof b&&(b=0),"number"==typeof a.selectionStart)a.selectionStart=a.selectionEnd=b;else if("undefined"!=typeof a.createTextRange){a.focus();var c=a.createTextRange();c.collapse(!0),c.select()}},h=function(a){var b=0;if(document.selection){a.focus();var c=document.selection.createRange();c.moveStart("character",-a.value.length),b=c.text.length}else(a.selectionStart||"0"==a.selectionStart)&&(b=a.selectionStart);return b},i="",j=0;j<a.maxLength;j++)i+=e;(isNaN(d.$modelValue)||0===d.$modelValue.length)&&(d.$setViewValue(i),d.$render(),g(b[0])),b.on("keydown",function(c){var d=c.keyCode||c.which,e=h(b[0]);a.caretPosition=8===d?e-1:d>=48&&57>=d?e+1:e,a.lastKey=d}),d.$parsers.push(function(c){var e="";return e=c?-1===f(c)&&-1===f(d.$modelValue)&&-1===f(d.$viewValue)&&8!==a.lastKey&&46!==a.lastKey?d.$modelValue:(c.replace(/\D/g,"")+i).slice(0,a.maxLength):i,a.lastKey=-1,d.$viewValue!==e&&(d.$setViewValue(e),d.$render(),f(e)>-1&&(0===a.caretPosition&&(a.caretPosition=f(e)),g(b[0],a.caretPosition),a.caretPosition=0)),e})}}}})}(window,window.angular);