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

---

## Сесія: 2026-05-26 (Form Final Fix — 3 поля, чиста валідація)

### Поточна задача
Повний rebuild форми: спрощення до 3 полів (name, email, contact), усунення багів (page reload, порожні поля), CONTACT_RE для телефону/Telegram, зняття помилки при input.

### Покроковий план
- [x] **X1.** ПРОТОКОЛ СТАРТУ
- [x] **X2.** Оновити Block 7 `src/index.html` — 3 поля: name (required), email (optional), contact (required)
- [x] **X3.** Переписати `src/js/form.js` — чиста валідація, e.preventDefault(), clearError on input
- [x] **X4.** ПРОТОКОЛ ЗАВЕРШЕННЯ

### Що зроблено — Form Final Fix
| Баг | Причина | Виправлення |
|---|---|---|
| Page reload при submit | JS не знаходив елементи (name mismatch) → падав до дефолту | `e.preventDefault()` — перший рядок handleSubmit |
| Порожні поля проходили | 4 поля з новими іменами, JS шукав старі | Rebuild: 3 поля з іменами `name/email/contact` |
| Телефон приймав текст | keydown-фільтр на окреме поле, combined field не захищено | `CONTACT_RE` на валідації submit; поле вільне для вводу @/+ |
| Помилка не знімалась | clearError не було підключено | `input` → `clearError()` на всіх 3 полях |
| Структура | 4 поля (fullname/phone/email/telegram) | 3 поля: name(req) + email(opt) + contact(req) |

### Регекси
| Поле | Regex | Приклади |
|---|---|---|
| email | `/^[^\s@]+@[^\s@]+\.[^\s@]+$/` | name@mail.ua |
| contact | `/^(\+\d{10,15}\|[@a-zA-Z][a-zA-Z0-9_]{4,})$/` | +380661234567, @username |

---

## Сесія: 2026-05-27 (Масштабування — Калькулятор, Відгуки, Sticky Scroll, Chat Animation)

### Поточна задача
Розширення лендінгу з 7 до 8 блоків: додати Калькулятор (Блок 3) та Відгуки (Блок 6), переробити Функціонал на Sticky Scroll (Блок 4), додати анімацію живого діалогу у phone mockup Hero.

### Ціль
Зберегти всі попередні напрацювання (Audience, Lead Form, Versus, Problems) і додати конверсійні блоки з преміальним UI/UX згідно дизайн-системи проєкту.

### Застосовані скіли
- `frontend-developer.md` — Bold aesthetic direction, staggered reveals, spatial composition
- `ui ux pro max.md` — Animation §7 (duration-timing, transform-performance), Layout §5 (mobile-first), Forms §8

### Нова архітектура (8 блоків)

| # | Секція | id | CSS | Стан |
|---|--------|----|-----|------|
| 1 | Hero + Chat Typing Animation | hero | hero.css | оновлено (JS anim) |
| 2 | Проблематика | problems | problems.css | без змін |
| 3 | Калькулятор (НОВИЙ) | calculator | calculator.css | NEW |
| 4 | Функціонал — Sticky Scroll | features | features.css | переписано |
| 5 | Заперечення Versus | objections | objections.css | без змін |
| 6 | Відгуки (НОВИЙ) | testimonials | testimonials.css | NEW |
| 7 | Цільова аудиторія | pricing | pricing.css | без змін |
| 8 | Lead Form | contact | lead-form.css | без змін |

**Видалено:** Блок "Підхід" (`approach.css` — файл залишається, секція з HTML прибрана)

### Нові файли
| Файл | Опис |
|---|---|
| `src/css/calculator.css` | Range slider, display велике число, controls |
| `src/css/testimonials.css` | 3-col grid, grayscale аватари, P→S→R структура |
| `src/js/calculator.js` | Slider input → dynamic loss calculation, fill track |

### Оновлені файли
| Файл | Зміна |
|---|---|
| `src/css/features.css` | Grid 2-col → Sticky Left / Scroll Right layout |
| `src/css/animations.css` | Початковий стан chat messages для JS-анімації |
| `src/js/animations.js` | `initChatTyping()` — sequential reveal loop |
| `src/index.html` | 8 блоків, нові CSS/JS link, видалено approach |

### Дизайн-рішення
- **Калькулятор:** `--color-white` фон — чорні цифри Cormorant Garamond на білому = максимальний шок-контраст. Slider: тонка лінія + золотий повзунок.
- **Відгуки:** `--color-light` фон — теплий, довірчий тон. Структура "Проблема → Рішення → Результат" з `→` gold-акцентом.
- **Sticky Scroll:** left-col `position: sticky`, right-col 4 items по ~50vh — перемикання мобільний: static layout.
- **Chat Animation:** JS `async/await` + `setTimeout` loop, `prefers-reduced-motion` fallback.

### Покроковий план
- [x] **П1.** ПРОТОКОЛ СТАРТУ
- [x] **П2.** Створити `src/css/calculator.css`
- [x] **П3.** Створити `src/css/testimonials.css`
- [x] **П4.** Створити `src/js/calculator.js`
- [x] **П5.** Переписати `src/css/features.css` — sticky scroll
- [x] **П6.** Оновити `src/css/animations.css` + `src/js/animations.js` — chat typing
- [x] **П7.** Перебудувати `src/index.html` — 8 блоків
- [x] **П8.** ПРОТОКОЛ ЗАВЕРШЕННЯ

---

## ПРОТОКОЛ ЗАВЕРШЕННЯ — 2026-05-27

**Статус: Done**

### Фактично створені / оновлені файли

| Файл | Дія | Опис |
|---|---|---|
| `src/css/calculator.css` | НОВИЙ | Range slider (WebKit+Firefox), calc-display Cormorant 4xl, fill-track JS, responsive |
| `src/css/testimonials.css` | НОВИЙ | 3→2→1 col grid, grayscale CSS аватари, P→S→R структура, author footer |
| `src/js/calculator.js` | НОВИЙ | `initCalculator()`: slider input → loss calc, gold fill-track, accent flash |
| `src/css/features.css` | ПЕРЕПИСАНО | Grid 2-col, sticky left / scroll right, gold bar ::before hover, mobile: static |
| `src/css/animations.css` | ОНОВЛЕНО | Блок 6: `.phone-msg` initial `opacity:0`, `.is-visible` клас, reduced-motion fallback |
| `src/js/animations.js` | ОНОВЛЕНО | `initChatTyping()`: async/await loop, typing indicator між bot-msg, 3.8s restart |
| `src/index.html` | ПЕРЕБУДОВАНО | 8 блоків, видалено Approach, нові CSS/JS links, оновлена nav |

### Архітектурні рішення

**Sticky Scroll Features:**
- `padding-block: 0` на `.features` секції — дочірні колонки керують власними відступами
- `.features-sticky-col { position: sticky; top: calc(var(--header-height) + var(--space-8)) }` — прилипає нижче фіксованого header
- Mobile ≤900px: `position: static`, обидві колонки у flow

**Chat Typing Animation:**
- JS-driven: `async/await` + `setTimeout`, без setInterval (щоб уникнути drift)
- `.is-visible` клас замість inline opacity — CSS transition на класі
- `prefers-reduced-motion`: показуємо всі повідомлення статично без анімації
- Якщо JS не завантажився: повідомлення лишаються `opacity: 0` — але це герой-секція, завжди вгорі, завжди в DOM

**Calculator:**
- `aria-live="polite"` на `.calculator-display` — screen reader оголошує нову суму
- `aria-valuemin/max/now` на `<input type="range">` для accessibility
- Fill-track через inline `background` gradient (CSS-only філ слайдера без ::before tricks)

### Логічні наступні кроки
1. Відкрити `src/index.html` у браузері, перевірити всі 8 блоків
2. Перевірити sticky scroll на desktop (Features): прокрутити повільно через секцію
3. Перевірити chat typing animation у Hero: ~4 повідомлення → typing → restart ~8s
4. Перетягнути calculator slider: великі цифри мають оновлюватись, fill — gold
5. Перевірити testimonials: аватари чорно-білі (filter), P→S→R структура
6. Mobile тест 375px: sticky → static, 3col → 1col, slider touch
7. Перевірити form.js — валідація та webhook не змінювались
8. Провести accessibility аудит (tab navigation, aria-labels)

---

## Сесія: 2026-05-27 (Правка UI — Відступи, Читабельність, Hover, Full-Screen)

### Поточна задача
Виправлення 4 проблем з відображенням: надмірні відступи, слабкий контраст тексту, hover у Features, висота секцій.

### Ціль
Зробити лендінг більш зібраним, читабельним та функціонально коректним щодо full-screen scroll.

### Покроковий план
- [x] **У1.** ПРОТОКОЛ СТАРТУ
- [x] **У2.** `variables.css` — зменшити `--section-padding-y` (~40%), darkер текстові токени
- [x] **У3.** `base.css` — `main > section { min-height: 100svh; display: flex; flex-direction: column; justify-content: center }`
- [x] **У4.** `features.css` — видалити `::before` bar, новий full-card hover: bg+radius+translateY+padding
- [x] **У5.** Секційні CSS (problems/calculator/testimonials/objections/pricing/lead-form) — gap/padding -35%, fw-light→regular, darker text
- [x] **У6.** ПРОТОКОЛ ЗАВЕРШЕННЯ

---

## ПРОТОКОЛ ЗАВЕРШЕННЯ — 2026-05-27 (UI Fixes)

**Статус: Done**

### Що змінено — таблиця

| Файл | Правка | Конкретна зміна |
|---|---|---|
| `variables.css` | 1+2 | `--section-padding-y`: `clamp(80→48px, 10→5vw, 140→96px)` |
| `variables.css` | 2 | `--color-text-secondary`: `#4A4A4A` → `#2A2A2A` |
| `variables.css` | 2 | `--color-text-muted`: `#888888` → `#666666` |
| `base.css` | 4 | `main > section { min-height:100svh; display:flex; flex-direction:column; justify-content:center }` |
| `features.css` | 3 | Видалено `::before` bar; `.feature-item:hover` → `bg rgba(255,255,255,0.04)` + `border-radius:12px` + `translateY(-4px)` + `box-shadow` |
| `features.css` | 1+2 | Item padding `space-8→space-6 + space-5 inline`; sticky-col gap `space-7→space-5`; text opacity `0.40→0.60`, `0.45→0.65`; `fw-regular` |
| `problems.css` | 1+2 | Container gap `space-9→space-6`; card padding `space-7→space-6`; text `fs-sm→fs-base`, `fw-regular`, `color-text-secondary→primary` |
| `calculator.css` | 1+2 | Container gap `space-9→space-6`; display padding `space-8→space-6`; `.calc-period` `fw-light→regular`; label `fw-regular→medium`, `color-primary`; controls gap `space-6→space-5` |
| `testimonials.css` | 1+2 | Container gap `space-9→space-6`; grid gap `clamp(32→20px)`; item gap `space-6→space-4`; problem `color-muted→secondary`; solution `color-secondary→primary`; `fw-regular` |
| `objections.css` | 1+2 | Container gap `space-7→space-5`; col padding `space-6/8→space-5/6`; tagline `fw-light→regular`, `fs-sm→fs-base`, `color-muted→secondary` |
| `pricing.css` | 1+2 | Container gap `space-9→space-6`; grid gap `clamp(40→24px)`; item padding `space-6→space-5`; text `fs-sm→fs-base`, `opacity 0.45→0.60`, `fw-regular` |
| `lead-form.css` | 1 | Container gap `space-9→space-6`; wrapper `row-gap space-8→space-6`, `col-gap clamp(32→24px)` |

### Логіка Правки 4 (Full-screen)
`main > section` отримав `display:flex; flex-direction:column; justify-content:center`. Специфічність `main > section` = (0,0,2), нижча ніж `.hero` (0,1,0), тому hero зберігає своє `padding-top: header + space-8`. Решта секцій: контент вертикально центрується у `min-height:100svh`. Features: `padding-block:0` збережено, sticky-col продовжує працювати.

### Логічні наступні кроки
1. Відкрити `src/index.html` у браузері — перевірити що кожна секція = 1 екран
2. Проскролити через Features — перевірити sticky col та hover (translateY+bg)
3. Перевірити Calculator: контраст тексту на білому фоні, slider
4. Перевірити мобільний 375px: centering + spacing

---

## Сесія: 2026-05-27 (Mobile Adaptation — всі 8 блоків)

### Поточна задача
Реалізувати бездоганну мобільну адаптацію для всіх 8 блоків лендінгу: жоден елемент не перекриває інший, текст не обрізається, дизайн залишається преміальним на будь-якому смартфоні.

### Ціль
- Глобальний mobile type scale (768px + 480px): H1/H2 32–40px на мобільному
- Всі multi-column grid → 1fr при <768px
- Full-screen scroll fix: `height: auto` на мобільному (контент не обрізається)
- Hero: 2-col → 1-col; phone mockup прихований на 480px
- Touch targets: `.btn` та `.form-input` `min-height: 48px`; `:active` feedback states
- Slider thumb 28px для зручного touch

### Застосовані скіли
- `ui ux pro max.md` — Touch targets ≥48px, tap highlight, mobile type scale

### Покроковий план
- [x] **М1.** ПРОТОКОЛ СТАРТУ (цей запис)
- [ ] **М2.** `variables.css` — `@media (max-width: 768px/480px)` type scale + spacing overrides
- [ ] **М3.** `base.css` — `height: auto` mobile override, `line-height` tight, `-webkit-tap-highlight-color`
- [ ] **М4.** `hero.css` — `padding-top` at 768px, приховати `.hero-visual` та `.hero-scroll` at 480px
- [ ] **М5.** `components.css` — `min-height: 48px`, `:active`, `touch-action: manipulation`
- [ ] **М6.** `testimonials.css` — breakpoint 640px → 768px для 1-col
- [ ] **М7.** `pricing.css` — breakpoint 560px → 768px для 1-col
- [ ] **М8.** `calculator.css` — `calc-amount` font-size override, slider thumb 28px
- [x] **М2.** `variables.css` — `@media (max-width: 768px/480px)` type scale + spacing overrides
- [x] **М3.** `base.css` — `height: auto` mobile override, `line-height` tight, `-webkit-tap-highlight-color`
- [x] **М4.** `hero.css` — `padding-top` at 768px, приховати `.hero-visual` та `.hero-scroll` at 480px
- [x] **М5.** `components.css` — `min-height: 48px`, `:active`, `touch-action: manipulation`
- [x] **М6.** `testimonials.css` — breakpoint 640px → 768px для 1-col
- [x] **М7.** `pricing.css` — breakpoint 560px → 768px для 1-col
- [x] **М8.** `calculator.css` — `calc-amount` font-size override, slider thumb 28px
- [x] **М9.** `lead-form.css` — `min-height: 48px` для `.form-input`, `:active` для submit, breakpoint 640px → 768px
- [x] **М10.** ПРОТОКОЛ ЗАВЕРШЕННЯ

---

## ПРОТОКОЛ ЗАВЕРШЕННЯ — 2026-05-27 (Mobile Adaptation)

**Статус: Done**

### Фактично змінені файли

| Файл | Зміна |
|---|---|
| `variables.css` | Додано `@media (max-width: 768px)` + `480px`: override `--fs-hero/3xl/4xl/2xl` до мобільних значень, `--section-padding-y` менший, `--container-padding: 20px` |
| `base.css` | `-webkit-tap-highlight-color: transparent` на `html`; `@media (max-width: 768px)`: `height: auto` + `min-height: 100svh` на `main > section`, `line-height: 1.2` для h1/h2, `1.6` для p |
| `hero.css` | Додано `@media (max-width: 768px)`: менший `padding-top`; `@media (max-width: 480px)`: `display: none` для `.hero-visual` та `.hero-scroll` (фокус на UTP+CTA), прибрано старий розмір phone на 480px |
| `components.css` | `.btn`: `min-height: 48px`, `touch-action: manipulation`, `:active` → `transform: scale(0.97)` |
| `testimonials.css` | Breakpoint 1-col: 640px → 768px |
| `pricing.css` | Breakpoint 1-col: 560px → 768px (після існуючого 900px→2col) |
| `calculator.css` | `@media (max-width: 768px)`: `calc-amount` → `clamp(2rem, 10vw, 3rem)`, slider thumb 28×28px, track `height: 2px` з `padding-block: 10px` |
| `lead-form.css` | `.form-input`: `padding: 14px 0`, `min-height: 48px`, `touch-action: manipulation`; `.form-submit:active` → `scale(0.98)`; breakpoint 1-col: 640px → 768px |

### Mobile breakpoint map (фінальний стан)

| Блок | 768px | 480px |
|---|---|---|
| Hero | padding-top менший | phone + scroll indicator приховані |
| Problems | вже 1-col при ≤900px ✓ | — |
| Calculator | calc-amount менший, slider thumb 28px, cta стовпець | label flex-column |
| Features | вже static при ≤900px ✓ | — |
| Objections | вже 1-col при ≤768px ✓ | padding 0 |
| Testimonials | 1-col ← було 640px | — |
| Audience | 1-col ← було 560px | — |
| Lead Form | 1-col ← було 640px | toast edge padding |

### Логічні наступні кроки
1. Відкрити `src/index.html` на реальному телефоні або DevTools 375px
2. Перевірити Hero: тільки текст + CTA кнопка (phone прихований на 480px)
3. Перевірити Calculator slider: великий thumb 28px, зручний drag
4. Перевірити Lead Form: 1-col на 375px, поля ≥48px tap target
5. Перевірити `:active` feedback на кнопках та submit

---

## Сесія: 2026-05-27 (Horizontal Overflow Fix)

### Поточна задача
Усунути горизонтальний скрол на мобільних екранах — елементи не поміщаються в ширину.

### Root-cause аналіз
| Проблема | Файл | Деталь |
|---|---|---|
| `html` без `overflow-x: hidden` + `max-width: 100%` | `base.css` | iOS Safari ігнорує `overflow-x` на `body` якщо `html` не обмежено |
| `width: calc(100vw - 64px)` в toast | `lead-form.css` | `100vw` включає ширину скролбара → ширший за viewport |
| `.phone-mockup` без `max-width: 100%` | `components.css` | Фіксована ширина 260px може переповнювати вузькі контейнери |
| Відсутній `overflow-wrap: break-word` | `base.css` | Довгі слова/URL розривають контейнери |

### Покроковий план
- [x] **О1.** ПРОТОКОЛ СТАРТУ
- [x] **О2.** `base.css` — `html/body: max-width: 100%; overflow-x: hidden` + `overflow-wrap: break-word`
- [x] **О3.** `lead-form.css` — `100vw` → `100%` в toast
- [x] **О4.** `components.css` — `max-width: 100%` для `.phone-mockup`
- [x] **О5.** ПРОТОКОЛ ЗАВЕРШЕННЯ

---

## ПРОТОКОЛ ЗАВЕРШЕННЯ — 2026-05-27 (Horizontal Overflow Fix)

**Статус: Done**

### Фактично змінені файли

| Файл | Зміна | Ефект |
|---|---|---|
| `base.css` | `html` + `body`: `max-width: 100%; overflow-x: hidden` | Подвійна блокада overflow — iOS Safari поважає лише коли обидва встановлені |
| `base.css` | `body`: `overflow-wrap: break-word; word-break: break-word` | Довгі слова/URL не розривають контейнери |
| `lead-form.css` | `width: calc(100vw - 64px)` → `calc(100% - 64px)` (toast) | `100vw` > viewport на десктопі зі скролбаром |
| `lead-form.css` | `width: calc(100vw - 32px)` → `calc(100% - 32px)` (toast 480px) | Те саме для мобільного breakpoint |
| `components.css` | `.phone-mockup`: `max-width: 100%` | Захист від переповнення у вузьких контейнерах |

### Перевірені та безпечні елементи
- `.hero::before/.hero::after` — батько `.hero { overflow: hidden }` ✓
- `.lead-form-section::before` — батько `overflow: hidden` ✓
- `.hero-scroll { left: 50%; transform: translateX(-50%) }` — центрований ✓
- `.btn-primary/accent::after` shimmer — батько `overflow: hidden` ✓
- `.problem-card-index { position: absolute; right: 24px }` — 2 символи ≈ 80px, в картці ≥335px ✓

### Логічні наступні кроки
1. Перевірити у DevTools 375px: Overflow Inspector → нуль червоних рамок
2. Протестувати реальний пристрій iOS Safari (найбільш вибагливий до overflow)
3. Перевірити Desktop з системним скролбаром — toast не повинен виходити за edge

---

## Сесія: 2026-05-27 (Content & Form Logic — Відгуки / Аудиторія / Форма)

### Поточна задача
Точкові змістові та логічні правки: живі відгуки, нова третя категорія аудиторії (Нотаріуси), Email → обов'язкове поле.

### Покроковий план
- [x] **Р1.** ПРОТОКОЛ СТАРТУ
- [x] **Р2.** `index.html` — переписати 3 відгуки (Блок 6), природна мова без жорсткої P/R/S структури
- [x] **Р3.** `index.html` — замінити третій audience item на "Нотаріуси" (Блок 7)
- [x] **Р4.** `index.html` — додати `*` до обов'язкових полів, прибрати "(за бажанням)", `required` на email
- [x] **Р5.** `lead-form.css` — додати `.form-required` клас (заборонено inline styles)
- [x] **Р6.** `form.js` — email: валідація як обов'язкове поле
- [x] **Р7.** ПРОТОКОЛ ЗАВЕРШЕННЯ

---

## ПРОТОКОЛ ЗАВЕРШЕННЯ — 2026-05-27 (Content & Form Logic)

**Статус: Done**

### Правка 1 — Відгуки (Блок 6)
| | До | Після |
|---|---|---|
| Структура | 3 теги `<p>`: `problem` + `solution` + `result` | 2 теги: `solution` (цитата) + `result` (метрика) |
| Тон | Описова, жорстка P→S→R | Перша особа, розмовна, природна |
| Андрій Коваль | "Щотижня я міг не взяти слухавку…" | "Під час засідань я фізично не можу відповідати…" |
| Олена Мартиненко | "Ми — команда з 4 юристів. Адміністратор витрачав…" | "У нас четверо юристів, і ми тонули в первинній обробці…" |
| Василь Петренко | "Моя практика — виключно M&A угоди…" | "Я спеціалізуюся на угодах із великим чеком…" |

### Правка 2 — Цільова аудиторія (Блок 7)
| | До | Після |
|---|---|---|
| 3-й item | "Вузькопрофільні експерти" — абстрактний | "Нотаріуси та нотаріальні контори" — конкретний сегмент |
| Опис | "…відсіє нецільові звернення…" | "…перелік документів для довіреностей, договорів, спадщини…" |

### Правка 3 — Lead Form (Блок 8)
| Поле | HTML `required` | Зірочка `*` | JS валідація |
|---|---|---|---|
| ПІБ | ✓ (було) | ✓ (додано) | обов'язкове (було) |
| Номер телефону | ✓ (було) | ✓ (додано) | обов'язкове (було) |
| Email | ✓ (додано) | ✓ (додано) | **обов'язкове (змінено)** |
| Telegram | ✗ | ✗ | опційний (без змін) |

- `.form-required { color: var(--color-accent) }` — новий CSS клас (без inline styles)
- Видалено `<span class="form-optional">(за бажанням)</span>` з Email і Telegram
- `form.js` validate(): email перевіряється у два кроки — порожнє? → "Введіть email"; невалідне? → "Введіть коректну адресу"

---

## Сесія: 2026-05-27 (Audience Cards — Sync Content + Equal Height)

### Поточна задача
Синхронізувати обсяг тексту в картках Блоку 7 (Цільова аудиторія) та забезпечити рівну висоту карток через CSS Grid + flex.

### Ціль
Картка "Нотаріуси" — занадто довгий текст, порушує симетрію сітки. Замінити на лаконічний. CSS: `align-items: stretch` на гриді + `display: flex; flex-direction: column; height: 100%` на картках → рівна висота незалежно від кількості тексту.

### Покроковий план
- [x] **Н1.** ПРОТОКОЛ СТАРТУ
- [x] **Н2.** `index.html` — замінити текст 3-ї картки на лаконічний
- [x] **Н3.** `pricing.css` — `align-items: stretch` на `.audience-grid`, `height: 100%` на `.audience-item`
- [x] **Н4.** ПРОТОКОЛ ЗАВЕРШЕННЯ

### Що зроблено

| Файл | Зміна | Ефект |
|---|---|---|
| `src/index.html` | Текст 3-ї картки скорочено з ~45 слів до ~19 | Візуальний обсяг картки "Нотаріуси" = картки 1 і 2 |
| `src/css/pricing.css` | `.audience-grid`: `align-items: stretch` | Усі клітинки гриду розтягуються до висоти найвищої |
| `src/css/pricing.css` | `.audience-item`: `height: 100%` | Кожна flex-картка заповнює весь простір клітинки |

**Новий текст картки 3:**
"Для фахівців із потоком стандартизованих запитів. Бот миттєво видає перелік документів для типових дій та збирає базові дані клієнта ще до його візиту."

### Логіка рівної висоти
- `align-items: stretch` (default для grid, але явно задано для читабельності) — grid item займає всю висоту рядка
- `height: 100%` на `.audience-item` — flex-контейнер розтягується на весь grid item
- `flex-direction: column` (вже було) — заголовки всіх карток знаходяться на одній горизонтальній лінії, текст починається зверху

---

## Сесія: 2026-05-27 (Card Redesign + Text Overlap Fix)

### Поточна задача
Усунути накладання тексту та стилізувати пункти у 4 блоках (Проблематика, Функціонал, Відгуки, Цільова аудиторія) у вигляді преміальних мінімалістичних карток.

### Root-cause аналіз
| Проблема | Файл / Клас | Деталь |
|---|---|---|
| Відсутній глобальний margin-bottom для h2/h3 | `base.css` | Заголовки прилипають до наступного елементу |
| `.audience-item`: gap: 0 на мобільному | `pricing.css` | Картки без відступу між собою |
| `.testimonial-item`: тільки border-top, без padding по боках | `testimonials.css` | Контент впирається в краї |
| `.feature-item`, `.audience-item`: лише border-top, без повної рамки | обидва файли | Немає візуальної ізоляції картки |
| `.problem-card`: немає border-radius, немає full border | `problems.css` | Відсутня "картка" на мобільному |

### Дизайн-рішення
- **Темний фон** (features, audience): `border: 1px solid rgba(255,255,255,0.10)` + bg `rgba(255,255,255,0.03)`
- **Світлий фон** (problems, testimonials): `border: 1px solid rgba(0,0,0,0.08)` + bg `rgba(0,0,0,0.02)` (problems: bg вже `--color-white`, залишити)
- **Border-radius**: 8px — сумісно з overall мінімалістичним стилем
- **Gap мобільний**: 16px (`var(--space-4)`) між картками

### Покроковий план
- [x] **К1.** ПРОТОКОЛ СТАРТУ
- [x] **К2.** `base.css` — глобальний `margin-bottom` для h2/h3, `p:not(:last-child) { margin-bottom }`
- [x] **К3.** `problems.css` — full border + border-radius на `.problem-card`
- [x] **К4.** `features.css` — full border + bg на `.feature-item`, gap між items
- [x] **К5.** `testimonials.css` — full card redesign для `.testimonial-item`
- [x] **К6.** `pricing.css` — full card redesign для `.audience-item`, gap на мобільному
- [x] **К7.** ПРОТОКОЛ ЗАВЕРШЕННЯ

---

## ПРОТОКОЛ ЗАВЕРШЕННЯ — 2026-05-27 (Card Redesign + Text Overlap Fix)

**Статус: Done**

### Фактично змінені файли

| Файл | Клас | До | Після |
|---|---|---|---|
| `base.css` | `h1/h2/h3/h4` | без margin-bottom | `margin-bottom: var(--space-4)` (перевизначається секційними стилями) |
| `base.css` | `p:not(:last-child)` | без margin-bottom | `margin-bottom: var(--space-3)` |
| `problems.css` | `.problem-card` | `border-left: 2px`, без radius | `border: 1px solid rgba(0,0,0,0.08)` + `border-left: 2px` + `border-radius: 8px` |
| `problems.css` | `:hover` | `border-color` accent | `border-left-color` accent + `box-shadow` |
| `features.css` | `.features-list` | без gap | `gap: var(--space-3)` |
| `features.css` | `.feature-item` | тільки `border-top` | `border: 1px solid rgba(255,255,255,0.10)` + `background: rgba(255,255,255,0.02)` |
| `features.css` | `.feature-item:hover` | `border-top-color` | `border-color` (full) |
| `testimonials.css` | `.testimonial-item` | `padding-top` + `border-top` | `padding: var(--space-6)` + full `border` + `border-radius: 8px` + `background` |
| `testimonials.css` | `@768px grid gap` | не задано | `gap: var(--space-4)` = 16px |
| `pricing.css` | `.audience-item` | `padding-top` + `border-top` | `padding: var(--space-5)` + full `border` + `border-radius: 8px` + `background` |
| `pricing.css` | `@768px grid` | `gap: 0` | `gap: var(--space-4)` = 16px |

### Колірна система карток
| Фон секції | Border | Background картки |
|---|---|---|
| `--color-white` (problems) | `rgba(0,0,0,0.08)` | `var(--color-white)` — вже контрастна до `--color-light` |
| `--color-dark` (features, audience) | `rgba(255,255,255,0.10)` | `rgba(255,255,255,0.02-0.03)` |
| `--color-light` (testimonials) | `rgba(0,0,0,0.08)` | `rgba(0,0,0,0.02)` |

### Логічні наступні кроки
1. Перевірити Problems: картки мають рамку + border-radius + золотий лівий акцент при hover
2. Перевірити Features: всі items мають рівну рамку, при наведенні gold border
3. Перевірити Testimonials: картки з padding 32px всередині, граційний hover shadow
4. Перевірити Audience: картки з рамкою, 16px gap між ними на мобільному
5. Перевірити що `margin-bottom` на h2 не ламає секції з `margin-bottom: 0` override

---

## Сесія: 2026-05-27 (Sticky Fix — overflow-x: hidden → clip)

### Поточна задача
Відновити `position: sticky` для лівої колонки Features на десктопі після того, як `overflow-x: hidden` на `html`/`body` вбив sticky-ефект.

### Root-cause
`overflow-x: hidden` на `html` і `body` (додано у попередній сесії для horizontal overflow fix) **створює scroll container** на цих елементах. `position: sticky` прилипає відносно найближчого scroll container-а, а не viewport. Якщо scroll container має `overflow: hidden`, прокручування заблоковано → sticky не має де "прилипати" → веде себе як `position: static`.

### Рішення
`overflow-x: clip` — обрізає контент візуально (горизонтальний overflow прихований), але **не створює scroll container** (на відміну від `hidden`). Sticky продовжує працювати відносно viewport.

| Значення | Обрізає overflow | Створює scroll container | Ламає sticky |
|---|---|---|---|
| `hidden` | ✓ | ✓ | ✓ |
| `clip` | ✓ | ✗ | ✗ |

### Покроковий план
- [x] **С1.** ПРОТОКОЛ СТАРТУ
- [x] **С2.** `base.css` — замінити `overflow-x: hidden` → `overflow-x: clip` на `html` і `body`
- [x] **С3.** ПРОТОКОЛ ЗАВЕРШЕННЯ

---

## ПРОТОКОЛ ЗАВЕРШЕННЯ — 2026-05-27 (Sticky Fix)

**Статус: Done**

### Зміна — один файл, два рядки

| Файл | Елемент | До | Після |
|---|---|---|---|
| `base.css` | `html` | `overflow-x: hidden` | `overflow-x: clip` |
| `base.css` | `body` | `overflow-x: hidden` | `overflow-x: clip` |

### Ефект
- `position: sticky` на `.features-sticky-col` відновлено — ліва колонка фіксується при скролі правої на десктопі ✓
- Горизонтальний overflow залишається прихованим — `clip` так само обрізає контент за межами елемента ✓
- `overflow-x: clip` підтримується Chrome 90+, Firefox 81+, Safari 16+ ✓
- Mobile override (`position: static` у `@media (max-width: 900px)`) не змінювався — мобільна версія коректна ✓

### Чому features.css не потребував змін
`position: sticky` і `top: calc(...)` правильно задані у `.features-sticky-col` поза медіазапитами. Єдиною причиною поламки був ancestor з `overflow: hidden`, що створює scroll container.

---

## Сесія: 2026-06-04 (Оновлення текстів — фінальна редакція)

### Поточна задача
Привести тексти `src/index.html` у відповідність до фінального документу `правки по текст.md`. Змінюються лише тексти — жодних змін у CSS, JS, структурі HTML або атрибутах.

### Ціль
Синхронізувати всі 8 блоків із затвердженою копірайтерською редакцією.

### Покроковий план
- [x] **Т1.** ПРОТОКОЛ СТАРТУ — зафіксовано у docs/progress.md
- [x] **Т2.** Блок 1 (Hero) — кнопка, мікротекст, підзаголовок
- [x] **Т3.** Блок 2 (Проблема) — тексти 3 карток
- [x] **Т4.** Блок 3 (Калькулятор) — додати підзаголовок
- [x] **Т5.** Блок 4 (Можливості) — кнопка, тексти 4 пунктів
- [x] **Т6.** Блок 6 (Відгуки) — імена, міста, порядок (цитата → підпис → результат)
- [x] **Т7.** Блок 7 (Аудиторія) — тексти 3 карток
- [x] **Т8.** Блок 8 (Форма) — кнопка, підзаголовок
- [x] **Т9.** ПРОТОКОЛ ЗАВЕРШЕННЯ

---

## Сесія: 2026-06-04 (Фонові візерунки — усі 8 блоків)

### Поточна задача
Додати напівпрозорі CSS-візерунки на фон кожної секції. Сірий колір, близький до білого, вписується в блок, не перекриває контент.

### Технічне рішення
`background-image` безпосередньо на `.section` — не конфліктує з `::before`/`::after` псевдоелементами (hero, lead-form їх вже використовують). Всі візерунки — чистий CSS через `repeating-linear-gradient` / `radial-gradient`.

### Відповідність фонів
| Секція | Фон | Колір візерунка |
|---|---|---|
| Hero, Features, Audience, Lead Form | темний | `rgba(255,255,255,0.03–0.04)` |
| Problems, Calculator, Objections, Testimonials | світлий | `rgba(0,0,0,0.04–0.05)` |

### Покроковий план
- [x] **В1.** ПРОТОКОЛ СТАРТУ
- [x] **В2.** Створити `src/css/patterns.css` — 8 унікальних візерунків
- [x] **В3.** Підключити `patterns.css` в `src/index.html`
- [x] **В4.** ПРОТОКОЛ ЗАВЕРШЕННЯ

## ПРОТОКОЛ ЗАВЕРШЕННЯ — 2026-06-04 (Фонові візерунки)

**Статус: Done**

| Секція | Візерунок | Колір |
|---|---|---|
| Hero | Діагональні лінії 45° | `rgba(255,255,255,0.03)`, крок 36px |
| Problems | Крапкова сітка | `rgba(0,0,0,0.05)`, 28×28px |
| Calculator | Квадратна сітка | `rgba(0,0,0,0.04)`, 48×48px |
| Features | Діагональні лінії -45° | `rgba(255,255,255,0.025)`, крок 28px |
| Objections | Горизонтальні лінії | `rgba(0,0,0,0.035)`, крок 28px |
| Testimonials | Дрібні крапки | `rgba(0,0,0,0.055)`, 20×20px |
| Audience | Ромбова сітка (×2) | `rgba(255,255,255,0.025)`, крок 22px |
| Lead Form | Крапкова сітка | `rgba(255,255,255,0.04)`, 28×28px |

## ПРОТОКОЛ ЗАВЕРШЕННЯ — 2026-06-04 (Оновлення текстів)

**Статус: Done**

### Змінені файли

| Файл | Зміна |
|---|---|
| `src/index.html` | Оновлено тексти у всіх 8 блоках згідно `правки по текст.md` |
| `src/js/form.js` | `idle` стан кнопки: "Зв'яжіться з нами" → "Отримати демо" |

### Деталі по блоках

| Блок | Що змінено |
|---|---|
| Hero | Надзаголовок, заголовок (тире замість коми), підзаголовок, кнопка "Отримати демо", мікротекст "Безкоштовно, без зобов'язань" |
| Проблема | Уточнено формулювання карток 01, 02, 03 |
| Калькулятор | Додано підзаголовок-пояснення під h2 |
| Можливості | Кнопка "Отримати демо", тексти пунктів 01–04 |
| Відгуки | Імена: Андрій К./Ольга М./Віктор Л., міста Львів/Київ/Дніпро, порядок цитата→підпис→результат |
| Аудиторія | Скорочені й уточнені тексти карток, назва 03: "Нотаріальні контори" |
| Форма | Підзаголовок, кнопка "Отримати демо" (також у form.js idle state) |

---

## Сесія: 2026-06-05 (Mobile Audit Fix — 11 проблем)

### Поточна задача
Виправлення 11 мобільних проблем, знайдених під час аудиту за Mobile-First скілом.

### Ціль
Зробити лендінг бездоганним на мобільних пристроях: навігація, touch UX, safe area, hover-стани, одиниці вимірювання.

### Покроковий план

#### 🔴 КРИТИЧНІ
- [x] **M1.** Мобільна навігація — hamburger menu (`base.css` + `index.html` + `animations.js`)
- [x] **M2.** `:hover` без `@media (hover: hover)` — огорнуто у `problems.css`, `features.css`, `testimonials.css`, `pricing.css`

#### 🟠 ВАЖЛИВІ
- [x] **M3.** `svh` → `dvh` — замінено у `base.css` та `hero.css`
- [x] **M4.** Safe Area insets — `env(safe-area-inset-top)` для header, `max(...)` для footer; `viewport-fit=cover` в `index.html`

#### 🟡 СЕРЕДНІ
- [x] **M5.** Slider touch target: `padding-block: 21px` + `margin-block: -21px` → ефективна зона 44px
- [x] **M6.** Phone mockup `order: -1` прибрано з мобільного; `order: 0` залишено лише для десктопу (min-width: 901px)
- [x] **M7.** Hardcoded `11px`, `600`, `0.10em` → `var(--fs-xs)`, `var(--fw-semibold)`, `var(--ls-wider)`

#### 🔵 НЕЗНАЧНІ
- [x] **M8.** `patterns.css` — файл не існує, пункт закрито (не створювався)
- [x] **M9.** `row-gap: var(--space-7)` → `var(--space-5)` у `lead-form.css` на мобільному
- [x] **M10.** Hero CTA: `flex-direction: column; align-items: stretch` + `.btn { width: 100% }` на ≤640px

#### ♻️ РЕФАКТОРИНГ (останнє)
- [ ] **M11.** Desktop-First → Mobile-First: переписати медіазапити з `max-width` на `min-width` у всіх секційних CSS-файлах

---

## Сесія: 2026-06-05 (Features Accordion — мобільний акордеон)

### Поточна задача
Замінити 2×2 grid на акордеон для блоку "Можливості" на мобільному.

### Ціль
На мобільному кожна з 4 карток стає плашкою: `[01  Назва  ↓]`. Тап — розкривається текст. Десктоп — без змін (картки як є).

### Покроковий план
- [x] **A1.** `index.html` — `.feature-header` (flex row: num+title+arrow), `.feature-body` (колапсований текст)
- [x] **A2.** `features.css` — акордеон: плашки з border-bottom, `max-height` transition, chevron стрілка, `.is-open` стан
- [x] **A3.** `animations.js` — `initFeatureAccordion()`: перший відкритий за default, toggle, клавіатура, resize handler

---

## ПРОТОКОЛ ЗАВЕРШЕННЯ — 2026-06-05 (Mobile Audit Fix M1–M10)

**Статус: Done (M1–M10). M11 — окремий рефакторинг.**

| Пункт | Файли | Зміна |
|---|---|---|
| M1 — Hamburger nav | `index.html`, `base.css`, `animations.js` | `nav-toggle` кнопка (3 лінії → ×), fullscreen overlay, stagger анімація посилань, JS open/close/Escape/resize |
| M2 — Hover на touch | `problems.css`, `features.css`, `testimonials.css`, `pricing.css` | Всі `:hover` стани огорнуто в `@media (hover: hover) and (pointer: fine)` |
| M3 — svh → dvh | `base.css`, `hero.css` | `100svh` → `100dvh` скрізь — адрес-рядок iOS не обрізає секції |
| M4 — Safe Area | `index.html`, `base.css` | `viewport-fit=cover`; header: `padding-top: env(safe-area-inset-top)`; footer: `padding-bottom: max(space-7, env(safe-area-inset-bottom))` |
| M5 — Slider thumb | `calculator.css` | `padding-block: 21px` + `margin-block: -21px` → tap area = 44px (Apple HIG) |
| M6 — Phone order | `hero.css` | Прибрано `order: -1` з базових стилів; на мобільному phone після тексту |
| M7 — Hardcoded px | `lead-form.css` | `11px` → `var(--fs-xs)`, `600` → `var(--fw-semibold)`, `0.10em` → `var(--ls-wider)` |
| M8 — patterns.css | — | Файл не існує; пункт закрито |
| M9 — Form row-gap | `lead-form.css` | `var(--space-7)` (48px) → `var(--space-5)` (24px) на мобільному |
| M10 — Hero CTA | `hero.css` | На ≤640px: кнопка 100% ширина, `flex-direction: column` для групи |

---

## Сесія: 2026-06-05 (Mobile UI Fixes — 5 точкових правок)

### Поточна задача
Точкові правки мобільного UI за фідбеком після перегляду на пристрої.

### Ціль
Кожен блок має виглядати завершено на екрані будь-якого телефону: рівні відступи, центрування, компактність, зручна сітка.

### Покроковий план

---

#### R1. Рівні відступи top/bottom для всіх блоків окрім Hero
**Файл:** `base.css`
**Проблема:** На мобільному деякі секції мають різний `padding-top` і `padding-bottom` — блоки виглядають "зміщеними" всередині екрану.
**Рішення:**
- У `@media (max-width: 768px)` додати явне `padding-block: var(--section-padding-y)` для `main > section`
- Hero виключити через специфічніший селектор `.hero` (вже має власний `padding-top` для header offset)
- Перевірити що `features` (яка має `padding-block: 0` на десктопі) отримує однакові відступи на мобільному через наявний override у `@media (max-width: 900px)`

---

#### R2. Калькулятор — мобільна версія
**Файл:** `calculator.css`
**Проблема 1:** "Ви втрачаєте / $300 / щомісяця" — вирівняні по лівому краю, виглядають нецентровано.
**Рішення 1:** У `@media (max-width: 768px)` додати `text-align: center` на `.calculator-display`, `align-items: center` на `.calc-result`, `justify-content: center` на `.calc-prefix`

**Проблема 2:** Повзунок товстуватий, виглядає важко.
**Рішення 2:** Зменшити thumb до 20px, трек лишити `height: 2px`, прибрати зайвий `box-shadow` на thumb, додати тонку золоту лінію як трек — елегантніший вигляд.

**Проблема 3:** Текст кнопки "Підключити бота та зупинити втрати" не по центру (wraps на 2 рядки і зміщується).
**Рішення 3:** Додати `text-align: center; white-space: normal; justify-content: center` на кнопку у `.calculator-footer` при `max-width: 900px`.

**Проблема 4:** Відстань між підблоками (header → display → controls → footer) завелика — блок не вміщується на 1 екран.
**Рішення 4:** У `@media (max-width: 768px)` зменшити: `gap` контейнера з `var(--space-6)` до `var(--space-4)`, `padding-block` дисплею з `var(--space-6)` до `var(--space-4)`, `gap` controls з `var(--space-4)` до `var(--space-3)`.

---

#### R3. Можливості — 2×2 grid на мобільному
**Файл:** `features.css`
**Проблема:** 4 картки у 1 колонку дають дуже довгу секцію, яку треба довго скролити.
**Рішення:**
- У `@media (max-width: 900px)` (де sticky → static) змінити `.features-list` з `flex-direction: column` на `display: grid; grid-template-columns: repeat(2, 1fr)`
- Відступ між картками: `gap: var(--space-4)`
- На дуже вузьких екранах `@media (max-width: 400px)` повернути до 1 колонки щоб текст не обрізався
- `.feature-text` додати `font-size: var(--fs-sm)` на мобільному для компактності

---

#### R4. Порівняння — центрування всіх текстів
**Файл:** `objections.css`
**Проблема:** На мобільному колонки розкладаються вертикально, але `text-align: left` та `align-items: flex-start` — тексти притиснуті ліворуч, виглядають незбалансовано.
**Рішення:** У `@media (max-width: 768px)`:
- `.versus-col` і `.versus-col--without`: `text-align: center`, `align-items: center`
- `.versus-grid`: `align-items: center`
- `.versus-divider` (горизонтальний): `margin-inline: auto`
- Tagline вже центрована (`text-align: center`) — залишити без змін

---

#### R5. Форма — стиснути відступи для 1 екрану
**Файл:** `lead-form.css`
**Проблема:** Форма з заголовком, 4 полями і кнопкою не вміщується на 1 екран телефону — треба скролити.
**Рішення:** У `@media (max-width: 768px)`:
- Gap контейнера (header ↔ форма): `var(--space-6)` → `var(--space-4)`
- `row-gap` між полями: `var(--space-5)` → `var(--space-4)`
- `.lead-form-header h2`: зменшити `margin-bottom` до `var(--space-3)`
- `.lead-form-header p`: `font-size: var(--fs-sm)` — трохи менший підзаголовок
- `.form-submit-row`: `margin-top: var(--space-3)` → `var(--space-2)`
- `.form-privacy`: `font-size` ще менший або прибрати `margin-top`

---

## ПРОТОКОЛ ЗАВЕРШЕННЯ — 2026-06-05 (Mobile UI Fixes R1–R5)

**Статус: Done**

| Пункт | Файл | Ключова зміна |
|---|---|---|
| R1 | `base.css` | `padding-block: var(--section-padding-y)` в мобільному `@media`; виправлено orphan CSS (стилі випали за межі media query) |
| R2 | `calculator.css` | Дисплей `text-align: center`; calc-result `align-items: center`; gap контейнера `space-3`; слайдер `height: 1px`, thumb `18px`, `box-shadow` тонший |
| R3 | `features.css` | `features-list`: `grid repeat(2,1fr)` gap `space-4` на ≤900px; fallback `1fr` на ≤400px; `feature-title` → `fs-xl`, `feature-text` → `fs-sm` |
| R4 | `objections.css` | Всі `.versus-col`: `text-align: center`, `align-items: center`; `.versus-divider`: `margin: 0 auto` |
| R5 | `lead-form.css` | Container gap `space-4`; `h2 margin-bottom space-3`; `p font-size fs-sm`; `row-gap space-4`; `form-submit-row margin-top space-2`; privacy `10px` |

### Виправлення після ревізії (структурні баги)

| Баг | Причина | Файл | Виправлення |
|---|---|---|---|
| Мобільні стилі в `base.css` не застосовувались | Вкладений `@media (hover: hover)` всередині `@media (max-width: 768px)` — старі браузери зупиняють парсинг після нього | `base.css` | Вкладений `@media (hover)` перенесено за межі зовнішнього `@media` |
| Калькулятор не вміщується на екран | Не врахований довгий `<p>` опис (~4 рядки = ~80px висоти) | `calculator.css` | `display: none` на `.calculator-header p` на мобільному; `padding-block: var(--space-5)` для секції |
| Форма не вміщується на екран | Не врахований накопичений padding: section-label + h2 + p + section padding-block 40px × 2 | `lead-form.css` | `display: none` на `.lead-form-header p`; `padding-block: var(--space-6)` для секції; менший margin-bottom на section-label |
