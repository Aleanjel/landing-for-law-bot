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

/* ── Init ───────────────────────────────────────────────── */

document.addEventListener('DOMContentLoaded', () => {
  initReveal();
  initPhoneTilt();
});
