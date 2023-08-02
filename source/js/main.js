import {Form} from './modules/form-validate/form';

// ---------------------------------

window.addEventListener('DOMContentLoaded', () => {
  // все скрипты должны быть в обработчике 'DOMContentLoaded', но не все в 'load'
  // в load следует добавить скрипты, не участвующие в работе первого экрана
  const header = document.querySelector('.header');
  const burgerButton = header.querySelector('.header__burger-button');

  if (burgerButton && header) {
    burgerButton.addEventListener('click', () => {
      if (!header.classList.contains('header--opened')) {
        header.classList.add('header--opened');
        header.setAttribute('aria-label', 'Закрыть бургер меню.');
      } else {
        header.classList.remove('header--opened');
        header.setAttribute('aria-label', 'Открыть бургер меню.');
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
