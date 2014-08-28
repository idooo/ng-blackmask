/**
 * Blackmask input mask version 1.0.0
 * License: MIT.
 * Alex Shteinikov
 */
 
(function(window, angular, undefined) {
    'use strict';

    angular.module('blackMask', [])
        .directive('bmNumbersMask', function ($timeout) {

            return {
                restrict: 'A',
                replace: true,
                scope: {
                    maxLength: '=',
                    placeholder: '@'
                },
                require: '?ngModel',
                template: [
                        '<div class="ng-bm-element">',
                            '<div class="ng-bm-container"></div>',
                            '<input type="hidden">',
                        '</div>'
                    ].join(' '),
                compile: function compile(tElement, tAttrs, transclude) {

                    var container = tElement.find('div');

                    for (var i=0; i<9; i++) {
                        container.append('<input type="text" maxLength="1">');        
                    }

                    return function link(scope, iElement, iAttrs) { 
                        var inputs = container.find('input')
                        inputs.on('keyup', function(e) {
                            var current = this,
                                key = e.keyCode || e.which,
                                prev = this.previousSibling,
                                next = this.nextSibling;

                            if (key === 9) return current.focus();
                            if (key === 37) return prev.focus();
                            if (key === 39) return next.focus();

                            if (key === 8) {
                                $timeout(function() {
                                    current.value = '';
                                    prev.focus()
                                }, 10);
                                return;
                            }

                            if (next && typeof next.focus !== "undefined") {
                                $timeout(function() {
                                    if (current.value.length >= 1) next.focus()
                                }, 10)
                            }
                        });

                        var pasteStr = function(str, input) {
                            input.value = str[0];
                            if (str.length > 1 && input.nextSibling) pasteStr(str.slice(1), input.nextSibling)
                        };

                        inputs.on('paste', function(e) {
                            var pastedText = undefined,
                                current = this;

                            if (window.clipboardData && window.clipboardData.getData) { // IE
                                pastedText = window.clipboardData.getData('Text');
                            } else if (e.clipboardData && e.clipboardData.getData) {
                                pastedText = e.clipboardData.getData('text/plain');
                            }
                            pasteStr(pastedText, this)
                            $timeout(function() {
                                current.focus();
                            }, 100)
                        })

                    }
                }
            };
        });

})(window, window.angular);
