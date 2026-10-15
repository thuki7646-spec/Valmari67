const select = selector => document.querySelector(selector);
const selectAll = selector => document.querySelectorAll(selector);

const COMPANY_ADDRESS = 'Алматы, проспект Абая 150';
const SITE_TITLE = 'ValMari — Учебный центр эстетической косметологии';
const LANGUAGE_CODES = { ru: 'RU', kk: 'KZ', en: 'EN' };
const FLAG_IMAGES = {
  ru: 'images/flags/ru.svg',
  kk: 'images/flags/kz.png',
  en: 'images/flags/gb.svg'
};
const TRANSLATED_ATTRIBUTES = ['placeholder', 'title', 'aria-label'];
const PAGINATION_PAGE_COUNT = 5;
const CAROUSEL_AUTOPLAY_MS = 5500;
const WEEKDAYS = ['Пн', 'Вт', 'Ср', 'Чт', 'Пт', 'Сб', 'Вс'];
const COURSE_EVENTS = [
  'Мезотерапия',
  'Контурная пластика',
  'Ботулинотерапия',
  'Мастер-класс',
  'Биоревитализация',
  'Канюльная техника',
  'Чистки от А до Я',
  'Лазерная эпиляция'
];
const WEBINAR_EVENTS = [
  'Вебинар: мезотерапия шеи',
  'Вебинар: Биогель',
  'Вебинар: нити',
  'Вебинар: пилинги'
];

let currentLanguage = 'ru';
try {
  currentLanguage = localStorage.getItem('language') || 'ru';
} catch (error) {}

let carouselTimers = [];
let trailerImageSrc = '';
const schedule = { date: new Date(), view: 'courses', cityIndex: 0 };
const originalText = new WeakMap();

const normalizeSpaces = text => text.replace(/\s+/g, ' ').trim();

function translate(text) {
  if (currentLanguage === 'ru') return text;
  const entry = translations[normalizeSpaces(text)];
  return entry ? entry[currentLanguage] : text;
}

function translateTree(root) {
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT);
  const textNodes = [];
  let node;
  while ((node = walker.nextNode())) textNodes.push(node);

  textNodes.forEach(textNode => {
    const parentTag = textNode.parentNode.tagName;
    if (parentTag === 'SCRIPT' || parentTag === 'STYLE') return;

    if (!originalText.has(textNode)) originalText.set(textNode, textNode.nodeValue);
    const original = originalText.get(textNode);
    if (!normalizeSpaces(original)) return;

    if (currentLanguage === 'ru') {
      textNode.nodeValue = original;
      return;
    }
    const leadingSpace = original.match(/^\s*/)[0];
    const trailingSpace = original.match(/\s*$/)[0];
    textNode.nodeValue = leadingSpace + translate(original) + trailingSpace;
  });

  root.querySelectorAll('[placeholder], [title], [aria-label]').forEach(element => {
    TRANSLATED_ATTRIBUTES.forEach(attribute => {
      if (!element.hasAttribute(attribute)) return;
      const backupAttribute = 'data-original-' + attribute;
      if (!element.hasAttribute(backupAttribute)) {
        element.setAttribute(backupAttribute, element.getAttribute(attribute));
      }
      element.setAttribute(attribute, translate(element.getAttribute(backupAttribute)));
    });
  });
}

function updateLanguageUI() {
  document.documentElement.lang = currentLanguage;

  const buttonFlag = select('.language-button .flag');
  if (buttonFlag) buttonFlag.src = FLAG_IMAGES[currentLanguage];

  const languageCode = select('.language-code');
  if (languageCode) languageCode.textContent = LANGUAGE_CODES[currentLanguage];

  selectAll('[data-language]').forEach(item => {
    item.classList.toggle('active', item.dataset.language === currentLanguage);
  });
  selectAll('img[data-flag]').forEach(flag => {
    flag.src = FLAG_IMAGES[flag.dataset.flag];
  });
}

function setLanguage(language) {
  currentLanguage = language;
  try {
    localStorage.setItem('language', language);
  } catch (error) {}
  updateLanguageUI();
  renderPage(true);
}

function renderMap() {
  const mapContainer = select('#map-frame');
  if (!mapContainer) return;

  const oldFrame = mapContainer.querySelector('iframe');
  if (oldFrame) oldFrame.remove();

  const frame = document.createElement('iframe');
  frame.src =
    'https://www.google.com/maps?q=' + encodeURIComponent(COMPANY_ADDRESS) +
    '&z=16&output=embed&hl=' + currentLanguage;
  frame.title = translate('Карта');
  frame.loading = 'lazy';
  frame.referrerPolicy = 'no-referrer-when-downgrade';
  frame.allowFullscreen = true;
  mapContainer.prepend(frame);
}

document.addEventListener('securitypolicyviolation', event => {
  if (/frame/.test(event.violatedDirective)) {
    selectAll('#map-frame iframe').forEach(frame => frame.remove());
  }
});

function showToast(message) {
  const toast = select('#toast');
  toast.textContent = message;
  toast.classList.add('shown');
  clearTimeout(showToast.timer);
  showToast.timer = setTimeout(() => toast.classList.remove('shown'), 3200);
}

function filterCourseGrid(filterSelector) {
  const grid = select('#course-grid');
  if (!grid) return;
  [...grid.children].forEach(item => {
    const isVisible = filterSelector === '*' || item.matches(filterSelector);
    item.style.display = isVisible ? '' : 'none';
  });
}

function renderSchedule() {
  const grid = select('#calendar-grid');
  if (!grid) return;

  const year = schedule.date.getFullYear();
  const month = schedule.date.getMonth();
  const today = new Date();
  const firstDayOfMonth = new Date(year, month, 1);

  select('#calendar-month').textContent = firstDayOfMonth.toLocaleDateString(currentLanguage, {
    month: 'long',
    year: 'numeric'
  });

  const firstWeekday = (firstDayOfMonth.getDay() + 6) % 7;
  const daysInMonth = new Date(year, month + 1, 0).getDate();
  const eventNames = schedule.view === 'courses' ? COURSE_EVENTS : WEBINAR_EVENTS;

  let html = WEEKDAYS.map(name => `<b class="weekday">${name}</b>`).join('');

  for (let i = 0; i < firstWeekday; i++) {
    html += '<div class="calendar-day empty-day"></div>';
  }

  for (let day = 1; day <= daysInMonth; day++) {
    const weekday = (firstWeekday + day - 1) % 7;
    const isWorkday = weekday < 5;
    let events = '';

    if (isWorkday) {
      const eventIndex = (day * 7 + schedule.cityIndex * 3 + month) % eventNames.length;
      events = `<button class="calendar-event">${eventNames[eventIndex]}</button>`;
      if ((day + schedule.cityIndex) % 3 === 0) {
        const secondIndex = (eventIndex + 3) % eventNames.length;
        events += `<button class="calendar-event">${eventNames[secondIndex]}</button>`;
      }
    }

    const isToday =
      today.getDate() === day && today.getMonth() === month && today.getFullYear() === year;
    html +=
      `<div class="calendar-day${isToday ? ' today' : ''}">` +
      `<i>${day}</i><div class="calendar-events">${events}</div></div>`;
  }

  grid.innerHTML = html;
}

function renderPagination(pagination) {
  const current = +pagination.dataset.current;
  const pageNumbers = Array.from({ length: PAGINATION_PAGE_COUNT }, (_, index) => index + 1);

  pagination.innerHTML =
    `<button data-page="${current - 1}" ${current === 1 ? 'disabled' : ''} aria-label="Назад">‹</button>` +
    pageNumbers
      .map(number => `<button data-page="${number}" class="${number === current ? 'active' : ''}">${number}</button>`)
      .join('') +
    `<button data-page="${current + 1}" ${current === PAGINATION_PAGE_COUNT ? 'disabled' : ''} aria-label="Вперёд">›</button>`;
}

function initPagination() {
  selectAll('.pagination').forEach(pagination => {
    pagination.dataset.current = 1;
    renderPagination(pagination);
  });
}

function animateCounters(statsElement) {
  statsElement.querySelectorAll('b').forEach(counter => {
    const target = parseInt(counter.textContent);
    const startTime = performance.now();

    const step = now => {
      const progress = Math.min(1, (now - startTime) / 1400);
      const eased = 1 - Math.pow(1 - progress, 3);
      counter.textContent = Math.round(target * eased) + '+';
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  });
}

function initCarousels() {
  selectAll('.carousel').forEach(carousel => {
    const track = carousel.querySelector('.carousel-track');
    const dots = carousel.querySelector('.carousel-dots');
    const prevButton = carousel.querySelector('.arrow-prev');
    const nextButton = carousel.querySelector('.arrow-next');

    const drawDots = () => {
      const slideCount = Math.max(1, Math.round(track.scrollWidth / track.clientWidth));
      const currentSlide = Math.round(track.scrollLeft / track.clientWidth);
      dots.innerHTML = Array.from({ length: slideCount }, (_, index) =>
        `<i class="${index === currentSlide ? 'active' : ''}" data-index="${index}"></i>`
      ).join('');
    };

    prevButton.onclick = () => {
      track.scrollBy({ left: -track.clientWidth, behavior: 'smooth' });
    };

    nextButton.onclick = () => {
      const isAtEnd = track.scrollLeft + track.clientWidth >= track.scrollWidth - 4;
      if (isAtEnd) track.scrollTo({ left: 0, behavior: 'smooth' });
      else track.scrollBy({ left: track.clientWidth, behavior: 'smooth' });
    };

    dots.onclick = event => {
      const index = event.target.dataset.index;
      if (index != null) track.scrollTo({ left: index * track.clientWidth, behavior: 'smooth' });
    };

    track.onscroll = drawDots;
    drawDots();

    carouselTimers.push(setInterval(() => {
      if (carousel.isConnected && !carousel.matches(':hover')) nextButton.click();
    }, CAROUSEL_AUTOPLAY_MS));
  });
}

function initRevealOnScroll() {
  if (!('IntersectionObserver' in window)) return;

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const element = entry.target;
      element.classList.add('revealed');
      observer.unobserve(element);
      setTimeout(() => (element.style.transitionDelay = ''), 1300);
      if (element.matches('.stats')) animateCounters(element);
    });
  }, { threshold: 0.1 });

  const revealSelector = [
    '.grid > *', '.split', '.stats', '.card', 'h2.section-title', '.feature-box',
    '.tiles > *', 'details', '.trainer', '.highlight-bar', '.reviews > div',
    '.tabs', '.calendar', '.carousel', 'table'
  ].join(', ');

  selectAll(revealSelector).forEach(element => {
    if (element.closest('.carousel-track')) return;
    element.classList.add('reveal');
    const positionInRow = [...element.parentNode.children].indexOf(element) % 4;
    element.style.transitionDelay = positionInRow * 0.09 + 's';
    observer.observe(element);
  });
}

function renderNavigation(activePage) {
  const links = NAV_ITEMS.map(item =>
    `<a href="#/${item.page}" class="${item.page === activePage ? 'active' : ''}">${item.title}</a>`
  ).join('');

  const socialLinks = [...selectAll('header .contacts .social-link')].map(link => link.outerHTML).join('');

  const languageTabs = Object.keys(LANGUAGE_CODES).map(language =>
    `<a data-language="${language}"><img data-flag="${language}" alt="">${LANGUAGE_CODES[language]}</a>`
  ).join('');

  select('#nav').innerHTML =
    links +
    `<div class="nav-social-links">${socialLinks}</div>` +
    `<div class="language-tabs">${languageTabs}</div>`;
}

function renderPage(keepScroll) {
  const route = location.hash.replace(/^#\/?/, '');
  const pageName = pages[route] ? route : '404';
  const main = select('#page');

  carouselTimers.forEach(clearInterval);
  carouselTimers = [];

  main.innerHTML = pages[pageName]();
  main.classList.remove('page-enter');
  void main.offsetWidth;
  main.classList.add('page-enter');

  select('#nav').classList.remove('open');
  select('#menu-toggle').textContent = '☰';
  scrollTo({ top: keepScroll === true ? scrollY : 0, behavior: 'instant' });

  renderNavigation(pageName);
  initCarousels();
  initRevealOnScroll();
  renderSchedule();
  initPagination();
  translateTree(document.body);
  document.title = translate(SITE_TITLE);
  updateLanguageUI();
  renderMap();
}

function openModal(event, modalType) {
  event.preventDefault();
  if (event.type === 'submit') event.target.reset();

  select('#modal > div').style.maxWidth = modalType === 'trailer' ? '760px' : '';
  select('#modal-body').innerHTML = modalContents[modalType](trailerImageSrc);
  translateTree(select('#modal'));
  select('#modal').classList.add('open');
  return false;
}

function closeModal() {
  select('#modal').classList.remove('open');
}

function closeMobileMenu() {
  select('#nav').classList.remove('open');
  select('#menu-toggle').textContent = '☰';
}

function activateTab(tab) {
  tab.parentNode.querySelectorAll('a').forEach(item => item.classList.remove('active'));
  tab.classList.add('active');
}

document.addEventListener('click', event => {
  const target = event.target;

  const clickedInsideMenu = target.closest('#nav, #menu-toggle');
  if (!clickedInsideMenu && select('#nav').classList.contains('open')) closeMobileMenu();

  if (!target.closest('.language')) select('.language').classList.remove('open');

  if (target.closest('.language-button')) {
    select('.language').classList.toggle('open');
    return;
  }

  const languageItem = target.closest('[data-language]');
  if (languageItem) {
    select('.language').classList.remove('open');
    setLanguage(languageItem.dataset.language);
    return;
  }

  const filterItem = target.closest('[data-filter]');
  if (filterItem) {
    const tab = filterItem.closest('.tabs a');
    if (tab) activateTab(tab);
    filterCourseGrid(filterItem.dataset.filter);
    return;
  }

  const scheduleViewTab = target.closest('.tabs [data-schedule-view]');
  if (scheduleViewTab) {
    activateTab(scheduleViewTab);
    schedule.view = scheduleViewTab.dataset.scheduleView;
    renderSchedule();
    return;
  }

  const cityTab = target.closest('#city-tabs a');
  if (cityTab) {
    activateTab(cityTab);
    schedule.cityIndex = [...cityTab.parentNode.children].indexOf(cityTab);
    renderSchedule();
    return;
  }

  const monthButton = target.closest('[data-month-step]');
  if (monthButton) {
    const step = +monthButton.dataset.monthStep;
    schedule.date = step
      ? new Date(schedule.date.getFullYear(), schedule.date.getMonth() + step, 1)
      : new Date();
    renderSchedule();
    return;
  }

  if (target.closest('.calendar .calendar-event')) {
    openModal(event, 'request-form');
    return;
  }

  const pageButton = target.closest('[data-page]');
  if (pageButton && !pageButton.disabled) {
    const pagination = pageButton.parentNode;
    pagination.dataset.current = pageButton.dataset.page;
    renderPagination(pagination);

    const main = select('#page');
    main.classList.remove('page-enter');
    void main.offsetWidth;
    main.classList.add('page-enter');
    scrollTo({ top: 0, behavior: 'smooth' });
    return;
  }

  const modalTrigger = target.closest('[data-modal]');
  if (modalTrigger) {
    openModal(event, modalTrigger.dataset.modal);
    return;
  }

  const videoImage = target.closest('img[data-image]');
  if (videoImage && /^(vt|v_)/.test(videoImage.dataset.image)) {
    trailerImageSrc = videoImage.src;
    openModal(event, 'trailer');
    return;
  }

  const button = target.closest('a.btn');
  if (button) {
    const label = normalizeSpaces(originalText.get(button.firstChild) || button.textContent);
    if (label === 'Купить' || label === 'Зарегистрироваться') {
      openModal(event, 'request-form');
      return;
    }
  }

  if (target.closest('.modal-close')) {
    closeModal();
    return;
  }

  if (target.closest('#scroll-top')) scrollTo({ top: 0, behavior: 'smooth' });
});

document.addEventListener('submit', event => {
  const form = event.target.closest('[data-submit-modal]');
  if (form) openModal(event, form.dataset.submitModal);
});

addEventListener('keydown', event => {
  if (event.key === 'Escape') closeModal();
});

addEventListener('scroll', () => {
  select('header').classList.toggle('scrolled', scrollY > 10);
  select('#scroll-top').classList.toggle('shown', scrollY > 500);
}, { passive: true });

select('#footer-links').innerHTML = NAV_ITEMS
  .map(item => `<a href="#/${item.page}">${item.title}</a>`)
  .join('');

function applyTheme(theme) {
  document.documentElement.setAttribute('data-theme', theme);
  const button = select('#theme-toggle');
  if (button) button.textContent = theme === 'dark' ? '☀' : '☾';
  const meta = select('meta[name="theme-color"]');
  if (meta) meta.content = theme === 'dark' ? '#121412' : '#fcfcfc';
}

select('#theme-toggle').onclick = () => {
  const next = document.documentElement.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
  applyTheme(next);
  try { localStorage.setItem('theme', next); } catch (error) {}
};
applyTheme(document.documentElement.getAttribute('data-theme') || 'light');

select('#menu-toggle').onclick = () => {
  const isOpen = select('#nav').classList.toggle('open');
  select('#menu-toggle').textContent = isOpen ? '✕' : '☰';
};

select('#modal').onclick = event => {
  if (event.target.id === 'modal') closeModal();
};

addEventListener('hashchange', () => renderPage());
updateLanguageUI();
renderPage();
