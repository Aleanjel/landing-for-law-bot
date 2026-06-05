'use strict';

/* ── Intersection Observer — Scroll Reveal ──────────────── */

function initReveal() {
  const targets = document.querySelectorAll('.reveal, .reveal-left');
  if (!targets.length) return;

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add('active');
          observer.unobserve(entry.target);
        }
      });
    },
    {
      threshold: 0.12,
      rootMargin: '0px 0px -48px 0px',
    }
  );

  targets.forEach((el) => observer.observe(el));
}

/* ── 3D Phone Tilt on Hero Mousemove ────────────────────── */

function initPhoneTilt() {
  const hero    = document.querySelector('.hero');
  const wrapper = document.querySelector('.phone-tilt-wrapper');
  const phone   = wrapper?.querySelector('.phone-mockup');

  if (!hero || !phone || !wrapper) return;

  const MAX_TILT   = 9;    // degrees
  const LIFT_Z     = 20;   // px translateZ
  let rafId        = null;
  let targetX      = 0;
  let targetY      = 0;
  let currentX     = 0;
  let currentY     = 0;
  let isTilting    = false;

  function lerp(a, b, t) {
    return a + (b - a) * t;
  }

  function applyTilt() {
    currentX = lerp(currentX, targetX, 0.12);
    currentY = lerp(currentY, targetY, 0.12);

    phone.style.transform =
      `rotateX(${currentX.toFixed(3)}deg) rotateY(${currentY.toFixed(3)}deg) translateZ(${LIFT_Z}px)`;

    const distFromCenter = Math.sqrt(currentX ** 2 + currentY ** 2);

    if (isTilting || distFromCenter > 0.05) {
      rafId = requestAnimationFrame(applyTilt);
    } else {
      phone.style.transform = '';
      wrapper.classList.remove('is-tilting');
      rafId = null;
    }
  }

  hero.addEventListener('mousemove', (e) => {
    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    const rect = hero.getBoundingClientRect();
    const cx   = rect.left + rect.width  / 2;
    const cy   = rect.top  + rect.height / 2;

    /* Normalize to [-1, 1] */
    const nx = (e.clientX - cx) / (rect.width  / 2);
    const ny = (e.clientY - cy) / (rect.height / 2);

    /* Invert Y so moving up = phone tilts toward viewer */
    targetX = -ny * MAX_TILT;
    targetY =  nx * MAX_TILT;

    if (!isTilting) {
      isTilting = true;
      wrapper.classList.add('is-tilting');
      /* Pause the float animation while tilting */
      wrapper.style.animationPlayState = 'paused';
    }

    if (!rafId) {
      rafId = requestAnimationFrame(applyTilt);
    }
  });

  hero.addEventListener('mouseleave', () => {
    isTilting = false;
    targetX   = 0;
    targetY   = 0;
    /* Resume float */
    wrapper.style.animationPlayState = 'running';

    if (!rafId) {
      rafId = requestAnimationFrame(applyTilt);
    }
  });

  /* Disable tilt on touch devices */
  hero.addEventListener('touchstart', () => {
    isTilting = false;
    targetX   = 0;
    targetY   = 0;
    phone.style.transform = '';
    wrapper.classList.remove('is-tilting');
    if (rafId) {
      cancelAnimationFrame(rafId);
      rafId = null;
    }
  }, { passive: true });
}

/* ── Chat Live Dialog Animation ─────────────────────────── */

function initChatTyping() {
  const chat = document.querySelector('.phone-chat');
  if (!chat) return;

  /* Якщо користувач обрав reduced motion — показуємо все статично */
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    chat.querySelectorAll('.phone-msg').forEach(m => m.classList.add('is-visible'));
    return;
  }

  const messages  = Array.from(chat.querySelectorAll('.phone-msg:not(.typing)'));
  const typingEl  = chat.querySelector('.phone-msg.typing');

  if (!messages.length) return;

  /* ── Проміс-обгортка навколо setTimeout ─────────────────── */
  function wait(ms) {
    return new Promise(resolve => setTimeout(resolve, ms));
  }

  /* ── Приховуємо/показуємо через клас is-visible ─────────── */
  function showEl(el, delay) {
    return new Promise(resolve => {
      setTimeout(() => {
        el.classList.add('is-visible');
        resolve();
      }, delay);
    });
  }

  function hideEl(el) {
    el.classList.remove('is-visible');
  }

  /* ── Основний цикл діалогу ───────────────────────────────── */
  async function playSequence() {
    /* 1. Скидаємо стан */
    messages.forEach(m => hideEl(m));
    if (typingEl) hideEl(typingEl);

    await wait(800); /* невелика пауза перед стартом */

    for (let i = 0; i < messages.length; i++) {
      const msg   = messages[i];
      const isBot = msg.classList.contains('phone-msg--bot');

      if (isBot && typingEl) {
        /* Показуємо індикатор "друкує..." */
        showEl(typingEl, 0);
        await wait(1100 + Math.random() * 400); /* бот "думає" */
        hideEl(typingEl);
        await wait(120); /* мала пауза перед появою повідомлення */
      } else {
        /* Повідомлення користувача — коротка пауза без typing */
        await wait(500);
      }

      /* Показуємо саме повідомлення */
      msg.classList.add('is-visible');

      /* Затримка перед наступним повідомленням */
      const pause = i === messages.length - 1 ? 0 : isBot ? 1200 : 900;
      await wait(pause);
    }

    /* Показуємо typing у кінці (бот продовжує "відповідати") */
    if (typingEl) {
      await wait(400);
      showEl(typingEl, 0);
    }

    /* Пауза, потім перезапуск */
    await wait(3800);
    playSequence();
  }

  /* Запускаємо після короткої затримки після load */
  setTimeout(playSequence, 400);
}

/* ── Mobile Nav Overlay ─────────────────────────────────── */

function initMobileNav() {
  const toggle  = document.getElementById('nav-toggle');
  const overlay = document.getElementById('nav-overlay');
  const header  = document.querySelector('.site-header');
  if (!toggle || !overlay) return;

  function openNav() {
    toggle.classList.add('is-open');
    overlay.classList.add('is-open');
    toggle.setAttribute('aria-expanded', 'true');
    overlay.setAttribute('aria-hidden', 'false');
    header?.classList.add('nav-is-open');
    document.body.style.overflow = 'hidden';
  }

  function closeNav() {
    toggle.classList.remove('is-open');
    overlay.classList.remove('is-open');
    toggle.setAttribute('aria-expanded', 'false');
    overlay.setAttribute('aria-hidden', 'true');
    header?.classList.remove('nav-is-open');
    document.body.style.overflow = '';
  }

  toggle.addEventListener('click', () => {
    toggle.classList.contains('is-open') ? closeNav() : openNav();
  });

  /* Close on any nav link click (including CTA) */
  overlay.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', closeNav);
  });

  /* Close on Escape */
  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && toggle.classList.contains('is-open')) closeNav();
  });

  /* Close when resizing back to desktop */
  const mql = window.matchMedia('(min-width: 769px)');
  mql.addEventListener('change', (e) => {
    if (e.matches) closeNav();
  });
}

/* ── Features Accordion (mobile only) ──────────────────── */

function initFeatureAccordion() {
  const mql = window.matchMedia('(max-width: 900px)');

  function openItem(item) {
    item.classList.add('is-open');
    item.querySelector('.feature-header')?.setAttribute('aria-expanded', 'true');
  }

  function closeItem(item) {
    item.classList.remove('is-open');
    item.querySelector('.feature-header')?.setAttribute('aria-expanded', 'false');
  }

  function toggle(item) {
    const isOpen = item.classList.contains('is-open');
    /* Закриваємо всі */
    document.querySelectorAll('.feature-item').forEach(closeItem);
    /* Відкриваємо натиснутий, якщо він був закритий */
    if (!isOpen) openItem(item);
  }

  function setup() {
    document.querySelectorAll('.feature-item').forEach((item, idx) => {
      const header = item.querySelector('.feature-header');
      if (!header) return;

      /* Відкриваємо перший за замовчуванням */
      if (idx === 0 && mql.matches) openItem(item);

      header.addEventListener('click', () => {
        if (mql.matches) toggle(item);
      });

      /* Клавіатурна доступність */
      header.addEventListener('keydown', (e) => {
        if ((e.key === 'Enter' || e.key === ' ') && mql.matches) {
          e.preventDefault();
          toggle(item);
        }
      });
    });
  }

  setup();

  /* При ресайзі до десктопу — знімаємо is-open щоб не лишалось зайвого стану */
  mql.addEventListener('change', (e) => {
    if (!e.matches) {
      document.querySelectorAll('.feature-item').forEach(closeItem);
    } else {
      /* Повернення на мобільний — відкриваємо перший */
      const first = document.querySelector('.feature-item');
      if (first) openItem(first);
    }
  });
}

/* ── Init ───────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initPhoneTilt();
  initChatTyping();
  initMobileNav();
  initFeatureAccordion();
});
