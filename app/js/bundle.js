(function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s})({1:[function(require,module,exports){
"use strict";

Object.defineProperty(exports, "__esModule", {
    value: true
});

var _createClass = function () { function defineProperties(target, props) { for (var i = 0; i < props.length; i++) { var descriptor = props[i]; descriptor.enumerable = descriptor.enumerable || false; descriptor.configurable = true; if ("value" in descriptor) descriptor.writable = true; Object.defineProperty(target, descriptor.key, descriptor); } } return function (Constructor, protoProps, staticProps) { if (protoProps) defineProperties(Constructor.prototype, protoProps); if (staticProps) defineProperties(Constructor, staticProps); return Constructor; }; }();

function _classCallCheck(instance, Constructor) { if (!(instance instanceof Constructor)) { throw new TypeError("Cannot call a class as a function"); } }

var Rectangle = function () {
    function Rectangle(height, width) {
        _classCallCheck(this, Rectangle);

        this.height = height;
        this.width = width;
    }

    _createClass(Rectangle, [{
        key: "calcArea",
        value: function calcArea() {
            return this.height * this.width;
        }
    }, {
        key: "area",
        get: function get() {
            return this.calcArea();
        }
    }]);

    return Rectangle;
}();

exports.default = Rectangle;

},{}],2:[function(require,module,exports){
'use strict';

var _aJsLib = require('./lib/a-js-lib');

var _aJsLib2 = _interopRequireDefault(_aJsLib);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var square = new _aJsLib2.default(10, 10);

alert(square.area);

},{"./lib/a-js-lib":1}]},{},[2])

//# sourceMappingURL=bundle.js.map
