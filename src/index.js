// import tns from 'tiny-slider'
// import { tns } from '../node_modules/tiny-slider/src/tiny-slider'
var tns = require('../node_modules/tiny-slider/src/tiny-slider')

function initTiny () {
  console.log(tns)
  var slider = tns({
    container: '.my-slider',
    items: 3,
    slideBy: 'page',
    autoplay: true
  });
}

window.addEventListener('load', initTiny)
