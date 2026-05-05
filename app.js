// ===========================
// Anythings - 애니띵즈 앱 스크립트
// 바탕화면 올빼미 (Desktop Owl)
// ===========================

document.addEventListener('DOMContentLoaded', function () {

  // ===== Navbar scroll effect =====
  const navbar = document.getElementById('navbar');
  window.addEventListener('scroll', function () {
    if (window.scrollY > 50) {
      navbar.classList.add('scrolled');
    } else {
      navbar.classList.remove('scrolled');
    }
  });

  // ===== Mobile Nav Toggle =====
  const navToggle = document.getElementById('navToggle');
  const navMenu = document.querySelector('.nav-menu');
  if (navToggle) {
    navToggle.addEventListener('click', function () {
      navMenu.classList.toggle('active');
      // Hamburger animation
      const spans = navToggle.querySelectorAll('span');
      navToggle.classList.toggle('open');
      if (navToggle.classList.contains('open')) {
        spans[0].style.transform = 'rotate(45deg) translate(5px, 5px)';
        spans[1].style.opacity = '0';
        spans[2].style.transform = 'rotate(-45deg) translate(5px, -5px)';
      } else {
        spans[0].style.transform = '';
        spans[1].style.opacity = '';
        spans[2].style.transform = '';
      }
    });
  }

  // Close nav when link is clicked
  document.querySelectorAll('.nav-menu a').forEach(link => {
    link.addEventListener('click', function () {
      navMenu.classList.remove('active');
      if (navToggle) navToggle.classList.remove('open');
    });
  });

  // ===== Smooth Scroll =====
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      e.preventDefault();
      const target = document.querySelector(this.getAttribute('href'));
      if (target) {
        const offset = 80;
        const top = target.getBoundingClientRect().top + window.scrollY - offset;
        window.scrollTo({ top, behavior: 'smooth' });
      }
    });
  });

  // ===== Intersection Observer for Animations =====
  const observerOptions = {
    threshold: 0.15,
    rootMargin: '0px 0px -50px 0px'
  };

  const observer = new IntersectionObserver(function (entries) {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, observerOptions);

  // Observe elements
  const animatedEls = document.querySelectorAll(
    '.about-card, .service-item, .portfolio-item, .contact-item, .section-header'
  );
  animatedEls.forEach((el, i) => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(30px)';
    el.style.transition = `opacity 0.6s ease ${i * 0.1}s, transform 0.6s ease ${i * 0.1}s`;
    observer.observe(el);
  });

  // Add visible class style
  const style = document.createElement('style');
  style.textContent = '.visible { opacity: 1 !important; transform: translateY(0) !important; }';
  document.head.appendChild(style);

  // ===== Owl eye tracking (mouse follow) =====
  const pupils = document.querySelectorAll('.pupil');
  document.addEventListener('mousemove', function (e) {
    pupils.forEach(pupil => {
      const eye = pupil.closest('.eye');
      if (!eye) return;
      const rect = eye.getBoundingClientRect();
      const eyeCenterX = rect.left + rect.width / 2;
      const eyeCenterY = rect.top + rect.height / 2;
      const angle = Math.atan2(e.clientY - eyeCenterY, e.clientX - eyeCenterX);
      const dist = Math.min(8, Math.hypot(e.clientX - eyeCenterX, e.clientY - eyeCenterY) / 15);
      const x = Math.cos(angle) * dist;
      const y = Math.sin(angle) * dist;
      pupil.style.transform = `translate(${x}px, ${y}px)`;
    });
  });

  // ===== Contact Form Submit =====
  window.handleSubmit = function (e) {
    e.preventDefault();
    const btn = e.target.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = '✓ 메시지가 전송되었습니다!';
    btn.style.background = 'linear-gradient(135deg, #10b981, #059669)';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      e.target.reset();
    }, 3000);
  };

  // ===== Cursor glow effect =====
  const cursor = document.createElement('div');
  cursor.style.cssText = `
    position: fixed; pointer-events: none; z-index: 9999;
    width: 20px; height: 20px; border-radius: 50%;
    background: radial-gradient(circle, rgba(124,58,237,0.4), transparent);
    transform: translate(-50%, -50%);
    transition: width 0.2s, height 0.2s;
  `;
  document.body.appendChild(cursor);

  document.addEventListener('mousemove', function (e) {
    cursor.style.left = e.clientX + 'px';
    cursor.style.top = e.clientY + 'px';
  });

  // ===== Active nav link on scroll =====
  const sections = document.querySelectorAll('section[id]');
  const navLinks = document.querySelectorAll('.nav-menu a');

  function updateActiveLink() {
    let current = '';
    sections.forEach(section => {
      const sectionTop = section.offsetTop - 100;
      if (window.scrollY >= sectionTop) {
        current = section.getAttribute('id');
      }
    });
    navLinks.forEach(link => {
      link.style.color = '';
      if (link.getAttribute('href') === '#' + current) {
        link.style.color = '#a78bfa';
      }
    });
  }

  window.addEventListener('scroll', updateActiveLink);
  updateActiveLink();

  console.log('%c🦉 Anythings - 바탕화면 올빼미', 'color: #7c3aed; font-size: 18px; font-weight: bold;');
  console.log('%c무엇이든 가능합니다!', 'color: #a78bfa; font-size: 14px;');
});
