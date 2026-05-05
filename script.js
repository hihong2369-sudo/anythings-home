// Anythings Baseball Academy - Script

// ---- Navbar scroll effect ----
const navbar = document.getElementById('navbar');
window.addEventListener('scroll', () => {
  if (window.scrollY > 50) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }
});

// ---- Hamburger menu ----
const hamburger = document.getElementById('hamburger');
const navMenu = document.getElementById('nav-menu');

if (hamburger && navMenu) {
  hamburger.addEventListener('click', () => {
    navMenu.classList.toggle('open');
    const spans = hamburger.querySelectorAll('span');
    spans[0].style.transform = navMenu.classList.contains('open') ? 'rotate(45deg) translate(5px, 5px)' : '';
    spans[1].style.opacity = navMenu.classList.contains('open') ? '0' : '1';
    spans[2].style.transform = navMenu.classList.contains('open') ? 'rotate(-45deg) translate(5px, -5px)' : '';
  });

  navMenu.querySelectorAll('a').forEach(link => {
    link.addEventListener('click', () => {
      navMenu.classList.remove('open');
      const spans = hamburger.querySelectorAll('span');
      spans[0].style.transform = '';
      spans[1].style.opacity = '1';
      spans[2].style.transform = '';
    });
  });
}

// ---- Smooth scroll for nav links ----
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function(e) {
    e.preventDefault();
    const target = document.querySelector(this.getAttribute('href'));
    if (target) {
      const navH = document.getElementById('navbar').offsetHeight;
      const targetPos = target.offsetTop - navH - 20;
      window.scrollTo({ top: targetPos, behavior: 'smooth' });
    }
  });
});

// ---- Intersection Observer for animations ----
const observerOptions = {
  threshold: 0.1,
  rootMargin: '0px 0px -50px 0px'
};

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, observerOptions);

// Animate elements
document.querySelectorAll('.value-card, .curri-card, .gallery-item, .facility-main, .facility-item').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(30px)';
  el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
  observer.observe(el);
});

// ---- Contact form ----
const contactForm = document.getElementById('contact-form');
if (contactForm) {
  contactForm.addEventListener('submit', function(e) {
    e.preventDefault();
    const btn = this.querySelector('button[type="submit"]');
    const original = btn.textContent;
    btn.textContent = '✓ 신청이 완료되었습니다!';
    btn.style.background = '#22c55e';
    btn.disabled = true;
    setTimeout(() => {
      btn.textContent = original;
      btn.style.background = '';
      btn.disabled = false;
      this.reset();
    }, 3000);
  });
}

// ---- Stagger animation delay ----
document.querySelectorAll('.values-grid .value-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.1) + 's';
});
document.querySelectorAll('.curriculum-tabs .curri-card').forEach((card, i) => {
  card.style.transitionDelay = (i * 0.15) + 's';
});
