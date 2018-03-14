(function(){function e(t,n,r){function s(o,u){if(!n[o]){if(!t[o]){var a=typeof require=="function"&&require;if(!u&&a)return a(o,!0);if(i)return i(o,!0);var f=new Error("Cannot find module '"+o+"'");throw f.code="MODULE_NOT_FOUND",f}var l=n[o]={exports:{}};t[o][0].call(l.exports,function(e){var n=t[o][1][e];return s(n?n:e)},l,l.exports,e,t,n,r)}return n[o].exports}var i=typeof require=="function"&&require;for(var o=0;o<r.length;o++)s(r[o]);return s}return e})()({1:[function(require,module,exports){
'use strict';

// slider
var App = {
  init: function init() {
    this.slider();
    this.mobileMenu();
    this.searchBox();
    this.interchange();
  },
  slider: function slider() {
    function initTinySlider() {
      var slider = tns({
        container: '.home-slider-thumbs ul',
        items: 3,
        nav: false,
        controls: true,
        slideBy: 1,
        autoplay: false,
        controlsText: ['<svg class="svg-icon svg-icon-arrow-left"><use xlink:href="svgsprite.svg#arrow-left"></use></svg>', '<svg class="svg-icon svg-icon-arrow-right"><use xlink:href="svgsprite.svg#arrow-right"></use></svg>']
      });
      if (slider) {
        slider.events.on('transitionEnd', function (info) {
          var id = info.container.children[info.index].getAttribute('data-id');
          changeSlide(id);
        });
        document.querySelector('.home-slider-thumbs').classList.add('ready');
        document.addEventListener('click', function (event) {
          var el;
          if (el = Helpers.getParentClickedByClassName(event.target, 'tns-item')) {
            var children = [].slice.call(slider.getInfo().container.children);
            children.map(function (item, index) {
              if (item === el) {
                slider.goTo(index);
              }
            });
          }
        }, false);
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
  },
  mobileMenu: function mobileMenu() {
    var body = document.querySelector('body');
    var toggleMenu = function toggleMenu(e) {
      e.preventDefault();
      body.classList.toggle('mobile-menu-opened');
    };
    document.querySelector('.open-menu').addEventListener('click', toggleMenu);
    document.querySelector('.close-menu').addEventListener('click', toggleMenu);
    document.querySelector('.mobile-menu-overlay').addEventListener('click', toggleMenu);
  },
  searchBox: function searchBox() {
    var body = document.querySelector('body');
    var toggleSearchBox = function toggleSearchBox(e) {
      e.preventDefault();
      body.classList.toggle('search-box-opened');
      document.querySelector('.search-box form input').focus();
    };
    var onSubmit = function onSubmit(e) {
      e.target.classList.add('sending');
    };
    document.querySelector('.open-search').addEventListener('click', toggleSearchBox);
    document.querySelector('.search-box form').addEventListener('submit', onSubmit);
  },
  interchange: function interchange() {
    var elements = [].slice.call(document.querySelectorAll('[data-interchange]'));
    var breakpoints = {
      small: 768,
      medium: 1024
    };
    var window_width = Number(window.innerWidth);
    var delay = 300;
    var interval;

    var checkItem = function checkItem(element, width) {
      var breakpoint = 'large';
      if (width <= breakpoints.small) {
        breakpoint = 'small';
      } else if (width <= breakpoints.medium) {
        breakpoint = 'medium';
      }
      var data = element.getAttribute('data-interchange').split(',').map(function (item) {
        return item.split(':');
      });
      data.map(function (item) {
        if (item[1] === breakpoint) {
          element.style.backgroundImage = 'url(' + item[0] + ')';
        }
      });
    };

    var onResize = function onResize(e) {
      clearTimeout(interval);
      interval = setTimeout(function () {
        window_width = Number(window.innerWidth);
        elements.map(function (element) {
          checkItem(element, window_width);
        });
      }, delay);
    };

    elements.map(function (element) {
      checkItem(element, window_width);
    });

    window.addEventListener('resize', onResize);
  }
};

var Helpers = {
  getParentClickedByClassName: function getParentClickedByClassName(el, className, max, count) {
    if (!count) count = 1;
    if (!max) max = 3;
    if (count < max) {
      if (el.classList && el.classList.contains(className)) return el;
      if (el && el.parentNode) return getParentClickedByClassName(el.parentNode, className, max, count + 1);
      return false;
    }
    return false;
  }
};

App.init();

},{}]},{},[1])

//# sourceMappingURL=app.js.map
