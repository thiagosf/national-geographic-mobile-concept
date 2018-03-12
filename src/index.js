// slider
var App = {
  init: function () {
    this.slider()
    this.mobileMenu()
    this.searchBox()
  },
  slider: function () {
    function initTinySlider () {
      var slider = tns({
        container: '.home-slider-thumbs ul',
        items: 3,
        nav: false,
        controls: true,
        slideBy: 1,
        autoplay: false,
        controlsText: [
          '<svg class="svg-icon svg-icon-arrow-left"><use xlink:href="svgsprite.svg#arrow-left"></use></svg>', 
          '<svg class="svg-icon svg-icon-arrow-right"><use xlink:href="svgsprite.svg#arrow-right"></use></svg>'
        ]
      })
      if (slider) {
        slider.events.on('transitionEnd', function (info) {
          var id = info.container.children[info.index].getAttribute('data-id')
          changeSlide(id)
        })
        document.querySelector('.home-slider-thumbs').classList.add('ready')
        document.addEventListener('click', function (event) {
          var el
          if (el = Helpers.getParentClickedByClassName(event.target, 'tns-item')) {
            changeSlide(el.getAttribute('data-id'))
          }
        }, false);
      }
    }

    function changeSlide (id) {
      var items = [].slice.call(document.querySelectorAll('.home-slider-item'))
      items.map(function (item) {
        if (item.classList.contains('active')) {
          item.classList.add('leaving')
          setTimeout(function () {
            item.classList.remove('active')
            item.classList.remove('leaving')
          }, 500)
        }
        if (item.getAttribute('data-id') === id) {
          item.classList.add('entering')
          setTimeout(function () {
            item.classList.remove('entering')
            item.classList.add('active')
          }, 500)
        }
      })
    }

    window.addEventListener('load', initTinySlider)
  },
  mobileMenu () {
    var body = document.querySelector('body')
    var toggleMenu = function (e) {
      e.preventDefault()
      body.classList.toggle('mobile-menu-opened')
    }
    document.querySelector('.open-menu').addEventListener('click', toggleMenu)
    document.querySelector('.close-menu').addEventListener('click', toggleMenu)
    document.querySelector('.mobile-menu-overlay').addEventListener('click', toggleMenu)
  },
  searchBox () {
    var body = document.querySelector('body')
    var toggleSearchBox = function (e) {
      e.preventDefault()
      body.classList.toggle('search-box-opened')
      document.querySelector('.search-box form input').focus()
    }
    document.querySelector('.open-search').addEventListener('click', toggleSearchBox)
  }
}

var Helpers = {
  getParentClickedByClassName: function getParentClickedByClassName (el, className, max, count) {
    if (!count) count = 1
    if (!max) max = 3
    if (count < max) {
      if (el.classList && el.classList.contains(className)) return el;
      if (el && el.parentNode) return getParentClickedByClassName(el.parentNode, className, max, count + 1);
      return false;
    }
    return false;
  }
}

App.init()
