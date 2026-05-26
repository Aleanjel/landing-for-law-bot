'use strict';

const WEBHOOK_URL   = 'https://n8n.example.com/webhook/placeholder';
const RATE_LIMIT_MS = 60_000;

let lastSubmitTime = 0;

function sanitize(str) {
  return String(str)
    .trim()
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#x27;');
}

function isRateLimited() {
  return Date.now() - lastSubmitTime < RATE_LIMIT_MS;
}

function setButtonState(btn, state) {
  const labels = {
    idle:    'Отримати консультацію',
    loading: 'Надсилаємо…',
    success: 'Заявку отримано ✓',
    error:   'Помилка. Спробуйте ще раз',
  };

  btn.textContent  = labels[state];
  btn.disabled     = state === 'loading' || state === 'success';
  btn.className    = 'form-submit';

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

function validateForm(nameInput, contactInput, nameError, contactError) {
  let valid = true;

  clearFieldError(nameInput, nameError);
  clearFieldError(contactInput, contactError);

  if (nameInput.value.trim().length < 2) {
    showFieldError(nameInput, nameError, 'Введіть ваше ім’я (мінімум 2 символи)');
    valid = false;
  }

  if (contactInput.value.trim().length < 5) {
    showFieldError(contactInput, contactError, 'Введіть Telegram-нікнейм або номер телефону');
    valid = false;
  }

  return valid;
}

async function handleSubmit(e) {
  e.preventDefault();

  const form        = e.currentTarget;
  const nameInput   = form.elements['name'];
  const contactInput = form.elements['contact'];
  const btn         = form.querySelector('.form-submit');
  const nameError   = form.querySelector('[data-error="name"]');
  const contactError = form.querySelector('[data-error="contact"]');

  if (!validateForm(nameInput, contactInput, nameError, contactError)) return;

  if (isRateLimited()) {
    const remaining = Math.ceil((RATE_LIMIT_MS - (Date.now() - lastSubmitTime)) / 1000);
    setButtonState(btn, 'error');
    btn.textContent = `Зачекайте ${remaining}с перед повторною відправкою`;
    setTimeout(() => setButtonState(btn, 'idle'), 3000);
    return;
  }

  setButtonState(btn, 'loading');

  const payload = {
    name:      sanitize(nameInput.value),
    contact:   sanitize(contactInput.value),
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
  if (form) form.addEventListener('submit', handleSubmit);

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
