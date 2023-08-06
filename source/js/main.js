import {Form} from './modules/form-validate/form';
import {ScrollLock} from './modules/scroll-lock/scroll-lock';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  const header = document.querySelector('.header');
  const burgerButton = header.querySelector('.header__burger-button');
  const heroSlide = document.querySelectorAll('.hero__slide');

  if (header && heroSlide) {
    let headerHeight = 180;
    let currentHeroPadding = window.getComputedStyle(heroSlide[0]).getPropertyValue('padding-top');
    const breakpoint = window.matchMedia('(min-width:1200px)');

    const adjustSlidesPadding = () => {
      if (breakpoint.matches) {
        currentHeroPadding = window.getComputedStyle(heroSlide[0]).getPropertyValue('padding-top');
        heroSlide.forEach((el) => {
          el.style.paddingTop = `${header.offsetHeight - headerHeight + parseInt(currentHeroPadding, 10)}px`;
        });
        headerHeight = header.offsetHeight;
      }
    };

    if (header.offsetHeight > parseInt(currentHeroPadding, 10)) {
      adjustSlidesPadding();
    }

    let observer = new MutationObserver(() => {
      if (headerHeight !== header.offsetHeight & headerHeight < header.offsetHeight) {
        adjustSlidesPadding();
      }
    });

    observer.observe(header, {
      childList: true,
      subtree: true,
      characterDataOldValue: true,
    });

    let currentPadding;

    breakpoint.addEventListener('change', (evt) => {
      if (!evt.matches) {
        currentPadding = heroSlide[0].style.paddingTop;
        heroSlide.forEach((el) => {
          el.style.paddingTop = '';
        });
      } else {
        if (currentPadding !== heroSlide[0].style.paddingTop) {
          heroSlide.forEach((el) => {
            el.style.paddingTop = currentPadding;
          });
        }
      }
    });
  }

  window.scrollLock = new ScrollLock();

  if (burgerButton && header) {
    const closeBurgerMenu = () => {
      header.classList.remove('header--opened');
      header.setAttribute('aria-label', 'Открыть бургер меню.');
      window.scrollLock.enableScrolling();
    };

    burgerButton.addEventListener('click', () => {
      if (!header.classList.contains('header--opened')) {
        header.classList.add('header--opened');
        header.setAttribute('aria-label', 'Закрыть бургер меню.');
        window.scrollLock.disableScrolling();

        const burgerList = document.querySelector('.header__navigation-list');

        if (burgerList) {
          burgerList.addEventListener('click', (evt) => {
            if (evt.target.tagName === 'A') {
              closeBurgerMenu();
            }
          });
        }
      } else {
        closeBurgerMenu();
      }
    });
  }
  window.addEventListener('load', () => {
    const form = new Form();
    window.form = form;
    form.init();
    const heroVideoWrapper = document.querySelector('.hero__video-wrapper');
    const heroVideo = document.querySelector('.hero__video');
    const heroPreview = document.querySelector('.hero__video-wrapper img');
    const heroVideoButton = document.querySelector('.hero__video-button');
    const audioButton = document.querySelector('.hero__audio-button');
    const heroAudio = document.querySelector('.hero__audio');
    const audioWrapper = document.querySelector('.hero__audio-player');
    const questionsFormButton = document.querySelector('.questions__form button[type="submit"]');
    const questionsForm = document.querySelector('.questions__form');

    if (heroVideoWrapper && heroVideo && heroPreview && heroVideoButton) {
      heroVideoButton.addEventListener('click', () => {
        heroVideoWrapper.classList.toggle('is-active');
        heroVideoWrapper.style.zIndex = '1';
        heroVideo.play();
      });
    }

    if (audioButton && heroAudio && audioWrapper) {
      audioButton.addEventListener('click', () => {
        if (heroAudio.paused) {
          heroAudio.play();
          audioWrapper.classList.add('is-playing');
        } else {
          heroAudio.pause();
          audioWrapper.classList.remove('is-playing');
        }
      });
    }

    if (questionsFormButton) {
      questionsFormButton.addEventListener('click', (evt) => {
        evt.preventDefault();
        if (window.form.validateForm(questionsForm)) {
          questionsForm.submit();
          questionsForm.reset();
        }
      });
    }
  });
});
