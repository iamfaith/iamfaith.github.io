/*! markdown-it-latex2img 0.0.5 https://github.com/makergyt/markdown-it-latex2img @license MIT */(function(f){if(typeof exports==="object"&&typeof module!=="undefined"){module.exports=f()}else if(typeof define==="function"&&define.amd){define([],f)}else{var g;if(typeof window!=="undefined"){g=window}else if(typeof global!=="undefined"){g=global}else if(typeof self!=="undefined"){g=self}else{g=this}g.markdownitLi = f()}})(function(){var define,module,exports;return (function(){function r(e,n,t){function o(i,f){if(!n[i]){if(!e[i]){var c="function"==typeof require&&require;if(!f&&c)return c(i,!0);if(u)return u(i,!0);var a=new Error("Cannot find module '"+i+"'");throw a.code="MODULE_NOT_FOUND",a}var p=n[i]={exports:{}};e[i][0].call(p.exports,function(r){var n=e[i][1][r];return o(n||r)},p,p.exports,r,e,n,t)}return n[i].exports}for(var u="function"==typeof require&&require,i=0;i<t.length;i++)o(t[i]);return o}return r})()({1:[function(require,module,exports){
// Process latex
//
"use strict";

function makeRule(md) {
  return function replaceListItem() {
    md.renderer.rules.list_item_open = function replaceOpen() {
      return "<li><section>";
    };
    md.renderer.rules.list_item_close = function replaceClose() {
      return "</section></li>";
    };
  };
}

module.exports =  (md) => {
  md.core.ruler.push("replace-li", makeRule(md));
};


},{}]},{},[1])(1)
});
