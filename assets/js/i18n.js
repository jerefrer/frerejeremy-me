const supportedLanguages = ['en', 'fr'];

const userLanguages = navigator.languages || [navigator.language];

const getPreferredLanguage = (userLanguages, supportedLanguages) => {
  for (const language of userLanguages) {
    // Check for full match (e.g., 'en-US' or 'fr-CA')
    if (supportedLanguages.includes(language)) {
      return language;
    }
    // Check for partial match (e.g., 'en' from 'en-US')
    const baseLanguage = language.split('-')[0];
    if (supportedLanguages.includes(baseLanguage)) {
      return baseLanguage;
    }
  }
  return 'en';
};

const preferredLanguage = getPreferredLanguage(userLanguages, supportedLanguages);

const showLanguage = function(language) {
  document.querySelectorAll('.i18n').forEach(function(el) {
    if (el.dataset.language === language) {
      el.style.display = el.tagName === 'SPAN' ? 'inline-block' : 'block';
    } else {
      el.style.display = 'none';
    }
  });
  document.querySelectorAll('.i18n-trigger').forEach(function(el) {
    if (el.dataset.language !== language) {
      el.style.display = el.tagName === 'SPAN' ? 'inline-block' : 'block';
    } else {
      el.style.display = 'none';
    }
  });
};

showLanguage(preferredLanguage);
console.log(preferredLanguage)

$('.i18n-trigger').on('click', function() {
  var language = $(this).data('language');
  document.querySelector('body').classList.add('is-preload');
  showLanguage(language);
  setTimeout(() => document.querySelector('body').classList.remove('is-preload'), 100);
});
