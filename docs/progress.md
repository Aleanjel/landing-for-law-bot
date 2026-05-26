# Progress Log — Legal Tech Landing Page

---

## Сесія: 2026-05-26

### Поточна задача
Реалізація 7 блоків лендінгу для Telegram-бота для юристів.

### Ціль
Створити повністю функціональну HTML-сторінку з преміум-дизайном (темно-синій Hero, чорно-білий мінімал далі), модульним CSS та безпечним JS для збору лідів через n8n webhook.

---

### Архітектура файлів

```
src/
├── index.html                  — єдина HTML-сторінка, семантична розмітка
├── css/
│   ├── variables.css           — CSS-змінні: кольори, шрифти, відступи
│   ├── base.css                — reset, html/body, глобальна типографіка
│   ├── components.css          — кнопки, мокап телефона, shared-елементи
│   ├── hero.css                — Блок 1: Hero (темно-синій фон)
│   ├── problems.css            — Блок 2: Проблематика (3 картки)
│   ├── features.css            — Блок 3: Функціонал (темний фон, 4 пункти)
│   ├── objections.css          — Блок 4: Заперечення (2 колонки-сценарії)
│   ├── approach.css            — Блок 5: Підхід (3 пункти)
│   ├── pricing.css             — Блок 6: Оффер (1 картка тарифу)
│   └── lead-form.css           — Блок 7: Lead Form + footer
└── js/
    └── form.js                 — fetch + rate-limit + sanitize + button states
```

---

### Дизайн-система (variables.css)

| Змінна               | Значення                          | Призначення                    |
|----------------------|-----------------------------------|--------------------------------|
| `--color-hero-bg`    | `#0D1B2A`                         | Hero deep navy                 |
| `--color-dark`       | `#111111`                         | Темні секції                   |
| `--color-light`      | `#F8F7F4`                         | Фон світлих секцій             |
| `--color-white`      | `#FFFFFF`                         | Чистий білий                   |
| `--color-accent`     | `#C8A96E`                         | Золотий акцент (CTA, деталі)   |
| `--color-text-muted` | `#6B7280`                         | Допоміжний текст               |
| `--font-display`     | `'Cormorant Garamond', serif`     | Заголовки (преміум)            |
| `--font-body`        | `'Inter', sans-serif`             | Тіло тексту                    |
| `--section-padding`  | `clamp(80px, 10vw, 140px) 0`      | Вертикальні відступи секцій    |
| `--container-max`    | `1200px`                          | Ширина контейнера              |
| `--transition`       | `0.3s cubic-bezier(0.4,0,0.2,1)` | Єдина анімація                 |

Шрифти: Google Fonts — `Cormorant Garamond` (300, 400, 600) + `Inter` (300, 400, 500).

---

### Покроковий план реалізації

- [x] **Крок 1.** Заповнити `docs/progress.md` — ЗРОБЛЕНО (цей файл)
- [x] **Крок 2.** Створити `src/css/variables.css` — дизайн-система, всі CSS-змінні
- [x] **Крок 3.** Створити `src/css/base.css` — reset, глобальні стилі, типографіка
- [x] **Крок 4.** Створити `src/css/components.css` — кнопки (.btn-primary), мокап телефона (.phone-mockup)
- [x] **Крок 5.** Верстка + стилі Блоку 1 (Hero) — `src/css/hero.css`
- [x] **Крок 6.** Верстка + стилі Блоку 2 (Проблематика) — `src/css/problems.css`
- [x] **Крок 7.** Верстка + стилі Блоку 3 (Функціонал) — `src/css/features.css`
- [x] **Крок 8.** Верстка + стилі Блоку 4 (Заперечення) — `src/css/objections.css`
- [x] **Крок 9.** Верстка + стилі Блоку 5 (Підхід) — `src/css/approach.css`
- [x] **Крок 10.** Верстка + стилі Блоку 6 (Оффер) — `src/css/pricing.css`
- [x] **Крок 11.** Верстка + стилі Блоку 7 (Lead Form + footer) — `src/css/lead-form.css`
- [x] **Крок 12.** Реалізація `src/js/form.js`:
  - Константи: WEBHOOK_URL (плейсхолдер), RATE_LIMIT_MS = 60000
  - `sanitize(str)` — trim + escape HTML-спецсимволів
  - `isRateLimited()` — перевірка затримки між надсиланнями
  - `setButtonState(state)` — 'idle' | 'loading' | 'success' | 'error'
  - `handleSubmit(e)` — основний обробник: validate → rate-check → sanitize → fetch POST → handle
  - Payload: `{ name, contact, source: 'landing', timestamp }`
- [x] **Крок 13.** Зібрати `src/index.html` — підключити всі CSS, всі секції, JS
- [x] **Крок 14.** ПРОТОКОЛ ЗАВЕРШЕННЯ

---

### Деталі по блоках

**Блок 1 — Hero:**
- `min-height: 100svh`, фон `--color-hero-bg`
- CSS Grid 2 колонки (60/40): ліва — H1 + підзаголовок + CTA, права — CSS phone mockup
- H1: Cormorant Garamond 600, ~64px desktop / 40px mobile
- Підзаголовок: Inter 300, rgba(255,255,255,0.65)
- CTA кнопка: золота обводка, hover — fill

**Блок 2 — Проблематика:**
- Фон `--color-light`
- 3 картки в CSS Grid (columns: repeat(auto-fit, minmax(280px, 1fr)))
- Картка: left border 2px solid black, велика цифра/символ, заголовок, текст

**Блок 3 — Функціонал:**
- Фон `--color-dark`, текст білий
- 4 пункти: великий прозорий порядковий номер + заголовок + текст
- Gold separator lines між пунктами

**Блок 4 — Заперечення:**
- Фон `--color-white`
- 2 колонки: "Без бота" (сірий, subdued) vs "З ботом" (чорний, контрастний)
- Висновок — великий bold-текст знизу з підкресленням

**Блок 5 — Підхід:**
- Фон `--color-light`
- 3 пункти: номер (Cormorant, великий) + заголовок + опис. Без іконок.

**Блок 6 — Оффер:**
- Фон `--color-dark`
- Одна центрована картка: назва тарифу, список (знак `—`), ціна, CTA → #contact

**Блок 7 — Lead Form:**
- Фон `--color-hero-bg` (симетрія з Hero)
- Centered: заголовок + підзаголовок + форма (name, contact) + кнопка
- Footer: мінімальний копірайт

---

---

## Сесія: 2026-05-26 (Redesign Блоку 3 — 2-колонковий грід)

### Поточна задача
Перебудова Блоку 3 (Функціонал) з вертикального списку на преміальний 2-колонковий грід.

### Ціль
`features-list`: flex column → CSS Grid 2×2. Спрощена картка — тільки чистий текст, border-top hairline, Cormorant Garamond заголовок. Адаптив: <768px → 1 колонка.

### Покроковий план
- [x] **Ф1.** ПРОТОКОЛ СТАРТУ
- [x] **Ф2.** Переписати `src/css/features.css` — grid layout + спрощена картка
- [x] **Ф3.** Оновити Block 3 в `src/index.html` — нова структура item (без .feature-body)
- [x] **Ф4.** ПРОТОКОЛ ЗАВЕРШЕННЯ

### Що зроблено — Блок 3 Grid
| | До | Після |
|---|---|---|
| `.features-list` | `flex column` | `grid repeat(2,1fr)`, col-gap clamp(48→96px) |
| `.feature-item` | `grid auto+1fr` (num+body) | `flex column` (num→title→text) |
| `.feature-num` | ghost 6rem opacity 0.06 | xs uppercase gold label 0.65 opacity |
| hover | left gold bar 2px | `border-top-color: accent` |
| `.feature-body` | обгортка-div | видалено |
| mobile | `<640px → 1col` | `<768px → 1col` (ширший breakpoint)

---

## Сесія: 2026-05-26 (Redesign Блоків 4 та 6)

### Поточна задача
Повна переробка верстки Блоку 4 (Заперечення) та Блоку 6 (Оффер) до преміального мінімалізму.

### Ціль
Замінити перевантажений текстом порівняльний блок на чистий versus-дизайн. Знищити class "картка тарифу" і замінити bespoke-форматом без рамок — лише гра шрифтом та відступами.

### Покроковий план
- [x] **Р1.** ПРОТОКОЛ СТАРТУ
- [x] **Р2.** Переписати `src/css/objections.css` — versus-layout, grand typography, maximum whitespace
- [x] **Р3.** Переписати `src/css/pricing.css` — bespoke service, без картки, тільки тип і простір
- [x] **Р4.** Оновити Block 4 в `src/index.html` — нова структура HTML (versus-grid)
- [x] **Р5.** Оновити Block 6 в `src/index.html` — нова структура HTML (bespoke-content)
- [x] **Р6.** ПРОТОКОЛ ЗАВЕРШЕННЯ

### Що зроблено — Redesign Блоків 4 та 6
**Блок 4 (Versus):**
- HTML: видалено 3 кроки + результати. Залишено: label + grand text per column + tagline
- CSS: `.versus-grid` — grid 1fr auto 1fr (без рамок і фонів)
- `.versus-result` — `var(--fs-4xl)` weight 300, ліва колонка opacity 0.45
- `.versus-divider` — 1px vertical hairline, gradient fade top/bottom
- `.objections-tagline` — xs body text + gold 32px hairline зверху
- Mobile: grid → стовпці вертикально, divider horizontal

**Блок 6 (Bespoke):**
- HTML: видалено картку, список, price block. Залишено: label + h2 + divider + services line + note + CTA
- CSS: `.bespoke-title` — `var(--fs-4xl)` weight 300, без рамок і тіней
- `.bespoke-services` — uppercase xs, rgba(255,255,255,0.40), крапки-•-акценти
- `.bespoke-note` — rgba(255,255,255,0.30), max-width 460px
- Нуль border, нуль background, нуль box-shadow — тільки простір і шрифт

---

## Сесія: 2026-05-26 (Scroll Snap)

### Поточна задача
Впровадження Full-Screen Scroll Snapping — "один блок = один екран".

### Ціль
Кожна секція займає точно 100svh. CSS scroll-snap-type: y mandatory на html. Адаптивність через clamp() + height media query для ноутбуків. Мобільний fallback на proximity + min-height.

### Архітектурні рішення
- Контейнер snap: `html` (scroll-snap-type: y mandatory; overflow-y: scroll; height: 100svh)
- scroll-padding-top: header-height — щоб фіксований header не перекривав контент секцій
- Секції з контентом що не влазить у 100svh (features, objections) → min-height: 100svh; height: auto
- @media (max-height: 860px): масштабуємо шрифти і мокап через clamp(vh)
- @media (max-width: 768px): перемикаємо на proximity + height: auto; min-height: 100svh
- IntersectionObserver threshold: 0.12 → 0.5 (краще спрацьовує при snap-переходах)

### Покроковий план
- [x] **С1.** Виконати ПРОТОКОЛ СТАРТУ у docs/progress.md
- [x] **С2.** Створити `src/css/snap.css` — scroll-snap, секції 100svh, compact gap overrides, laptop/mobile media queries
- [x] **С3.** Оновити `src/js/animations.js` — threshold 0.12→0.5, rootMargin '0px'
- [x] **С4.** Оновити `src/index.html` — підключено snap.css між lead-form.css та animations.css
- [x] **С5.** ПРОТОКОЛ ЗАВЕРШЕННЯ

### Що реалізовано — Scroll Snap
| Файл | Зміна |
|---|---|
| `snap.css` (новий) | `html`: height:100svh + overflow-y:scroll + scroll-snap-type:y mandatory + scroll-padding-top:72px |
| `snap.css` | `main > section`: height:100svh + snap-align:start + stop:always + display:flex justify:center |
| `snap.css` | `.hero` override: менший padding-top/bottom (clamp vh) |
| `snap.css` | `.features, .objections`: height:auto; min-height:100svh (надлишковий контент) |
| `snap.css` | `.site-footer`: scroll-snap-align:end |
| `snap.css` | Compact gaps: 6 секцій × gap + pricing-card padding зменшені через clamp(vh) |
| `snap.css` | `@media (max-height: 860px)`: fluid type scale + phone mockup height:42vh |
| `snap.css` | `@media (max-width: 768px)`: proximity + height:auto; min-height:100svh |
| `snap.css` | `@media (max-width: 480px)`: features/objections/approach snap вимкнено |
| `animations.js` | threshold: 0.12 → 0.5 (краще спрацьовує при snap-фіксації) |
| `index.html` | snap.css підключено після lead-form.css, перед animations.css |

### Логіка перекриття CSS (специфічність)
- `section` (0,0,1) ← base.css padding-block — перекривається
- `main > section` (0,0,2) ← snap.css — перекриває base.css ✓
- `.hero` (0,1,0) ← snap.css + hero.css — snap.css завантажується пізніше, виграє ✓

---

## Сесія: 2026-05-26 (Анімації)

### Поточна задача
Додавання динаміки та преміальних анімацій.

### Ціль
Перетворити статичну сторінку на живу: scroll-reveal для всіх блоків, 3D-тілт мокапа на mousemove, CSS entrance для Hero, shimmer на кнопках, float-анімація телефона.

### Покроковий план
- [x] **А1.** Створити `src/css/animations.css` — reveal-класи, hero entrance, phone float, prefers-reduced-motion
- [x] **А2.** Створити `src/js/animations.js` — IntersectionObserver + 3D tilt mousemove
- [x] **А3.** Оновити `src/css/components.css` — shimmer ::after на кнопках + .btn-block
- [x] **А4.** Оновити `src/css/hero.css` — .phone-tilt-wrapper
- [x] **А5.** Оновити `src/css/pricing.css` — hover lift на картці тарифу
- [x] **А6.** Оновити `src/index.html` — animations.css, animations.js, .reveal класи, .phone-tilt-wrapper, inline-style видалено
- [x] **А7.** ПРОТОКОЛ ЗАВЕРШЕННЯ

---

## ПРОТОКОЛ ЗАВЕРШЕННЯ — 2026-05-26

**Статус: Done**

### Фактично створені файли
| Файл | Опис |
|---|---|
| `src/index.html` | Повна семантична розмітка всіх 7 блоків |
| `src/css/variables.css` | CSS-змінні: кольори, шрифти, відступи, радіуси, тіні, анімації |
| `src/css/base.css` | Reset, body, типографіка, header, footer, утиліти |
| `src/css/components.css` | Кнопки (.btn-primary/.btn-accent/.btn-dark), CSS phone mockup, typing animation |
| `src/css/hero.css` | Hero: темно-синій фон, CSS Grid 60/40, scroll indicator |
| `src/css/problems.css` | 3 картки з hover-анімацією та gold декором |
| `src/css/features.css` | 4 пункти функціоналу на темному фоні |
| `src/css/objections.css` | 2-колонкове порівняння + висновок з gold border |
| `src/css/approach.css` | 3 пункти підходу, адаптивне перекомпонування |
| `src/css/pricing.css` | Преміум-картка тарифу з included list |
| `src/css/lead-form.css` | Форма з повними станами полів та кнопки |
| `src/js/form.js` | fetch, rate-limit (60s), sanitize, button states, sticky header, smooth scroll |

### Логічні наступні кроки
1. Відкрити `src/index.html` у браузері, перевірити всі блоки візуально
2. Перевірити 3D tilt мокапа на desktop (mousemove по hero)
3. Перевірити scroll-reveal — елементи мають плавно з'являтися при скролінгу
4. Замінити `WEBHOOK_URL` в `form.js` на реальний n8n webhook
5. Перевірити роботу форми через DevTools → Network
6. Провести mobile-тестування (375px, 768px) — тілт вимкнено на touch
7. Додати favicon та OG-теги для соц.мереж (за потреби)
8. Налаштувати хостинг або передати замовнику

### Анімації — що реалізовано (сесія 2)
| Файл | Що додано |
|---|---|
| `src/css/animations.css` | .reveal + .active, hero entrance CSS, phone-float, chat-pulse, prefers-reduced-motion |
| `src/js/animations.js` | IntersectionObserver (threshold 0.12), 3D tilt з lerp (rAF loop), pause float on tilt, touch disable |
| `src/css/components.css` | Shimmer ::after sweep на .btn-primary/.btn-accent, .btn-block клас |
| `src/css/pricing.css` | translateY(-6px) hover lift на .pricing-card |
| `src/index.html` | .reveal на 15+ елементах, .phone-tilt-wrapper, видалено inline-style |

---

## Сесія: 2026-05-26 (Redesign Блоку 6 → "Для кого")

### Поточна задача
Повна заміна концепції Блоку 6: з абстрактного "bespoke-оферу" на фокусний блок цільової аудиторії "Для кого ми створюємо цифрові рішення?".

### Ціль
3-колонковий CSS Grid із трьома портретами клієнта. Преміальна типографіка: Cormorant Garamond для назв категорій + Inter для описів. Без іконок, рамок, кольорових плашок — тільки текст і простір.

### Покроковий план
- [x] **Т1.** ПРОТОКОЛ СТАРТУ
- [x] **Т2.** Переписати `src/css/pricing.css` — нові класи `.audience`, `.audience-grid`, `.audience-item`, `.audience-category`, `.audience-text`
- [x] **Т3.** Оновити Block 6 в `src/index.html` — нова HTML-структура з 3 колонками
- [x] **Т4.** ПРОТОКОЛ ЗАВЕРШЕННЯ

### Що зроблено — Redesign Блоку 6 (Цільова аудиторія)
| | До | Після |
|---|---|---|
| Концепція | "Bespoke" оффер з абстрактними тезами | 3 портрети клієнта, конкретна self-identification |
| Section class | `.pricing` | `.audience` (id="pricing" збережено для nav-якоря) |
| HTML | `.bespoke-content` центрований блок | `.audience-grid` — repeat(3, 1fr) |
| Заголовки категорій | — | Cormorant Garamond, clamp(1.5→2.25rem), fw-light |
| Описи | — | Inter, fs-sm, rgba(255,255,255,0.45) |
| Декор | divider line, dot separators | тільки border-top hairline, hover: gold |
| Адаптив | — | desktop 3col → tablet 2col (≤900px) → mobile 1col (≤560px) |
| Анімації | `.reveal .reveal-d1` на bespoke-content | `.reveal` + `.reveal-d1` + `.reveal-d2` на кожному item |

---

## Сесія: 2026-05-26 (Redesign Блоку 7 — Underlined Form)

### Поточна задача
Переробка архітектури Lead Form з box-інпутів на елітний "underlined blank" дизайн із CSS Grid-сіткою.

### Ціль
Форма-бланк: прозорі поля тільки з нижньою лінією, 2-колонковий grid (ім'я + контакт у рядок), textarea на повну ширину, кнопка вирівняна праворуч. Оновити form.js для нового тексту кнопки та поля message.

### Покроковий план
- [x] **Ф1.** ПРОТОКОЛ СТАРТУ
- [x] **Ф2.** Переписати `src/css/lead-form.css` — underlined inputs, CSS Grid, hover/focus states
- [x] **Ф3.** Оновити Block 7 в `src/index.html` — нова структура: `.input-group`, `.form-textarea`, `.form-submit-row`
- [x] **Ф4.** Оновити `src/js/form.js` — новий текст кнопки + поле `message` в payload
- [x] **Ф5.** ПРОТОКОЛ ЗАВЕРШЕННЯ

### Що зроблено — Underlined Form Redesign
| | До | Після |
|---|---|---|
| Форма-лейаут | `flex column`, max-width 520px | `CSS Grid 2×1fr`, max-width 720px |
| Рядок 1 | Ім'я — окремо, контакт — окремо (стовпець) | Ім'я + Телефон в одному рядку (2 col) |
| Рядок 2 | — | Textarea `message` на повну ширину (`grid-column: 1/-1`) |
| Рядок 3 | Кнопка 100% ширина | Кнопка вирівняна праворуч |
| Input стиль | `background: rgba(255,255,255,0.05)`, border 1px all sides | `background: transparent`, тільки `border-bottom` |
| Focus стан | `border-color: accent` (all sides) | `border-bottom-color: accent` + placeholder opacity down |
| `.form-field` | обгортка div | видалено → замінено на `.input-group` |
| `form.js` idle | "Отримати консультацію" | "Отримати безкоштовний прототип" |
| `form.js` payload | `{name, contact, source, timestamp}` | `{name, contact, message, source, timestamp}` |
| Mobile ≤640px | max-width 100% | 1 колонка, кнопка 100% ширина |

---

## Сесія: 2026-05-26 (Form Rebuild v2 — 3 поля + строга типографіка)

### Поточна задача
Повна перебудова Lead Form: видалення textarea, додавання поля Email, виправлення контрасту labels, строга геометрія.

### Ціль
Три поля (name, email, contact) у чіткій сітці. Labels — uppercase, fw-600, чітко видні. Inputs — тільки border-bottom, великий gap між label і input. Кнопка "Зв'яжіться з нами" — повна ширина. JS: нова валідація email + email у payload.

### Покроковий план
- [x] **В1.** ПРОТОКОЛ СТАРТУ
- [x] **В2.** Переписати `src/css/lead-form.css` — нові класи `.form-group`, контрастні labels, правильні відступи
- [x] **В3.** Оновити Block 7 в `src/index.html` — 3 поля (name/email/contact), без textarea
- [x] **В4.** Оновити `src/js/form.js` — email поле + валідація + payload + текст кнопки
- [x] **В5.** ПРОТОКОЛ ЗАВЕРШЕННЯ

### Що зроблено — Form Rebuild v2
| | До | Після |
|---|---|---|
| Поля | name + contact + textarea | name + email + contact (без textarea) |
| Layout | `input-group` (2 col + 1 full) | `form-group` (2 col + 1 full) |
| Label контраст | `rgba(255,255,255,0.35)`, fw-medium | `rgba(255,255,255,0.55)`, fw-600, 11px |
| Label-input gap | `--space-2` (8px) | `--space-3` (16px) — чітко розділені |
| Input padding | `padding: 12px 0` | `padding: 10px 0` |
| Border-bottom | `rgba(255,255,255,0.25)` | `rgba(255,255,255,0.20)` |
| Кнопка | правий край, не 100% | повна ширина, центровано |
| Кнопка текст | "Отримати безкоштовний прототип" | "Зв'яжіться з нами" |
| JS validateForm | 2 аргументи (name, contact) | 6 аргументів через об'єкт `fields` |
| JS payload | `{name, contact, message, ...}` | `{name, email, contact, ...}` |
| Email regex | — | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` |

---

## Сесія: 2026-05-26 (Form v3 — 4 поля, телефонна маска)

### Поточна задача
Реструктуризація форми: ПІБ + Телефон (рядок 1), Email за бажанням + Telegram за бажанням (рядок 2). Маска українського телефону. Валідація опціональних полів "якщо заповнено".

### Покроковий план
- [x] **М1.** ПРОТОКОЛ СТАРТУ
- [x] **М2.** Оновити Block 7 в `src/index.html` — 4 поля нової структури
- [x] **М3.** Оновити `src/css/lead-form.css` — `.form-optional` span стиль
- [x] **М4.** Переписати `src/js/form.js` — маска телефону, нова валідація
- [x] **М5.** ПРОТОКОЛ ЗАВЕРШЕННЯ

### Що зроблено — Form v3
| | До | Після |
|---|---|---|
| Поля | name + email + contact | fullname + phone (row1) + email + telegram (row2) |
| Phone | text input, без маски | `type="tel"`, маска `+38 (0XX) XXX-XX-XX` |
| Email | обов'язковий | за бажанням (валідується тільки якщо заповнено) |
| Telegram | — | за бажанням, формат `@username` (4–32 символи) |
| Валідація | 3 поля (name, email, contact) | 4 поля + `PHONE_RE` + `TELEGRAM_RE` |
| Payload | `{name, email, contact}` | `{fullname, phone, email, telegram}` |
| Маска | — | `formatPhone()` + `onPhoneInput()` + paste handler |
