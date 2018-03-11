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
        mouseDrag: true
      })
      if (slider) {
        slider.events.on('transitionEnd', function (info) {
          var id = info.container.children[info.index].getAttribute('data-id')
          changeSlide(id)
        })
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

App.init()
