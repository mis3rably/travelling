import Swiper from './vendor/swiper';
import L from './vendor/leaflet';

export const heroSlider = new Swiper('.hero__slider', {
  slidesPerGroup: 1,

  pagination: {
    el: '.hero__slider-pagination',
    clickable: true,
  },
});

export const tourSlider = new Swiper('.upcoming__slider', {
  slidesPerView: 1,
  spaceBetween: 18,

  navigation: {
    nextEl: '.upcoming__control--next',
    prevEl: '.upcoming__control--prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 2,
      spaceBetween: 18,
    },
    1200: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
  },
});

export const coachingSlider = new Swiper('.coaching__slider-wrapper', {
  slidesPerView: 1,
  spaceBetween: 30,
  lazy: true,

  navigation: {
    nextEl: '.coaching__slider-control--next',
    prevEl: '.coaching__slider-control--prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 3,
      spaceBetween: 30,
    },
    1200: {
      slidesPerView: 4,
      spaceBetween: 30,
    },
  },
});


export const reviewsSlider = new Swiper('.reviews__slider', {
  slidesPerView: 1,
  spaceBetween: 30,
  lazy: true,

  navigation: {
    nextEl: '.reviews__slider-control--next',
    prevEl: '.reviews__slider-control--prev',
  },

  breakpoints: {
    768: {
      slidesPerView: 'auto',
      spaceBetween: 30,
    },
  },
});

export const breakpoint = window.matchMedia('(min-width:1200px)');

let advantagesSlider = new Swiper('.advantages__slider', {
  slidesPerView: 'auto',
  spaceBetween: 30,
  initialSlide: 2,
  centeredSlides: true,
  init: false,
  loop: true,
  lazy: true,

  navigation: {
    nextEl: '.advantages__slider-control--next',
    prevEl: '.advantages__slider-control--prev',
  },
});

if (breakpoint.matches) {
  advantagesSlider.init();
}

breakpoint.addEventListener('change', (evt) => {
  if (evt.matches) {
    advantagesSlider = new Swiper('.advantages__slider', {
      slidesPerView: 'auto',
      spaceBetween: 30,
      initialSlide: 2,
      centeredSlides: true,
      lazy: true,
      loop: true,

      navigation: {
        nextEl: '.advantages__slider-control--next',
        prevEl: '.advantages__slider-control--prev',
      },
    });
  } else {
    advantagesSlider.destroy();
  }
});

export const gallerySlider = new Swiper('.gallery__slider', {
  slidesPerView: 'auto',
  spaceBetween: 3,
  initialSlide: 2,
  lazy: true,

  breakpoints: {
    768: {
      slidesPerView: 'auto',
      spaceBetween: 5,
      initialSlide: 2,
    },
  },

  navigation: {
    nextEl: '.gallery__slider-control--next',
    prevEl: '.gallery__slider-control--prev',
  },
});

const map = L.map('map').setView([55.77485, 37.63264], 16);

L.tileLayer('https://tile.openstreetmap.org/{z}/{x}/{y}.png', {
  maxZoom: 19,
  attribution: '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
}).addTo(map);

const myIcon = L.icon({
  iconUrl: './img/map/marker-icon.png',
  iconRetinaUrl: './img/map/marker-icon-2x.png',
  iconSize: [25, 41],
  iconAnchor: [25, 25],
  popupAnchor: [-3, -76],
  shadowUrl: './img/map/marker-shadow.png',
  shadowSize: [41, 41],
  shadowAnchor: [25, 25],
});

L.marker([55.77485, 37.63264], {icon: myIcon}).addTo(map);
