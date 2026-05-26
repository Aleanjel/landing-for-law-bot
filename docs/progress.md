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
