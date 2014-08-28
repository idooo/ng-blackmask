/**
 * Blackmask input mask version 1.0.0
 * License: MIT.
 * Alex Shteinikov
 */
 
(function(window, angular, undefined) {
    'use strict';

    angular.module('blackMask', [])
        .directive('bmNumbersMask', function () {

            return {
                restrict: 'A',
                replace: false,
                scope: {
                    maxLength: '=',
                    placeholder: '@'
                },
                require: '?ngModel',
                link: function (scope, element, attrs, ctrl) {
                    if (!ctrl) return;
                    
                    var placeholderChar = '_';
                    if (typeof scope.placeholder !== 'undefined') {
                        placeholderChar = scope.placeholder;
                    }

                    var indexOf = function(str) {
                        for (var i=0; i<str.length; i++) {
                            if (str[i] === placeholderChar) return i;
                        }
                        return -1;
                    };

                    var moveCaretToPosition = function(el, position) {
                        if (typeof position === 'undefined') {
                            position = 0;
                        }
                        if (typeof el.selectionStart === "number") {
                            el.selectionStart = el.selectionEnd = position;
                        } else if (typeof el.createTextRange !== "undefined") {
                            var range = el.createTextRange();
                            range.collapse(true);
                            range.moveEnd('character', position);
                            range.moveStart('character', position);
                            range.select();
                        }
                    };

                    var getCaretPosition = function (el) {
                        var caretPosition = 0,
                            placeholderStart = indexOf(el.value);
                        // IE Support
                        if (document.selection) {
                            el.focus();
                            var range = document.selection.createRange();
                            range.moveStart('character', -el.value.length);
                            caretPosition = range.text.length;
                        }
                        else if (el.selectionStart || parseInt(el.selectionStart, 10) === 0) {
                            caretPosition = el.selectionStart;
                        }
                        if (placeholderStart !== -1 && caretPosition > placeholderStart) {
                            caretPosition = placeholderStart;
                        }
                        return caretPosition;
                    };

                    var placeholder = '';
                    for (var i=0; i<scope.maxLength; i++) {
                        placeholder += placeholderChar;
                    }

                    if (isNaN(ctrl.$modelValue) || ctrl.$modelValue.length === 0) {
                        ctrl.$setViewValue(placeholder);
                        ctrl.$render();
                        moveCaretToPosition(element[0]);
                    }

                    element.on('keydown', function(e) {
                        var key = e.keyCode || e.which,
                            caretPosition = getCaretPosition(element[0]);

                        if (key === 8) {
                            scope.caretPosition = caretPosition - 1;
                        }
                        else if (key >= 48 && key <= 57) {
                            scope.caretPosition = caretPosition + 1;
                        }
                        else {
                            scope.caretPosition = caretPosition;
                        }
                        scope.lastKey = key;
                    });

                    ctrl.$parsers.push(function(value) {
                        var formatedValue = '';
                        if (!value) {
                            formatedValue = placeholder;
                        }
                        else if (indexOf(value) === -1 && indexOf(ctrl.$modelValue) === -1 && indexOf(ctrl.$viewValue) === -1 && scope.lastKey !== 8 && scope.lastKey !== 46) {
                            formatedValue = ctrl.$modelValue;
                        }
                        else {
                            formatedValue = (value.replace(/\D/g, '') + placeholder).slice(0, scope.maxLength);
                        }
                        scope.lastKey = -1;

                        if (ctrl.$viewValue !== formatedValue) {
                            ctrl.$setViewValue(formatedValue);
                            ctrl.$render();

                            if (indexOf(formatedValue) > -1) {
                                if (scope.caretPosition === 0) {
                                    scope.caretPosition = indexOf(formatedValue);
                                }
                                moveCaretToPosition(element[0], scope.caretPosition);
                                scope.caretPosition = 0;
                            }
                        }
                        return formatedValue;
                    });
                }
            };
        });

})(window, window.angular);
