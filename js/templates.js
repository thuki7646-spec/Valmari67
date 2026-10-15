const NAV_ITEMS = [
  { title: 'Курсы обучения', page: 'courses' },
  { title: 'Вебинары', page: 'webinars' },
  { title: 'Видео-уроки', page: 'video' },
  { title: 'Блог', page: 'blog' },
  { title: 'О нас', page: 'about' },
  { title: 'Прайс', page: 'price' },
  { title: 'Расписание', page: 'schedule' },
  { title: 'Акции', page: 'offers' },
  { title: 'Магазин', page: '404' }
];

const courses = [
  { title: 'Канюльные техники', kind: 'offline', format: 'Оффлайн', dates: '1 - 4 мая' },
  { title: 'Мезотерапия и Биоревитализация', kind: 'online', format: 'Онлайн', dates: '15 - 20 мая' },
  { title: 'Биогель - новое в косметологии', kind: 'masterclass', format: 'Мастер-класс', dates: '2 - 5 августа' }
];

const masterClasses = [
  {
    date: '3 ноября, 10:00-12:00',
    title: '10 возможностей невизжимого лазера. Лазерный пилинг, удаление тату/татуажа',
    price: '24 000 ₸'
  },
  {
    date: '20 ноября, 12:00-17:00',
    title: 'Профессия косметолог. Семинар для новичков и профессионалов',
    price: 'Бесплатно'
  }
];

const mesotherapyTopics = [
  'Техники мезотерапии',
  'Мезотерапия лица',
  'Липоскульптура тела',
  'Мезотерапия в трихологии',
  'Биовитализация'
];

const cities = ['Алматы', 'Астана', 'Шымкент', 'Караганда', 'Актобе', 'Атырау'];

const SAMPLE_ARTICLE_TITLE =
  'Актуальна ли мезотерапия в коррекции шеи, декольте, кистей рук и какие существуют альтернативы?';

const image = (key, alt = '') =>
  `<img data-image="${key}" src="images/${key}.jpg" alt="${alt}">`;

const courseCard = course => `
  <div class="course-card ${course.kind}">
    <small>Курс для медиков</small>
    <h3>${course.title}</h3>
    <em>${course.format}</em>
    <p class="course-date">${course.dates}</p>
    <div class="course-details">
      <ul>
        <li>Краткое описание</li>
        <li>Что-то о курсе</li>
        <li>Пару фактов</li>
        <li>Краткое описание</li>
      </ul>
      <img class="course-photo" src="images/head.jpg" alt="">
    </div>
    <p class="course-seats">Свободно 2 из 15 мест</p>
    <a class="btn" href="#/course">Зарегистрироваться</a>
    <a class="btn-secondary" href="#/course">Подробнее</a>
  </div>`;

const videoCard = (title, label, imageKey) => `
  <div class="video-card">
    <a href="#/video">${image(imageKey)}</a>
    <p><b>${label}</b> ${title}</p>
    <a class="btn" href="#/video">Купить</a>
    <a class="btn-secondary" href="#/video">Подробнее</a>
  </div>`;

const callbackForm = `
  <div class="card" style="margin-top:70px">
    <form class="form" data-submit-modal="request-thanks">
      <h3>Закажите обратный звонок</h3>
      <p style="font-size:13px">Оставьте заявку в форме и наш менеджер свяжется с вами</p>
      <input required placeholder="Ваше имя">
      <input required type="tel" inputmode="tel" minlength="7" title="Введите номер телефона" placeholder="Ваш номер телефона">
      <button class="btn" style="width:100%">Отправить</button>
    </form>
  </div>`;

const whyUsBlocks = `
  <div class="grid">
    <div class="feature-box feature-box-white">
      <h3>Преподаватели</h3>
      <p>Наши преподаватели имеют многолетний опыт в сфере косметологии и совмещают преподавательскую деятельность с практической работой в салонах красоты и других специализированных центрах.</p>
    </div>
    <div class="feature-box">
      <h3>Сертификаты</h3>
      <p>Удостоверение, сертификат и свидетельство полученные у нас по окончанию курсов, работают как лучшая "рекомендация" при приеме на работу</p>
    </div>
    <div class="feature-box feature-box-white">
      <h3>Повышение квалификации</h3>
      <p>Ежегодно, больше 2000 косметологов повышают квалификацию и уровень профессионализма в просторных кабинетах нашего центра.</p>
    </div>
  </div>`;

const statsItems = [
  { value: '4000+', label: 'Сертификатов мы выдали' },
  { value: '3500+', label: 'Моделей в нашей базе' },
  { value: '1500+', label: 'Специалистов мы обучили' },
  { value: '5500+', label: 'Довольных клиентов' }
];

const statsBlock = `
  <div class="stats">
    ${statsItems.map(item => `<div><b>${item.value}</b>${item.label}</div>`).join('')}
  </div>`;

const offerImageByIndex = [1, 2, 3, 3, 3];

const offerBlock = index => `
  <div class="split" style="margin-bottom:60px">
    ${image('o' + offerImageByIndex[index])}
    <div>
      <h2>ВЫГОДНАЯ КОМБИНАЦИЯ</h2>
      <p>При покупке препаратов ТМ "Blum Gel" + ботулотоксин типа А = 1 флакон препарата ТМ "Blum Gel" в подарок.</p>
      <p>Акция действует до 08 июля, поспешите воспользоваться выгодным предложением!</p>
      <p>Чтобы узнать условия акции оставляйте заявку или звоните по номеру 0(800)-50-86-22</p>
      <a class="btn btn-inline" href="#/offers" data-modal="request-form">Оставить заявку</a>
    </div>
  </div>`;

const carousel = (slidesHtml, extraClass = '') => `
  <div class="carousel ${extraClass}">
    <button class="arrow arrow-prev" aria-label="Назад">‹</button>
    <div class="carousel-track">${slidesHtml}</div>
    <button class="arrow arrow-next" aria-label="Вперёд">›</button>
    <div class="carousel-dots"></div>
  </div>`;

const paginationBlock = '<div class="pagination"></div>';

const articleCard = index => `
  <div style="background:var(--gray)">
    ${image('b' + (index % 3 + 1))}
    <p style="padding:14px">${SAMPLE_ARTICLE_TITLE}</p>
    <p style="padding:0 14px 14px;text-align:right">
      <a style="color:var(--green);font-weight:600;font-size:13px" href="#/article">Читать полностью</a>
    </p>
  </div>`;

const masterClassSlide = (masterClass, index) => `
  <div>
    ${image('mc' + (index % 2 + 1))}
    <div class="masterclass-card">
      <div>
        <small>${masterClass.date}</small>
        <p><b>${masterClass.title}</b></p>
      </div>
      <div class="masterclass-price">${masterClass.price}</div>
    </div>
  </div>`;

const specialOfferSlide = imageNumber => `<a href="#/offers">${image('sp' + imageNumber)}</a>`;

const priceGroupRow = (title, days, hours, earlyPrice, latePrice) => `
  <tr class="group-row">
    <td>${title}</td><td>${days}</td><td>${hours}</td><td>${earlyPrice}</td><td>${latePrice}</td>
  </tr>`;

const priceSubRow = (title, days, hours, earlyPrice, latePrice) => `
  <tr class="sub-row">
    <td>${title}</td><td>${days}</td><td>${hours}</td><td>${earlyPrice}</td><td>${latePrice}</td>
  </tr>`;

const priceTableRows = () => [
  priceGroupRow('1.0 Мезотерапия в эстетической косметологии', '5', '40', '129 600 ₸', '176 400 ₸'),
  ...mesotherapyTopics.map(name => priceSubRow(name, '1', '8', '34 800 ₸', '47 400 ₸')),
  priceGroupRow('2.0 Контурная пластика иглой', '2', '16', '94 800 ₸', '142 800 ₸'),
  priceSubRow('Базовый уровень', '1', '8', '54 000 ₸', '77 400 ₸'),
  priceSubRow('Моделирование губ', '1', '8', '54 000 ₸', '77 400 ₸')
].join('');

const pages = {
  '': () => `
    <section class="hero">
      <div class="container">
        <div>
          <small>Бесплатный вебинар</small>
          <h1>ПРОФЕССИЯ КОСМЕТОЛОГ</h1>
          <p>Приглашаем на бесплатный вебинар для профессиональных косметологов и интересующихся этих профессией</p>
          <a class="btn btn-inline" style="display:inline-block" href="#/courses">Зарегистрироваться</a><a class="btn-outline" href="#/courses">Узнать подробнее</a>
        </div>
        ${image('hero')}
      </div>
    </section>
    <div class="container">
      ${statsBlock}

      <h2 class="section-title">Курсы обучения</h2>
      ${carousel([...courses, ...courses].slice(0, 5).map(courseCard).join(''))}

      <div class="split" style="margin-top:80px">
        ${image('h_about')}
        <div>
          <p>О нас</p>
          <h2>VALMARI<br>ВЕДУЩИЙ УЧЕБНЫЙ ЦЕНТР ЭСТЕТИЧЕСКОЙ КОСМЕТОЛОГИИ</h2>
          <p>Описание может быть любое.</p>
          <p>Ведущий учебный центр эстетической косметологии. Более 5 лет мы проводим курсы сертифицированного профессионального образования в области красоты, здоровья и молодости</p>
          <a href="#/about" style="color:var(--green);float:right">Подробнее ⟶</a>
        </div>
      </div>

      <h2 class="section-title">Обучение косметологов</h2>
      <div class="tiles">
        <a class="tile" href="#/courses">${image('t1')}</a>
        <a class="tile" href="#/courses">${image('t2')}</a>
        <a class="tile" href="#/courses">${image('t3')}</a>
        <a class="tile" href="#/schedule">${image('t4')}</a>
        <a class="tile" href="#/offers">${image('t5')}</a>
      </div>

      <div class="split" style="margin-top:80px">
        <div>
          <h2>ВЕДЕМ НАБОР МОДЕЛЕЙ</h2>
          <p>Мы предлагаем свои услуги для моделей.</p>
          <p>Выберите процедуру или несколько процедур и наш менеджер проконсультирует вас и назовет ближайшую дату, когда вы сможете получить эту процедуру.</p>
          <a class="btn btn-inline" href="#/" data-modal="request-form">Стать моделью</a>
        </div>
        ${image('h_model')}
      </div>

      <h2 class="section-title" style="margin-bottom:6px">Мастер-классы</h2>
      <p style="text-align:center">Мероприятия для повышения квалификации косметологов</p>
      <div style="margin-top:24px">
        ${carousel([...masterClasses, ...masterClasses].map(masterClassSlide).join(''), 'two-up')}
      </div>

      <h2 class="section-title">Почему мы</h2>
      ${whyUsBlocks}

      <h2 class="section-title">Специальные предложения</h2>
      ${carousel([1, 2, 3, 1, 2].map(specialOfferSlide).join(''))}
      ${callbackForm}
    </div>`,

  courses: () => {
    const gridItems = [courses[0], courses[1], courses[2], courses[0], courses[0], courses[1], courses[2], courses[1]];
    const gridHtml = gridItems.map((course, index) => {
      if (index === 3) return videoCard('Массаж лица', 'Видео урок:', 'vt1');
      if (index === 5) return videoCard('Актуальна ли мезотерапия в коррекции шеи...', 'Вебинар:', 'vt2');
      return courseCard(course);
    }).join('');

    return `
      <div class="container">
        <h2 class="section-title" style="margin-top:50px">КУРСЫ ОБУЧЕНИЯ</h2>
        <p style="text-align:center;margin-top:-18px">- курсы с возможностью ранней регистрации</p>
        <div class="tabs">
          <a class="active" data-filter="*">Все направления</a>
          <a class="has-submenu" data-filter=".offline">Курсы по косметологии<span class="submenu"><span data-filter=".offline">Эстетическая косметология</span><span data-filter=".offline">Инъекционная косметология</span><span data-filter=".offline">Лазерная косметология</span></span></a>
          <a data-filter=".online,.video-card">Онлайн обучение</a>
          <a data-filter=".masterclass">Мастер-классы</a>
        </div>
        <div class="grid" id="course-grid">${gridHtml}</div>
        ${paginationBlock}
      </div>`;
  },

  webinars: () => {
    const webinarItems = [courses[1], courses[2], courses[1], courses[0]];
    const gridHtml = webinarItems.map((course, index) =>
      index === 2 ? videoCard('Актуальна ли мезотерапия в коррекции шеи...', 'Вебинар:', 'vt2') : courseCard(course)
    ).join('');

    return `
      <div class="container">
        <h2 class="section-title" style="margin-top:50px">ВЕБИНАРЫ</h2>
        <p style="text-align:center;margin-top:-18px">- ближайшие и записанные вебинары</p>
        <div class="grid" id="course-grid">${gridHtml}</div>
        ${callbackForm}
      </div>`;
  },

  course: () => `
    <div class="container">
      <div class="hero" style="background:none">
        <div class="container" style="padding:30px 0">
          <div>
            <small style="color:var(--green)">Старт курса: 10 января</small>
            <h1 style="color:var(--text);font-size:30px">БОТУЛИНОТЕРАПИЯ ДЛЯ КОСМЕТОЛОГОВ</h1>
            <a class="btn btn-inline" style="display:inline-block" href="#/course" data-modal="request-form">Зарегистрироваться</a><a class="btn-outline" href="#/course">Узнать подробнее</a>
          </div>
          ${image('c_hero')}
        </div>
      </div>

      <div class="highlight-bar" style="text-align:left;padding:40px">
        <p>Процедура ботулинотерапия - это инъекционная методика для устранения и профилактики морщин. Также, процедура помогает бороться с опущением уголков рта, потерей четкости овала лица, гипергидрозом.</p>
        <p>Курс по ботулинотерапии необходим, чтобы вы были уверенны своих знаниях и приносили желаемый результат своим клиентам.</p>
      </div>

      <h2 class="section-title">Программа курса</h2>
      <details open>
        <summary>1 ДЕНЬ &nbsp; Тема: Коррекция ботулотоксином типа А (БТА) верхней и средней трети лица</summary>
        <h4>ТЕОРИЯ</h4>
        <ul>
          <li>Виды токсинов на рынке. Преимущества и особенности</li>
          <li>Показания, противопоказания применения для разных возрастов</li>
          <li>Анатомия лица по зонам. Геометрия точек и дозы</li>
          <li>Техники разведения БТА</li>
          <li>Условия хранения БТА</li>
        </ul>
        <h4>ПРАКТИКА</h4>
        <ul>
          <li>Геометрия точек</li>
          <li>Постановка руки</li>
          <li>Самостоятельные инъекции под чутким руководством тренера</li>
        </ul>
      </details>
      <details>
        <summary>2 ДЕНЬ &nbsp; Тема: Коррекция нижней трети лица, особенности лечения гипергидроза</summary>
        <h4>ТЕОРИЯ</h4>
        <ul>
          <li>Анатомия нижней трети лица</li>
          <li>Гипергидроз: показания и техника</li>
          <li>Профилактика осложнений</li>
        </ul>
        <h4>ПРАКТИКА</h4>
        <ul>
          <li>Работа на моделях под руководством тренера</li>
        </ul>
      </details>

      <h2 class="section-title">Чему вы научитесь на курсе</h2>
      <div class="grid grid-two">
        ${[
          { title: 'Минимум препарата максимум результата', text: 'Вы научитесь делать эстетически красивые результаты' },
          { title: 'Тренер гарантировано "поставит вашу руку"', text: 'Вы будете колоть самостоятельно уже на курсе' },
          { title: 'Узнаете, как работать с любыми ТМ ботулотоксина', text: 'Мы объясним, за что отвечает каждый показатель на упаковке' },
          { title: 'Вы отработаете практику на моделях', text: 'В нашей базе более 3500 моделей' }
        ].map(item => `<div class="feature-box"><h3>${item.title}</h3><p>${item.text}</p></div>`).join('')}
      </div>

      <div class="split" style="margin-top:70px;grid-template-columns:1fr 2fr">
        ${image('c_tr')}
        <div>
          <p style="color:var(--green)">Тренер</p>
          <h2>Марина Спивак</h2>
          <ul style="font-size:14px">
            <li>врач дерматовенеролог</li>
            <li>ведущий специалист косметолог-инъекционист</li>
            <li>главный тренер учебного центра ValMari</li>
            <li>более 10 лет опыта работы врачом-инъекционистом</li>
          </ul>
        </div>
      </div>

      <div class="highlight-bar" style="margin-top:70px;padding:50px">
        <h2 style="font-weight:500">РАННЯЯ РЕГИСТРАЦИЯ</h2>
        <p>При регистрации на курс до 15 декабря стоимость обучения - 84 000 ₸</p>
        <a class="btn btn-inline" href="#/course" data-modal="request-form">Зарегистрироваться</a>
      </div>

      <h2 class="section-title">Как это было в прошлый раз</h2>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(200px,1fr))">
        ${['g1', 'g2', 'g3', 'g1'].map(key => image(key)).join('')}
      </div>

      <h2 class="section-title">Другие курсы</h2>
      <div class="grid">${courses.map(courseCard).join('')}</div>
      <p style="text-align:right"><a href="#/courses">Смотреть все курсы</a></p>
    </div>`,

  video: () => `
    <div class="container">
      <h2 class="section-title" style="margin-top:50px">ВИДЕО-УРОК</h2>
      <div class="split">
        <div>
          <p style="color:var(--green)">Спикер: Марина Спивак</p>
          <h2 style="font-weight:500;font-size:28px">Как безопасно работать в зоне носослезной борозды канюлей?</h2>
          <p style="color:var(--green);margin-top:50px">Стоимость: 6 000 ₸</p>
          <a class="btn btn-inline" href="#/video">Купить</a>
        </div>
        ${image('v_main')}
      </div>

      <h2 class="section-title">Другие видео-уроки</h2>
      <div class="grid grid-two">
        ${['v_a', 'v_b', 'v_a'].map(key => `
          <div>
            ${image(key)}
            <p>${SAMPLE_ARTICLE_TITLE}</p>
            <a class="btn btn-inline" href="#/video">Купить</a>
          </div>`).join('')}
      </div>
    </div>`,

  offers: () => `
    <div class="container">
      <h2 class="section-title" style="margin-top:50px">СПЕЦИАЛЬНЫЕ ПРЕДЛОЖЕНИЯ</h2>
      ${[0, 1, 2, 3, 4].map(offerBlock).join('')}
      ${paginationBlock}
    </div>`,

  about: () => `
    <div class="container">
      <div class="hero" style="background:none">
        <div class="container" style="padding:30px 0">
          <h1 style="font-size:30px">УЧЕБНЫЙ ЦЕНТР ЭСТЕТИЧЕСКОЙ КОСМЕТОЛОГИИ VALMARI</h1>
          ${image('a_hero')}
        </div>
      </div>
      <div class="card">
        <p>Ведущий учебный центр эстетической косметологии. Более 5 лет мы проводим сертифицированные курсы профессионального образования в области косметологии и индустрии красоты.</p>
        <p>В данный момент в Алматы нет аналогов нашего учебного центра по уровню подготовки и разнообразию читаемых курсов.</p>
      </div>

      <h2 class="section-title" style="color:var(--green)">Мы - это обучение с комфортом</h2>
      ${['Удобный формат обучения', 'Светлые аудитории', 'Обучение в маленьких группах'].map((title, index) => `
        <div class="split" style="margin-bottom:40px;${index % 2 ? 'direction:rtl;' : ''}">
          ${image('a' + (index + 1))}
          <div style="direction:ltr">
            <h3>${title}</h3>
            <p>Мы стараемся для вас и делаем обучение еще комфортнее! У нас вы можете обучаться в формате оффлайн или выбирать онлайн формат обучения.</p>
          </div>
        </div>`).join('')}

      <div style="background:var(--green-lighter);padding:30px 0;margin:50px 0">
        <h2 class="section-title" style="color:var(--green);margin-top:0">Наши достижения</h2>
        ${statsBlock}
      </div>

      <h2 class="section-title">Почему мы</h2>
      ${whyUsBlocks}

      <h2 class="section-title">Наши тренера</h2>
      <div class="grid" style="grid-template-columns:repeat(auto-fit,minmax(180px,1fr))">
        ${['Марина Спивак', 'Елена Белогурова', 'Алина Ядчишина', 'Юлия Щукина'].map((name, index) => `
          <div class="trainer">${image('tr' + (index + 1))}<b>${name}</b><br><small>Тренер</small></div>`).join('')}
      </div>

      <h2 class="section-title">Отзывы</h2>
      <div class="reviews">
        ${[1, 2, 3, 4].map(() => `
          <div>
            <b>Ирина Бубличенко<br><small>15.09.2020</small></b>
            <span>Вчера была на карбокситерапии первый раз. Сомневалась в эффективности процедуры и очень зря! Цвет лица выровнялся и кожа подтянулась. Эффект был сразу после процедуры. Алиночка профессионал своего дела и отличный собеседник, всегда рекомендует самые эффективные процедуры.</span>
          </div>`).join('')}
        <a class="btn btn-inline" style="display:table;margin:auto" href="#/about" data-modal="review-form">Оставить отзыв</a>
      </div>
    </div>`,

  schedule: () => `
    <div class="container">
      <h2 class="section-title" style="margin-top:50px">Расписание</h2>
      <div class="tabs" style="max-width:570px">
        <a class="active" data-schedule-view="courses">Курсы обучения</a>
        <a data-schedule-view="webinars">Вебинары</a>
      </div>
      <div class="tabs" id="city-tabs">
        ${cities.map((city, index) => `<a class="${index ? '' : 'active'}">${city}</a>`).join('')}
      </div>
      <div class="calendar">
        <div class="calendar-controls">
          <button class="calendar-button" data-month-step="-1" aria-label="Назад">‹</button>
          <button class="calendar-button" data-month-step="1" aria-label="Вперёд">›</button>
          <button class="calendar-button" data-month-step="0">Сегодня</button>
          <b id="calendar-month"></b>
        </div>
        <div id="calendar-grid"></div>
      </div>
    </div>`,

  price: () => {
    const rows = priceTableRows();
    return `
      <div class="container">
        <h2 class="section-title" style="margin-top:50px">Стоимость обучения</h2>
        <div class="card" style="background:var(--gray);overflow-x:auto">
          <table>
            <tr>
              <th>Курс обучения</th><th>Дни</th><th>Часы</th><th>Ранняя регистрация</th><th>Поздняя регистрация</th>
            </tr>
            ${rows}
            ${rows}
          </table>
        </div>
        <p class="highlight-bar" style="margin-top:30px">* Вы можете пройти обучение полностью или выбрать 1-й или 2-й день</p>
        ${callbackForm}
      </div>`;
  },

  blog: () => `
    <div class="container">
      <div style="margin:30px 0">
        ${image('b_ban')}
        <p style="text-align:right;font-size:20px;margin:6px 0">Акция 2+1 в честь Черной пятницы<br><a href="#/offers" style="color:var(--green);font-size:13px;font-weight:600">Подробнее про акцию</a></p>
      </div>
      <h2 class="section-title">Полезные материалы</h2>
      <div class="grid">${[0, 1, 2, 3, 4, 5, 6, 7].map(articleCard).join('')}</div>
      ${paginationBlock}
    </div>`,

  article: () => `
    <div class="container">
      <div class="split" style="margin:40px 0">
        <h1 style="font-weight:500;font-size:28px">${SAMPLE_ARTICLE_TITLE}</h1>
        ${image('ar')}
      </div>
      <div class="highlight-bar" style="text-align:left;padding:40px">
        <p>Можно написать любое количество текста, лирического описания компании.</p>
        <p>Ведущий учебный центр эстетической косметологии. Более 5 лет мы проводим сертифицированные курсы профессионального образования в области косметологии и индустрии красоты.</p>
        <p>В данный момент в Алматы нет аналогов нашего учебного центра по уровню подготовки и разнообразию читаемых курсов. Все выпускники востребованы в институтах омоложения, Спа-центрах, салонах красоты и частных клиниках.</p>
      </div>
      <p style="text-align:center;margin-top:40px">
        <a href="#/blog" style="color:var(--green);font-weight:600;font-size:20px">Вернуться ко всем статьям</a>
      </p>
    </div>`,

  privacy: () => `
    <div class="container">
      <h2 class="section-title" style="margin-top:50px">Политика конфиденциальности</h2>
      <div class="card">
        <p>Мы собираем только те данные, которые вы оставляете в формах (имя и телефон), и используем их исключительно для связи по вашей заявке. Данные не передаются третьим лицам.</p>
        <p>Чтобы удалить свои данные, позвоните по номеру +7 (727) 508-62-22.</p>
      </div>
    </div>`,

  '404': () => `
    <div class="container not-found">
      ${image('nf')}
      <div>
        <h2>Похоже, эта страница отсутствует</h2>
        <p>Мы обязательно разберемся с этим недоразумением!<br>А пока вернитесь на <a href="#/" style="color:var(--green);font-weight:600">главную страницу</a></p>
      </div>
    </div>`
};

const feedbackForm = (title, commentPlaceholder, thanksModal) => `
  <h3>${title}</h3>
  <form data-submit-modal="${thanksModal}">
    <input required placeholder="Ваше имя">
    <input required type="tel" inputmode="tel" minlength="7" title="Введите номер телефона" placeholder="Ваш номер телефона">
    <textarea rows="4" placeholder="${commentPlaceholder}"></textarea>
    <button class="btn" style="width:100%">${thanksModal === 'request-thanks' ? 'Отправить заявку' : 'Отправить отзыв'}</button>
  </form>`;

const modalContents = {
  trailer: trailerImageSrc => `
    <img src="${trailerImageSrc}" alt="" style="width:100%;margin-bottom:16px">
    <h3>Трейлер</h3>
    <p>Видео появится здесь после подключения ролика.</p>`,
  'request-form': () => feedbackForm('Оставить заявку', 'Комментарий', 'request-thanks'),
  'review-form': () => feedbackForm('Оставить отзыв', 'Текст отзыва', 'review-thanks'),
  'review-thanks': () => '<h3>Спасибо за отзыв!</h3>',
  'request-thanks': () => `
    <h3>Спасибо за заявку!</h3>
    <p>Наш менеджер свяжется с вами,<br>а пока посетите нашу страницу в Instagram,<br>вас ждут самые выгодные акции!</p>
    <a class="instagram-button" href="https://instagram.com/" target="_blank" rel="noopener"><img src="images/ig.jpg" alt=""><span>Перейти в Instagram</span></a>`
};
