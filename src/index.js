function initTinySlider () {
  var slider = tns({
    container: '.home-slider-thumbs ul',
    items: 3,
    nav: false,
    slideBy: 1,
    autoplay: false
  })
  if (slider) {
    slider.events.on('transitionEnd', function () {
      console.log(arguments)
    })
  }
}

window.addEventListener('load', initTinySlider)
