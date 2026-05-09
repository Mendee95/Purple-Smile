'use strict';

// ── Nav scroll shadow ──
const nav = document.getElementById('nav');
window.addEventListener('scroll', () => {
  nav.classList.toggle('scrolled', window.scrollY > 20);
}, { passive: true });

// ── Hamburger menu ──
const hamburger  = document.getElementById('hamburger');
const mobileMenu = document.getElementById('mobile-menu');

hamburger.addEventListener('click', () => {
  const isOpen = mobileMenu.classList.toggle('open');
  hamburger.setAttribute('aria-expanded', isOpen);
});

mobileMenu.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', () => mobileMenu.classList.remove('open'));
});

// ── FAQ accordion ──
document.querySelectorAll('.faq__item').forEach(item => {
  item.querySelector('.faq__q').addEventListener('click', () => {
    const isOpen = item.classList.contains('open');
    document.querySelectorAll('.faq__item.open').forEach(el => el.classList.remove('open'));
    if (!isOpen) item.classList.add('open');
  });
});

// ── QPay Modal ──
const overlay        = document.getElementById('overlay');
const modalClose     = document.getElementById('modal-close');
const payDoneBtn     = document.getElementById('pay-done-btn');
const modalName      = document.getElementById('modal-product-name');
const modalPrice     = document.getElementById('modal-price');
const qrTimerEl      = document.getElementById('qr-timer');

const successOverlay = document.getElementById('success-overlay');
const successProduct = document.getElementById('success-product-name');
const successClose   = document.getElementById('success-close');

let timerInterval = null;
let currentProduct = '';

function formatTime(seconds) {
  const m = Math.floor(seconds / 60).toString().padStart(2, '0');
  const s = (seconds % 60).toString().padStart(2, '0');
  return `${m}:${s}`;
}

function startTimer() {
  clearInterval(timerInterval);
  let remaining = 15 * 60;
  qrTimerEl.textContent = formatTime(remaining);

  timerInterval = setInterval(() => {
    remaining--;
    qrTimerEl.textContent = formatTime(remaining);
    if (remaining <= 60) qrTimerEl.style.color = '#FF6FB5';
    if (remaining <= 0) {
      clearInterval(timerInterval);
      qrTimerEl.textContent = 'Expired';
    }
  }, 1000);
}

function openModal(productName, price) {
  currentProduct = productName;
  modalName.textContent = productName;
  modalPrice.textContent = `₮${price}`;
  qrTimerEl.style.color = '';
  overlay.classList.add('active');
  document.body.style.overflow = 'hidden';
  startTimer();
}

function closeModal() {
  overlay.classList.remove('active');
  document.body.style.overflow = '';
  clearInterval(timerInterval);
}

function showSuccess() {
  closeModal();
  successProduct.textContent = currentProduct;
  successOverlay.classList.add('active');
}

// Buy buttons
document.querySelectorAll('.buy-btn').forEach(btn => {
  btn.addEventListener('click', () => {
    openModal(btn.dataset.product, btn.dataset.price);
  });
});

modalClose.addEventListener('click', closeModal);
overlay.addEventListener('click', e => { if (e.target === overlay) closeModal(); });
payDoneBtn.addEventListener('click', showSuccess);

successClose.addEventListener('click', () => {
  successOverlay.classList.remove('active');
  document.body.style.overflow = '';
});
successOverlay.addEventListener('click', e => {
  if (e.target === successOverlay) {
    successOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// Close on Escape
document.addEventListener('keydown', e => {
  if (e.key !== 'Escape') return;
  if (overlay.classList.contains('active')) closeModal();
  if (successOverlay.classList.contains('active')) {
    successOverlay.classList.remove('active');
    document.body.style.overflow = '';
  }
});

// ── Smooth scroll for anchor links ──
document.querySelectorAll('a[href^="#"]').forEach(link => {
  link.addEventListener('click', e => {
    const target = document.querySelector(link.getAttribute('href'));
    if (!target) return;
    e.preventDefault();
    const offset = 80;
    const top = target.getBoundingClientRect().top + window.scrollY - offset;
    window.scrollTo({ top, behavior: 'smooth' });
  });
});

// ── Animate elements on scroll ──
const style = document.createElement('style');
style.textContent = `
  .animate-ready {
    opacity: 0;
    translate: 0 24px;
    transition: opacity .5s ease, translate .5s ease;
  }
  .animate-ready.visible {
    opacity: 1;
    translate: 0 0;
  }
`;
document.head.appendChild(style);

const observerOptions = { threshold: 0.1, rootMargin: '0px 0px -40px 0px' };
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
      observer.unobserve(entry.target);
    }
  });
}, observerOptions);

document.querySelectorAll('.pcard, .rcard, .hiw__step, .faq__item').forEach(el => {
  el.classList.add('animate-ready');
  observer.observe(el);
});
