'use strict';

/* ── Calculator Block ─────────────────────────────────────
   Slider input → динамічно оновлює суму втраченого доходу.
   Fill-track: gradient на slider background через CSS-var.
   ───────────────────────────────────────────────────────── */

const CONSULT_RATE_USD = 100;

function initCalculator() {
  const slider      = document.getElementById('calc-clients');
  const amountEl    = document.getElementById('calc-amount');
  const valueDisplay = document.getElementById('calc-value-display');

  if (!slider || !amountEl) return;

  /* ── Format large numbers with locale separator ────────── */
  function formatLoss(n) {
    return '$' + n.toLocaleString('en-US');
  }

  /* ── Update slider fill (gold left / grey right) ────────── */
  function updateFill() {
    const pct = ((slider.value - slider.min) / (slider.max - slider.min)) * 100;
    slider.style.background =
      `linear-gradient(to right, var(--color-accent) ${pct}%, rgba(0,0,0,0.12) ${pct}%)`;
  }

  /* ── Update displayed loss amount ───────────────────────── */
  function updateDisplay() {
    const clients = parseInt(slider.value, 10);
    const loss    = clients * CONSULT_RATE_USD;

    if (valueDisplay) valueDisplay.textContent = clients;

    /* Flash accent colour on change */
    amountEl.classList.remove('is-changing');
    void amountEl.offsetWidth; // force reflow to re-trigger transition
    amountEl.textContent = formatLoss(loss);
    amountEl.classList.add('is-changing');

    updateFill();
  }

  slider.addEventListener('input', updateDisplay);

  /* Initialise on load */
  updateDisplay();
}

document.addEventListener('DOMContentLoaded', initCalculator);
