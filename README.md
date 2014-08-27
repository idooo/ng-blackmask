ng-blackmask
============

Simple input mask for AngularJS. [Demo](http://shteinikov.com/p/ng-blackmask/demo/)

Installation
------------

With Bower:

```
bower install --save ng-blackmask
```

How to use
----------

1. Include the module ```blackMask``` in your angular app.

2. Include the directive ```bm-numbers-mask``` with ```max-length``` param in your form:

```html
<input type="text" name="field" ng-model="field" bm-numbers-mask max-length="9">
```

3. You can set the placeholder character (the default is ```_```):

```html
<input type="text" name="field" ng-model="field" bm-numbers-mask max-length="9" placeholder="*">
```
