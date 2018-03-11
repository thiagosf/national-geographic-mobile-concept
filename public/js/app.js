(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

function initTinySlider() {
  var slider = tns({
    container: '.home-slider-thumbs ul',
    items: 3,
    nav: false,
    controls: true,
    slideBy: 1,
    autoplay: false,
    mouseDrag: true
  });
  if (slider) {
    slider.events.on('transitionEnd', function (info) {
      var id = info.container.children[info.index].getAttribute('data-id');
      changeSlide(id);
    });
  }
}

function changeSlide(id) {
  var items = [].slice.call(document.querySelectorAll('.home-slider-item'));
  items.map(function (item) {
    if (item.classList.contains('active')) {
      item.classList.add('leaving');
      setTimeout(function () {
        item.classList.remove('active');
        item.classList.remove('leaving');
      }, 500);
    }
    if (item.getAttribute('data-id') === id) {
      item.classList.add('entering');
      setTimeout(function () {
        item.classList.remove('entering');
        item.classList.add('active');
      }, 500);
    }
  });
}

window.addEventListener('load', initTinySlider);

},{}]},{},[1])

//# sourceMappingURL=app.js.map
