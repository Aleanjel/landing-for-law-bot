'use strict';

const WEBHOOK_URL   = 'https://n8n.example.com/webhook/placeholder';
const RATE_LIMIT_MS = 60_000;
const EMAIL_RE    = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
const TELEGRAM_RE = /^@[a-zA-Z0-9_]{4,32}$/;

let lastSubmitTime = 0;

/* ── Phone mask ───────────────────────────────────────────── */
function formatPhone(raw) {
  let digits = raw.replace(/\D/g, '');

  // Strip leading country code if pasted
  if (digits.startsWith('380'))      digits = digits.slice(3);
  else if (digits.startsWith('38'))  digits = digits.slice(2);

  // Cap at 10 digits (0XX + 7 more)
  digits = digits.slice(0, 10);

  if (digits.length === 0) return '';

  let out = '+38 (';
  out += digits.slice(0, Math.min(3, digits.length));
  if (digits.length > 3) out += ') ' + digits.slice(3, Math.min(6, digits.length));
  if (digits.length > 6) out += '-' + digits.slice(6, Math.min(8, digits.length));
  if (digits.length > 8) out += '-' + digits.slice(8, 10);

  return out;
}

function onPhoneInput(e) {
  const input    = e.target;
  const before   = input.value;
  input.value    = formatPhone(before);

  // Keep cursor at end when typing (not deleting)
  if (e.inputType !== 'deleteContentBackward') {
    const len = input.value.length;
    input.setSelectionRange(len, len);
  }
}

/* ── Helpers ──────────────────────────────────────────────── */
function sanitize(str) {
  return String(str)
    .trim()
    .replace(/&/g,  '&amp;')
    .replace(/</g,  '&lt;')
    .replace(/>/g,  '&gt;')
    .replace(/"/g,  '&quot;')
    .replace(/'/g,  '&#x27;');
}

function isRateLimited() {
  return Date.now() - lastSubmitTime < RATE_LIMIT_MS;
}

function setButtonState(btn, state) {
  const labels = {
    idle:    'Зв\'яжіться з нами',
    loading: 'Надсилаємо…',
    success: 'Заявку отримано ✓',
    error:   'Помилка. Спробуйте ще раз',
  };

  btn.textContent = labels[state];
  btn.disabled    = state === 'loading' || state === 'success';
  btn.className   = 'form-submit';

  if (state === 'success') btn.classList.add('is-success');
  if (state === 'error')   btn.classList.add('is-error');
}

function showFieldError(input, errorEl, message) {
  input.classList.add('is-invalid');
  if (errorEl) {
    errorEl.textContent = message;
    errorEl.classList.add('is-visible');
  }
}

function clearFieldError(input, errorEl) {
  input.classList.remove('is-invalid');
  if (errorEl) errorEl.classList.remove('is-visible');
}

/* ── Validation ───────────────────────────────────────────── */
function validateForm(fields) {
  const { fullnameInput, phoneInput, emailInput, telegramInput,
          fullnameError, phoneError, emailError, telegramError } = fields;

  let valid = true;

  clearFieldError(fullnameInput, fullnameError);
  clearFieldError(phoneInput,    phoneError);
  clearFieldError(emailInput,    emailError);
  clearFieldError(telegramInput, telegramError);

  // ПІБ — обов'язкове
  if (fullnameInput.value.trim().length < 2) {
    showFieldError(fullnameInput, fullnameError, 'Введіть ваше прізвище та ім'я (мінімум 2 символи)');
    valid = false;
  }

  // Телефон — обов'язковий, 10 цифр (з 0) або 12 цифр (з 380)
  const phoneDigits = phoneInput.value.replace(/\D/g, '');
  const phoneValid  = (phoneDigits.length === 10 && phoneDigits.startsWith('0')) ||
                      (phoneDigits.length === 12 && phoneDigits.startsWith('380'));
  if (phoneInput.value.trim().length === 0) {
    showFieldError(phoneInput, phoneError, 'Введіть номер телефону');
    valid = false;
  } else if (!phoneValid) {
    showFieldError(phoneInput, phoneError, 'Введіть повний номер: 10 цифр (0XXXXXXXXX) або 12 з кодом країни (380...)');
    valid = false;
  }

  // Email — за бажанням, але якщо заповнено — перевірити формат
  const emailVal = emailInput.value.trim();
  if (emailVal.length > 0 && !EMAIL_RE.test(emailVal)) {
    showFieldError(emailInput, emailError, 'Введіть коректну електронну адресу');
    valid = false;
  }

  // Telegram — за бажанням, але якщо заповнено — перевірити формат
  const tgVal = telegramInput.value.trim();
  if (tgVal.length > 0 && !TELEGRAM_RE.test(tgVal)) {
    showFieldError(telegramInput, telegramError, 'Telegram-нікнейм має починатися з @ та містити 5–33 символи');
    valid = false;
  }

  return valid;
}

/* ── Submit handler ───────────────────────────────────────── */
async function handleSubmit(e) {
  e.preventDefault();

  const form = e.currentTarget;

  const fullnameInput  = form.elements['fullname'];
  const phoneInput     = form.elements['phone'];
  const emailInput     = form.elements['email'];
  const telegramInput  = form.elements['telegram'];
  const btn            = form.querySelector('.form-submit');

  const fullnameError  = form.querySelector('[data-error="fullname"]');
  const phoneError     = form.querySelector('[data-error="phone"]');
  const emailError     = form.querySelector('[data-error="email"]');
  const telegramError  = form.querySelector('[data-error="telegram"]');

  const fields = {
    fullnameInput, phoneInput, emailInput, telegramInput,
    fullnameError, phoneError, emailError, telegramError,
  };

  if (!validateForm(fields)) return;

  if (isRateLimited()) {
    const remaining = Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSubmitTime)) / 1000);
    setButtonState(btn, 'error');
    btn.textContent = `Зачекайте ${remaining}с перед повторною відправкою`;
    setTimeout(() => setButtonState(btn, 'idle'), 3000);
    return;
  }

  setButtonState(btn, 'loading');

  const payload = {
    fullname:  sanitize(fullnameInput.value),
    phone:     sanitize(phoneInput.value),
    email:     sanitize(emailInput.value),
    telegram:  sanitize(telegramInput.value),
    source:    'landing',
    timestamp: new Date().toISOString(),
  };

  try {
    const res = await fetch(WEBHOOK_URL, {
      method:  'POST',
      headers: { 'Content-Type': 'application/json' },
      body:    JSON.stringify(payload),
    });

    if (!res.ok) throw new Error(`HTTP ${res.status}`);

    lastSubmitTime = Date.now();
    setButtonState(btn, 'success');
    form.reset();

    setTimeout(() => setButtonState(btn, 'idle'), 4000);

  } catch (err) {
    console.error('[form] Webhook error:', err);
    setButtonState(btn, 'error');
    setTimeout(() => setButtonState(btn, 'idle'), 4000);
  }
}

/* ── Init ─────────────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
  const form = document.getElementById('lead-form');
  if (form) {
    form.addEventListener('submit', handleSubmit);

    // Phone mask
    const phoneInput = form.elements['phone'];
    if (phoneInput) {
      phoneInput.addEventListener('input', onPhoneInput);
      // Format on paste
      phoneInput.addEventListener('paste', () => {
        setTimeout(() => {
          phoneInput.value = formatPhone(phoneInput.value);
        }, 0);
      });
    }
  }

  /* Sticky header */
  const header = document.querySelector('.site-header');
  if (header) {
    const onScroll = () => header.classList.toggle('is-scrolled', window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    onScroll();
  }

  /* Smooth CTA scroll */
  document.querySelectorAll('a[href="#contact"]').forEach(link => {
    link.addEventListener('click', e => {
      e.preventDefault();
      document.getElementById('contact')?.scrollIntoView({ behavior: 'smooth', block: 'start' });
    });
  });
});
